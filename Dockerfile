# Build as:
#
# docker build -t mod-screenshot .
#
# Run as:
#
# docker run -it --init --cap-add=SYS_ADMIN -v $PWD:/workdir -e "LV2_URI=http://aidadsp.cc/plugins/aidadsp-bundle/rt-neural-showcase" mod-screenshot
#
# - $PWD is a path owned by 1000:1000
# - LV2_URI is the plugin from which you want to generate screenshot & thumbnail

FROM ghcr.io/puppeteer/puppeteer:19.7.4

ENV LV2_URI "http://aidadsp.cc/plugins/aidadsp-bundle/rt-neural-showcase"

USER root

RUN apt update && apt install --no-install-recommends --yes python3-pil

RUN usermod -a -G node pptruser

USER pptruser

WORKDIR /home/pptruser

RUN curl -LJO https://raw.githubusercontent.com/moddevices/mod-screenshot/main/screenshot.js &&\
    chmod +x screenshot.js

COPY process_image.py .

COPY entrypoint .

ENTRYPOINT ["/home/pptruser/entrypoint"]
