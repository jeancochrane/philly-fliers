# Docker image for serving static files from Nginx.
FROM nginx:latest

# Install requirements for serving SSL certs.
RUN apt-get update
RUN apt-get install -y certbot

# Copy configs into the container.
COPY ./staging.conf /etc/nginx/conf.d/staging.conf
COPY ./certbot.cron /etc/cron.d/certbot

# Copy JS bundles for static apps into the containers. Make sure to bundle these
# before building the container, or the directories will be empty.
COPY ./app/ /usr/share/nginx/html/app/
COPY ./editor/ /usr/share/nginx/html/editor/
