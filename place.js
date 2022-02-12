const API_URL = "http://localhost:9009"
const placeId = 1

let response
let indVisitors
let groupVisitors
let stories

function requestToServer(url, command, body){
    let xhr = new XMLHttpRequest();
    xhr.open(command, url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.onreadystatechange = function (e){
        if (xhr.readyState == 4 && xhr.status == 200){
            response = JSON.parse(xhr.responseText);
            console.log('r', response)
        }
    }

    if (command === "POST"){
        xhr.send(body)
    } else if (command === "GET"){
        xhr.send()
    }

}

//GET places
requestToServer(`${API_URL}/places`, 'GET', null)
setTimeout(() => { 
    places = response 
    if (places.length > 0){
        for (let i = 0;i < places.length ; i++){
            //GET ind visitors of each place
            requestToServer(`${API_URL}/places/${placeId}/visitors/individual`, 'GET', null)
            setTimeout(() => { 
                indVisitors = response 
            }, 3000)

            //GET group visitors of each place
            requestToServer(`${API_URL}/places/${placeId}/visitors/group`, 'GET', null)
            setTimeout(() => { 
                groupVisitors = response 
            }, 3000)

            //GET stories of each place (convert time int into date)
            requestToServer(`${API_URL}/places/${placeId}/stories`, 'GET', null)
            setTimeout(() => { 
                stories = response 
            }, 3000)
        }
    }
}, 3000)



//POST story of each place
const newStory = {
    created_timeInt: 16000000,
    content: "What a trip",
    user_id: 1,
    place_id: placeId
}
requestToServer(`${API_URL}/stories`, 'POST', newStory)
setTimeout(() => {console.log('response from posting new story', response)}, 3000)
