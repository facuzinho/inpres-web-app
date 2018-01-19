console.log("Hola mundo!");

const map = new google.maps.Map(document.getElementById("map"), {
  center: { lat: -34.397, lng: 150.644 },
  zoom: 8
});

$(".button-collapse").sideNav();

console.log(map.center);


var config = {
  apiKey: "AIzaSyD7PRyMw8tX_YN1F5KIPAhMr7og0ha27YQ",
  authDomain: "inpres-scrapper.firebaseapp.com",
  databaseURL: "https://inpres-scrapper.firebaseio.com/",
  };
firebase.initializeApp(config);

var sismos = [];
var database = firebase.database();

var Sismos = firebase.database().ref('Sismos').orderByKey();
Sismos.on('value', function(snapshot) {
  console.log(snapshot.val());
  snapshot.forEach(function(childSnapshot) {
    console.log(childSnapshot.val().timestamp)
    sismos.unshift(childSnapshot)
  });

  dibujarListaSismos();
});

function dibujarListaSismos() {

  sismos.forEach(function(sismo) { 
    var lugar = sismo.val().lugar;
    var hora = sismo.val().hora;
    var fecha = sismo.val().fecha;
    var magnitud = sismo.val().magnitud;
    var cadena =' <li class="collection-item avatar"> ' + 
                    '<p class="circle">' + '<strong class="magnitud">' +  magnitud + '</strong> </p>' +
                    '<span class="title">' + fecha + ' - ' + hora + 'hs</span>' + 
                    '<p>' + lugar + '</p> '+ 
                  '</li>'
    
    jQuery('#lista-sismos').append(cadena)

  });

}







