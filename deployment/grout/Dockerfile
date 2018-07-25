FROM philly-fliers_grout:latest

COPY deploy-requirements.txt /tmp/deploy-requirements.txt
RUN pip install -U -r /tmp/deploy-requirements.txt

ENTRYPOINT python
CMD ['manage.py','collectstatic','--noinput']
