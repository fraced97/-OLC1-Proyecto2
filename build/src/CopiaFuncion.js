"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Nodo_1 = require("./ArbolAST/Nodo");
class Parametros {
    constructor(TipoParametro, NombreParametro) {
        this.NombreFuncion = NombreParametro;
        this.TipoFuncion = TipoParametro;
        this.listaNodoAux = [];
    }
}
//var listaNodoAux:Array<Parametros>=[];
//var listaNodoAux2:Array<Parametros>=[];
var NodoFM = new Nodo_1.Nodo("", "");
//var listaParametros:Array<auxNodo>=[];
var NombreClase1 = "";
var NombreClase2 = "";
var CopiaFM = true;
var listaAuxPara = [];
var listaAuxPara2 = [];
//var listaTipo:Array<string>=[];
//var listaId:Array<string>=[];
var Resultado = "";
var ResultadoParametro = "";
class copiaFuncion {
    encontrarMetodo(aux, aux2) {
        Resultado = "";
        CopiaFM = true;
        for (let i = 0; i < aux.listaIns.length; i++) {
            if (aux.listaIns[i].tipo1 == "Clase") {
                NombreClase1 = aux.listaIns[i].nombre1;
                //listaNodoAux.push(new auxNodo(aux.listaIns[i].tipo1,aux.listaIns[i].nombre1));
                this.encontrarMF(aux.listaIns[i]);
            }
        }
        for (let i = 0; i < aux2.listaIns.length; i++) {
            if (aux2.listaIns[i].tipo1 == "Clase") {
                NombreClase2 = aux2.listaIns[i].nombre1;
                //listaNodoAux2.push(new auxNodo(aux2.listaIns[i].tipo1,aux2.listaIns[i].nombre1));
                this.encontrarMF2(aux2.listaIns[i]);
            }
        }
        if (NombreClase1 == NombreClase2) {
            // if(listaAuxPara.length==listaAuxPara2.length){
            for (let i = 0; i < listaAuxPara.length; i++) {
                for (let j = 0; j < listaAuxPara2.length; j++) {
                    //if(listaAuxPara2[i]!=null){
                    if (JSON.stringify(listaAuxPara[i]) == JSON.stringify(listaAuxPara2[j])) {
                        //listaTipo.push(listaAuxPara[i].TipoFuncion);
                        //listaId.push(listaAuxPara[i].NombreFuncion);
                        ResultadoParametro = "";
                        for (let j = 0; j < listaAuxPara[i].listaNodoAux.length; j++) {
                            ResultadoParametro = ResultadoParametro + " " + listaAuxPara[i].listaNodoAux[j];
                        }
                        CopiaFM = true;
                        Resultado = Resultado + "Tipo: " + listaAuxPara[i].TipoFuncion + "\nNombre: " + listaAuxPara[i].NombreFuncion + "\n Parametros: " + ResultadoParametro + "\n";
                    }
                    else {
                        //CopiaFM=false;
                    }
                    //}
                }
                if (Resultado == "") {
                    CopiaFM = false;
                }
            }
            Resultado = Resultado + " Nombre Clase: " + NombreClase1;
            //}else{
            //    CopiaFM=false;
            //}
        }
        else {
            CopiaFM = false;
        }
        if (CopiaFM == false) {
            Resultado = "No existe copia en las Funciones o Metodos";
        }
        return Resultado;
    }
    encontrarMF(aux) {
        listaAuxPara = [];
        for (var i = 0; i < aux.listaIns.length; i++) {
            if (aux.listaIns[i].tipo1 == "Main" || aux.listaIns[i].tipo1 == "Funcion" || aux.listaIns[i].tipo1 == "Metodo") {
                if (aux.listaIns[i].tipo1 == "Funcion") {
                    var TipoFuncion = "";
                    var NombreFuncion = "";
                    if (aux.listaIns[i].nombre1.startsWith("String")) {
                        TipoFuncion = "String";
                        NombreFuncion = aux.listaIns[i].nombre1.substring(6);
                    }
                    else if (aux.listaIns[i].nombre1.startsWith("int")) {
                        TipoFuncion = "int";
                        NombreFuncion = aux.listaIns[i].nombre1.substring(3);
                    }
                    else if (aux.listaIns[i].nombre1.startsWith("boolean")) {
                        TipoFuncion = "boolean";
                        NombreFuncion = aux.listaIns[i].nombre1.substring(7);
                    }
                    else if (aux.listaIns[i].nombre1.startsWith("char")) {
                        TipoFuncion = "char";
                        NombreFuncion = aux.listaIns[i].nombre1.substring(4);
                    }
                    else if (aux.listaIns[i].nombre1.startsWith("double")) {
                        TipoFuncion = "double";
                        NombreFuncion = aux.listaIns[i].nombre1.substring(6);
                    }
                    let auxParametros = new Parametros(TipoFuncion, NombreFuncion);
                    for (var j = 0; j < aux.listaIns[i].listaIns.length; j++) {
                        if (aux.listaIns[i].listaIns[j].tipo1 == "Parametros") {
                            auxParametros.listaNodoAux.push(aux.listaIns[i].listaIns[j].nombre1);
                        }
                    }
                    listaAuxPara.push(auxParametros);
                }
                if (aux.listaIns[i].tipo1 == "Metodo" || aux.listaIns[i].tipo1 == "Main") {
                    var TipoFuncion = "";
                    var NombreFuncion = "";
                    TipoFuncion = "void";
                    NombreFuncion = aux.listaIns[i].nombre1.substring(4);
                    let auxParametros = new Parametros(TipoFuncion, NombreFuncion);
                    for (var j = 0; j < aux.listaIns[i].listaIns.length; j++) {
                        if (aux.listaIns[i].listaIns[j].tipo1 == "Parametros") {
                            auxParametros.listaNodoAux.push(aux.listaIns[i].listaIns[j].nombre1);
                        }
                    }
                    listaAuxPara.push(auxParametros);
                }
            }
        }
    }
    encontrarMF2(aux) {
        listaAuxPara2 = [];
        for (var i = 0; i < aux.listaIns.length; i++) {
            if (aux.listaIns[i].tipo1 == "Main" || aux.listaIns[i].tipo1 == "Funcion" || aux.listaIns[i].tipo1 == "Metodo") {
                if (aux.listaIns[i].tipo1 == "Funcion") {
                    var TipoFuncion = "";
                    var NombreFuncion = "";
                    if (aux.listaIns[i].nombre1.startsWith("String")) {
                        TipoFuncion = "String";
                        NombreFuncion = aux.listaIns[i].nombre1.substring(6);
                    }
                    else if (aux.listaIns[i].nombre1.startsWith("int")) {
                        TipoFuncion = "int";
                        NombreFuncion = aux.listaIns[i].nombre1.substring(3);
                    }
                    else if (aux.listaIns[i].nombre1.startsWith("boolean")) {
                        TipoFuncion = "boolean";
                        NombreFuncion = aux.listaIns[i].nombre1.substring(7);
                    }
                    else if (aux.listaIns[i].nombre1.startsWith("char")) {
                        TipoFuncion = "char";
                        NombreFuncion = aux.listaIns[i].nombre1.substring(4);
                    }
                    else if (aux.listaIns[i].nombre1.startsWith("double")) {
                        TipoFuncion = "double";
                        NombreFuncion = aux.listaIns[i].nombre1.substring(6);
                    }
                    let auxParametros = new Parametros(TipoFuncion, NombreFuncion);
                    for (var j = 0; j < aux.listaIns[i].listaIns.length; j++) {
                        if (aux.listaIns[i].listaIns[j].tipo1 == "Parametros") {
                            auxParametros.listaNodoAux.push(aux.listaIns[i].listaIns[j].nombre1);
                        }
                    }
                    listaAuxPara2.push(auxParametros);
                }
                if (aux.listaIns[i].tipo1 == "Metodo" || aux.listaIns[i].tipo1 == "Main") {
                    var TipoFuncion = "";
                    var NombreFuncion = "";
                    TipoFuncion = "void";
                    NombreFuncion = aux.listaIns[i].nombre1.substring(4);
                    let auxParametros = new Parametros(TipoFuncion, NombreFuncion);
                    for (var j = 0; j < aux.listaIns[i].listaIns.length; j++) {
                        if (aux.listaIns[i].listaIns[j].tipo1 == "Parametros") {
                            auxParametros.listaNodoAux.push(aux.listaIns[i].listaIns[j].nombre1);
                        }
                    }
                    listaAuxPara2.push(auxParametros);
                }
            }
        }
    }
}
exports.default = copiaFuncion;
