var firstLoad;
$('.modal').modal();

const config = {
  apiKey: "AIzaSyD7PRyMw8tX_YN1F5KIPAhMr7og0ha27YQ",
  authDomain: "inpres-scrapper.firebaseapp.com",
  databaseURL: "https://inpres-scrapper.firebaseio.com/",
};

firebase.initializeApp(config);
var sismos = [];
var database = firebase.database();

var Sismos = firebase.database().ref('Sismos').orderByKey();
Sismos.on('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    sismos.unshift(childSnapshot.val())
  });
  
  //Routeo de URL's para un sismo especifico
  let ruta = window.location.hash;
  for (i = 0; i < sismos.length; i++) { 
    if(ruta.slice(2) == sismos[i].timestamp) {
      firstLoad = true;
      lista_sismos.marcarEnMapa(sismos[i].latitud, sismos[i].longitud, sismos[i].lugar, sismos[i].fecha, sismos[i].hora, sismos[i].profundidad,sismos[i].magnitud);
      break;
    }
  } 
});


var marker = null;
var lista_sismos = new Vue({
  el: '#app',
  data: {
    listaSismos: sismos,
    showGoBackButton: false,
    infoWindow: null,
    marker: new google.maps.Marker({
    }),
    map: new google.maps.Map(document.getElementById("map"), {
      center: { lat: -30.318325, lng: -64.551051 },
      zoom: 6,
      mapTypeId: 'terrain'
    })
  },
  methods: { 
    marcarEnMapa: function(latitud, longitud, lugar, fecha, hora, profundidad, magnitud) {
      if(!firstLoad) {
        if(window.matchMedia("(max-width: 768px)").matches) {
          $(".side-nav").css('transform', 'translate(-100%)');
          this.showGoBackButton = true;
        }
      }
      
      firstLoad = false;
      let contentString = '<div> <p style="font-weight: bold;">' + lugar + '</p> ' + 
                               '<p>Fecha: '+ fecha +'</p>' +
                               '<p>Hora: ' + hora + '</p>' +
                               '<p>Profundidad: ' + profundidad + ' km</p>' +
                               '<p>Magnitud: ' + magnitud + '</p>' +
                          '</div>'

      this.marker.setMap(null);

      this.infoWindow = new google.maps.InfoWindow({content: contentString});
      let latLong = new google.maps.LatLng(latitud, longitud);
      this.marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position: latLong,
        map: this.map
      });

      this.infoWindow.open(this.map, this.marker);
      this.map.setCenter(latLong);
    },
    goBack: function() {
      this.showGoBackButton = false;
      $(".side-nav").css('transform', 'translate(0%)');
    }
  }
});




