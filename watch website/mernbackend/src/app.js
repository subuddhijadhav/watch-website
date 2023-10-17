require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
require("./db/conn");
const Register = require("./models/register");
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
res.render("index")
});

app.get("/login",(req,res) => {
    res.render("login")
})

// creating a new user in db
app.post("/login", async (req,res) => {
    try{
        const action = req.body.action;
        if(action === "login") {
            const email = req.body.mail;
            const password = req.body.pwd;

            const useremail = await Register.findOne({email:email});
            const isMatch = await bcrypt.compare(password, useremail.password);

            const token = await useremail.generateAuthToken();
            console.log(`login token part is ${token}`);
            
            if(isMatch) {
                res.status(201).render("index");
            }else {
                res.send("invalid Credentials");
            }

        }
        else {
            const registerUser = new Register({
                name : req.body.name,
                phone : req.body.phone,
                email : req.body.email,
                password : req.body.password
            })

            console.log(`success part is ${registerUser}`);

            const token = await registerUser.generateAuthToken();
            console.log(`register token part is ${token}`);

            const registered = await registerUser.save();
            res.status(201).render("index");
        }
        
    }catch (error) {
        res.status(400).send(error)
    }
})

app.listen(port, () => {
    console.log(`server is running at port ${port}`);
})



