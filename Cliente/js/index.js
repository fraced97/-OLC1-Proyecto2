var textoJson
function Analizar(){

    //var texto = document.getElementById("inputTextToSave").value;
    var texto = txtCode.getValue();



    console.log(texto);
    //alert("ENTRO EN CONN");
    var url='http://localhost:8080/Calcular/';

    $.post(url,{text:texto},function(data,status){
        if(status.toString()=="success"){
            alert("El resultado es: "+data.toString());
            textoJson=data.toString();
        }else{
            alert("Error estado de conexion:"+status);
        }
    }); 
}



function Analizar2(){

  //var texto = document.getElementById("inputTextToSave").value;
  var texto = txtCode2.getValue();



  console.log(texto);
  //alert("ENTRO EN CONN");
  var url='http://localhost:8080/CajaTxt2/';

  $.post(url,{text:texto},function(data,status){
      if(status.toString()=="success"){
          alert("El resultado es: "+data.toString());
          textoJson=data.toString();
      }else{
          alert("Error estado de conexion:"+status);
      }
  }); 
}

function AnalisisCopiaC(){

  //var texto = document.getElementById("inputTextToSave").value;
  var texto = txtCode2.getValue();



  console.log(texto);
  //alert("ENTRO EN CONN");
  var url='http://localhost:8080/CajaTxt21/';

  $.post(url,{text:texto},function(data,status){
      if(status.toString()=="success"){
          alert("El resultado es: "+data.toString());
          ///textoJson=data.toString();
          document.getElementById("reporteClase").value=data.toString();
      }else{
          alert("Error estado de conexion:"+status);
      }
  }); 
}
function AnalisisCopiaFM(){

  //var texto = document.getElementById("inputTextToSave").value;
  var texto = txtCode2.getValue();



  console.log(texto);
  //alert("ENTRO EN CONN");
  var url='http://localhost:8080/CajaTxt22/';

  $.post(url,{text:texto},function(data,status){
      if(status.toString()=="success"){
          alert("El resultado es: "+data.toString());
          ///textoJson=data.toString();
          document.getElementById("reporteFuncion").value=data.toString();
      }else{
          alert("Error estado de conexion:"+status);
      }
  }); 
}




function AnalisisCopiaV(){

  //var texto = document.getElementById("inputTextToSave").value;
  var texto = txtCode2.getValue();



  console.log(texto);
  //alert("ENTRO EN CONN");
  var url='http://localhost:8080/CajaTxt23/';

  $.post(url,{text:texto},function(data,status){
      if(status.toString()=="success"){
          alert("El resultado es: "+data.toString());
          ///textoJson=data.toString();
          document.getElementById("reporteVariable").value=data.toString();
      }else{
          alert("Error estado de conexion:"+status);
      }
  }); 
}


function pasarValor(){
    localStorage.setItem("textvalue1",textoJson);
    return false;
}
function quitarValor(){
    localStorage.setItem("textvalue1","");
    return false;
}
function crearModel(){
    var aux;

                  aux = localStorage.getItem("textvalue1");
                  console.log(localStorage.getItem("textvalue1"));
                  var obj = JSON.parse(aux);
                  var jsonData = [obj];
                $('#jstree-tree')
                        .on('changed.jstree', function (e, data) {
                        var objNode = data.instance.get_node(data.selected);
                            $('#jstree-result').html('Selected: <br/><strong>' + objNode.id+'-'+objNode.text+'</strong>');
                      })
                    .jstree({
                  core: {
                   data: jsonData
                      }
                              });
}


/*var jsonData = [
    textoJson
  ];
  
  $('#jstree-tree')
    .on('changed.jstree', function (e, data) {
      var objNode = data.instance.get_node(data.selected);
      $('#jstree-result').html('Selected: <br/><strong>' + objNode.id+'-'+objNode.text+'</strong>');
    })
    .jstree({
    core: {
      data: jsonData
    }
  });
  
  function tronar(){
    $('.modal-backdrop').hide();
  }*/