FROM nginx:latest

# Copy configs and app directories into the container.
COPY ./staging.conf /etc/nginx/conf.d/staging.conf
COPY ./certbot.cron /etc/cron.d/certbot
COPY ./app/ /usr/share/nginx/html/app/
COPY ./editor/ /usr/share/nginx/html/editor/

# Install requirements for serving SSL certs.
RUN apt-get update
RUN apt-get install -y certbot \
					   openssl
