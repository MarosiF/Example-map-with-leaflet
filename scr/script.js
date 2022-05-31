/**
 * Map test
 */

// config map
let config = {
    minZoom: 4
    //maxZoom: 25,
};

// magnification with which the map will start
const zoom = 11;
// coordinates
const lat = 48.474664;
const lng = 8.942066;

// coordinate array with popup text
const pointsA = [
    [48.551338, 8.721353, "point A1"],
    [48.572064, 9.503174, "point A2"],
    [48.293244, 8.952484, "point A3"],
    [48.185317, 9.571838, "point A4"],
];

const pointsB = [
    [52.940363, 9.536133, "point B1"],
    [52.663058, 10.06073, "point B2"],
    [52.19919, 8.127136, "point B3"],
];

//  init map -> calling map 
const map = L.map("map", config).setView([lat, lng], 8);

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
    ext: 'jpg'
});
//Stamen_Watercolor.addTo(map);

var OpenStreetMap_DE = L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

//OpenStreetMap_DE.addTo(map);

var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
});
//CartoDB_DarkMatter.addTo(map);

/*
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
*/

var popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}
map.on('click', onMapClick);



// Extended `LayerGroup` that makes it easy
// to do the same for all layers of its members
/*
const pA = new L.FeatureGroup();
const pB = new L.FeatureGroup();
const allMarkers = new L.FeatureGroup();

// adding markers to the layer pointsA
for (let i = 0; i < pointsA.length; i++) {
    marker = L.marker([pointsA[i][0], pointsA[i][1]]).bindPopup(pointsA[i][2]);
    pA.addLayer(marker);
}

// adding markers to the layer pointsB
for (let i = 0; i < pointsB.length; i++) {
    marker = L.marker([pointsB[i][0], pointsB[i][1]]).bindPopup(pointsB[i][2]);
    pB.addLayer(marker);
    
}
*/

// centering a group of markers
map.on("layeradd layerremove", function () {
    // Create new empty bounds
    let bounds = new L.LatLngBounds();
    // Iterate the map's layers
    map.eachLayer(function (layer) {
        // Check if layer is a featuregroup
        if (layer instanceof L.FeatureGroup) {
            // Extend bounds with group's bounds
            bounds.extend(layer.getBounds());
        }
    });

    // Check if bounds are valid (could be empty)
    if (bounds.isValid()) {
        // Valid, fit bounds
        map.flyToBounds(bounds);
    } else {
        // Invalid, fit world
        //map.fitWorld();
        map.flyTo([lat, lng], 8);
    }
});

L.Control.CustomButtons = L.Control.Layers.extend({
    onAdd: function () {
        this._initLayout();
        this._addMarker();
        this._removeMarker();
        this._update();
        return this._container;
    },
    _addMarker: function () {
        this.createButton("add", "add-button");
    },
    _removeMarker: function () {
        this.createButton("remove", "remove-button");
    },
    createButton: function (type, className) {
        const elements = this._container.getElementsByClassName(
            "leaflet-control-layers-list"
        );
        const button = L.DomUtil.create(
            "button",
            `btn-markers ${className}`,
            elements[0]
        );
        button.textContent = `${type} markers`;

        L.DomEvent.on(button, "click", function (e) {
            const checkbox = document.querySelectorAll(
                ".leaflet-control-layers-overlays input[type=checkbox]"
            );

            // Remove/add all layer from map when click on button
            [].slice.call(checkbox).map((el) => {
                el.checked = type === "add" ? false : true;
                el.click();
            });
        });
    },
});



var dataGeoJson = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "name": "Test 1",
                "scan": "Rottenburg"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    8.701171874999998,
                    49.468124067331644
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Test 2",
                "scan": "Rottenburg"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    10.458984375,
                    50.819818262156545
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Test 3",
                "scan": "Dresden"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    8.1298828125,
                    51.83577752045248
                ]
            }
        }
    ]
}



var Rottenburg = L.layerGroup().addTo(map);
var Dresden = L.layerGroup().addTo(map);

function onEachFeature(feature, layer) {
    layer.on('click', function () {
            sidebar.toggle();
        });
}

var Rottenburg = L.geoJson(dataGeoJson, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {

        return L.circleMarker(latlng, {
            radius: 10,
            opacity: .5,
            color: "#ff7800",
            fillColor: "#FFFFFF",
            fillOpacity: 0.8

        }).bindTooltip(feature.properties.name);
    },

    filter: function (feature, layer) {
        return (feature.properties.scan === "Rottenburg");
    }
}).addTo(map)

var Dresden = L.geoJson(dataGeoJson, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {

        return L.circleMarker(latlng, {
            radius: 10,
            opacity: .5,
            color: "#FF19D9",
            fillColor: "#FFFFFF",
            fillOpacity: 0.2

        }).bindTooltip(feature.properties.name);
    },

    filter: function (feature, layer) {
        return (feature.properties.scan === "Dresden");
    }
}).addTo(map)


// object with layers
const overlayMaps = {
    "Rottenburg": Rottenburg,
    "Dresden": Dresden
};

new L.Control.CustomButtons(null, overlayMaps, { collapsed: false }).addTo(map);
