FROM debian:bookworm
LABEL maintainer="Filipe Coelho <falktx@mod.audio>"
ENV DEBIAN_FRONTEND noninteractive

# update and upgrade system
RUN apt-get update && apt-get upgrade -qqy && apt-get clean

# install system packages
RUN apt-get install --no-install-recommends -yqq chromium chromium-sandbox npm python3-pil && apt-get clean

# user configurations
ENV USER puppeteer
ENV HOME /home/$USER

# create user
RUN useradd -d $HOME -m $USER

# switch user
USER $USER
WORKDIR $HOME

# create directory for placing output files
RUN mkdir /tmp/output

# install puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
COPY package.json .
RUN npm install

# install local code
COPY screenshot.js .
COPY thumbnail.py .
COPY entrypoint.sh .

# arguments for a docker run
ENV PLUGIN_URI=""
ENV MOD_BASE_URL="http://192.168.51.1"

# ready!
ENTRYPOINT ["./entrypoint.sh"]
