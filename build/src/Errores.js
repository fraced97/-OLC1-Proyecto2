"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Errores {
    constructor(fila, columna, TipoError, Descripcion) {
        this.fila = fila;
        this.columna = columna;
        this.TipoError = TipoError;
        this.Descripcion = Descripcion;
    }
}
exports.default = Errores;
