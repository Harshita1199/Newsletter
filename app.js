const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");
const mailchimp = require('@mailchimp/mailchimp_marketing');
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const first_name = req.body.fname;
  const last_name = req.body.lname;
  const emailid = req.body.email;

  const userData = {
    members: [{
      email_address: emailid,
      status: "subscribed",
      merge_fields: {
        FNAME: first_name,
        LNAME: last_name
      }
    }]
  };
  mailchimp.setConfig({
    apiKey: "476fac92d39e3ab59787fc76d31b7b07-us1",
    server: "us1",
  });
  const run = async () => {
    try {
      const response = await mailchimp.lists.batchListMembers("6d5b3a6e59", userData);
      console.log(response);
      res.sendFile(__dirname + "/success.html");
    } catch (err) {
      console.log(err.status);
      res.sendFile(__dirname + "/failure.html");
    }
  };
  run();

  //res.send("<p>Thanks for your submission</p>")
})

app.post("/failure", function(req, res) {
  res.redirect("/");
});
app.listen(process.env.PORT || 3000, function() {
  console.log("server is running on port 3000");
});
//api key
//476fac92d39e3ab59787fc76d31b7b07-us1

//list
//6d5b3a6e59
/*

app.post('/', (req, res) => {
  var fName = req.body.firstName
  var lName = req.body.lastName
  var email = req.body.email
  var userData = {
  members: [{
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: fName,
      LNAME: lName
    }
  }],};
 mailchimp.setConfig({
   apiKey: "b1XXXXXXXXXXXXXXa-us2",
   server: "us2",
 });
 const run = async () => {
    const response = await mailchimp.lists.batchListMembers(YOUR_UNIQUE_AUDIENCE_ID, userData );
    console.log(response);
  };
  run();

res.send("<p>Thanks for your submission</p>")
})
*/
