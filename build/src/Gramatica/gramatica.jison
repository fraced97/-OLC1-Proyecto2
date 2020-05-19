/**
 * Ejemplo mi primer proyecto con Jison utilizando Nodejs en Ubuntu
 */


%{
    const {Nodo} = require('../ArbolAST/Nodo');

    

    var CErrores=require('../ArbolAST/Errores');
    var CNodoError=require('../ArbolAST/NodoError');

    
%}





/* Definición Léxica */
%lex

%options case-sensitive

%%

/* Espacios en blanco */
[ \r\t]+            {}
\n                  {}

"//".*   {};

[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]    {};

"int"               return 'INT';
"double"            return 'DOUBLE';
"boolean"           return 'BOOLEAN';
"char"              return 'CHAR';
"String"            return 'STRING';


"if"                return 'IF';
"else"              return 'ELSE';
"switch"            return 'SWITCH';
"case"              return 'CASE';
"while"             return 'WHILE';
"do"                 return 'DO';
"for"                 return 'FOR';
"void"                 return 'VOID';
"return"                 return 'RETURN';
"break"                 return 'BREAK';
"main"                 return 'MAIN';
"continue"              return'CONTINUE';
"System.out.println"        return'SOUTLN';
"System.out.print"          return'SOUT';


"import"              return'IMPORT';
"class"              return'CLASS';
"true"              return'TRUE';
"false"              return'FALSE';
"default"              return'DEFAULT';

"{"                 return 'LLAVEIZQ';
"}"                 return 'LLAVEDER';
";"                 return 'PTCOMA';
"("                 return 'PARIZQ';
")"                 return 'PARDER';
"["                 return 'CORIZQ';
"]"                 return 'CORDER';
","                 return 'COMA';
":"                 return 'DOSPUNTOS';

"&&"                 return 'AND';
"||"                 return 'OR';
"!="                 return 'DISTINTO';
"=="                 return 'IGUALDAD';
">="                 return 'MAYORIGUALQUE';
"<="                 return 'MENORIGUALQUE';
">"                 return 'MAYORQUE';
"<"                 return 'MENORQUE';


"="                 return 'IGUAL';


"!"                  return 'NOT';







"+"                 return 'MAS';
"-"                 return 'MENOS';
"*"                 return 'POR';
"/"                 return 'DIVIDIDO';
"%"                 return 'MODULO';
"^"                 return 'POTENCIA';

[0-9]+("."[0-9]+)    return 'DECIMAL';

[0-9]+\b                return 'ENTERO';




(\"[^"]*\")    return 'CADENA';
(\'[^']\')    return'CARACTER';



([a-zA-Z]|[_])[a-zA-Z0-9_]* return 'IDENTIFICADOR';



<<EOF>>                 return 'EOF';

.                               {CErrores.Errores.add(new CNodoError.NodoError("Lexico","No se esperaba el caracter: "+yytext,yylineno))}
/lex

/* Asociación de operadores y precedencia */


%left OR
%left AND
%left IGUALDAD, DISTINTO
%left MAYORIGUALQUE, MENORIGUALQUE, MENORQUE, MAYORQUE
%left MAS, MENOS
%left POR, DIVIDIDO, MODULO
%left POTENCIA
%right NOT
%left UMENOS

%start INICIO

%% /* Definición de la gramática */

INICIO : IMPORTSYCLASES EOF {$$=$1; return $$;} 
        |error {CErrores.Errores.add(new CNodoError.NodoError("Sintactico","No se esperaba el caracter: "+yytext,yylineno))}
;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION 
              | INSTRUCCION               
              ;

INSTRUCCION : PRINT 
            | IF2
            | WHILE2 
            | FOR2
            | DO2
            | SWITCH2
;


INSTRUCCIONESCLASE : INSTRUCCIONESCLASE INSTRUCCIONCLASE 
              | INSTRUCCIONCLASE               
              ;

INSTRUCCIONCLASE : CLASE2 
;

INICIO2: IMPORTSYCLASES {$$= new Nodo("Raiz","Raiz");$$.listaIns.push($1)}
    ;



IMPORTSYCLASES: IMPORT2 LISTACLASES {$$=new Nodo("Raiz","Raiz"); $$.encontrarNodo($1);$$.encontrarNodo($2);}
            |LISTACLASES {$$ = new Nodo("Raiz","Raiz"); $$.encontrarNodo($1);}
            ;


LISTACLASES:LISTACLASES CLASE2 {$$=$1;$$.push($2)}
            |CLASE2 {$$=[];$$.push($1)}  
            ;

IMPORT2: IMPORT2 IMPORT IDENTIFICADOR PTCOMA {$$=$1;$$.push(new Nodo("Import",$2+" "+$3))}
        |IMPORT IDENTIFICADOR PTCOMA {$$=[];$$.push(new Nodo("Import",$1+" "+$2))}
        ;

INSTRUCCIONESDENTROCLASE : INSTRUCCIONESDENTROCLASE INSTRUCCIONDENTROCLASE {$$=$1;$$.push($2)}
              | INSTRUCCIONDENTROCLASE   {$$=[];$$.push($1)}           
              ; 

