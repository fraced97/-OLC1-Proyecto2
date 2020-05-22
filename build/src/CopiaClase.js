"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import {auxNodo} from './AuxNodo'
class auxNodo {
    constructor(auxTipo1, auxNombre1) {
        this.auxNombre = auxNombre1;
        this.auxTipo = auxTipo1;
        this.listaParametros = [];
    }
}
class auxClase {
    constructor(auxNombre1) {
        this.auxNombre = auxNombre1;
        this.listaMF = [];
        this.existeCopia = false;
        this.nMetodos = 0;
        this.nFunciones = 0;
    }
}
var listaNodoClase = [];
var listaNodoClase2 = [];
var listaNodoAux = [];
var listaNodoAux2 = [];
var resultado = "";
var resultadoAux = "";
class CopiaClase {
    constructor() {
        this.nFunciones = 0;
        this.nMetodos = 0;
        this.nombreClase = "";
        this.existeCopia = true;
    }
    encontrarClases(aux, aux2) {
        listaNodoAux = [];
        listaNodoAux2 = [];
        listaNodoClase = [];
        listaNodoClase2 = [];
        this.existeCopia = true;
        resultado = "";
        for (let i = 0; i < aux.listaIns.length; i++) {
            // look for the entry with a matching `code` value
            if (aux.listaIns[i].tipo1 == "Clase") {
                // console.log("HOLA PERRO"+aux.listaIns[i].tipo1+"   "+ aux.listaIns[i].nombre1);
                listaNodoClase.push(new auxClase(aux.listaIns[i].nombre1));
                //listaNodoAux.push(new auxNodo(aux.listaIns[i].tipo1,aux.listaIns[i].nombre1));
                this.encontrarMF(aux.listaIns[i]);
            }
        }
        for (let i = 0; i < aux2.listaIns.length; i++) {
            // look for the entry with a matching `code` value
            if (aux2.listaIns[i].tipo1 == "Clase") {
                // we found it
                // obj[i].name is the matched result
                //listaNodoAux2.push(new auxNodo(aux2.listaIns[i].tipo1,aux2.listaIns[i].nombre1));
                listaNodoClase2.push(new auxClase(aux2.listaIns[i].nombre1));
                this.encontrarMF2(aux2.listaIns[i]);
            }
        }
        for (let k = 0; k < listaNodoClase.length; k++) {
            for (let w = 0; w < listaNodoClase2.length; w++) {
                if (listaNodoClase[k].auxNombre == listaNodoClase2[w].auxNombre) {
                    if (listaNodoClase[k].listaMF.length == listaNodoClase2[w].listaMF.length) {
                        let q;
                        for (let y = 0; y < listaNodoClase[k].listaMF.length; y++) {
                            for (q = 0; q < listaNodoClase2[w].listaMF.length; q++) {
                                if (JSON.stringify(listaNodoClase[k].listaMF[y]) == JSON.stringify(listaNodoClase2[w].listaMF[q])) {
                                    //this.existeCopia=true;
                                    listaNodoClase[k].existeCopia = true;
                                    break;
                                }
                                else {
                                    listaNodoClase[k].existeCopia = false;
                                }
                            }
                            if (q == listaNodoClase2[w].listaMF.length) {
                                //this.existeCopia=false;
                                break;
                            }
                        }
                    }
                    else {
                        break;
                    }
                }
            }
        }
        for (let x = 0; x < listaNodoClase.length; x++) {
            if (listaNodoClase[x].existeCopia) {
                resultado = resultado + "Nombre Clase: " + listaNodoClase[x].auxNombre + "\nNumero de Funciones: " + listaNodoClase[x].nFunciones + "\nNumero de Metodos: " + listaNodoClase[x].nMetodos + "\n";
            }
        }
        if (resultado != "") {
            resultado = "Si existe Copia\n" + resultado;
        }
        else {
            resultado = "No existe Copia";
        }
        return resultado;
    }
    encontrarMF(aux) {
        this.nFunciones = 0;
        this.nMetodos = 0;
        for (var i = 0; i < aux.listaIns.length; i++) {
            if (aux.listaIns[i].tipo1 == "Main" || aux.listaIns[i].tipo1 == "Funcion" || aux.listaIns[i].tipo1 == "Metodo") {
                if (aux.listaIns[i].tipo1 == "Funcion") {
                    this.nFunciones++;
                }
                if (aux.listaIns[i].tipo1 == "Main" || aux.listaIns[i].tipo1 == "Metodo") {
                    this.nMetodos++;
                }
                listaNodoAux.push(new auxNodo(aux.listaIns[i].tipo1, aux.listaIns[i].nombre1));
                for (var j = 0; j < aux.listaIns[i].listaIns.length; j++) {
                    if (aux.listaIns[i].listaIns[j].tipo1 == "Parametros") {
                        listaNodoAux[listaNodoAux.length - 1].listaParametros.push(aux.listaIns[i].listaIns[j].nombre1);
                    }
                }
            }
        }
        listaNodoClase[listaNodoClase.length - 1].listaMF = listaNodoAux;
        listaNodoClase[listaNodoClase.length - 1].nFunciones = this.nFunciones;
        listaNodoClase[listaNodoClase.length - 1].nMetodos = this.nMetodos;
        listaNodoAux = [];
    }
    encontrarMF2(aux) {
        for (var i = 0; i < aux.listaIns.length; i++) {
            if (aux.listaIns[i].tipo1 == "Main" || aux.listaIns[i].tipo1 == "Funcion" || aux.listaIns[i].tipo1 == "Metodo") {
                listaNodoAux2.push(new auxNodo(aux.listaIns[i].tipo1, aux.listaIns[i].nombre1));
                for (var j = 0; j < aux.listaIns[i].listaIns.length; j++) {
                    if (aux.listaIns[i].listaIns[j].tipo1 == "Parametros") {
                        listaNodoAux2[listaNodoAux2.length - 1].listaParametros.push(aux.listaIns[i].listaIns[j].nombre1);
                    }
                }
            }
        }
        listaNodoClase2[listaNodoClase2.length - 1].listaMF = listaNodoAux2;
        listaNodoAux2 = [];
    }
}
exports.default = CopiaClase;
