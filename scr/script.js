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
const lat = 51.409486;
const lng = -0.192261;

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

var Stamen_Toner = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    ext: 'png'
});
//Stamen_Toner.addTo(map)

var Stamen_TonerHybrid = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-hybrid/{z}/{x}/{y}{r}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
});
//Stamen_TonerHybrid.addTo(map)

var NASAGIBS_ViirsEarthAtNight2012 = L.tileLayer('https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
    attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
    bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
    minZoom: 1,
    maxZoom: 8,
    format: 'jpg',
    time: '',
    tilematrixset: 'GoogleMapsCompatible_Level'
});
//NASAGIBS_ViirsEarthAtNight2012.addTo(map)

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

// Extended `LayerGroup` that makes it easy
// to do the same for all layers of its members
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

// object with layers
const overlayMaps = {
    "Rottenburg": pA,
    "Dresden": pB,
};

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
        // map.fitWorld();
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

new L.Control.CustomButtons(null, overlayMaps, { collapsed: false }).addTo(map);

//GeoJson test
var geojsonFeature =
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    8.519897460937498,
                    49.656960786759136
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    9.5855712890625,
                    50.61810290492478
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    8.448486328125,
                    50.89263913111063
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    10.3436279296875,
                    51.227527905265006
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    10.530395507812498,
                    49.500242164537745
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    11.2225341796875,
                    50.87184477102432
                ]
            }
        }
    ]

};

//GeoJson Marker
var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

//Add GeoJson to map
L.geoJSON(geojsonFeature, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }
}).addTo(map);