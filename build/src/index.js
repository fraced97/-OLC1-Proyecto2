"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require("cors");
const bodyParser = __importStar(require("body-parser"));
const practica2_1 = require("./Gramatica/practica2");
const practica2_2 = require("./Gramatica/practica2");
const CopiaClase_1 = __importDefault(require("../src/CopiaClase"));
const Nodo_1 = require("../src/ArbolAST/Nodo");
const CopiaFuncion_1 = __importDefault(require("../src/CopiaFuncion"));
const CopiaVariable_1 = __importDefault(require("../src/CopiaVariable"));
const Errores_1 = require("./ArbolAST/Errores");
var app = express_1.default();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
var NodoPOriginal;
var NodoPCopia;
app.post('/Calcular/', function (req, res) {
    var entrada = req.body.text;
    //console.log("@@@@@@@@@@@@"+entrada);
    var resultado;
    Errores_1.Errores.clear();
    NodoPOriginal = practica2_2.obtenerNodo(entrada);
    if (Errores_1.Errores.verificarerror() == "Se Detectaron Errores de Compilacion") {
        resultado = "Existe Errores";
        //resultado=Errores.geterror();
    }
    else {
        resultado = practica2_1.crearJson(entrada);
    }
    //console.log("ACMP1T    "+resultado);
    //Errores.clear();
    res.send(resultado);
});
app.post('/Errores/', function (req, res) {
    var entrada = req.body.text;
    var resultado = Errores_1.Errores.geterror();
    res.send(resultado);
});
app.post('/Errores2/', function (req, res) {
    var entrada = req.body.text;
    var resultado = Errores_1.Errores.geterror();
    res.send(resultado);
});
app.post('/CajaTxt2/', function (req, res) {
    var entrada = req.body.text;
    var resultado;
    Errores_1.Errores.clear();
    practica2_2.obtenerNodo(entrada);
    if (Errores_1.Errores.verificarerror() == "Se Detectaron Errores de Compilacion") {
        resultado = "Existe Errores";
        //resultado=Errores.geterror();
    }
    else {
        resultado = practica2_1.crearJson(entrada);
    }
    res.send(resultado);
});
/*app.post('/CajaTxt2/', function (req, res) {
    var entrada=req.body.text;
    
    var resultado= crearJson(entrada);
   
    //Errores.clear();
    res.send(resultado);
});*/
app.post('/CajaTxt21/', function (req, res) {
    var entrada = req.body.text;
    var resultado;
    //var resultado= crearJson(entrada);
    Errores_1.Errores.clear();
    practica2_2.obtenerNodo(entrada);
    if (NodoPOriginal != null) {
        if (Errores_1.Errores.verificarerror() == "Se Detectaron Errores de Compilacion") {
            resultado = "Existe Errores";
        }
        else {
            NodoPCopia = practica2_2.obtenerNodo(entrada);
            //console.log(NodoPCopia.nombre1+"PROBANDO")
            var aux = new CopiaClase_1.default();
            resultado = aux.encontrarClases(NodoPOriginal, NodoPCopia);
            NodoPCopia = new Nodo_1.Nodo("", "");
        }
    }
    else {
        resultado = "Envie el Archivo Principal";
    }
    //Errores.clear();
    res.send(resultado);
});
app.post('/CajaTxt22/', function (req, res) {
    var entrada = req.body.text;
    var resultado;
    //var resultado= crearJson(entrada);
    Errores_1.Errores.clear();
    practica2_2.obtenerNodo(entrada);
    if (NodoPOriginal != null) {
        if (Errores_1.Errores.verificarerror() == "Se Detectaron Errores de Compilacion") {
            resultado = "Existe Errores";
        }
        else {
            NodoPCopia = practica2_2.obtenerNodo(entrada);
            //console.log(NodoPCopia.nombre1+"PROBANDO")
            var aux = new CopiaFuncion_1.default();
            resultado = aux.encontrarMetodo(NodoPOriginal, NodoPCopia);
            NodoPCopia = new Nodo_1.Nodo("", "");
        }
    }
    else {
        resultado = "Envie el Archivo Principal";
    }
    //Errores.clear();
    res.send(resultado);
});
app.post('/CajaTxt23/', function (req, res) {
    var entrada = req.body.text;
    var resultado;
    //var resultado= crearJson(entrada);
    Errores_1.Errores.clear();
    practica2_2.obtenerNodo(entrada);
    if (NodoPOriginal != null) {
        if (Errores_1.Errores.verificarerror() == "Se Detectaron Errores de Compilacion") {
            resultado = "Existe Errores";
        }
        else {
            NodoPCopia = practica2_2.obtenerNodo(entrada);
            //console.log(NodoPCopia.nombre1+"PROBANDO")
            var aux = new CopiaVariable_1.default();
            resultado = aux.encontrarVariable(NodoPOriginal, NodoPCopia);
            NodoPCopia = new Nodo_1.Nodo("", "");
        }
    }
    else {
        resultado = "Envie el Archivo Principal";
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
