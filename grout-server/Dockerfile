FROM quay.io/azavea/django:1.11-python3.6-slim

# Install OS-level dependencies for Grout
RUN apt-get update
RUN apt-get -y autoremove && apt-get install -y \
	libgeos-dev \
	binutils \
	libproj-dev \
	gdal-bin \
	git

COPY requirements.txt /tmp/requirements.txt
RUN pip install -U -r /tmp/requirements.txt

# Do not buffer output (allows Docker to stream stdout)
ENV PYTHONUNBUFFERED 0

COPY . /opt/grout-server
WORKDIR /opt/grout-server

EXPOSE 8000
ENTRYPOINT python
CMD ['manage.py', 'runserver', '0.0.0.0:8000']
