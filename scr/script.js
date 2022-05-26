/**
 * Map test
 */

// config map
let config = {
    minZoom: 4,
    maxZoom: 19,
  };

  // magnification with which the map will start
const zoom = 11;
// co-ordinates
const lat = 51.409486;
const lng = -0.192261;

//  init map -> calling map 
const map = L.map("map", config).setView([lat, lng], zoom);

//Adding default layer, used to load and display tile layers on the map
// Most tile servers require attribution, which you can set under `Layer`
var osm = L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=i3sczjEplWF86jjxoGXm', {
    tileSize: 512,
    zoomOffset: -1,
    minZoom: 1,
    attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
    crossOrigin: true
});

osm.addTo(map);

//add map skins
var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 1,
    maxZoom: 16,
    ext: 'jpg'
});
Stamen_Watercolor.addTo(map);

var OpenStreetMap_DE = L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
//OpenStreetMap_DE.addTo(map);

//Marker test
var marker = L.marker([51.5, -0.09]).addTo(map);
marker.bindPopup("MArker").openPopup();

var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);

circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

var popup_ = L.popup()
    .setLatLng([51.513, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(map);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);

