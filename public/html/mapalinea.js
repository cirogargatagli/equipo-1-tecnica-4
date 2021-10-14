var mapalinea = L.map("map2").setView([-36.5814979,-59.9642282], 6)

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibGVnb21hbjIyMjMiLCJhIjoiY2t1NjZheWVnMDRmNDJvcDc1YWUzeHB2dSJ9.oweUVdo4N33gHM0ee--oDg'
}).addTo(mapalinea);
L.Routing.control({
  addWaypoints: false,
  draggableWaypoints: false,
  show: false,
  collapsible: false,
  waypoints: [
    L.latLng(-34.76218080327743, -58.20374182390423),
    L.latLng(-34.762489293218955, -58.20779732378119)
  ],
  routeWhileDragging: false,
  showAlternatives: false,
  show: false
}).addTo(mapalinea);
mapalinea.dragging.disable();
mapalinea.zoomControl.disable();
mapalinea.doubleClickZoom.disable();