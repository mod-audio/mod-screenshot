#!/usr/bin/env node
// SPDX-FileCopyrightText: 2023 MOD Audio UG
// SPDX-License-Identifier: AGPL-3.0-or-later

// import deps
const puppeteer = require('puppeteer');

// read CLI args
if (process.argv.length !== 3 && process.argv.length !== 4) {
    console.error('Usage: node screenshot.js <plugin-uri> [mod-base-url]');
    console.error();
    console.error('  Example for <plugin-uri>:   http://github.com/mikeoliphant/neural-amp-modeler-lv2');
    console.error('                              This value can be found in the manifest.ttl of your plugin.');
    console.error('  Example for [mod-base-url]: http://localhost:8888');
    console.error('                              Default is http://192.168.51.1.');
    process.exit(1);
}

// 1st argument: plugin-uri (or pedalboard path)
const uriOrPath = process.argv[2];

// 2nd argument: page URL
const prefix = process.argv.length === 3 ? 'http://192.168.51.1' : process.argv[3];

// adjust loading according to arguments
const isPedalboard = uriOrPath.startsWith('/');
const pageIcon = prefix + '/icon.html#';
const pagePedalboard = prefix + '/pedalboard.html?bundlepath=';

// ready!
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
