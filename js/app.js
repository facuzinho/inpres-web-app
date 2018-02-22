$('.button-collapse').sideNav({
    menuWidth: 300, // Default is 300
    edge: 'right', // Choose the horizontal origin
    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable: true, // Choose whether you can drag to open on touch screens,
  }
);

$(document).ready(function(){
  $('.modal').modal();
});


const map = new google.maps.Map(document.getElementById("map"), {
  center: { lat: -34.397, lng: 150.644 },
  zoom: 6,
  mapTypeId: 'terrain'
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
 **/

var Sismos = firebase.database().ref('Sismos').orderByKey();
Sismos.on('value', function(snapshot) {
  // console.log(snapshot.val());
  snapshot.forEach(function(childSnapshot) {
    // console.log(childSnapshot.val().timestamp)
    sismos.unshift(childSnapshot.val())
  });
  
  //Routeo de URL's para un sismo especifico
  let ruta = window.location.hash;

  for (i = 0; i < sismos.length; i++) { 
    if (ruta.slice(2) == sismos[i].timestamp) {
      lista_sismos.marcarEnMapa(sismos[i].latitud, sismos[i].longitud, sismos[i].lugar, sismos[i].fecha, sismos[i].hora, sismos[i].profundidad,sismos[i].magnitud);
      break;
    }
  }
  
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




