const rideListElement = document.querySelector("#rideList");
const allRides = getAllRides();


allRides.forEach(async ([id, value])=>{
    const ride = JSON.parse(value);
    ride.id = id;

    const itemElement = document.createElement("li");
    itemElement.id = ride.id;
    itemElement.className = "d-flex gap-2 align-items-center p-2 shadow";
    rideListElement.appendChild(itemElement);

    itemElement.addEventListener("click", ()=>{
        window.location.href = `./detail.html?id=${ride.id}`;

    })

    const firstPosition = ride.data[0];
    const firstLocationDta =  await getLocationData(firstPosition.latitude, firstPosition.longitude);

    const dataElement = document.createElement("div");
    dataElement.className = "flex-fill d-flex flex-column"

    const mapID = `map${ride.id}`;
    const mapElement = document.createElement("div");
    mapElement.id = mapID;
    mapElement.style = "width:100px; height:100px";
    mapElement.classList = "bg-secondary rounded-3"

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

    itemElement.appendChild(mapElement);
    itemElement.appendChild(dataElement);

    const map = L.map(mapID, {zoomControl: false, dragging: false, attributionControl: false, scrollWheelZoom: false});
    map.setView([firstPosition.latitude, firstPosition.longitude], 10)
    L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
	maxZoom: 50,
    }).addTo(map);

    L.marker([firstPosition.latitude, firstPosition.longitude]).addTo(map)
})
