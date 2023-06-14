#!/usr/bin/env node

// import deps
const puppeteer = require('puppeteer');

// read CLI args
if (process.argv.length !== 3 && process.argv.length !== 4) {
    console.error('Usage: node screenshot.js <plugin-uri> [mod-base-uri]');
    console.error();
    console.error('  Example for <plugin-uri>:   http://github.com/mikeoliphant/neural-amp-modeler-lv2');
    console.error('                              This value can be found in the manifest.ttl of your plugin.');
    console.error('  Example for [mod-base-uri]: http://localhost:8888');
    console.error('                              Default is http://192.168.51.1.');
    process.exit(1);
}

// program constants
const prefix = process.argv.length === 3 ?
    'http://192.168.51.1' : 
    process.argv[3];

const pageIcon = prefix + '/icon.html#';
const pagePedalboard = prefix + '/pedalboard.html?bundlepath=';

// check if
const uriOrPath = process.argv[2];
const isPedalboard = uriOrPath.startsWith('/');

(async() => {
    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();
    await page.goto((isPedalboard ? pagePedalboard : pageIcon) + uriOrPath);
    await page.setViewport({width: 3840, height: 2160, deviceScaleFactor: 1});
    await page.waitForNetworkIdle({timeout: 5000});
    if (isPedalboard) {
        await page.waitForSelector('#fully-loaded-check.complete');
    }
    await page.screenshot({
        path: 'screenshot.png',
        fullPage: true,
        omitBackground: true
    });
    browser.close();
})();
