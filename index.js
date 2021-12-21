const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const cors = require('cors');
var bodyParser = require('body-parser');
const { By, Key, Builder } = require("selenium-webdriver");
const { Console } = require('console');
require("chromedriver");
app.use(bodyParser.urlencoded({
    extended: true
}));
let driver = new Builder().forBrowser("chrome").build();
app.use(cors())



app.post("/gNew", function(req, res) {


    var ddata = JSON.parse(JSON.stringify(req.body));

    // console.log(ddata);
    console.log(ddata);


    gNewPage(res, ddata);
});

app.get("/login", function(req, res) {
    loginOpen(res);
});



var server = app.listen(8082, function() {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://localhost//%s:%s", host, port)
})




async function loginOpen(res) {

    var uname = "moradiyabros";
    var pwd = "Rohit@123";


    //To fetch http://google.com from the browser with our code.
    await driver.get("https://ewaybillgst.gov.in/login.aspx");

    //To send a search query by passing the value in searchString.
    await driver.findElement(By.id("txt_username")).sendKeys(uname);
    await driver.findElement(By.id("txt_password")).sendKeys(pwd);

    //Verify the page title and print it
    // var title = await driver.getTitle();
    console.log('Title is:');

    //It is always a safe practice to quit the browser after execution
    // await driver.quit();
    res.send('ok');
}
async function gNewPage(res, data) {

    // data: {Chno:chno ,Gst:gst1 ,Pro:pro ,Hsn:hsn 
    //,Pec:pec ,Uni:uni ,Amount:amt ,Cgst:cgst ,Igst:igst ,Tid:tid}

    var cno = data.Chno;
    var partyGst = data.Gst;
    var Product = data.Pro;
    var Hsnc = data.Hsn;
    var Pcs = data.Pec;
    var Unit = data.Uni;
    var Amt = data.Amount;
    var CGST = data.Cgst;
    var Igst = data.Igst;
    var Tid = data.Tid;

    //To wait for browser to build and launch properly
    //To fetch http://google.com from the browser with our code.
    await driver.get("https://ewaybillgst.gov.in/BillGeneration/BillGeneration.aspx");
    //To send a search query by passing the value in searchString.
    var title = await driver.getTitle();

    // console.log(cno +  partyGst + Product + Hsnc + Pcs + Unit + Amt +CGST + Igst + Tid);


    await driver.findElement(By.id("txtDocNo")).sendKeys(cno);
    await driver.findElement(By.id("ctl00_ContentPlaceHolder1_txtToGSTIN")).sendKeys(partyGst);
    await driver.findElement(By.id("txtProductName_1")).sendKeys(Product);
    await driver.findElement(By.id("txt_Description_1")).sendKeys(Product);
    await driver.findElement(By.id("txt_HSN_1")).sendKeys(Hsnc);

    await driver.findElement(By.id("txt_Quanity_1")).sendKeys(Pcs);
    await driver.findElement(By.id("txt_Unit_1")).sendKeys(Unit);
    await driver.findElement(By.id("txt_TRC_1")).sendKeys(Amt);
    if (Igst == 0.000) {
        await driver.findElement(By.id("SelectCSGST_1")).sendKeys(CGST);
    } else {
        await driver.findElement(By.id("SelectIGST_1")).sendKeys(Igst);
    }

    await driver.findElement(By.id("ctl00_ContentPlaceHolder1_txtTransid")).sendKeys(Tid);
    await driver.sleep(5000);
    await driver.findElement(By.id("btnPreview")).click();

    await driver.wait(until.alertIsPresent());

    // Store the alert in a variable
    let alert = await driver.switchTo().alert();

    //Store the alert text in a variable
    let alertText = await alert.getText();

    //Press the OK button
    await alert.accept();
    //driver.findElement(By.id("btnsbmt")).click();
    res.send('ok');
}