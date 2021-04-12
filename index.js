const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
 
var sqlConnection = mysql.createConnection({
    host: 'fintechsg08.mysql.database.azure.com',
    user: 'fintechlab@fintechsg08',
    password: 'FinTechSG2021',
    database: 'nusmoneygroup5',
    port: '3306',
    multipleStatements: true
})

sqlConnection.connect((err) => {
    if (!err)
    console.log('DB Connection Succeeded')
    else
    console.log('DB connection failed \n Error: ' + JSON.stringify(err, undefined, 2));
})

app.listen(3000,()=> console.log('Express Server is running at port number : 3000'));

//GET an entry based on Wallet ID
app.get('/wallet/id=:id', (req ,res)=>{
    sqlConnection.query('SELECT * from wallet where id = ?',[req.params.id], (err, rows, fields)=> {
        if (!err)
        res.send(rows);
        else
        console.log(err);
    })
});
//Delete a Transaction based on ID
app.delete('/transaction/delete/id=:id', (req ,res)=>{
    sqlConnection.query('DELETE from transaction where wallet_id = ?',[req.params.id], (err, rows, fields)=> {
        if (!err)
        res.send('Delete Successfully.');
        else
        console.log(err);
    })
});
//Delete a Transaction based on Category
app.delete('/transaction/delete/category=:category', (req ,res)=>{
    sqlConnection.query('DELETE from transaction where category = ?',[req.params.category], (err, rows, fields)=> {
        if (!err)
        res.send('Delete Successfully.');
        else
        console.log(err);
    })
});
//Create a new Transaction
app.post('/transaction/add', (req, res) => {
    var sql = "INSERT INTO transaction SET ?";
    var data = req.body;
    sqlConnection.query(sql, data, (err, rows, fields) => {
        if(!err) 
        res.send("Transaction successfully added");
        else
        res.send(err);
    });
});

//Update Parent Table
app.put('/update/parent',(req,res)=>{
    var sql = "Update parent SET user_name = ?, email = ?, mobile = ?, fb_id = ?, google_acc = ?, password = ? where id = ?";
    
    sqlConnection.query(sql,[req.params.user_name, req.params.email, req.params.mobile, req.params.fb_id, req.params.google_acc,req.params.password, req.params.id], (err, rows, fields) => {
        if (!err)
        res.send(rows);
        else
        res.send(err);
    });
})