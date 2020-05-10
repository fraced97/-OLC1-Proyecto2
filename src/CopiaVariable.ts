import {Nodo} from './ArbolAST/Nodo'

class Parametros{

    
    NombreFuncion:string;
    TipoFuncion:string;
    listaNodoAux:Array<string>;
    constructor(TipoParametro:string, NombreParametro:string){
        this.NombreFuncion=NombreParametro;
        this.TipoFuncion=TipoParametro;
        this.listaNodoAux=[];
    }

}


//var listaNodoAux:Array<Parametros>=[];
//var listaNodoAux2:Array<Parametros>=[];
var NodoFM:Nodo=new Nodo("","");
//var listaParametros:Array<auxNodo>=[];
var NombreClase1:string="";
var NombreClase2:string="";
var CopiaFM:boolean=true;


var listaAuxPara:Array<Parametros>=[];
var listaAuxPara2:Array<Parametros>=[];
//var listaTipo:Array<string>=[];
//var listaId:Array<string>=[];
var Resultado:string="";
var ResultadoParametro:string="";
export default class copiaVariable{

    encontrarVariable(aux:Nodo, aux2:Nodo){
        Resultado=""; 
        CopiaFM=true;
        for (let i = 0; i < aux.listaIns.length; i++){
            
            if (aux.listaIns[i].tipo1 == "Clase"){
             
                NombreClase1=aux.listaIns[i].nombre1;

                //listaNodoAux.push(new auxNodo(aux.listaIns[i].tipo1,aux.listaIns[i].nombre1));

                this.encontrarMF(aux.listaIns[i]);
            }
          }

          for (let i = 0; i < aux2.listaIns.length; i++){
           
            if (aux2.listaIns[i].tipo1 == "Clase"){
               NombreClase2=aux2.listaIns[i].nombre1;
                //listaNodoAux2.push(new auxNodo(aux2.listaIns[i].tipo1,aux2.listaIns[i].nombre1));
                this.encontrarMF2(aux2.listaIns[i]);
            }
          }

          if(NombreClase1==NombreClase2){
            //if(listaAuxPara.length==listaAuxPara2.length){
                for(let i = 0; i < listaAuxPara.length; i++){
                    for(let j = 0; j < listaAuxPara2.length; j++){
                        if(listaAuxPara[i].NombreFuncion==listaAuxPara2[j].NombreFuncion && listaAuxPara[i].TipoFuncion==listaAuxPara2[j].TipoFuncion){
                            if(listaAuxPara[i].listaNodoAux.length!=0){
                                 if(listaAuxPara2[j].listaNodoAux.length!=0){
                                    ResultadoParametro="";
                                    for(let k=0;k<listaAuxPara[i].listaNodoAux.length;k++){
                                        for(let p=0;p<listaAuxPara2[j].listaNodoAux.length;p++){
                                            if(JSON.stringify(listaAuxPara[i].listaNodoAux[k])==JSON.stringify(listaAuxPara2[j].listaNodoAux[p])){
                                                CopiaFM=true;
                                                ResultadoParametro=ResultadoParametro+ " " +listaAuxPara[i].listaNodoAux[k];
                                            }
                                            
                                        }
                                    
                                    }
    
                                    
                                    Resultado = Resultado + "Tipo Funcion: "+ listaAuxPara[i].TipoFuncion +"\nNombreFM: "+ listaAuxPara[i].NombreFuncion + "\n Variables: "+ ResultadoParametro+"\n";
                                 }
                                
                            }                       
                        }else{
                            //CopiaFM=false;
                            //break;
                        }
                    }
                    if(Resultado==""){
                        CopiaFM=false;
                    }
                }
                Resultado = Resultado+ "Nombre Clase: "+ NombreClase1;
           // }else{
            //    CopiaFM=false;
            //}
          }else{
            CopiaFM=false;
          }
          if(CopiaFM==false){
           Resultado="No existe copia en las Variables" 
          }
          return Resultado;
    }



