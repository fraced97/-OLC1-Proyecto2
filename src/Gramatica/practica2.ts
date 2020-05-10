var parser = require("./gramatica").parser;

function prueba(input:string){
    return parser.parse(input);

}

export function obtenerNodo(input:string){
    return parser.parse(input);

}


export function crearJson(texto:string){
    var hola = prueba(texto);
//console.log(hola);

var jsonGramatica =(JSON.stringify(hola,null,2));



for(let i = 0; i < 1000; i++){

jsonGramatica = jsonGramatica.replace('tipo1','id":'+'"'+i.toString()+'",'+'\n \t "tipo');
}

console.log(jsonGramatica.split("nombre1").join("text").split("listaIns").join("children"));

var retornarJson = jsonGramatica.split("nombre1").join("text").split("listaIns").join("children");

return retornarJson;

}