import {Nodo} from './ArbolAST/Nodo'

class Parametros{

    
    NombreFuncion:string;
    TipoFuncion:string;
    listaNodoAux:Array<string>;
    existeCopia:boolean;
    listaParametros:Array<String>;
    constructor(TipoParametro:string, NombreParametro:string){
        this.NombreFuncion=NombreParametro;
        this.TipoFuncion=TipoParametro;
        this.listaNodoAux=[];
        this.existeCopia=false;
        this.listaParametros=[];
    }

}
class auxClase {
    auxNombre:string;
    listaMF: Array<Parametros>;
    existeCopia:boolean;

  constructor(auxNombre1:string){
    this.auxNombre=auxNombre1;
    this.listaMF=[]
    this.existeCopia=false;
}

}


//var listaNodoAux:Array<Parametros>=[];
//var listaNodoAux2:Array<Parametros>=[];
var NodoFM:Nodo=new Nodo("","");
//var listaParametros:Array<auxNodo>=[];
var NombreClase1:string="";
var NombreClase2:string="";
var CopiaFM:boolean=true;

var listaClase:Array<auxClase>=[];
var listaClase2:Array<auxClase>=[];
var listaAuxPara:Array<Parametros>=[];
var listaAuxPara2:Array<Parametros>=[];
//var listaTipo:Array<string>=[];
//var listaId:Array<string>=[];
var Resultado:string="";
var ResultadoParametro:string="";
export default class copiaVariable{

    encontrarVariable(aux:Nodo, aux2:Nodo){
        listaClase=[];
        listaClase2=[];
        Resultado=""; 
        CopiaFM=true;
        for (let i = 0; i < aux.listaIns.length; i++){
            
            if (aux.listaIns[i].tipo1 == "Clase"){
             
                //NombreClase1=aux.listaIns[i].nombre1;
                listaClase.push(new auxClase(aux.listaIns[i].nombre1));
                //listaNodoAux.push(new auxNodo(aux.listaIns[i].tipo1,aux.listaIns[i].nombre1));

                this.encontrarMF(aux.listaIns[i]);
            }
          }

          for (let i = 0; i < aux2.listaIns.length; i++){
           
            if (aux2.listaIns[i].tipo1 == "Clase"){
               //NombreClase2=aux2.listaIns[i].nombre1;
               listaClase2.push(new auxClase(aux2.listaIns[i].nombre1));
                //listaNodoAux2.push(new auxNodo(aux2.listaIns[i].tipo1,aux2.listaIns[i].nombre1));
                this.encontrarMF2(aux2.listaIns[i]);
            }
          }

          for(let x=0;x<listaClase.length;x++){
            let r
            for(r=0;r<listaClase2.length;r++){
              if(listaClase[x].auxNombre==listaClase2[r].auxNombre){
                listaClase[x].existeCopia=true;
                    for(let i = 0; i < listaClase[x].listaMF.length; i++){
                        let j;
                        for(j = 0; j < listaClase2[r].listaMF.length; j++){
                            if(listaClase[x].listaMF[i].NombreFuncion==listaClase2[r].listaMF[j].NombreFuncion && listaClase[x].listaMF[i].TipoFuncion==listaClase2[r].listaMF[j].TipoFuncion){
                                if(JSON.stringify(listaClase[x].listaMF[i].listaParametros)==JSON.stringify(listaClase2[r].listaMF[j].listaParametros)){
                                    if(listaClase[x].listaMF[i].listaNodoAux.length!=0){
                                        if(listaClase2[r].listaMF[j].listaNodoAux.length!=0){
                                            for(let k=0;k<listaClase[x].listaMF[i].listaNodoAux.length;k++){
                                                let p;
                                                for(p=0;p<listaClase2[r].listaMF[j].listaNodoAux.length;p++){
                                                    if(JSON.stringify(listaClase[x].listaMF[i].listaNodoAux[k])==JSON.stringify(listaClase2[r].listaMF[j].listaNodoAux[p])){
                                                        listaClase[x].listaMF[i].existeCopia=true;
                                                        break;
                                                    }
                                                }
                                                if(p==listaClase2[r].listaMF[j].listaNodoAux.length){
                                                    listaClase[x].listaMF[i].listaNodoAux.splice(k,1);
                                                    k--;
                                                    
                                                }
                                            }
                                            break;
                                        }
    
                                    }




                                }
                                
                                
                                
                            } 

                        
                        }
                        
                    }
                break;
              }else{
                listaClase[x].existeCopia=false;
                }
            }
            if(r==listaClase2.length){
                
                break;
            }
         }

         for(let v=0;v<listaClase.length;v++){
              
            if(listaClase[v].existeCopia==true){
                for(let s=0;s<listaClase[v].listaMF.length;s++){
                  if(listaClase[v].listaMF[s].existeCopia==true){
                      ResultadoParametro="";
                      for(let o=0;o<listaClase[v].listaMF[s].listaNodoAux.length;o++){
                          ResultadoParametro=ResultadoParametro+" "+listaClase[v].listaMF[s].listaNodoAux[o];
                      }
                      Resultado=Resultado+"Tipo: "+ listaClase[v].listaMF[s].TipoFuncion+"\nNombreFM: "+listaClase[v].listaMF[s].NombreFuncion+"\n Variables: "+ResultadoParametro+"\n";
                  }
                }
                Resultado= Resultado+ " Nombre Clase: "+ listaClase[v].auxNombre+"\n\n";
            }
        }
        if(Resultado==""){
            Resultado="No existe Copia";

          }else{
            Resultado=Resultado;
          }
          return Resultado;
          /*if(NombreClase1==NombreClase2){
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
          return Resultado;*/
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
                        if(aux.listaIns[i].listaIns[j].tipo1=="Parametros"){
                            auxParametros.listaParametros.push(aux.listaIns[i].listaIns[j].nombre1);
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
                        if(aux.listaIns[i].listaIns[j].tipo1=="Parametros"){
                            auxParametros.listaParametros.push(aux.listaIns[i].listaIns[j].nombre1);
                        }
                    }
                   listaAuxPara.push(auxParametros);
                }

               
                
            }
          }
          listaClase[listaClase.length-1].listaMF=listaAuxPara;
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
                        if(aux.listaIns[i].listaIns[j].tipo1=="Parametros"){
                            auxParametros.listaParametros.push(aux.listaIns[i].listaIns[j].nombre1);
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
                        if(aux.listaIns[i].listaIns[j].tipo1=="Parametros"){
                            auxParametros.listaParametros.push(aux.listaIns[i].listaIns[j].nombre1);
                        }
                    }
                   listaAuxPara2.push(auxParametros);
                }

               
                
            }
          }
          listaClase2[listaClase2.length-1].listaMF=listaAuxPara2;

    }

    
}

