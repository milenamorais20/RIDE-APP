const params = new URLSearchParams(window.location.search);
const rideID = params.get("id")
console.log(rideID);

const ride = getRideRecord(rideID)

document.addEventListener("DOMContentLoaded", async ()=>{
    const firstPosition = ride.data[0];
    const firstLocationDta =  await getLocationData(firstPosition.latitude, firstPosition.longitude);

    const dataElement = document.createElement("div");
    dataElement.className = "flex-fill d-flex flex-column";

    const cityDiv = document.createElement("div");
    cityDiv.innerText = `${firstLocationDta.city} - ${firstLocationDta.countryCode}`;
    cityDiv.classList = "text-primary mb-2"
    dataElement.appendChild(cityDiv);

    const maxSpeedDiv = document.createElement("div");
    maxSpeedDiv.innerText = `Max speed: ${getMaxSpeed(ride.data)} km/h`;
    maxSpeedDiv.classList = "h5"
    dataElement.appendChild(maxSpeedDiv);

    const distanceDiv = document.createElement("div");
    distanceDiv.innerText = `Distance: ${getDistance(ride.data)}`;
    dataElement.appendChild(distanceDiv);

    const durationDiv = document.createElement("div");
    durationDiv.innerText = `Duration: ${getDuration(ride)}`;
    dataElement.appendChild(durationDiv);

    const dateDiv = document.createElement("div");
    dateDiv.innerText = `Date: ${getStartDate(ride)}`;
    dateDiv.classList = "text-secondary mt-1"
    dataElement.appendChild(dateDiv);

    document.querySelector("#data").appendChild(dataElement);

    const deleteBtn = document.querySelector("#deleteBtn");
    deleteBtn.addEventListener("click", ()=>{
        deleteRide(rideID);
        window.location.href = "./"
    })

    const map = L.map("mapDetail");
    map.setView([firstPosition.latitude, firstPosition.longitude], 20)
    L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
	maxZoom: 18,
    }).addTo(map);

    const positionsArray = ride.data.map(position=>{
        return[position.latitude, position.longitude]
    })

    const polyline = L.polyline(positionsArray, {color: "#F00"}).addTo(map)

    map.fitBounds(polyline.getBounds())
})
// https://leaflet-extras.github.io/leaflet-providers/preview/