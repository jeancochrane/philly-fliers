#!/bin/bash

if if [ -z "$TRAVIS_PULL_REQUEST" ] || [ "$TRAVIS_PULL_REQUEST" == "false" ];
then
    if [ "$TRAVIS_BRANCH" == "master" ];
    then

        # Collect and push static files to S3.
        docker build -t philly-fliers_deploy:latest ./deployment/grout
        docker run --env-file grout-server/.env \
                   -e INSTALLED_APPS="$INSTALLED_APPS" \
                   -e AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID"
                   -e AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY" \
                   -e AWS_STORAGE_BUCKET_NAME="$AWS_STORAGE_BUCKET_NAME" \
                   -e AWS_LOCATION="$AWS_LOCATION" \
                   --entrypoint python \
                   philly-fliers_deploy:latest manage.py collectstatic

        # Build static apps.
        docker-compose run --rm --no-deps app run build
        cp -R ./app/dist ./deployment/nginx/app/

        docker-compose run --rm --no-deps editor build
        cp -R ./grout-schema-editor/dist ./deployment/nginx/editor/

        # Rebuild Nginx container to load it with static apps.
        docker-compose build nginx

        # Log in with AWS credentials.
        pip install --user awscli
        export PATH=$PATH:$HOME/.local/bin
        cat > ~/.aws/credentials <<- EOL
            [default]
            aws_access_key_id = ${AWS_ACCESS_KEY_ID}
            aws_secret_access_key = ${AWS_SECRET_ACCESS_KEY}
            EOL
        eval $(aws ecr get-login --no-include-email --region $AWS_DEFAULT_REGION)

        # Push containers to ECR.
        for service in nginx grout;
        do
            docker tag philly-fliers_$service:latest "${AWS_ECR_URL}${service}:latest"
            docker push "${AWS_ECR_URL}${service}:latest"
        done

        # Update the app service.
        aws ecs update-service --cluster $AWS_ECS_CLUSTER \
                               --service $AWS_ECS_SERVICE \
                               --region $AWS_DEFAULT_REGION
                               --force-new-deployment

        # TODO: Figure out a way to run migrations.
    else
        echo "Skipping deployment because branch is not 'master'"
    fi
else
    echo "Skipping deployment because the build is a pull request"
fi
