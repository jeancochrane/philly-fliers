#!/bin/bash
# publish.sh -- Deploy new containers to AWS ECR and restart ECS services.

# Required encrypted environment variables:
# -----------------------------------------
# AWS_ACCESS_KEY_ID
# AWS_SECRET_ACCESS_KEY
# AWS_DEFAULT_REGION
# AWS_STORAGE_BUCKET_NAME
# AWS_LOCATION
# AWS_ECR_URL
# AWS_ECS_CLUSTER
# AWS_ECS_SERVICE
# ----------------------------------------

set -euo pipefail

if [ -z "$TRAVIS_PULL_REQUEST" ] || [ "$TRAVIS_PULL_REQUEST" == "false" ];
then
    if [ "$TRAVIS_BRANCH" == "deploy" ];
    then
        # Rebuild the Grout image with production credentials.
        cp ./grout-server/grout_server/settings.s3.py \
           ./grout-server/grout_server/settings_deployment.py
        docker build -t philly-fliers_grout:latest ./grout-server

        # Collect and push static files to S3. This step needs to happen after
        # the Grout image has been rebuilt, since the container for deploying
        # static files depends on the production Grout image.
        docker build -t philly-fliers_deploy:latest ./deployment/grout
        docker run --env-file grout-server/.env \
                   -e DEBUG="False" \
                   -e INSTALLED_APPS="storages" \
                   -e AWS_ACCESS_KEY_ID
                   -e AWS_SECRET_ACCESS_KEY \
                   -e AWS_STORAGE_BUCKET_NAME \
                   -e AWS_LOCATION \
                   --entrypoint python \
                   philly-fliers_deploy:latest manage.py collectstatic --noinput

        # Build static apps.
        docker-compose run --rm --no-deps app run build
        cp -R ./app/dist ./deployment/nginx/app/

        docker-compose run --rm --no-deps editor build
        cp -R ./grout-schema-editor/dist ./deployment/nginx/editor/

        # Rebuild Nginx container to load it with static apps.
        docker build -t philly-fliers_nginx:latest ./deployment/nginx

        # Log in with AWS credentials.
        pip install --user awscli
        export PATH=$PATH:$HOME/.local/bin
        mkdir -p ~/.aws
        cat > ~/.aws/credentials << EOL
[default]
aws_access_key_id = ${AWS_ACCESS_KEY_ID}
aws_secret_access_key = ${AWS_SECRET_ACCESS_KEY}
EOL
        eval $(aws ecr get-login --no-include-email --region $AWS_DEFAULT_REGION)

        # Push containers to ECR.
        for service in nginx grout;
        do
            docker tag "philly-fliers_${service}:latest" "${AWS_ECR_URL}/${service}:latest"
            docker push "${AWS_ECR_URL}/${service}:latest"
        done

        # Update the app service -- redirect output to /dev/null to avoid
        # the API response from printing to the console.
        aws ecs update-service --cluster $AWS_ECS_CLUSTER \
                               --service $AWS_ECS_SERVICE \
                               --region $AWS_DEFAULT_REGION
                               --force-new-deployment > /dev/null 2>&1

        rm -Rf ~/.aws

        # TODO: Figure out a way to run migrations.
    else
        echo "Skipping deployment because branch is not 'deploy'"
    fi
else
    echo "Skipping deployment because the build is a pull request"
fi