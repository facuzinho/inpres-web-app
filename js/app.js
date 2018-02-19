$(".button-collapse").sideNav();
$(document).ready(function(){
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();
});

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
    sismos.unshift(childSnapshot.val())
  });
  
});

var marker = null;

var lista_sismos = new Vue({
  el: '#lista-sismos',
  data: {
    listaSismos: sismos
  },

  methods: { 
    marcarEnMapa: function(latitud, longitud, lugar, fecha, hora, profundidad, magnitud) {
      
      if (marker != null) {
        marker.setMap(null);
      }

      let contentString = '<div> <p style="font-weight: bold;">' + lugar + '</p> ' + 
                               '<p>Fecha: '+ fecha +'</p>' +
                               '<p>Hora: ' + hora + '</p>' +
                               '<p>Profundidad: ' + profundidad + ' km</p>' +
                               '<p>Magnitud: ' + magnitud + '</p>' +
                          '</div>'

      let infowindow = new google.maps.InfoWindow({content: contentString})
      let latLong = new google.maps.LatLng(latitud, longitud)
      
      marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position: latLong,
        map: map
      })
      infowindow.open(map, marker)
      map.setCenter(latLong)

    }
  }
});


