const express = require('express');
const app = express();
const MongoClient = require("mongodb").MongoClient;
//link responsable que se encarga de la conexion a la base de datos
const url = "mongodb+srv://rootdavid:CejeRsRXLo5TlnVp@clusterazure.l92gg.mongodb.net/?retryWrites=true&w=majority";
//conexion a la base ded atos funcional
const base = "mibase";

//crear
app.post("/crearClassRoom", (req, res) => {
    var Class = req.param('class');
    var Order = parseInt(req.param('order'));
    var numberOfStudents = parseInt(req.param('numberofstudents'));
    var active = true;
    var students = req.param('liststudents');
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(base);
        var myobj = {class:Class,order:Order,numberOfStudents:numberOfStudents,active:active,students:students};
        dbo.collection("ClassRoom").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("se inserto un objeto");
            db.close();
        });
    });
});
app.post("/crearStudent", (req, res) => {
    var name = req.param('name');
    var age = parseInt(req.param('age'));
    var active = false;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(base);
        var myobj = { name: name, age: age, active: active };
        dbo.collection("Student").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("se inserto un objeto");
            db.close();
        });
    });
});
//listar
app.post("/listarClassRoom", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(base);
        dbo.collection("ClassRoom").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result)
            db.close();
        });
    });
});

app.post("/listarStudent", (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(base);
        dbo.collection("Student").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result)
            db.close();
        });
    });
});

//actualizar
app.post("/actualizarClassRoom", (req, res) => {
    var ClassActualizar=req.param('classActualizar');
    var Class = req.param('class');
    var Order = parseInt(req.param('order'));
    var numberOfStudents = parseInt(req.param('numberofstudents'));
    var active = true;
    var students = req.param('liststudents');
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(base);
        var myquery = { class: ClassActualizar};
        var newvalues = { $set: {class:Class,order:Order,numberOfStudents:numberOfStudents,active:active,students:students } };
        dbo.collection("ClassRoom").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
          db.close();
        });
      });
});

app.post("/actualizarStudent", (req, res) => {
    var nameActualizar=req.param('nameactualizar')
    var name = req.param('name');
    var age = parseInt(req.param('age'));
    var active = false;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(base);
        var myquery = { name:nameActualizar };
        var newvalues = { $set: { name: name, age: age, active: active } };
        dbo.collection("Student").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
          db.close();
        });
      });
});
//eliminar
app.post("/eliminar", (req, res) => {
    var eliminarClass=req.param('class');
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(base);
        var myquery = { class:eliminarClass };
        dbo.collection("ClassRoom").deleteOne(myquery, function(err, obj) {
          if (err) throw err;
          console.log("1 document deleted");
          db.close();
        });
      });
});

app.post("/eliminar", (req, res) => {
    var eliminarName=req.param('eliminarname');
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(base);
        var myquery = { name:eliminarName };
        dbo.collection("Student").deleteOne(myquery, function(err, obj) {
          if (err) throw err;
          console.log("1 document deleted");
          db.close();
        });
      });
});

app.get("/operaciones", (req, res) => {
    res.sendFile(__dirname + "/paginaOperaciones.html");
});

app.get("/sumar", (req, res) => {
    res.sendFile(__dirname + "/sumaEtiquetas.html");
});

app.get("/registroEstudiantes",(req,res)=>{
    res.sendFile(__dirname+"/regiStudent.html");
});

app.listen(3000, () => {
    console.log("servidor corriendo");
});