import  express from "express";
const cors = require ("cors");
import * as bodyParser from "body-parser";
import { crearJson } from "./Gramatica/practica2";
import {obtenerNodo}  from "./Gramatica/practica2";
import CopiaClase  from "../src/CopiaClase";
import {Nodo}  from "../src/ArbolAST/Nodo";
import CopiaFuncion  from "../src/CopiaFuncion";
import CopiaVariable  from "../src/CopiaVariable";
//import { Errores } from "./JavaAST/Errores";

var app=express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

var NodoPOriginal:Nodo;
var NodoPCopia:Nodo;
app.post('/Calcular/', function (req, res) {
    var entrada=req.body.text;
    //console.log("@@@@@@@@@@@@"+entrada);
    var resultado= crearJson(entrada);
    NodoPOriginal=obtenerNodo(entrada);
    //console.log("ACMP1T    "+resultado);
    //Errores.clear();
    res.send(resultado);
});

app.post('/CajaTxt2/', function (req, res) {
    var entrada=req.body.text;
    
    var resultado= crearJson(entrada);
    //NodoPCopia=obtenerNodo(entrada);
    //Errores.clear();
    res.send(resultado);
});

app.post('/CajaTxt2/', function (req, res) {
    var entrada=req.body.text;
    
    var resultado= crearJson(entrada);
   
    //Errores.clear();
    res.send(resultado);
});

app.post('/CajaTxt21/', function (req, res) {
    var entrada=req.body.text;
    var resultado;
    //var resultado= crearJson(entrada);
    if(NodoPOriginal!=null){
        NodoPCopia=obtenerNodo(entrada);
        //console.log(NodoPCopia.nombre1+"PROBANDO")
        var aux = new CopiaClase();
        resultado= aux.encontrarClases(NodoPOriginal,NodoPCopia);
        NodoPCopia= new Nodo("","");
        
    }else{
        resultado="Envie el Archivo Principal"
    }
    
    //Errores.clear();
    res.send(resultado);
});



app.post('/CajaTxt22/', function (req, res) {
    var entrada=req.body.text;
    var resultado;
    //var resultado= crearJson(entrada);
    if(NodoPOriginal!=null){
        NodoPCopia=obtenerNodo(entrada);
        //console.log(NodoPCopia.nombre1+"PROBANDO")
        var aux = new CopiaFuncion();
        resultado= aux.encontrarMetodo(NodoPOriginal,NodoPCopia);
        NodoPCopia= new Nodo("","");
        
    }else{
        resultado="Envie el Archivo Principal"
    }
    
    //Errores.clear();
    res.send(resultado);
});



app.post('/CajaTxt23/', function (req, res) {
    var entrada=req.body.text;
    var resultado;
    //var resultado= crearJson(entrada);
    if(NodoPOriginal!=null){
        NodoPCopia=obtenerNodo(entrada);
        //console.log(NodoPCopia.nombre1+"PROBANDO")
        var aux = new CopiaVariable();
        resultado= aux.encontrarVariable(NodoPOriginal,NodoPCopia);
        NodoPCopia= new Nodo("","");
        
    }else{
        resultado="Envie el Archivo Principal"
    }
    
    //Errores.clear();
    res.send(resultado);
});


/*---------------------------------------------------------------*/
var server = app.listen(8080, function () {
    console.log('Servidor escuchando en puerto 8080...');
});

/*---------------------------------------------------------------*/
/*function parser(texto:string) {
    try {
        return gramatica.parse(texto);
    } catch (e) {
        return "Error en compilacion de Entrada: "+ e.toString();
    }
}*/

