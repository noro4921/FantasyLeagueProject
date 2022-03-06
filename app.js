const express = require("express");
const app = express();
const request = require("request");
const https = require("https");
const bodyParser = require("body-parser");

app.post("/signup",function(req,res){
  res.redirect("/");
})
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));


app.post("/", function(req, res) {
  console.log(req.body.fname);
  console.log(req.body.lname);
  console.log(req.body.email);

  const data = {
    members: [{
      email_address: req.body.email,
      status: "subscribed",
      merge_fields: {
        FNAME: req.body.fname,
        LNAME: req.body.lname,
      }

    }]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us20.api.mailchimp.com/3.0/lists/53e89a9663"
  // i realized that we should not post the api key on github so mailchimp has deactivated this token. I still keep it here to remind myself.

  const options = {
  method: "POST",
  auth: "reuben1:dc9575f835524b74ec45c6082b2cf193-us20"
    // this is not accessible as well. DON'T make this mistake again. Research API key storage MDN GITHUB Docs.
  }

  const request = https.request(url, options, function(response){

    if (response.statusCode === 200){
      res.sendFile(__dirname+"/success.html");
    }else{
      res.sendFile(__dirname+"/failure.html");
    }


  response.on("data",function(data){
    console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();

})





app.listen(process.env.PORT || 3000, function() {
  console.log("SUCCESS at port 3000");
})

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})



// API KEY :dc9575f835524b74ec45c6082b2cf193-us20


// Audience ID :53e89a9663
