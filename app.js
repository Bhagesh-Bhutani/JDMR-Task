const express=require('express');
const app=express();
const path=require('path')

app.use(express.urlencoded({extended : true}));
app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))

const {Sequelize}=require('sequelize')

let sequelize=new Sequelize('postgres://postgres:bhagesh@localhost:5432/users')

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


User.sync().then(()=>{app.listen(3000,(req,res)=>{
    console.log("Server running at http://localhost:3000")
}
)});