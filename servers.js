const {connectdb} = require('./connect');
const {information} = require('./schema');
const information_controller = require('./controller');
const cors = require('cors')
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


connectdb()
    .then(()=>{
        console.log("database connected successfullyy..!!!!!")
    })
    .catch((err)=>{
        console.log(err)
    });


app.get('/api/information/:bid', information_controller.getinformation);

app.get('/api/information',information_controller.getallbooks);
    
const port = 9000;
app.listen(port,()=>{
    console.log(`listening at port ${port}`);
})
