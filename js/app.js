console.log("Hola mundo!");

const  map = new google.maps.Map(document.getElementById("map"), {
  center: { lat: -34.397, lng: 150.644 },
  zoom: 8
});

console.log(map.center);