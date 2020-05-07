var parser = require("./gramatica").parser;

function prueba(input){
    return parser.parse(input);

}

function crearJson(){
    var hola = prueba(" import _cl3ases; \n import que_pedo ;\nclass token{boolean metodo1(){\n metodo32(hola,fdaf); quehace=2+32; if(fsd==87){}else if(24==jp){}while(34<=hola){\n switch(clave>jj){case 4: return ooooo;}}return ldl;}\n void main(){\n double contador=69.42;}}");
//console.log(hola);

var jsonGramatica =(JSON.stringify(hola,null,2));

//console.log(puto.split("nombre1").join("text").split("tipo1").join("id").split("listaIns").join("children"));

for(i = 0; i < 1000; i++){

jsonGramatica = jsonGramatica.replace('tipo1','id":'+'"'+i.toString()+'",'+'\n \t "tipo');
}

console.log(jsonGramatica.split("nombre1").join("text").split("listaIns").join("children"));

var retornarJson = jsonGramatica.split("nombre1").join("text").split("listaIns").join("children");

return retornarJson;
}
crearJson();
//prueba2(hola);
/*function prueba2(aux2){
    var i;
    //if(aux2!=undefined){
        console.log("Nombre "+aux2.nombre1+" , "+"Tipo "+aux2.tipo1+"-----\n");
        
        for(i = 0; i < aux2.listaIns.length; i++){
            
            prueba2(aux2.listaIns[i])
        }
    //}
    
}*/

