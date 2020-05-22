import {Nodo} from './ArbolAST/Nodo'






class Parametros{

    
    NombreFuncion:string;
    TipoFuncion:string;
    listaNodoAux:Array<string>;
    existeCopia:boolean;
    constructor(TipoParametro:string, NombreParametro:string){
        this.NombreFuncion=NombreParametro;
        this.TipoFuncion=TipoParametro;
        this.listaNodoAux=[];
        this.existeCopia=false;
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
export default class copiaFuncion{

    encontrarMetodo(aux:Nodo, aux2:Nodo){
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
                    //console.log(listaClase[x].auxNombre);
                    listaClase[x].existeCopia=true;
                    for(let i = 0; i < listaClase[x].listaMF.length; i++){
                        for(let j = 0; j < listaClase2[r].listaMF.length; j++){
                            if(JSON.stringify(listaClase[x].listaMF[i])==JSON.stringify(listaClase2[r].listaMF[j])){
                                
                                listaClase[x].listaMF[i].existeCopia=true;
                                //ResultadoParametro="";
                                

                                break;
                            }else{
                                listaClase[x].listaMF[i].existeCopia=false;
                                
                            }
                        }
                    }
                  break; 
                }else{
                    //console.log(listaClase[x].auxNombre+"ELSE");
                    listaClase[x].existeCopia=false;
                }
              }
              if(r==listaClase2.length){
                //listaClase[x].existeCopia=false;
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
                        Resultado=Resultado+"Tipo: "+ listaClase[v].listaMF[s].TipoFuncion+"\nNombre: "+listaClase[v].listaMF[s].NombreFuncion+"\n Parametros: "+ResultadoParametro+"\n";
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

         /* if(NombreClase1==NombreClase2){
           // if(listaAuxPara.length==listaAuxPara2.length){
                for(let i = 0; i < listaAuxPara.length; i++){
                    for(let j = 0; j < listaAuxPara2.length; j++){
                        //if(listaAuxPara2[i]!=null){
                            if(JSON.stringify(listaAuxPara[i])==JSON.stringify(listaAuxPara2[j])){
                                //listaTipo.push(listaAuxPara[i].TipoFuncion);
                                //listaId.push(listaAuxPara[i].NombreFuncion);
                                ResultadoParametro="";
                                for(let j=0;j<listaAuxPara[i].listaNodoAux.length;j++){
                                    ResultadoParametro=ResultadoParametro+ " " +listaAuxPara[i].listaNodoAux[j];
                                }
        
                                CopiaFM=true;
                                Resultado = Resultado + "Tipo: "+ listaAuxPara[i].TipoFuncion +"\nNombre: "+ listaAuxPara[i].NombreFuncion + "\n Parametros: "+ ResultadoParametro+"\n";
                            }else{
                                //CopiaFM=false;
                                
                            }
                        //}
                    }
                    
                    if(Resultado==""){
                        CopiaFM=false;
                    }
                }
                Resultado = Resultado+ " Nombre Clase: "+ NombreClase1;
            //}else{
            //    CopiaFM=false;
            //}
          }else{
            CopiaFM=false;
          }
          if(CopiaFM==false){
           Resultado="No existe copia en las Funciones o Metodos" 
          }*/
          
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
                        if(aux.listaIns[i].listaIns[j].tipo1=="Parametros"){
                            auxParametros.listaNodoAux.push(aux.listaIns[i].listaIns[j].nombre1)
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
                        if(aux.listaIns[i].listaIns[j].tipo1=="Parametros"){
                            auxParametros.listaNodoAux.push(aux.listaIns[i].listaIns[j].nombre1)
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
                        if(aux.listaIns[i].listaIns[j].tipo1=="Parametros"){
                            auxParametros.listaNodoAux.push(aux.listaIns[i].listaIns[j].nombre1)
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
                        if(aux.listaIns[i].listaIns[j].tipo1=="Parametros"){
                            auxParametros.listaNodoAux.push(aux.listaIns[i].listaIns[j].nombre1)
                        }
                    }
                   listaAuxPara2.push(auxParametros);
                }

               
                
            }
          }
          listaClase2[listaClase2.length-1].listaMF=listaAuxPara2;
    }

    
}

