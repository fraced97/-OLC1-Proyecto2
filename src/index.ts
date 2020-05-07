import  express from "express";
const cors = require ("cors");
import * as bodyParser from "body-parser";
import { crearJson } from "./Gramatica/practica2";

//import { Errores } from "./JavaAST/Errores";

var app=express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/Calcular/', function (req, res) {
    var entrada=req.body.text;
    console.log("@@@@@@@@@@@@"+entrada);
    var resultado= crearJson(entrada);
    console.log("ACMP1T    "+resultado);
    //Errores.clear();
    res.json(resultado);
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

