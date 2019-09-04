let express = require('express');
let bodyParser = require("body-parser");
let cors = require('cors');
const port = 3000
let app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(express.static(__dirname + "/public"));
app.use(cors())

let cc_test = function(str){
    const regex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}(?:2131|1800|35\d{3})\d{11})$/gm;
    console.log('cc test', str)
    return regex.test(str);
}
// Select
app.get("/", function(req, res){
  console.log(req.body)
  res.status(200).json({'body': req.body})
})

app.post("/transaction", function(req, res){
  console.log(req.body)
    let message;
  let creditCard = req.body.creditCard.number
  let result = cc_test(creditCard)
    if(result){
        message = 'Payment processes successfully';
        creditCard = creditCard.substr(creditCard.length - 4)
    }else{
        message = 'Check your card number and try again'
    }
  setTimeout(()=>{
    res.status(202).json({result, message, creditCard})
  }, 2000)

});

app.post('/store', function (req, res) {
    console.log(req.body)
    if(req.body.storeId !== ''){
        setTimeout(()=>{
            res
                .status(200)
                .json({
                    published: true,
                    storeId: req.body.storeId,
                    location:{
                        address: ' 123 Street',
                        tax: 725,
                    }
                })
        }, 2000)
    }else{
        res.status(400).json({'message': 'invalid store id'})
    }

})

app.listen(port, ()=> {
  console.log("Server running on: " + port +"!")
})
