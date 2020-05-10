"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parser = require("./gramatica").parser;
function prueba(input) {
    return parser.parse(input);
}
function obtenerNodo(input) {
    return parser.parse(input);
}
exports.obtenerNodo = obtenerNodo;
function crearJson(texto) {
    var hola = prueba(texto);
    //console.log(hola);
    var jsonGramatica = (JSON.stringify(hola, null, 2));
    for (let i = 0; i < 1000; i++) {
        jsonGramatica = jsonGramatica.replace('tipo1', 'id":' + '"' + i.toString() + '",' + '\n \t "tipo');
    }
    console.log(jsonGramatica.split("nombre1").join("text").split("listaIns").join("children"));
    var retornarJson = jsonGramatica.split("nombre1").join("text").split("listaIns").join("children");
    return retornarJson;
}
exports.crearJson = crearJson;
