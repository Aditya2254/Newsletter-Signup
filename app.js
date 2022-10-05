const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    var data = {                            //data format we are going to send to the Server
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    }
    var jsonData = JSON.stringify(data);    //stringified data to be sent to the servers

    const url = "https://us14.api.mailchimp.com/3.0/lists/2cc161e6ad";  //list url

    const options = {
        method: "POST",
        auth: "aditya:d6f8e80b5c2f20bb7f055eb59a16fe90-us14"            //anyRandomUsername:apiKey for authentication,(mailchimp convention)
    }

    const request =  https.request(url,options,function(response){      //https request function to send response
        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/faliure.html");
        }
        // response.on("data",function(data){                              //extracting data from response
        //     console.log(JSON.parse(data));                              //converting hexadecimal to json
        // })
    });

    request.write(jsonData);                                            //writing out jsonData to the data format to be sent using https.request function
    request.end();              //end of conversation
})

app.post("/faliure",function(req,res){
    res.redirect("/");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,function(){
    console.log(`Server is running on port ${PORT}.`);
});
// Api key
// d6f8e80b5c2f20bb7f055eb59a16fe90-us14
// list id
// 2cc161e6ad