INSTRUCCIONDENTROCLASE : METODO2 {$$ = $1}
            | FUNCION2 {$$ = $1}
            | DECLARACION {$$ = $1}
            
;

INSTRUCCIONESMETODO : INSTRUCCIONESMETODO INSTRUCCIONMETODO {$$=$1;$$.push($2)}
              | INSTRUCCIONMETODO   {$$=[];$$.push($1)}       
              ; 

INSTRUCCIONMETODO : PRINT {$$ = $1}
            | IFM {$$ = $1}
            | WHILEM {$$ = $1}
            | FORM {$$ = $1}
            | DOM {$$ = $1}
            | SWITCHM {$$ = $1}
            | DECLARACION {$$ = $1}
            | ASIGNACION {$$ = $1}
            | IDENTIFICADOR PARIZQ LISTAEXPRESION PARDER PTCOMA {$$ = new Nodo("Sentencia", $1); $$.encontrarNodo($3)}
            | RETURN PTCOMA {$$ = new Nodo("Sentencia",$1);}
            
;

INSTRUCCIONESFUNCION : INSTRUCCIONESFUNCION INSTRUCCIONFUNCION {$$=$1;$$.push($2)}
              | INSTRUCCIONFUNCION {$$=[];$$.push($1)}           
              ; 

INSTRUCCIONFUNCION : PRINT {$$ = $1}
            | IF2 {$$ = $1}
            | WHILE2 {$$ = $1}
            | FOR2 {$$ = $1}
            | DO2 {$$ = $1}
            | SWITCH2 {$$ = $1}
            | DECLARACION {$$ = $1}
            | ASIGNACION {$$ = $1}
            | IDENTIFICADOR PARIZQ LISTAEXPRESION PARDER PTCOMA {$$ = new Nodo("Sentencia", $1); $$.encontrarNodo($3)}
                
            
            
;

INSTRUCCIONESIF: INSTRUCCIONESIF INSTRUCCIONIF {$$=$1;$$.push($2)}
                |INSTRUCCIONIF {$$=[];$$.push($1)}
                ;

INSTRUCCIONESIFS: INSTRUCCIONESIFS INSTRUCCIONIFS {$$=$1;$$.push($2)}
                |INSTRUCCIONIFS {$$=[];$$.push($1)}
                ;

INSTRUCCIONESIFF: INSTRUCCIONESIFF INSTRUCCIONIFF {$$=$1;$$.push($2)}
                |INSTRUCCIONIFF {$$=[];$$.push($1)}
                ;

INSTRUCCIONIF: PRINT {$$ = $1}
            | IF2 {$$ = $1}
            | WHILE2 {$$ = $1}
            | FOR2 {$$ = $1}
            | DO2 {$$ = $1}
            | SWITCH2 {$$ = $1}
            |IDENTIFICADOR PARIZQ LISTAEXPRESION PARDER PTCOMA  {$$ = new Nodo("Sentencia", $1); $$.encontrarNodo($3)}
            |DECLARACION {$$ = $1}
            |ASIGNACION {$$ = $1}
            | RETURN EXPRESION PTCOMA { $$ = new Nodo("Sentencia", $1);$$.listaIns.push($2);}
            ;



INSTRUCCIONIFS: PRINT {$$ = $1}
            | IF2S {$$ = $1}
            | WHILE2 {$$ = $1}
            | FOR2 {$$ = $1}
            | DO2 {$$ = $1}
            | SWITCH2 {$$ = $1}
            |IDENTIFICADOR PARIZQ LISTAEXPRESION PARDER PTCOMA  {$$ = new Nodo("Sentencia", $1); $$.encontrarNodo($3)}
            |DECLARACION {$$ = $1}
            |ASIGNACION {$$ = $1}
            | RETURN EXPRESION PTCOMA { $$ = new Nodo("Sentencia", $1);$$.listaIns.push($2);}
            |BREAK PTCOMA { $$ = new Nodo("Sentencia", $1);}
            ;

INSTRUCCIONIFF: PRINT {$$ = $1}
            | IF2F {$$ = $1}
            | WHILE2 {$$ = $1}
            | FOR2 {$$ = $1}
            | DO2 {$$ = $1}
            | SWITCH2 {$$ = $1}
            |IDENTIFICADOR PARIZQ LISTAEXPRESION PARDER PTCOMA  {$$ = new Nodo("Sentencia", $1); $$.encontrarNodo($3)}
            |DECLARACION {$$ = $1}
            |ASIGNACION {$$ = $1}
            | RETURN EXPRESION PTCOMA { $$ = new Nodo("Sentencia", $1);$$.listaIns.push($2);}
            |BREAK PTCOMA { $$ = new Nodo("Sentencia", $1);}
            | CONTINUE PTCOMA { $$ = new Nodo("Sentencia", $1);}
            ;

INSTRUCCIONESFOR: INSTRUCCIONESFOR INSTRUCCIONFOR {$$=$1;$$.push($2)}
                |INSTRUCCIONFOR {$$=[];$$.push($1)}
                ;

