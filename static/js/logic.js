//JSON URL

// https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson
//https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson




// Create the map
var map = L.map('map').setView([0, 0], 2);

// Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Fetch earthquake data for Daily
d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson').then(function(data) {

//https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson


    // Function to determine marker size based on magnitude
    function markerSize(magnitude) {
        return magnitude * 4; // Adjust the multiplier as needed
    }

    // Function to determine marker color based on depth
    function getColor(depth) {
        return depth > 100 ? '#FF0000' :
               depth > 50  ? '#FF7F00' :
               depth > 20  ? '#FFFF00' :
               depth > 0   ? '#7FFF00' :
                             '#00FF00';
    }

    // Loop through the features in the GeoJSON data
    data.features.forEach(function(feature) {
        var coords = feature.geometry.coordinates;
        var magnitude = feature.properties.mag;
        var depth = coords[2];
        var color = getColor(depth);
        var size = markerSize(magnitude);

        // Create a circle marker for each earthquake
        L.circleMarker([coords[1], coords[0]], {
            radius: size,
            fillColor: color,
            color: '#000',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map)
        .bindPopup("Magnitude: " + magnitude + "<br>Depth: " + depth + " km<br>" + feature.properties.place);
    });

    // // Create a legend
    // var legend = L.control({position: 'bottomright'});
    // legend.onAdd = function () {
    //     var div = L.DomUtil.create('div', 'legend');
    //     div.innerHTML += '<strong>Depth (km)</strong><br>';
    //     div.innerHTML += '<i style="background: #FF0000"></i> > 100<br>';
    //     div.innerHTML += '<i style="background: #FF7F00"></i> 50 - 100<br>';
    //     div.innerHTML += '<i style="background: #FFFF00"></i> 20 - 50<br>';
    //     div.innerHTML += '<i style="background: #7FFF00"></i> 0 - 20<br>';
    //     div.innerHTML += '<i style="background: #00FF00"></i> < 0<br>';
    //     return div;
    // };
    // legend.addTo(map);



    // Create a legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function () {
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML += '<strong>Depth (km)</strong><br>';
    div.innerHTML += '<i style="background: #FF0000"></i> > 100<br>';
    div.innerHTML += '<i style="background: #FF7F00"></i> 50 - 100<br>';
    div.innerHTML += '<i style="background: #FFFF00"></i> 20 - 50<br>';
    div.innerHTML += '<i style="background: #7FFF00"></i> 0 - 20<br>';
    div.innerHTML += '<i style="background: #00FF00"></i> < 0<br>';
    return div;
};

// Adding the legend to the map
legend.addTo(map);
});





