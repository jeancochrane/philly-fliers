FROM node:10-slim


# Install Chrome for running ng test
RUN apt-get update -yq \
    && karmaDeps=' \
        g++ \
        chromium \
    ' \
    && apt-get install -y ${karmaDeps}

RUN apt-get install -y --no-install-recommends \
  build-essential \
  git \
  libfontconfig \
  ruby \
  ruby-dev \
  python \
  python-dev \
  && rm -rf /var/lib/apt/lists/* && \
  npm install -g --save grunt-cli bower

RUN gem install ffi -v 1.9.18
RUN gem install sass -v 3.4.22
RUN gem install compass

RUN mkdir -p /opt/schema_editor /npm /bower

WORKDIR /npm
COPY package.json /npm/
RUN npm install

WORKDIR /bower
COPY bower.json /bower/
RUN bower install --allow-root --config.interactive=false --force

WORKDIR /opt/schema_editor
COPY . /opt/schema_editor

ENTRYPOINT ["grunt"]