INSTRUCCIONFOR: PRINT {$$ = $1}
            | IF2F {$$ = $1}
            | WHILE2 {$$ = $1}
            | FOR2 {$$ = $1}
            | DO2 {$$ = $1}
            | SWITCH2F {$$ = $1}
            | BREAK PTCOMA { $$ = new Nodo("Sentencia", $1);}
            | CONTINUE PTCOMA { $$ = new Nodo("Sentencia", $1);}
            | IDENTIFICADOR PARIZQ LISTAEXPRESION PARDER PTCOMA {$$ = new Nodo("Sentencia", $1); $$.encontrarNodo($3)}
            | DECLARACION {$$ = $1}
            | ASIGNACION {$$ = $1}
            | RETURN EXPRESION PTCOMA { $$ = new Nodo("Sentencia", $1);$$.listaIns.push($2);}
            ;


INSTRUCCIONESSWITCH: INSTRUCCIONESSWITCH INSTRUCCIONSWITCH {$$=$1;$$.push($2)}
                |INSTRUCCIONSWITCH {$$=[];$$.push($1)}
                ;

INSTRUCCIONESSWITCHF: INSTRUCCIONESSWITCHF INSTRUCCIONSWITCHF {$$=$1;$$.push($2)}
                |INSTRUCCIONSWITCHF {$$=[];$$.push($1)}
                ;

INSTRUCCIONSWITCH: PRINT {$$ = $1}
            | IF2S {$$ = $1}
            | WHILE2  {$$ = $1}
            | FOR2 {$$ = $1}
            | DO2 {$$ = $1}
            | SWITCH2 {$$ = $1}
            | BREAK PTCOMA { $$ = new Nodo("Sentencia", $1);}
            |IDENTIFICADOR PARIZQ LISTAEXPRESION PARDER PTCOMA {$$ = new Nodo("Sentencia", $1); $$.encontrarNodo($3)}
            |DECLARACION {$$ = $1}
            |ASIGNACION {$$ = $1}
            |RETURN EXPRESION PTCOMA { $$ = new Nodo("Sentencia", $1);$$.listaIns.push($2);}
            ;


INSTRUCCIONSWITCHF: PRINT {$$ = $1}
            | IF2F {$$ = $1}
            | WHILE2  {$$ = $1}
            | FOR2 {$$ = $1}
            | DO2 {$$ = $1}
            | SWITCH2F {$$ = $1}
            | BREAK PTCOMA { $$ = new Nodo("Sentencia", $1);}
            |IDENTIFICADOR PARIZQ LISTAEXPRESION PARDER PTCOMA {$$ = new Nodo("Sentencia", $1); $$.encontrarNodo($3)}
            |DECLARACION {$$ = $1}
            |ASIGNACION {$$ = $1}
            |RETURN EXPRESION PTCOMA { $$ = new Nodo("Sentencia", $1);$$.listaIns.push($2);}
            |CONTINUE PTCOMA { $$ = new Nodo("Sentencia", $1);}
            ;

LISTAEXPRESION: LISTAEXPRESION COMA EXPRESION  {$$=$1;$$.push($3)}
                |EXPRESION {$$=[];$$.push($1)}
                ;


FUNCION2: TIPO IDENTIFICADOR PARIZQ PARAMETROS PARDER BLOQUE_INSTRUCCIONESFUNCION {$$=new Nodo("Funcion",$1+" "+$2);$$.encontrarNodo($4);if($6!=null){$$.encontrarNodo($6)};}
        | TIPO IDENTIFICADOR PARIZQ  PARDER BLOQUE_INSTRUCCIONESFUNCION {$$=new Nodo("Funcion",$1+" "+$2);if($5!=null){$$.encontrarNodo($5)};}
     
    ;

METODO2 : VOID IDENTIFICADOR PARIZQ PARAMETROS PARDER BLOQUE_INSTRUCCIONESMETODO {$$=new Nodo("Metodo",$1+" "+$2);$$.encontrarNodo($4);if($6!=null){$$.encontrarNodo($6)};}
        | VOID IDENTIFICADOR PARIZQ  PARDER BLOQUE_INSTRUCCIONESMETODO {$$=new Nodo("Metodo",$1+" "+$2);if($5!=null){$$.encontrarNodo($5)};}
        |  VOID MAIN PARIZQ PARDER BLOQUE_INSTRUCCIONESMETODO {$$=new Nodo("Main",$1+" "+$2);if($5!=null){$$.encontrarNodo($5)};}
     
    ;

CLASE2 : CLASS IDENTIFICADOR BLOQUE_INSTRUCCIONESCLASE { $$ = new Nodo("Clase", $1+" "+$2);if($3!=null){$$.encontrarNodo($3)};}
    ;

SWITCH2 : SWITCH  CONDICION LLAVEIZQ CASE2 LLAVEDER {$$=new Nodo("Sentencia",$1);$$.listaIns.push($2);$$.encontrarNodo($4);}
        | SWITCH CONDICION LLAVEIZQ CASE2 DEFAULT2 LLAVEDER {$$=new Nodo("Sentencia",$1);$$.listaIns.push($2);$$.encontrarNodo($4);$$.listaIns.push($5);}
     
    ;

SWITCH2F : SWITCH  CONDICION LLAVEIZQ CASE2F LLAVEDER {$$=new Nodo("Sentencia",$1);$$.listaIns.push($2);$$.encontrarNodo($4);}
        | SWITCH CONDICION LLAVEIZQ CASE2F DEFAULT2F LLAVEDER {$$=new Nodo("Sentencia",$1);$$.listaIns.push($2);$$.encontrarNodo($4);$$.listaIns.push($5);}
     
    ;

