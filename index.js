const API_URL = "http://localhost:9009"
let places = []

let map;
const markers = [
    {
        lat: 37.8651,
        lng: -119.5383,
        people_come: 100,
    },
    {
        lat: 36.4864,
        lng: -118.5658,
        people_come: 200,
    },
    {
        lat: 36.8879,
        lng: -118.5551,
        people_come: 500
    }
]


function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.8272, lng: -122.2913 },
        zoom: 8
    })

    console.log('places', places)

    places.forEach(place => {var eachMarker = new google.maps.Marker({
        map: map,
        position: { lat: place.place_latitude, lng: place.place_longitude },
        icon: {
            path: 'm 12,2.4000002 c -2.7802903,0 -5.9650002,1.5099999 -5.9650002,5.8299998 0,1.74375 1.1549213,3.264465 2.3551945,4.025812 1.2002732,0.761348 2.4458987,0.763328 2.6273057,2.474813 L 12,24 12.9825,14.68 c 0.179732,-1.704939 1.425357,-1.665423 2.626049,-2.424188 C 16.809241,11.497047 17.965,9.94 17.965,8.23 17.965,3.9100001 14.78029,2.4000002 12,2.4000002 Z',
            fillColor: place.bgColor,
            fillOpacity: 1.0,
            strokeColor: 'black',
            strokeWeight: 1,
            scale: 2,
            anchor: new google.maps.Point(12,24)
        },
        
        })
        let iw = new google.maps.InfoWindow({
            content: `${place.place_name}<br/><b>${place.people_come + " hikers"}</b>  are coming here <br/> <a href="place.html" ><p style="margin-top: 10px">Check out</p></a>`
        })
        google.maps.event.addListener(eachMarker, "click", function(){
            iw.open(map, this)
        })
    })
}

setTimeout(initMap, 3000)


function getAllHikingPlaces(){
    console.log('trying to get places')
    let url = `${API_URL}/places`
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.onreadystatechange = function (e){
        if (xhr.readyState == 4 && xhr.status == 200){
            places = JSON.parse(xhr.responseText);
            console.log('here', places)

            if(places.length > 0){
                for (let i = 0; i < places.length; i++){
                    if (places[i].people_come <= 1000){
                        places[i].bgColor = `rgba(255, 0, 0, ${places[i].people_come/1000})`
                    } else {
                        places[i].bgColor = `rgba(255, 0, 0, 1)`
                    }
                }
            }
        }
    }
    xhr.send()
}

getAllHikingPlaces()