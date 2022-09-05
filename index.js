const chromium = require("chrome-aws-lambda");

function later(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

exports.handler = async (event, context, callback) => {
  let result = null;
  let browser = null;

  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    console.log("Goes to Page");
    await page.goto(
      event.url ||
        "https://www.matchi.se/login/auth?returnUrl=%2Fprofile%2Fhome",
      { waitUntil: "networkidle0" }
    );

    console.log("Fills in stuff");
    await page.type("#username", "YOUR_USERNAME_HERE");
    await page.type("#password", "YOUR_PASSWORD_HERE");

    console.log("Submits form");
    await Promise.all([
      page.click('button[class="btn btn-lg btn-success btn-block"]'),
      page.waitForNavigation(),
    ]);

    console.log("Going to Sagene");
    await page.goto("https://www.matchi.se/facilities/sagene", {
      waitUntil: "networkidle0",
    });

    console.log("Delaying 45 seconds, then reload page");
    await later(45000).then(() => page.reload({ waitUntil: "networkidle0" }));
    console.log("Reloaded");

    console.log("Waiting for table");
    await page.waitForXPath('//table[@class="table-bordered daily"]');

    console.log("Clicking buttons");
    for (i = 0; i < 5; i++) {
      await page.click(
        "#schedule > div > div > div.schedule-filters > div.row.row-full.vertical-padding20 > div.no-horizontal-padding > ul > li:nth-child(2)"
      );
      await page.waitForTimeout(700);
      console.log("Clicking buttons", i);
    }

    console.log("Evaluating slots");

    if (
      await page.$(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td:nth-child(3).slot.free"
      )
    ) {
      console.log("Free Bane 1, kl 8");
      await page.click(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td:nth-child(3)"
      );
    } else if (
      await page.$(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2) > table > tbody > tr > td:nth-child(3).slot.free"
      )
    ) {
      console.log("Free bane 2, kl 8");
      await page.click(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2) > table > tbody > tr > td:nth-child(3)"
      );
    } else if (
      await page.$(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(2) > table > tbody > tr > td:nth-child(3).slot.free"
      )
    ) {
      console.log("Free bane 3, kl 8");
      await page.click(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(2) > table > tbody > tr > td:nth-child(3)"
      );
    } else if (
      await page.$(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td:nth-child(2).slot.free"
      )
    ) {
      console.log("Free Bane 1, kl 7");
      await page.click(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td:nth-child(2).slot.free"
      );
    } else if (
      await page.$(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2) > table > tbody > tr > td:nth-child(2).slot.free"
      )
    ) {
      console.log("Free Bane 2, kl 7");
      await page.click(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2) > table > tbody > tr > td:nth-child(2)"
      );
    } else if (
      await page.$(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(2) > table > tbody > tr > td:nth-child(2).slot.free"
      )
    ) {
      console.log("Free Bane 3, kl 7");
      await page.click(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(2) > table > tbody > tr > td:nth-child(2)"
      );
    } else if (
      await page.$(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(2) > table > tbody > tr > td:nth-child(12).slot.free"
      )
    ) {
      console.log("Free Bane 3, kl 17");
      await page.click(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(2) > table > tbody > tr > td:nth-child(12).slot.free"
      );
    } else if (
      await page.$(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2) > table > tbody > tr > td:nth-child(12).slot.free"
      )
    ) {
      console.log("Free Bane 2, kl 17");
      await page.click(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2) > table > tbody > tr > td:nth-child(12).slot.free"
      );
    } else if (
      await page.$(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(2) > table > tbody > tr > td:nth-child(14).slot.free"
      )
    ) {
      console.log("Bane 3, kl 19");
      await page.click(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(2) > table > tbody > tr > td:nth-child(14).slot.free"
      );
    } else if (
      await page.$(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td:nth-child(13).slot.free"
      )
    ) {
      console.log("Bane 1, kl 18");
      await page.click(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td:nth-child(13).slot.free"
      );
    } else if (
      await page.$(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2) > table > tbody > tr > td:nth-child(13).slot.free"
      )
    ) {
      console.log("Bane 2, kl 18");
      await page.click(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2) > table > tbody > tr > td:nth-child(13).slot.free"
      );
    } else if (
      await page.$(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(2) > table > tbody > tr > td:nth-child(13).slot.free"
      )
    ) {
      console.log("Bane 3, kl 18");
      await page.click(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(2) > table > tbody > tr > td:nth-child(13).slot.free"
      );
    } else if (
      await page.$(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td:nth-child(14).slot.free"
      )
    ) {
      console.log("Bane 1, kl 19");
      await page.click(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td:nth-child(14).slot.free"
      );
    } else if (
      await page.$(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2) > table > tbody > tr > td:nth-child(14).slot.free"
      )
    ) {
      console.log("Bane 2, kl 19");
      await page.click(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2) > table > tbody > tr > td:nth-child(14).slot.free"
      );
    } else if (
      await page.$(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td:nth-child(12).slot.free"
      )
    ) {
      console.log("Bane 1, kl 17");
      await page.click(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td:nth-child(12).slot.free"
      );
    } else if (
      await page.$(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td:nth-child(15).slot.free"
      )
    ) {
      console.log("Bane 1, kl 20");
      await page.click(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td:nth-child(15).slot.free"
      );
      console.log("Clicked button");
    } else if (
      await page.$(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2) > table > tbody > tr > td:nth-child(15).slot.free"
      )
    ) {
      console.log("Bane 2, kl 20");
      await page.click(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(2) > table > tbody > tr > td:nth-child(15).slot.free"
      );
    } else if (
      await page.$(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(2) > table > tbody > tr > td:nth-child(15).slot.free"
      )
    ) {
      console.log("Bane 3, kl 20");
      await page.click(
        "#schedule > div > div > div:nth-child(2) > table > tbody > tr:nth-child(4) > td:nth-child(2) > table > tbody > tr > td:nth-child(15).slot.free"
      );
    } else {
      console.log("No times available, closing browser");
      await browser.close();
    }

    console.log("waiting for modal to show");
    await page.waitForSelector(".modal-dialog", {
      visible: true,
      timeout: 3000,
    });
    console.log("Modal is here");

    console.log("Waiting for button");
    await page.waitForSelector("#btnSubmit", {
      visible: true,
      timeout: 3000,
    });

    console.log("Button is here");
    await page.click("#btnSubmit");
    console.log("Clicked button");

    result = page.title();
  } catch (error) {
    return callback(error);
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }

  return callback(null, result);
};