CASE2: CASE2 CASE EXPRESION DOSPUNTOS INSTRUCCIONESSWITCH {$$=$1;$$.push(new Nodo("Sentencia",$2));$$[$$.length-1].listaIns.push($3);if($5!=null){$$[$$.length-1].encontrarNodo($5)};}
    |CASE EXPRESION DOSPUNTOS INSTRUCCIONESSWITCH {$$=[];$$.push(new Nodo("Sentencia",$1));$$[0].listaIns.push($2);if($4!=null){$$[0].encontrarNodo($4)} ;}
    ;

CASE2F: CASE2F CASE EXPRESION DOSPUNTOS INSTRUCCIONESSWITCHF {$$=$1;$$.push(new Nodo("Sentencia",$2));$$[$$.length-1].listaIns.push($3);if($5!=null){$$[$$.length-1].encontrarNodo($5)};}
    |CASE EXPRESION DOSPUNTOS INSTRUCCIONESSWITCHF {$$=[];$$.push(new Nodo("Sentencia",$1));$$[0].listaIns.push($2);if($4!=null){$$[0].encontrarNodo($4)} ;}
    ;

DEFAULT2:  DEFAULT DOSPUNTOS  INSTRUCCIONESSWITCH {$$=new Nodo("Sentencia",$1);if($3!=null){$$.encontrarNodo($3)};}
    
    ;


DEFAULT2F:  DEFAULT DOSPUNTOS  INSTRUCCIONESSWITCHF {$$=new Nodo("Sentencia",$1);if($3!=null){$$.encontrarNodo($3)};}
    
    ;

DO2 : DO BLOQUE_INSTRUCCIONESFOR WHILE CONDICION PTCOMA {$$=new Nodo("Sentencia",$1+$3);if($2!=null){$$.encontrarNodo($2)};$$.listaIns.push($4);}
    ;

FOR2 : FOR PARIZQ DECLARACION EXPRESION PTCOMA CONDICIONFOR PARDER BLOQUE_INSTRUCCIONESFOR {$$=new Nodo("Sentencia",$1); $$.listaIns.push($3);$$.listaIns.push($4);$$.listaIns.push($6);if($8!=null){$$.encontrarNodo($8)};}
     | FOR PARIZQ ASIGNACION EXPRESION PTCOMA CONDICIONFOR PARDER BLOQUE_INSTRUCCIONESFOR  {$$=new Nodo("Sentencia",$1); $$.listaIns.push($3);$$.listaIns.push($4);$$.listaIns.push($6);if($8!=null){$$.encontrarNodo($8)};}
    ;


CONDICIONFOR : IDENTIFICADOR MAS MAS {$$ = new Nodo("Asignacion",$1); $$.listaIns.push(new Nodo("Incremento",$2+$3));}
     | IDENTIFICADOR MENOS MENOS {$$ = new Nodo("Asignacion",$1); $$.listaIns.push(new Nodo("Decremento",$2+$3));}
;

TIPO : STRING {$$ = $1;}
     | BOOLEAN {$$ = $1;}
     | CHAR {$$ = $1;}
     | DOUBLE {$$ = $1;}
     | INT {$$ = $1;}
     ;

DECLARACION : TIPO LISTAID IGUAL EXPRESION PTCOMA {$$=new Nodo("Declaracion",$1); $$.encontrarNodo($2);$$.listaIns.push($4);}
            | TIPO LISTAID PTCOMA {$$=new Nodo("Declaracion",$1); $$.encontrarNodo($2);}
            ;



LISTAID: LISTAID COMA IDENTIFICADOR {$$=$1;$$.push(new Nodo("Variable",$3));}
        |IDENTIFICADOR {$$=[];$$.push(new Nodo("Variable",$1));}
        ;




ASIGNACION : IDENTIFICADOR IGUAL EXPRESION PTCOMA {$$=new Nodo("Asignacion",$1); $$.listaIns.push($3);}
            | IDENTIFICADOR MAS MAS PTCOMA {$$ = new Nodo("Asignacion",$1); $$.listaIns.push(new Nodo("Incremento",$2+$3));}
            | IDENTIFICADOR MENOS MENOS PTCOMA {$$ = new Nodo("Asignacion",$1); $$.listaIns.push(new Nodo("Decremento",$2+$3));}
    ;

WHILE2 : WHILE CONDICION BLOQUE_INSTRUCCIONESFOR { $$ = new Nodo("Sentencia", $1);$$.listaIns.push($2); if($3!=null){$$.encontrarNodo($3)};}
      ;

IF2 : IF CONDICION BLOQUE_INSTRUCCIONESIF { $$ = new Nodo("Sentencia", $1);$$.listaIns.push($2); if($3!=null){$$.encontrarNodo($3)};} 
   | IF CONDICION BLOQUE_INSTRUCCIONESIF ELSE2 { $$ = new Nodo("Sentencia", $1);$$.listaIns.push($2); if($3!=null){$$.encontrarNodo($3)};$$.listaIns.push($4);} 
   ;

