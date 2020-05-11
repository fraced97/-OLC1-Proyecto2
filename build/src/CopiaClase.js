"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import {auxNodo} from './AuxNodo'
class auxNodo {
    constructor(auxTipo1, auxNombre1) {
        this.auxNombre = auxNombre1;
        this.auxTipo = auxTipo1;
    }
}
var listaNodoClase;
var listaNodoAux = [];
var listaNodoAux2 = [];
var resultado = "";
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
        this.existeCopia = true;
        for (let i = 0; i < aux.listaIns.length; i++) {
            // look for the entry with a matching `code` value
            if (aux.listaIns[i].tipo1 == "Clase") {
                // console.log("HOLA PERRO"+aux.listaIns[i].tipo1+"   "+ aux.listaIns[i].nombre1);
                listaNodoAux.push(new auxNodo(aux.listaIns[i].tipo1, aux.listaIns[i].nombre1));
                this.encontrarMF(aux.listaIns[i]);
            }
        }
        for (let i = 0; i < aux2.listaIns.length; i++) {
            // look for the entry with a matching `code` value
            if (aux2.listaIns[i].tipo1 == "Clase") {
                // we found it
                // obj[i].name is the matched result
                listaNodoAux2.push(new auxNodo(aux2.listaIns[i].tipo1, aux2.listaIns[i].nombre1));
                this.encontrarMF2(aux2.listaIns[i]);
            }
        }
        if (listaNodoAux.length == listaNodoAux2.length) {
            if (listaNodoAux[0].auxNombre == listaNodoAux2[0].auxNombre) {
                this.nombreClase = listaNodoAux[0].auxNombre;
                for (let i = 1; i < listaNodoAux.length; i++) {
                    //if(listaNodoAux2[i]!=null){
                    let j;
                    for (j = 1; j < listaNodoAux2.length; j++) {
                        if (JSON.stringify(listaNodoAux[i]) == JSON.stringify(listaNodoAux2[j])) {
                            if (listaNodoAux[i].auxTipo == "Metodo") {
                                this.existeCopia = true;
                                this.nMetodos = this.nMetodos + 1;
                                break;
                            }
                            if (listaNodoAux[i].auxTipo == "Funcion") {
                                this.existeCopia = true;
                                this.nFunciones = this.nFunciones + 1;
                                break;
                            }
                            if (listaNodoAux[i].auxTipo == "Main") {
                                this.existeCopia = true;
                                this.nMetodos = this.nMetodos + 1;
                                break;
                            }
                        }
                        else {
                            //this.existeCopia=false;
                            //break;
                        }
                    }
                    if (j == listaNodoAux2.length) {
                        this.existeCopia = false;
                        break;
                    }
                    if (this.nMetodos == 0 && this.nFunciones == 0) {
                        this.existeCopia = false;
                    }
                }
            }
            else {
                this.existeCopia = false;
            }
            // }
        }
        else {
            this.existeCopia = false;
        }
        if (this.existeCopia) {
            resultado = "Si hay copia" + "\n Nombre de la clase: " + this.nombreClase + "\n Cantidad de Funciones: " + this.nFunciones.toString() + "\n Cantidad de Metodos: " + this.nMetodos;
            return resultado;
        }
        else {
            resultado = "No existe Copia";
            return resultado;
        }
    }
    encontrarMF(aux) {
        for (var i = 0; i < aux.listaIns.length; i++) {
            // look for the entry with a matching `code` value
            if (aux.listaIns[i].tipo1 == "Main" || aux.listaIns[i].tipo1 == "Funcion" || aux.listaIns[i].tipo1 == "Metodo") {
                // we found it
                // obj[i].name is the matched result
                listaNodoAux.push(new auxNodo(aux.listaIns[i].tipo1, aux.listaIns[i].nombre1));
            }
        }
    }
    encontrarMF2(aux) {
        for (var i = 0; i < aux.listaIns.length; i++) {
            // look for the entry with a matching `code` value
            if (aux.listaIns[i].tipo1 == "Main" || aux.listaIns[i].tipo1 == "Funcion" || aux.listaIns[i].tipo1 == "Metodo") {
                // we found it
                // obj[i].name is the matched result
                listaNodoAux2.push(new auxNodo(aux.listaIns[i].tipo1, aux.listaIns[i].nombre1));
            }
        }
    }
}
exports.default = CopiaClase;
