let dropDown = document.getElementById('countrySelect');

let addOptionsList = (data) => {
    for (var i = 0; i < data.length; i++) {
        if(i == 0){
            dropDown.options[dropDown.options.length] = new Option('Select Country','');
        }else {
             dropDown.options[dropDown.options.length] = new Option(data[i].name, data[i].name);
        }
    }
}

fetch('https://restcountries.eu/rest/v2/all?fields=iso2Code;name')
    .then(res => res.json())
    .then(data => addOptionsList(data))

document.querySelector('select').addEventListener('change', function (ev) {
    fetchDetails(ev.target.value)
});

let fetchDetails = (countryName) => {
    fetch('https://restcountries.eu/rest/v2/name/' + countryName)
        .then(res => res.json())
        .then(data => detailsDatas(data))
}

let detailsDatas = (data) => {
    let dataCountry = [{
        capital: data[0].capital,
        region: data[0].region,
        subregion: data[0].subregion,
        population: data[0].population,
        timezone: data[0].timezones[0],
        lat:data[0].latlng[0],
        lang:data[0].latlng[1]
    }]

    mapa(dataCountry[0].lat,dataCountry[0].lang)

    document.getElementById("countryFlag").src = data[0].flag
    document.getElementById("countryData").innerHTML = `<span> Capital: ${dataCountry[0].capital} </span> </br> 
                                                        <span>Region: ${dataCountry[0].region} </span> </br>
                                                        <span>Subregion: ${dataCountry[0].subregion} </span> </br>
                                                        <span>Population ${dataCountry[0].population} </span> </br>
                                                        <span>timezone ${dataCountry[0].timezone} </span> </br>`
}

let mapa = (lat,lang) => {
    document.getElementById('mapid').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
       
    osmLayer = new L.TileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11'
    })

    var map = new L.Map('map');
    map.setView(new L.LatLng(lat,lang), 6 );
    L.circle([lat,lang], {
		color: 'blue',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 2000
	}).addTo(map).bindPopup("here");

    map.addLayer(osmLayer);
}