ELSE2: ELSE BLOQUE_INSTRUCCIONESIF { $$ = new Nodo("Sentencia", $1); if($2!=null){$$.encontrarNodo($2)};} 
     |ELSE IF2 { $$ = $2;} 
    ;


IF2S : IF CONDICION BLOQUE_INSTRUCCIONESIFS { $$ = new Nodo("Sentencia", $1);$$.listaIns.push($2); if($3!=null){$$.encontrarNodo($3)};} 
   | IF CONDICION BLOQUE_INSTRUCCIONESIFS ELSE2S { $$ = new Nodo("Sentencia", $1);$$.listaIns.push($2); if($3!=null){$$.encontrarNodo($3)};$$.listaIns.push($4);} 
   ;

ELSE2S: ELSE BLOQUE_INSTRUCCIONESIFS { $$ = new Nodo("Sentencia", $1); if($2!=null){$$.encontrarNodo($2)};} 
     |ELSE IF2S { $$ = $2;} 
    ;

IF2F : IF CONDICION BLOQUE_INSTRUCCIONESIFF { $$ = new Nodo("Sentencia", $1);$$.listaIns.push($2); if($3!=null){$$.encontrarNodo($3)};} 
   | IF CONDICION BLOQUE_INSTRUCCIONESIFF ELSE2F { $$ = new Nodo("Sentencia", $1);$$.listaIns.push($2); if($3!=null){$$.encontrarNodo($3)};$$.listaIns.push($4);} 
   ;

ELSE2F: ELSE BLOQUE_INSTRUCCIONESIFF { $$ = new Nodo("Sentencia", $1); if($2!=null){$$.encontrarNodo($2)};} 
     |ELSE IF2F { $$ = $2;} 
    ;


   
CONDICION : PARIZQ EXPRESION PARDER { $$ = $2;} 
          ;


BLOQUE_INSTRUCCIONES : LLAVEIZQ INSTRUCCIONES LLAVEDER 
                     | LLAVEIZQ LLAVEDER 
                     ;

BLOQUE_INSTRUCCIONESIF : LLAVEIZQ INSTRUCCIONESIF LLAVEDER {$$=$2}
                     | LLAVEIZQ LLAVEDER {$$=null;}
                     ;

BLOQUE_INSTRUCCIONESIFS : LLAVEIZQ INSTRUCCIONESIFS LLAVEDER {$$=$2}
                     | LLAVEIZQ LLAVEDER {$$=null;}
                     ;

BLOQUE_INSTRUCCIONESIFF : LLAVEIZQ INSTRUCCIONESIFF LLAVEDER {$$=$2}
                     | LLAVEIZQ LLAVEDER {$$=null;}
                     ;

BLOQUE_INSTRUCCIONESFOR : LLAVEIZQ INSTRUCCIONESFOR LLAVEDER  {$$=$2}
                     | LLAVEIZQ LLAVEDER {$$=null;}
                     ;


BLOQUE_INSTRUCCIONESCLASE : LLAVEIZQ INSTRUCCIONESDENTROCLASE LLAVEDER {$$=$2}
                     | LLAVEIZQ LLAVEDER {$$=null;}
                     ;

BLOQUE_INSTRUCCIONESMETODO : LLAVEIZQ INSTRUCCIONESMETODO LLAVEDER {$$=$2}
                     | LLAVEIZQ LLAVEDER {$$=null;}
                     ;

BLOQUE_INSTRUCCIONESFUNCION : LLAVEIZQ INSTRUCCIONESFUNCION RETURN EXPRESION PTCOMA LLAVEDER {$$=$2;$$.push(new Nodo("Sentencia",$3));$$[$$.length-1].listaIns.push($4);}
                     | LLAVEIZQ RETURN EXPRESION PTCOMA LLAVEDER {$$=[]; $$.push(new Nodo("Sentencia",$2));$$[0].listaIns.push($3);}
                     ;

PRINT : SOUT PARIZQ EXPRESION PARDER PTCOMA { $$ = new Nodo("Imprimir", $1);$$.listaIns.push($3);}
    | SOUTLN PARIZQ EXPRESION PARDER PTCOMA { $$ = new Nodo("Imprimir", $1);$$.listaIns.push($3);}
      ;

PARAMETROS : PARAMETROS COMA TIPO IDENTIFICADOR {$$=$1;$$.push(new Nodo("Parametros",$3+" "+$4));}
        | TIPO IDENTIFICADOR {$$=[];$$.push(new Nodo("Parametros",$1+" "+$2));}
        ;

IFM:IF CONDICION BLOQUE_INSTRUCCIONESIFM { $$ = new Nodo("Sentencia", $1);$$.listaIns.push($2); if($3!=null){$$.encontrarNodo($3)};} 
   | IF CONDICION BLOQUE_INSTRUCCIONESIFM ELSEM { $$ = new Nodo("Sentencia", $1);$$.listaIns.push($2); if($3!=null){$$.encontrarNodo($3)};$$.listaIns.push($4);} 
   ;


ELSEM: ELSE BLOQUE_INSTRUCCIONESIFM { $$ = new Nodo("Sentencia", $1); if($2!=null){$$.encontrarNodo($2)};} 
    |ELSE IFM { $$ = $2;} 
