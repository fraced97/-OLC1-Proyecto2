"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Nodo {
    constructor(tipo, nombre) {
        this.listaIns = [];
        this.tipo1 = tipo;
        this.nombre1 = nombre;
    }
    encontrarNodo(listaNodo) {
        i: Number;
        for (let i = 0; i < listaNodo.length; i++) {
            this.listaIns.push(listaNodo[i]);
        }
    }
}
exports.Nodo = Nodo;
