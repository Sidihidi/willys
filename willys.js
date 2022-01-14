const firebaseConfig = {
  apiKey: "AIzaSyDwWn5SfR4gX0S-To6q9Un2bYTauAiaA0k",
  authDomain: "willys-13248.firebaseapp.com",
  databaseURL: "https://willys-13248-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "willys-13248",
  storageBucket: "willys-13248.appspot.com",
  messagingSenderId: "650406185187",
  appId: "1:650406185187:web:c73bd02bdbf2a459769dd6",
  measurementId: "G-4C00BPQH2Y"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
let refToData = db.ref();

refToData.once('value', snapshot => {
  var resultado = snapshot.val();
  var tamao=Object.keys(resultado.usuario).length
  console.log(tamao);
  console.log(resultado.usuario[0].nombre);

  var nombreRes=[];
  var expRes=[];
  var dsfRes=[];

  for(var j=0;j < tamao;j++){
    console.log(j);
    nombreRes.push(resultado.usuario[j].nombre);
    expRes.push(resultado.usuario[j].expediciones);
    dsfRes.push(resultado.usuario[j].desafios);
  }

  var json_datos = [];
  for (var i = 0; i < nombreRes.length; i++) {
      var js_objeto = new Object();
      js_objeto.nombre = nombreRes[i];
      js_objeto.expediciones = expRes[i];
      js_objeto.desafios = dsfRes[i];

      json_datos.push(js_objeto);
  }

  $("div#tabla").append('<table id="example" class="table table-striped table-bordered" cellspacing="0" width="100%"><thead><tr><th>nombre</th><th>expediciones</th><th>desafios</th></tr></thead></table>')
            var table = $('#example').DataTable({
                responsive: true,
                dom: "B<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
                buttons: ['print', 'copyHtml5', 'excelHtml5', 'csvHtml5', 'pdfHtml5'],
                data: json_datos,
                columns: [
                    { data: "nombre" },
                    { data: "expediciones" },
                    { data: "desafios" }
                ]

            });

  document.getElementById("Enviar").addEventListener("click", myFunction);
  function myFunction() {
    var nm= document.getElementById("nombre").value;
    var dsf=document.getElementById("desafios").value;
    var exp=document.getElementById("Expediciones").value;
    firebase.database().ref('usuario/'+tamao).set(
      {  "nombre": nm,  
         "expediciones" : exp,
         "desafios" : dfs})
  }
  console.log( tamao);
  console.log(snapshot.val());
});

/*firebase.database().ref('usuario/3').set(
  {  "nombre": "Lendo",  
    "expediciones" : "no",
    "desafios" : "no"})*/


