import {Nodo} from './ArbolAST/Nodo'
//import {auxNodo} from './AuxNodo'
class auxNodo{

    
    auxNombre:string;
    auxTipo:string;
    constructor(auxTipo1:string, auxNombre1:string){
        this.auxNombre=auxNombre1;
        this.auxTipo=auxTipo1;
    }

}
var listaNodoClase:Array<Nodo>;
var listaNodoAux:Array<auxNodo>=[];
var listaNodoAux2:Array<auxNodo>=[];
var resultado="";
export default class CopiaClase{

    nMetodos:number;
    nFunciones:number;
    nombreClase:string;
    existeCopia:boolean;

    constructor(){
        this.nFunciones=0;
        this.nMetodos=0;
        this.nombreClase="";
        this.existeCopia=true;
    }
    
    
    
    
    encontrarClases(aux:Nodo, aux2:Nodo){
        listaNodoAux=[];
        listaNodoAux2=[];   
        this.existeCopia=true;
        for (let i = 0; i < aux.listaIns.length; i++){
            // look for the entry with a matching `code` value
            if (aux.listaIns[i].tipo1 == "Clase"){
             
               // console.log("HOLA PERRO"+aux.listaIns[i].tipo1+"   "+ aux.listaIns[i].nombre1);

                listaNodoAux.push(new auxNodo(aux.listaIns[i].tipo1,aux.listaIns[i].nombre1));
                this.encontrarMF(aux.listaIns[i]);
            }
          }

          for (let i = 0; i < aux2.listaIns.length; i++){
            // look for the entry with a matching `code` value
            if (aux2.listaIns[i].tipo1 == "Clase"){
               // we found it
              // obj[i].name is the matched result
                listaNodoAux2.push(new auxNodo(aux2.listaIns[i].tipo1,aux2.listaIns[i].nombre1));
                this.encontrarMF2(aux2.listaIns[i]);
            }
          }

          if(listaNodoAux.length==listaNodoAux2.length){
              this.nombreClase=listaNodoAux[0].auxNombre;
            for(let i =0;i<listaNodoAux.length;i++){
                //if(listaNodoAux2[i]!=null){
                  for(let j=0;j<listaNodoAux2.length;j++){
                    if(JSON.stringify(listaNodoAux[i])==JSON.stringify(listaNodoAux2[j])){
                      if(listaNodoAux[i].auxTipo=="Metodo"){
                          this.existeCopia=true;
                          this.nMetodos=this.nMetodos+1;
                      }
                      if(listaNodoAux[i].auxTipo=="Funcion"){
                          this.existeCopia=true;
                          this.nFunciones=this.nFunciones+1;
                      }
                      if(listaNodoAux[i].auxTipo=="Main"){
                          this.existeCopia=true;
                          this.nMetodos=this.nMetodos+1;
                      }
                  }else{
                      //this.existeCopia=false;
                      //break;
                  }
                  }
                    
                  if(this.nMetodos==0 && this.nFunciones==0){
                    this.existeCopia=false;
                  }
                }

           // }
          }else{
            this.existeCopia=false;
          }

          if(this.existeCopia){
            resultado = "Si hay copia"+"\n Nombre de la clase: "+this.nombreClase+"\n Cantidad de Funciones: "+this.nFunciones.toString()+"\n Cantidad de Metodos: "+ this.nMetodos
          return resultado;
        }else{
            resultado ="No existe Copia";
            return resultado;
          }
            
    }

    encontrarMF(aux:Nodo){
        for (var i = 0; i < aux.listaIns.length; i++){
            // look for the entry with a matching `code` value
            if (aux.listaIns[i].tipo1 == "Main" ||aux.listaIns[i].tipo1 == "Funcion" ||aux.listaIns[i].tipo1 == "Metodo"){
               // we found it
              // obj[i].name is the matched result
                listaNodoAux.push(new auxNodo(aux.listaIns[i].tipo1,aux.listaIns[i].nombre1));

            }
          }
    }

    encontrarMF2(aux:Nodo){
        for (var i = 0; i < aux.listaIns.length; i++){
            // look for the entry with a matching `code` value
            if (aux.listaIns[i].tipo1 == "Main" ||aux.listaIns[i].tipo1 == "Funcion" ||aux.listaIns[i].tipo1 == "Metodo"){
               // we found it
              // obj[i].name is the matched result
                listaNodoAux2.push(new auxNodo(aux.listaIns[i].tipo1,aux.listaIns[i].nombre1));

            }
          }
    }



}
