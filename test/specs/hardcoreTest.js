const LoginPage = require("../pageobjects/hardcore");
var should = require("chai").should();

describe("My Login application", () => {
  let email;
  let cost;

  it("Open https://cloud.google.com/", async () => {
    await LoginPage.open();
  });

  it('Enter in the search field "Google Cloud Platform Pricing Calculator" and click', async () => {
    await LoginPage.search("Google Cloud Platform Pricing Calculator");
  });

  it('In the search results, click "Google Cloud Platform Pricing Calculator" and go to the calculator page.', async () => {
    await LoginPage.searchResultCLick();
  });

  it("Switch to frame", async () => {
    await LoginPage.toFrame(0);
    await LoginPage.toFrame(0);
  });

  it("Number of instances: 4", async () => {
    await LoginPage.setInstances(4);
  });

  it("Set series for machine type", async () => {
    await LoginPage.setSeries();
  });

  it("Instance type: n1-standard-8 (vCPUs: 8, RAM: 30 GB)", async () => {
    await LoginPage.setMachineVal();
  });

  it("Select Add GPU checkbox", async () => {
    await LoginPage.setAddGPU();
  });

  it("Select GPU type: NVIDIA Tesla V100", async () => {
    await LoginPage.setGpuType();
  });

  it("Select Number of GPUs: 1", async () => {
    await LoginPage.setNumOfGpu();
  });

  it("Select Local SSD: 2x375 Gb", async () => {
    await LoginPage.setLocalSsd();
  });

  it("Select Datacenter location: Frankfurt (europe-west3)", async () => {
    await LoginPage.setLocation();
  });

  it("Select Commited usage: 1 Year", async () => {
    await LoginPage.setUsage();
  });

  it("Click Add to Estimate", async () => {
    await LoginPage.addToEstimate();
    cost = await LoginPage.getTotalCost();
  });

  it("Select EMAIL ESTIMATE", async () => {
    await LoginPage.emailEstimate();
    // await browser.saveScreenshot(
    //   `./screenshots/estimate-${new Date().getTime()}.png`
    // );
  });

  it("In a new tab, open https://10minutemail.com", async () => {
    await LoginPage.switchToNewwindow();
  });

  it("Get generated email address", async () => {
    email = await LoginPage.getEmailAddress();
  });

  it("Back to Home url", async () => {
    await LoginPage.switchBetweenWindows(0);
  });

  it("Place email address to the field", async () => {
    await LoginPage.placeEmailAndSend(`${email}`);
  });

  it("Press SEND EMAIL", async () => {
    await LoginPage.sendEmailButton();
  });

  it("Go to mail page and click new arrived mail from cloud.google.com", async () => {
    await LoginPage.switchBetweenWindows(1);
    await browser.pause(10000);
    await LoginPage.clickEmailResult();
  });

  it("Check that the Total Estimated Monthly Cost in the letter matches what is displayed in the calculator", async () => {
    let costFromEmail = await LoginPage.getEmailCost();
    costFromEmail.should.equal(cost);
  });
});
