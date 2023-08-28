# mod-screenshot

This is a small nodejs-based utility that renders either a modgui or pedalboard screenshot from a MOD unit connected via USB.

It uses `pupetter` behind the scenes, which in turn uses an embed version of Chromium, to render a web page and output and PNG file.
The output file is not cropped automatically for now.

## Docker

For using this tool within docker, **run this command once**, with the source code as the current directory:

```sh
docker build -t mod-screenshot .
```

Then run this command for generating a screenshot, specifying the plugin URI:

```sh
docker run --rm --cap-add=SYS_ADMIN -v $(pwd):/tmp/output -e PLUGIN_URI="plugin-uri" mod-screenshot
```

## Local build

If you prefer local builds you need to setup nodejs and python's pip first.

### Build / Dependencies

As with any nodejs-based tool, you first need to install nodejs.
Then simply install the dependencies using npm, like so:

```sh
npm install
```

This will create a local `node_modules` folder where the dependencies are stored.

### Usage

**NOTE: Usage of this tool requires a MOD unit running at least v1.13.2**

Generating a modgui screenshot: (uses plugin URI)

```sh
node screenshot.js http://github.com/mikeoliphant/neural-amp-modeler-lv2
```

Generating a pedalboard screenshot: (uses bundle path)

```sh
node screenshot.js /root/.pedalboards/BRIG_SVTube.pedalboard
```

Generating a screenshot with a locally hosted mod-ui:

```sh
node screenshot.js http://github.com/mikeoliphant/neural-amp-modeler-lv2 http://localhost:8888
```