;

INSTRUCCIONESIFM: INSTRUCCIONESIFM INSTRUCCIONIFM {$$=$1;$$.push($2)}
                |INSTRUCCIONIFM {$$=[];$$.push($1)}
                ;

INSTRUCCIONIFM: PRINT {$$ = $1}
            | IFM {$$=$1}
            | WHILEM {$$=$1}
            | FORM  {$$=$1}
            | DOM   {$$=$1}
            | SWITCHM  {$$=$1}
            | IDENTIFICADOR PARIZQ LISTAEXPRESION PARDER PTCOMA {$$ = new Nodo("Sentencia", $1); $$.encontrarNodo($3)}
            | DECLARACION {$$=$1}
            | ASIGNACION {$$=$1}
            | RETURN PTCOMA { $$ = new Nodo("Sentencia", $1);}
            ;

BLOQUE_INSTRUCCIONESIFM : LLAVEIZQ INSTRUCCIONESIFM LLAVEDER {$$=$2}
                     | LLAVEIZQ LLAVEDER {$$=null;}
                     ;


WHILEM : WHILE CONDICION BLOQUE_INSTRUCCIONESFORM { $$ = new Nodo("Sentencia", $1);$$.listaIns.push($2); if($3!=null){$$.encontrarNodo($3)};}
      ;


BLOQUE_INSTRUCCIONESFORM : LLAVEIZQ INSTRUCCIONESFORM LLAVEDER {$$=$2}
                     | LLAVEIZQ LLAVEDER {$$=null;}
                     ;

INSTRUCCIONESFORM: INSTRUCCIONESFORM INSTRUCCIONFORM {$$=$1;$$.push($2)}
                |INSTRUCCIONFORM {$$=[];$$.push($1)}
                ;

INSTRUCCIONFORM: PRINT {$$ = $1}
            | IFMF {$$ = $1}
            | WHILEM {$$ = $1}
            | FORM {$$ = $1}
            | DOM {$$ = $1}
            | SWITCHMF {$$ = $1}
            | BREAK PTCOMA { $$ = new Nodo("Sentencia", $1);}
            | CONTINUE PTCOMA { $$ = new Nodo("Sentencia", $1);}
            | IDENTIFICADOR PARIZQ LISTAEXPRESION PARDER PTCOMA {$$ = new Nodo("Sentencia", $1); $$.encontrarNodo($3)}
            | DECLARACION {$$ = $1}
            | ASIGNACION {$$ = $1}
            | RETURN PTCOMA { $$ = new Nodo("Sentencia", $1);}
            ;

FORM : FOR PARIZQ DECLARACION EXPRESION PTCOMA CONDICIONFOR PARDER BLOQUE_INSTRUCCIONESFORM {$$=new Nodo("Sentencia",$1); $$.listaIns.push($3);$$.listaIns.push($4);$$.listaIns.push($6);if($8!=null){$$.encontrarNodo($8)};}
     | FOR PARIZQ ASIGNACION EXPRESION PTCOMA CONDICIONFOR PARDER BLOQUE_INSTRUCCIONESFORM {$$=new Nodo("Sentencia",$1); $$.listaIns.push($3);$$.listaIns.push($4);$$.listaIns.push($6);if($8!=null){$$.encontrarNodo($8)};}
    ;

DOM : DO BLOQUE_INSTRUCCIONESFORM WHILE CONDICION PTCOMA {$$=new Nodo("Sentencia",$1+$3);if($2!=null){$$.encontrarNodo($2)};$$.listaIns.push($4);}
    ;





SWITCHM : SWITCH  CONDICION LLAVEIZQ CASEM LLAVEDER {$$=new Nodo("Sentencia",$1);$$.listaIns.push($2);$$.encontrarNodo($4);}
        | SWITCH CONDICION LLAVEIZQ CASEM DEFAULTM LLAVEDER {$$=new Nodo("Sentencia",$1);$$.listaIns.push($2);$$.encontrarNodo($4);$$.listaIns.push($5);}
     
    ;

SWITCHMF : SWITCH  CONDICION LLAVEIZQ CASEMF LLAVEDER {$$=new Nodo("Sentencia",$1);$$.listaIns.push($2);$$.encontrarNodo($4);}
        | SWITCH CONDICION LLAVEIZQ CASEMF DEFAULTMF LLAVEDER {$$=new Nodo("Sentencia",$1);$$.listaIns.push($2);$$.encontrarNodo($4);$$.listaIns.push($5);}
     
    ;

CASEM: CASEM CASE EXPRESION DOSPUNTOS INSTRUCCIONESSWITCHM {$$=$1;$$.push(new Nodo("Sentencia",$2));$$[$$.length-1].listaIns.push($3);if($5!=null){$$[$$.length-1].encontrarNodo($5)};}
    |CASE EXPRESION DOSPUNTOS INSTRUCCIONESSWITCHM {$$=[];$$.push(new Nodo("Sentencia",$1));$$[0].listaIns.push($2);if($4!=null){$$[0].encontrarNodo($4)} ;}
    ;



