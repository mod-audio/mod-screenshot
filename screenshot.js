#!/usr/bin/env node

// import deps
const puppeteer = require('puppeteer');

// program constants
const prefix = 'http://192.168.51.1';
const pageIcon = prefix + '/icon.html#';
const pagePedalboard = prefix + '/pedalboard.html?bundlepath=';

// read CLI args
if (process.argv.length === 2) {
    console.error(`Usage: node screenshot.js <uri>`);
    process.exit(1);
}

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
