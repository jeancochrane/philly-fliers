FROM python:3.6.5-alpine

# Copy over only the requirements file -- requirements will change much less
# often than code, so install them before copying the directory into the container
# to avoid long build times
COPY ./requirements.txt /tmp/requirements.txt
RUN pip install -U -r /tmp/requirements.txt

COPY . /opt/loaddata
WORKDIR /opt/loaddata

CMD python loaddata.py
