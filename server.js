const express = require("express")
const db = require("better-sqlite3")("InstaShopping.db")
db.pragma("journal_mode = WAL")
const app = express()

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: false}))
app.use(express.static("public"))

app.use(function (req, res, next) {
    res.locals.errors = []
    next()
})

app.get("/", (req, res) => {
    res.render("homepage")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.post("/register", (req, res) => {
    const errors = []

    if (typeof req.body.username !== "string") req.body.username = ""
    if (typeof req.body.password !== "string") req.body.password = ""

    req.body.username = req.body.username.trim()

    if(!req.body.username) errors.push("You must provide a username.")
    if(req.body.username && req.body.username.length<3) errors.push("Username must be atleast 3 characters.")
    if(req.body.username && req.body.username.length>12) errors.push("Username cannot be more than 12 characters.")
    if(req.body.username && !req.body.username.match(/^[a-zA-Z0-9]+$/))errors.push("Username can only contain letters and numbers.")
    
    if(!req.body.password) errors.push("You must provide a Password.")
    if(req.body.password && req.body.password.length<8) errors.push("Password must be atleast 8 characters.")
    if(req.body.password && req.body.password.length>70) errors.push("Password cannot be more than 70 characters.")    
    
    if(errors.length) {
        return res.render("homepage", {errors})
    } 
    
    // save the new user into a database


    // log the user in by giving them a cookie


})

app.listen(3000)

// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   name: String,
//   price: Number,
//   supermarket: String,
//   availability: Boolean
// });

// const Product = mongoose.model('Product', productSchema);
