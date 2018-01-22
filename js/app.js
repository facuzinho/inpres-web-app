$(".button-collapse").sideNav();

const map = new google.maps.Map(document.getElementById("map"), {
  center: { lat: -34.397, lng: 150.644 },
  zoom: 8
});


const config = {
  apiKey: "AIzaSyD7PRyMw8tX_YN1F5KIPAhMr7og0ha27YQ",
  authDomain: "inpres-scrapper.firebaseapp.com",
  databaseURL: "https://inpres-scrapper.firebaseio.com/",
};
firebase.initializeApp(config);

var sismos = [];
var database = firebase.database();

/**
 * Listener para cambios en base de datos
 */
var Sismos = firebase.database().ref('Sismos').orderByKey();
Sismos.on('value', function(snapshot) {
  // console.log(snapshot.val());
  snapshot.forEach(function(childSnapshot) {
    // console.log(childSnapshot.val().timestamp)
    sismos.unshift(childSnapshot)
  });

  // Limpiamos lista y redibujamos
  $('#lista-sismos').html('');
  dibujarListaSismos();

  // Agregamos click listener para elementos de lista
  $('.sismos-list-item').click(sismoClickListener);
});

/**
 * Dibujar lista HTML de sismos en base de datos
 */
function dibujarListaSismos() {
  for (let i = 0; i < sismos.length; i++) {
    let sismo = sismos[i].val();
    let cadena ='<li id=' + sismo.timestamp + ' class="collection-item avatar sismos-list-item"> ' + 
                  '<p class="circle">' + '<strong class="magnitud">' +  sismo.magnitud + '</strong> </p>' +
                  '<span class="title">' + sismo.fecha + ' - ' + sismo.hora + 'hs</span>' + 
                  '<p>' + sismo.lugar + '</p> '+ 
                '</li>'
    $('#lista-sismos').append(cadena);
  }
}

function sismoClickListener() {
  let sismoTimestamp = this.id;
  let sismo;
  for (let i = 0; i < sismos.length; i++) {
    if(sismos[i].val().timestamp == sismoTimestamp) {
      sismo = sismos[i].val();
      break;
    }
  }
  // con  sole.log(sismo);

  // Dibujamos marcador
  let markerPos = new google.maps.LatLng(-25.363, 131.044);
  var marker = new google.maps.Marker({
    position: markerPos,
    map: map
  });

  map.setCenter(markerPos);
};








