/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
module.exports = class BasePage {
  /**
   * Opens a sub page of the page
   * @param path path of the sub page (e.g. /path/to/page.html)
   */
  open(path) {
    return browser.url(path);
  }

  async dropDownValues(prop, value) {
    //Wait until dropdown property will be found and click it.
    await prop.waitForExist();
    await prop.click();
    await prop.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
    // Wait untill it finds value of needed from dropdown and click it.
    let val = await value;
    await val.waitForExist();
    await browser.pause(200);
    await val.click();
  }
};
