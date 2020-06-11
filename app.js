const express=require('express');
var serveStatic = require('serve-static')
const app=express();
const path=require('path')

app.use(express.urlencoded({extended : true}));
app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))
app.use(serveStatic(path.join(__dirname, 'dist')))

var port = process.env.PORT || 8080;

app.set('view engine', 'ejs');

const {Sequelize}=require('sequelize')

sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true
    }
});


const User=sequelize.define('user',{
    data : {
        type: Sequelize.STRING
    }
})

app.get('/',(req,res)=>{
    res.render('index.html')
})

app.post('/',(req,res)=>{
    User.create({
        data : req.body.inputdata
    }).then((user)=>{
        console.log(user);
        console.log("Submitted!");
        res.send(200);
    }).catch((err)=>{
        console.log(err)
        res.send(400);
    })
})


User.sync().then(()=>{app.listen(port,(req,res)=>{
    console.log("Server running at http://localhost:"+port)
}
)});