CASEMF: CASEMF CASE EXPRESION DOSPUNTOS INSTRUCCIONESSWITCHMF {$$=$1;$$.push(new Nodo("Sentencia",$2));$$[$$.length-1].listaIns.push($3);if($5!=null){$$[$$.length-1].encontrarNodo($5)};}
    |CASE EXPRESION DOSPUNTOS INSTRUCCIONESSWITCHMF {$$=[];$$.push(new Nodo("Sentencia",$1));$$[0].listaIns.push($2);if($4!=null){$$[0].encontrarNodo($4)} ;}
    ;

DEFAULTM:  DEFAULT DOSPUNTOS  INSTRUCCIONESSWITCHM {$$=new Nodo("Sentencia",$1);if($3!=null){$$.encontrarNodo($3)};}
    
    ;

DEFAULTMF:  DEFAULT DOSPUNTOS  INSTRUCCIONESSWITCHMF {$$=new Nodo("Sentencia",$1);if($3!=null){$$.encontrarNodo($3)};}
    
    ;

INSTRUCCIONESSWITCHM: INSTRUCCIONESSWITCHM INSTRUCCIONSWITCHM {$$=$1;$$.push($2)}
                |INSTRUCCIONSWITCHM {$$=[];$$.push($1)}
                ;

INSTRUCCIONESSWITCHMF: INSTRUCCIONESSWITCHMF INSTRUCCIONSWITCHMF {$$=$1;$$.push($2)}
                |INSTRUCCIONSWITCHMF {$$=[];$$.push($1)}
                ;

INSTRUCCIONSWITCHM: PRINT {$$ = $1}
            | IFMS {$$ = $1}
            | WHILEM  {$$ = $1}
            | FORM {$$ = $1}
            | DOM {$$ = $1}
            | SWITCHM {$$ = $1}
            | BREAK PTCOMA { $$ = new Nodo("Sentencia", $1);}
            |IDENTIFICADOR PARIZQ LISTAEXPRESION PARDER PTCOMA {$$ = new Nodo("Sentencia", $1); $$.encontrarNodo($3)}
            |DECLARACION {$$ = $1}
            |ASIGNACION {$$ = $1}
            |RETURN PTCOMA { $$ = new Nodo("Sentencia", $1);}
            ;


INSTRUCCIONSWITCHMF: PRINT {$$ = $1}
            | IFMF {$$ = $1}
            | WHILEM  {$$ = $1}
            | FORM {$$ = $1}
            | DOM {$$ = $1}
            | SWITCHMF {$$ = $1}
            | BREAK PTCOMA { $$ = new Nodo("Sentencia", $1);}
            |IDENTIFICADOR PARIZQ LISTAEXPRESION PARDER PTCOMA {$$ = new Nodo("Sentencia", $1); $$.encontrarNodo($3)}
            |DECLARACION {$$ = $1}
            |ASIGNACION {$$ = $1}
            |RETURN PTCOMA { $$ = new Nodo("Sentencia", $1);}
            |CONTINUE PTCOMA { $$ = new Nodo("Sentencia", $1);}
            ;



IFMF:IF CONDICION BLOQUE_INSTRUCCIONESIFMF { $$ = new Nodo("Sentencia", $1);$$.listaIns.push($2); if($3!=null){$$.encontrarNodo($3)};} 
   | IF CONDICION BLOQUE_INSTRUCCIONESIFMF ELSEMF { $$ = new Nodo("Sentencia", $1);$$.listaIns.push($2); if($3!=null){$$.encontrarNodo($3)};$$.listaIns.push($4);} 
   ;

BLOQUE_INSTRUCCIONESIFMF : LLAVEIZQ INSTRUCCIONESIFMF LLAVEDER {$$=$2}
                     | LLAVEIZQ LLAVEDER {$$=null;}
                     ;



ELSEMF: ELSE BLOQUE_INSTRUCCIONESIFMF { $$ = new Nodo("Sentencia", $1); if($2!=null){$$.encontrarNodo($2)};} 
    |ELSE IFMF { $$ = $2;} 
;

INSTRUCCIONESIFMF: INSTRUCCIONESIFMF INSTRUCCIONIFMF {$$=$1;$$.push($2)}
                |INSTRUCCIONIFMF {$$=[];$$.push($1)}
                ;




INSTRUCCIONIFMF: PRINT {$$ = $1}
            | IFMF {$$=$1}
            | WHILEM {$$=$1}
            | FORM  {$$=$1}
            | DOM   {$$=$1}
            | SWITCHMF  {$$=$1}
            | IDENTIFICADOR PARIZQ LISTAEXPRESION PARDER PTCOMA {$$ = new Nodo("Sentencia", $1); $$.encontrarNodo($3)}
            | DECLARACION {$$=$1}
            | ASIGNACION {$$=$1}
            | RETURN PTCOMA { $$ = new Nodo("Sentencia", $1);}
            | BREAK PTCOMA { $$ = new Nodo("Sentencia", $1);}
            | CONTINUE PTCOMA { $$ = new Nodo("Sentencia", $1);}
            ;











IFMS:IF CONDICION BLOQUE_INSTRUCCIONESIFMS { $$ = new Nodo("Sentencia", $1);$$.listaIns.push($2); if($3!=null){$$.encontrarNodo($3)};} 
   | IF CONDICION BLOQUE_INSTRUCCIONESIFMS ELSEMS { $$ = new Nodo("Sentencia", $1);$$.listaIns.push($2); if($3!=null){$$.encontrarNodo($3)};$$.listaIns.push($4);} 
   ;