    encontrarMF(aux:Nodo){
       listaAuxPara=[];
        for (var i = 0; i < aux.listaIns.length; i++){
            
            if (aux.listaIns[i].tipo1 == "Main" ||aux.listaIns[i].tipo1 == "Funcion" ||aux.listaIns[i].tipo1 == "Metodo"){
                
                if(aux.listaIns[i].tipo1 == "Funcion"){
                    var TipoFuncion:string="";
                    var NombreFuncion:string="";
                    if(aux.listaIns[i].nombre1.startsWith("String")){
                        TipoFuncion="String";
                        NombreFuncion=aux.listaIns[i].nombre1.substring(6);
                    }else if(aux.listaIns[i].nombre1.startsWith("int")){
                        TipoFuncion="int";
                        NombreFuncion=aux.listaIns[i].nombre1.substring(3);
                    }else if(aux.listaIns[i].nombre1.startsWith("boolean")){
                        TipoFuncion="boolean";
                        NombreFuncion=aux.listaIns[i].nombre1.substring(7);
                    }else if(aux.listaIns[i].nombre1.startsWith("char")){
                        TipoFuncion="char";
                        NombreFuncion=aux.listaIns[i].nombre1.substring(4);
                    }else if(aux.listaIns[i].nombre1.startsWith("double")){
                        TipoFuncion="double";
                        NombreFuncion=aux.listaIns[i].nombre1.substring(6);
                    }
                    
                    
                    let auxParametros= new Parametros(TipoFuncion,NombreFuncion);
                    for(var j = 0; j < aux.listaIns[i].listaIns.length; j++){
                        if(aux.listaIns[i].listaIns[j].tipo1=="Declaracion"){
                            for(let k=0; k < aux.listaIns[i].listaIns[j].listaIns.length;k++ ){
                                if(aux.listaIns[i].listaIns[j].listaIns[k].tipo1=="Variable"){
                                    auxParametros.listaNodoAux.push(aux.listaIns[i].listaIns[j].nombre1+" "+aux.listaIns[i].listaIns[j].listaIns[k].nombre1+"\n ");
                                }
                                
                            }
                            
                        }
                    }
                   listaAuxPara.push(auxParametros);
                }
                
                if(aux.listaIns[i].tipo1 == "Metodo"||aux.listaIns[i].tipo1 == "Main"){
                    var TipoFuncion:string="";
                    var NombreFuncion:string="";
                    
                    TipoFuncion="void";
                    NombreFuncion=aux.listaIns[i].nombre1.substring(4);

                    let auxParametros= new Parametros(TipoFuncion,NombreFuncion);
                    for(var j = 0; j < aux.listaIns[i].listaIns.length; j++){
                        if(aux.listaIns[i].listaIns[j].tipo1=="Declaracion"){
                            for(let k=0; k < aux.listaIns[i].listaIns[j].listaIns.length;k++ ){
                                if(aux.listaIns[i].listaIns[j].listaIns[k].tipo1=="Variable"){
                                     auxParametros.listaNodoAux.push(aux.listaIns[i].listaIns[j].nombre1+" "+aux.listaIns[i].listaIns[j].listaIns[k].nombre1+"\n ");
                                }
                            }
                            
                        }
                    }
                   listaAuxPara.push(auxParametros);
                }

               
                
            }
          }
    }

    encontrarMF2(aux:Nodo){
        listaAuxPara2=[];
        for (var i = 0; i < aux.listaIns.length; i++){
            
            if (aux.listaIns[i].tipo1 == "Main" ||aux.listaIns[i].tipo1 == "Funcion" ||aux.listaIns[i].tipo1 == "Metodo"){
                
                if(aux.listaIns[i].tipo1 == "Funcion"){
                    var TipoFuncion:string="";
                    var NombreFuncion:string="";
                    if(aux.listaIns[i].nombre1.startsWith("String")){
                        TipoFuncion="String";
                        NombreFuncion=aux.listaIns[i].nombre1.substring(6);
                    }else if(aux.listaIns[i].nombre1.startsWith("int")){
                        TipoFuncion="int";
                        NombreFuncion=aux.listaIns[i].nombre1.substring(3);
                    }else if(aux.listaIns[i].nombre1.startsWith("boolean")){
                        TipoFuncion="boolean";
                        NombreFuncion=aux.listaIns[i].nombre1.substring(7);
                    }else if(aux.listaIns[i].nombre1.startsWith("char")){
                        TipoFuncion="char";
                        NombreFuncion=aux.listaIns[i].nombre1.substring(4);
                    }else if(aux.listaIns[i].nombre1.startsWith("double")){
                        TipoFuncion="double";
                        NombreFuncion=aux.listaIns[i].nombre1.substring(6);
                    }
                    
                    
                    let auxParametros= new Parametros(TipoFuncion,NombreFuncion);
                    for(var j = 0; j < aux.listaIns[i].listaIns.length; j++){
                        if(aux.listaIns[i].listaIns[j].tipo1=="Declaracion"){
                            for(let k=0; k < aux.listaIns[i].listaIns[j].listaIns.length;k++ ){
                                if(aux.listaIns[i].listaIns[j].listaIns[k].tipo1=="Variable"){
                                    auxParametros.listaNodoAux.push(aux.listaIns[i].listaIns[j].nombre1+" "+aux.listaIns[i].listaIns[j].listaIns[k].nombre1+"\n ");
                                }   
                            }
                            
                        }
                    }
                   listaAuxPara2.push(auxParametros);
                }
                
                if(aux.listaIns[i].tipo1 == "Metodo"||aux.listaIns[i].tipo1 == "Main"){
                    var TipoFuncion:string="";
                    var NombreFuncion:string="";
                    
                    TipoFuncion="void";
                    NombreFuncion=aux.listaIns[i].nombre1.substring(4);

                    let auxParametros= new Parametros(TipoFuncion,NombreFuncion);
                    for(var j = 0; j < aux.listaIns[i].listaIns.length; j++){
                        if(aux.listaIns[i].listaIns[j].tipo1=="Declaracion"){
                            for(let k=0; k < aux.listaIns[i].listaIns[j].listaIns.length;k++ ){
                                if(aux.listaIns[i].listaIns[j].listaIns[k].tipo1=="Variable"){
                                    auxParametros.listaNodoAux.push(aux.listaIns[i].listaIns[j].nombre1+" "+aux.listaIns[i].listaIns[j].listaIns[k].nombre1+"\n ");
                                }    
                            }
                            
                        }
                    }
                   listaAuxPara2.push(auxParametros);
                }

               
                
            }
          }
    }

    
}

