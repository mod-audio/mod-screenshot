# mod-screenshot

This is a small nodejs-based utility that renders either a modgui or pedalboard screenshot from a MOD unit connected via USB.

It uses `pupetter` behind the scenes, which in turn uses an embed version of Chromium, to render a web page and output and PNG file.
The output file is not cropped automatically for now.

## Build / Dependencies

As with any nodejs-based tool, you first need to install nodejs.
Then simply install the dependencies using npm, like so:

```sh
npm install
```

This will create a local `node_modules` folder where the dependencies are stored.

## Usage

**NOTE: Usage of this tool requires a MOD unit running at least v1.13.2**

Generating a modgui screenshot: (uses plugin URI)

```sh
node screenshot.js http://github.com/mikeoliphant/neural-amp-modeler-lv2
```

Generating a pedalboard screenshot: (uses bundle path)

```sh
node screenshot.js /root/.pedalboards/BRIG_SVTube.pedalboard
```