BLOQUE_INSTRUCCIONESIFMS : LLAVEIZQ INSTRUCCIONESIFMS LLAVEDER {$$=$2}
                     | LLAVEIZQ LLAVEDER {$$=null;}
                     ;



ELSEMS: ELSE BLOQUE_INSTRUCCIONESIFMS { $$ = new Nodo("Sentencia", $1); if($2!=null){$$.encontrarNodo($2)};} 
    |ELSE IFMS { $$ = $2;} 
;

INSTRUCCIONESIFMS: INSTRUCCIONESIFMS INSTRUCCIONIFMS {$$=$1;$$.push($2)}
                |INSTRUCCIONIFMS {$$=[];$$.push($1)}
                ;




INSTRUCCIONIFMS: PRINT {$$ = $1}
            | IFMS {$$=$1}
            | WHILEM {$$=$1}
            | FORM  {$$=$1}
            | DOM   {$$=$1}
            | SWITCHM  {$$=$1}
            | IDENTIFICADOR PARIZQ LISTAEXPRESION PARDER PTCOMA {$$ = new Nodo("Sentencia", $1); $$.encontrarNodo($3)}
            | DECLARACION {$$=$1}
            | ASIGNACION {$$=$1}
            | RETURN PTCOMA { $$ = new Nodo("Sentencia", $1);}
            | BREAK PTCOMA { $$ = new Nodo("Sentencia", $1);}
            ;

EXPRESION : MENOS EXPRESION %prec UMENOS	    { $$ = new Nodo("Primitivo", $1);$$.listaIns.push($2);} 
          | NOT EXPRESION	          { $$ = new Nodo("Relacional", $1);$$.listaIns.push($2);}       
          | EXPRESION MAS EXPRESION	     {$$= new Nodo("Artimetica",$2);$$.listaIns.push($1);$$.listaIns.push($3);}
          | EXPRESION MENOS EXPRESION     {$$= new Nodo("Artimetica",$2);$$.listaIns.push($1);$$.listaIns.push($3);}
          | EXPRESION POR EXPRESION		    {$$= new Nodo("Artimetica",$2);$$.listaIns.push($1);$$.listaIns.push($3);}
          | EXPRESION DIVIDIDO EXPRESION	 {$$= new Nodo("Artimetica",$2);$$.listaIns.push($1);$$.listaIns.push($3);}         
          | EXPRESION MENORQUE EXPRESION	 {$$= new Nodo("Relacional",$2);$$.listaIns.push($1);$$.listaIns.push($3);}
          | EXPRESION MAYORQUE EXPRESION	{$$= new Nodo("Relacional",$2);$$.listaIns.push($1);$$.listaIns.push($3);}    
          | EXPRESION MAYORIGUALQUE EXPRESION	 {$$= new Nodo("Relacional",$2);$$.listaIns.push($1);$$.listaIns.push($3);}   
          | EXPRESION MENORIGUALQUE EXPRESION	  {$$= new Nodo("Relacional",$2);$$.listaIns.push($1);$$.listaIns.push($3);}  
          | EXPRESION IGUALDAD EXPRESION	{$$= new Nodo("Relacional",$2);$$.listaIns.push($1);$$.listaIns.push($3);}    
          | EXPRESION DISTINTO EXPRESION	{$$= new Nodo("Relacional",$2);$$.listaIns.push($1);$$.listaIns.push($3);}   
          | EXPRESION OR EXPRESION	    {$$= new Nodo("Relacional",$2);$$.listaIns.push($1);$$.listaIns.push($3);}
          | EXPRESION AND EXPRESION	   {$$= new Nodo("Relacional",$2);$$.listaIns.push($1);$$.listaIns.push($3);}
          | EXPRESION POTENCIA EXPRESION	{$$= new Nodo("Artimetica",$2);$$.listaIns.push($1);$$.listaIns.push($3);}    
          | EXPRESION MODULO EXPRESION	  {$$= new Nodo("Artimetica",$2);$$.listaIns.push($1);$$.listaIns.push($3);}
          | DECIMAL   { $$ = new Nodo("Primitivo", $1);} 
          | ENTERO	  { $$ = new Nodo("Primitivo", $1);} 
          | TRUE	  { $$ = new Nodo("Primitivo", $1);} 
          | FALSE	  { $$ = new Nodo("Primitivo", $1);}       
          | CADENA    { $$ = new Nodo("Primitivo", $1);} 
          | CARACTER  { $$ = new Nodo("Primitivo", $1);}   
          | IDENTIFICADOR PARIZQ LISTAEXPRESION PARDER 	{$$ = new Nodo("LlamadaFM", $1); $$.encontrarNodo($3)}  
          | IDENTIFICADOR PARIZQ PARDER 		    { $$ = new Nodo("LlamadaFM", $1);}   
          | IDENTIFICADOR	{ $$ = new Nodo("Variable", $1);}
          | PARIZQ LISTAEXPRESION PARDER {$$ = new Nodo("Condiciones", "Condiciones"); $$.encontrarNodo($2)}  		          
          	         
          ;