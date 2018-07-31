# Docker image for a production version of Grout Server, storing static files in S3.
FROM philly-fliers_grout:latest

COPY deploy-requirements.txt /tmp/deploy-requirements.txt
RUN pip install -U -r /tmp/deploy-requirements.txt
