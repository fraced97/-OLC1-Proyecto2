export default class Errores{
    fila:number;
    columna:number;
    TipoError:string;
    Descripcion:string;
    constructor(fila:number,columna:number,TipoError:string,Descripcion:string){
        this.fila=fila;
        this.columna=columna;
        this.TipoError=TipoError;
        this.Descripcion=Descripcion;
    }

}