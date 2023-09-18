FROM ubuntu:22.04


ARG SFPOWERSCRIPTS_VERSION=alpha
ARG SF_CLI_VERSION=2.8.11
ARG BROWSERFORCE_VERSION=2.9.1
ARG SFDMU_VERSION=4.18.2
ARG GIT_COMMIT
ARG NODE_MAJOR=20

LABEL org.opencontainers.image.description "sfpowerscripts is a build system for modular development in Salesforce."
LABEL org.opencontainers.image.licenses "MIT"
LABEL org.opencontainers.image.url "https://github.com/dxatscale/sfpowerscripts"
LABEL org.opencontainers.image.documentation "https://docs.dxatscale.io/projects/sfpowerscripts"
LABEL org.opencontainers.image.revision $GIT_COMMIT
LABEL org.opencontainers.image.vendor "DX@Scale"
LABEL org.opencontainers.image.source "https://github.com/dxatscale/sfpowerscripts"
LABEL org.opencontainers.image.title "DX@Scale sfpowercripts docker image - August 23"


ENV DEBIAN_FRONTEND=noninteractive


RUN ln -sf bash /bin/sh


RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get -y install --no-install-recommends \
      git \
      curl \
      sudo \
      jq \
      zip \
      unzip \
      make \
      g++ \
      openjdk-17-jre-headless \
      ca-certificates \
      chromium-bsu \
      chromium-driver \
      gnupg \
    && apt-get autoremove --assume-yes \
    && apt-get clean --assume-yes \
    && rm -rf /var/lib/apt/list/*

# install nodejs via nodesource
RUN mkdir -p /etc/apt/keyrings \
    && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
    && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list \
    && apt-get update \
    && apt-get -y install --no-install-recommends nodejs \
    && apt-get autoremove --assume-yes \
    && apt-get clean --assume-yes \
    && rm -rf /var/lib/apt/list/*    

# install yarn
RUN npm install --global yarn --omit-dev \
    && npm cache clean --force

# Install SF cli and sfpowerscripts
RUN npm install --global --omit=dev \
    @salesforce/cli@${SF_CLI_VERSION} \
    @dxatscale/sfpowerscripts@${SFPOWERSCRIPTS_VERSION} \
    && npm cache clean --force



# Set XDG environment variables explicitly so that GitHub Actions does not apply
# default paths that do not point to the plugins directory
# https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html
ENV XDG_DATA_HOME=/sf_plugins/.local/share \
    XDG_CONFIG_HOME=/sf_plugins/.config  \
    XDG_CACHE_HOME=/sf_plugins/.cache \
    JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64/


# Create symbolic link from sh to bash
# Create isolated plugins directory with rwx permission for all users
# Azure pipelines switches to a container-user which does not have access
# to the root directory where plugins are normally installed
RUN mkdir -p $XDG_DATA_HOME && \
    mkdir -p $XDG_CONFIG_HOME && \
    mkdir -p $XDG_CACHE_HOME && \
    chmod -R 777 sf_plugins && \
    export JAVA_HOME && \
    export XDG_DATA_HOME && \
    export XDG_CONFIG_HOME && \
    export XDG_CACHE_HOME



# Install sfdx plugins
RUN echo 'y' | sf plugins:install sfdx-browserforce-plugin@${BROWSERFORCE_VERSION} \
    && echo 'y' | sf plugins:install sfdmu@${SFDMU_VERSION} \
    && echo 'y' | sf plugins:install @salesforce/plugin-packaging@1.25.0 \
    && yarn cache clean --all 

# Set some sane behaviour in container
ENV SF_CONTAINER_MODE=true
ENV SF_DISABLE_AUTOUPDATE=true
ENV SF_DISABLE_TELEMETRY=true
ENV SF_USE_GENERIC_UNIX_KEYCHAIN=true
ENV SF_USE_PROGRESS_BAR=false

WORKDIR /root



# clear the entrypoint for azure
ENTRYPOINT []
CMD ["/bin/sh"]