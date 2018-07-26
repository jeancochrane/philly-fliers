FROM nginx:latest

COPY ./staging.conf /etc/nginx/conf.d/staging.conf
COPY ./app/ /usr/share/nginx/html/app/
COPY ./editor/ /usr/share/nginx/html/editor/

RUN apt-get update
RUN apt-get install -y certbot
