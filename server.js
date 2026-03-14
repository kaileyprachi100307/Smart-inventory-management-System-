const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "praheeka@1037",
    database: "inventorydb"
});

db.connect(err => {
    if(err){
        console.log("Database connection failed:" + err.message);
    } else {
        console.log("Connected to MySQL");
    }
});

app.get("/products", (req,res)=>{
    db.query("SELECT * FROM products",(err,result)=>{
        if(err) throw err;
        res.json(result);
    });
});

app.post("/add-product",(req,res)=>{

    const {name, quantity} = req.body;

    if(!name || quantity < 0){
        return res.status(400).send("Invalid input");
    }

    db.query(
        "INSERT INTO products (name, quantity) VALUES (?,?)",
        [name, quantity],
        (err,result)=>{
            if(err) throw err;
            res.send("Product added");
        }
    );
});

app.delete("/delete-product/:id",(req,res)=>{
    const id = req.params.id;

    db.query(
        "DELETE FROM products WHERE id=?",
        [id],
        (err,result)=>{
            if(err) throw err;
            res.send("Product deleted");
        }
    );
});

app.listen(3000,()=>{
    console.log("Server running on port 3000");
});