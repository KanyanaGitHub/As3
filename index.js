
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dbConfig = require('./config/mongodb.config.js');
const Customer = require('./model/customer.js');

const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url)
    .then(()=>{
        Customer.deleteMany({},(err)=>{
            if (err){
                Process.exit();
        }
        console.log('Remove Collection of Customer')
        initCustomer();
        });
    }).catch(err=>{
        console.log('Cannot Connect to MongDB')
        process.exit();
    })
app.use(cors())
require('./routes/customer.route.js')(app);

const server = app.listen(3000, ()=>{
    let port = server.address().port
    console.log('Run at http://localhost:%s', port)
})

function initCustomer(){
    let data = [
        {
            ProductID: "004",
            ProductType: "PV",
            ProductName:"Yoimiya",
            ProductPrice: 180
        },
        {
            ProductID: "005",
            ProductType: "PV",
            ProductName:"Kokomi",
            ProductPrice: 180
        },
        {
            ProductID: "006",
            ProductType: "PV",
            ProductName:"Ayaka",
            ProductPrice: 180
        },
    ]
    for(let i=0; i<data.length; i++){
        const c = new Customer(data[i])
        c.save()
    }
    console.log("สร้างข้อมูล Product สำเร็จแล้ว")
}
