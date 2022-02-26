const BasePage = require("./basePage");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends BasePage {
  /**
   * define selectors using getter methods
   */
  get searchIt() {
    return $(".devsite-search-field");
  }

  get searchResult() {
    return $("=Google Cloud Pricing Calculator");
  }

  get instances() {
    return $("#input_78");
  }

  get series() {
    return $('md-select[ng-model="listingCtrl.computeServer.series"]');
  }

  get seriesVal() {
    return $('md-option[value="n1"]');
  }

  get machineType() {
    return $('md-select[ng-model="listingCtrl.computeServer.instance"]');
  }

  get machineVal() {
    return $('md-option[value="CP-COMPUTEENGINE-VMIMAGE-N1-STANDARD-8"]');
  }

  get addGPU() {
    return $('md-checkbox[ng-model="listingCtrl.computeServer.addGPUs"]');
  }

  get gpuType() {
    return $('md-select[ng-model="listingCtrl.computeServer.gpuType"]');
  }

  get gpuVal() {
    return $('md-option[value="NVIDIA_TESLA_V100"]');
  }

  get numOfGpu() {
    return $('md-select[ng-model="listingCtrl.computeServer.gpuCount"]');
  }

  get numOfGpuVal() {
    return $("#select_option_465");
  }

  get localSsd() {
    return $('md-select[ng-model="listingCtrl.computeServer.ssd"]');
  }

  get localSsdVal() {
    return $("#select_option_442");
  }

  get location() {
    return $('md-select[ng-model="listingCtrl.computeServer.location"]');
  }

  get locationVal() {
    return $("#select_option_239");
  }

  get usage() {
    return $('md-select[ng-model="listingCtrl.computeServer.cud"]');
  }

  get usageVal() {
    return $("#select_option_116");
  }

  get estimateButton() {
    return $('form[name="ComputeEngineForm"] > div > button');
  }

  get emailEstimateButton() {
    return $("#email_quote");
  }

  get emailAddress() {
    return $("#email");
  }

  get emailField() {
    return $('input[ng-model="emailQuote.user.email"]');
  }

  get sendEmail() {
    return $(
      'button[ng-click="emailQuote.emailQuote(true); emailQuote.$mdDialog.hide()"]'
    );
  }

  get totalCost() {
    return $('h2[class="md-title"] > b[class="ng-binding"]');
  }

  get costFromEmail() {
    return $('tr[id="mobilepadding"] > td > h2');
  }

  get firstLink() {
    return $("#schranka");
  }

  /**
   * a method to encapsule automation code to interact with the page
   */

  //By clicking the search button enter in the search field "Google Cloud Platform Pricing Calculator"
  async search(txt) {
    let searchArea = await this.searchIt;
    await searchArea.click();
    await searchArea.setValue(txt);
    if (searchArea != null) await browser.keys("\uE007");
  }

  //In the search results, click "Google Cloud Platform Pricing Calculator" and go to the calculator page.
  async searchResultCLick() {
    await this.searchResult.waitForExist();
    await this.searchResult.click();
  }

  //Switch between frames
  async toFrame(frame) {
    await browser.switchToFrame(frame);
  }

  //Set Number of instances: 4
  async setInstances(value) {
    await this.instances.waitForExist();
    await this.instances.setValue(value);
  }

  //Set series type: N1
  async setSeries() {
    await this.dropDownValues(this.series, this.seriesVal);
  }

  //Instance type: n1-standard-8 (vCPUs: 8, RAM: 30 GB)
  async setMachineVal() {
    await this.dropDownValues(this.machineType, this.machineVal);
  }

  //Select Add GPUs
  async setAddGPU() {
    await this.addGPU.waitForExist();
    await this.addGPU.click();
  }

  //Set GPU type: NVIDIA Tesla V100
  async setGpuType() {
    await this.dropDownValues(this.gpuType, this.gpuVal);
  }

  //Set number of GPUs: 1
  async setNumOfGpu() {
    await this.dropDownValues(this.numOfGpu, this.numOfGpuVal);
  }

  //set local SSD: 2x375 Gb
  async setLocalSsd() {
    await this.dropDownValues(this.localSsd, this.localSsdVal);
  }

  //Set datacenter location: Frankfurt (europe-west3)
  async setLocation() {
    await this.dropDownValues(this.location, this.locationVal);
  }

  //Set commited usage: 1 Year
  async setUsage() {
    await this.dropDownValues(this.usage, this.usageVal);
    await browser.pause(100);
  }

  //Click Add to Estimate
  async addToEstimate() {
    await this.estimateButton.waitForExist();
    await browser.pause(100);
    await this.estimateButton.click();
  }

  //Get the total cost value and set it to variable
  async getTotalCost() {
    await this.totalCost.waitForExist();
    let cost = await this.totalCost.getText();
    return cost.split(" ")[4];
  }

  //Select EMAIL ESTIMATE
  async emailEstimate() {
    await this.emailEstimateButton.waitForExist();
    await this.emailEstimateButton.click();
  }

  //In a new tab, open https://10minutemail.com or a similar service for generating temporary emails
  async switchToNewwindow() {
    await browser.newWindow("https://www.minuteinbox.com/");
    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);
  }

  //Copy the mailing address generated in minuteinbox.com
  async getEmailAddress() {
    await this.emailAddress.waitForExist();
    let val = await this.emailAddress.getText();
    return val;
  }

  //Switch between opened windows
  async switchBetweenWindows(index) {
    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[index]);
  }

  //In the Email field enter the address from the previous paragraph
  async placeEmailAndSend(val) {
    await browser.switchToFrame(0);
    await browser.switchToFrame(0);
    await this.emailField.waitForExist();
    await this.emailField.setValue(val);
  }

  //Press SEND EMAIL
  async sendEmailButton() {
    await this.sendEmail.waitForExist();
    await this.sendEmail.click();
  }

  //Choose the email in minuteinbox.com which received from google cloud website.
  async clickEmailResult() {
    let link = await this.firstLink;
    await link.waitForExist();
    await link.$$("tr")[0].click();
  }

  //Get the total cost value from received email to check it matches what is displayed in the calculator
  async getEmailCost() {
    await browser.switchToFrame(1);
    await this.costFromEmail.waitForExist();
    let costEmail = await this.costFromEmail.getText();
    return costEmail.split(" ")[4];
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open("https://cloud.google.com/");
  }
}

module.exports = new LoginPage();
