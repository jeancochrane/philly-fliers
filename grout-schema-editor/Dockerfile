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
  ruby \
  ruby-dev \
  && rm -rf /var/lib/apt/lists/* && \
  yarn global add parcel-bundler

RUN gem install ffi -v 1.9.18
RUN gem install sass -v 3.4.22

RUN mkdir -p /opt/schema_editor

WORKDIR /opt/schema_editor
COPY . /opt/schema_editor
RUN yarn install

ENTRYPOINT ["npm", "start"]
