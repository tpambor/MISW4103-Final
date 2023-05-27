const { After, Before, AfterStep } = require('@cucumber/cucumber');
const { WebClient } = require('kraken-node');
const properties = require('../../../properties.json');
const takeshots = properties.Screenshots;
const Screenshots = require('./screenshots');
let screenshots;

Before(async function(scenario) {
  this.deviceClient = new WebClient('chrome', {}, this.userId);
  this.driver = await this.deviceClient.startKrakenForUserId(this.userId);

  if (takeshots == "YES") {
    const path = scenario.pickle.name.replace(/\s+/g, '');
    screenshots = new Screenshots(path);
    screenshots.createScreenshotsDir();
    screenshots.createFunctionDir();
  }
});

AfterStep(async function() {
  if (takeshots == "YES") {
    await this.driver.saveScreenshot(screenshots.getName());
  }
});

After(async function() {
  await this.deviceClient.stopKrakenForUserId(this.userId);
});