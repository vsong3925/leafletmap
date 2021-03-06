const API_KEY = "pk.eyJ1Ijoia3dhbWU2IiwiYSI6ImNra2VscHl5eDAxMTMybnFueDZ0d2dxN3cifQ.-Ju8fppjeiM4KteEOq_RkQ";


// **********************************
// ********** baseMap() *************
// **********************************
    
// Define streetmap and darkmap layers
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
});

var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
});
// Create our map, giving it the streetmap and earthquakes layers to display on load
var myMap = L.map("mapid", {
    center: [
    37.09, -95.71
    ],
    zoom: 4,
    layers: streetmap
});
// Define a baseMaps object to hold our base layers
var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
};

// Create overlay object to hold our overlay layer
var layers = new L.LayerGroup();
var layers2 = new L.LayerGroup();
// var tectnoicPlate = new L.LayerGroup();

var overlayMaps = {
    "Earthquakes": layers,
    "Tectonic Plate": layers2
    // TectonicPlate: tectonicPlate
};

// Create a layer control
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);


// *****************************************
// ********** Earthquake Layer *************
// *****************************************

var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// query the earthquake data
d3.json(queryUrl).then(data => {  
    earthquakeData = data.features
   
    // style function
    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 0.7,
            fillColor: getColor(feature.geometry.coordinates[2]),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        }
    }

    // color function
    function getColor(depth) {
        
        if (depth >= -10 & depth < 10) {return "#28B463"} // green

        else if (depth >= 10 & depth < 30) {return "#82E0AA"}  // light green

        else if (depth >= 30 & depth < 50) {return "#F9E79F"} // light yellow
        
        else if (depth >= 50 & depth < 70) {return "#F7DC6F"} // orange ish yellow

        else if (depth >= 70 & depth < 90) {return "#F5B041"} // dark orange

        else if (depth >= 90) {return "#E74C3C"} // red
    }

    // radius function
    function getRadius(magnitude) {

        if(magnitude === 0) {return 1}
        return magnitude * 4;
    }
    
    // plot data and create the earthquake layer
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            //console.log(data);
            return L.circleMarker(latlng);
        },
        style: styleInfo,
        onEachFeature: function(feature, layer) {
            layer.bindPopup(`<h2>${feature.properties.place}</h2><hr><h4>${new Date(feature.properties.time)}</h4>`) //("Magnitude: " + feature.properties.mag);
        }
    }).addTo(layers).addTo(myMap);
});

// *****************************************
// ********** Earthquake Layer *************
// *****************************************

tectonicPlateUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

d3.json(tectonicPlateUrl).then(data => {

    // style function
    function styleInfo(feature) {
        return {
            fillColor: "#F7DC6F",
            color: "#F7DC6F",
            stroke: true,
            weight: 2
        }
    }

    // plot data and create the earthquake layer
    L.geoJSON(data, {
        style: styleInfo
    }).addTo(layers2).addTo(myMap);
})





