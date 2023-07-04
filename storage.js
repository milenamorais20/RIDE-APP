function createNewRide(){
    const rideID = Date.now();
    const rideRecord = {
        data: [],
        startTime: rideID,
        stopTime: null
    }
    saveRide(rideID, rideRecord);
    return rideID;
}

function saveRide(rideID, rideRecord){
    localStorage.setItem(rideID, JSON.stringify(rideRecord))
}

function getRideRecord(rideID) {
    return JSON.parse(localStorage.getItem(rideID));

}
function getAllRides() {
    return Object.entries(localStorage)
}

function addPosition( rideID, position){
    const rideRecord = getRideRecord(rideID);
    const newData = {
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
        altitudeAccuracy: position.coords.altitudeAccuracy,
        headeing: position.coords.headeing,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        speed:position.coords.speed,
        timestamp: position.timestamp
    }
    rideRecord.data.push(newData);
    saveRide(rideID,rideRecord);
}

function updateStopTime(rideID){
    const rideRecord = getRideRecord(rideID);
    rideRecord.stopTime = Date.now();
    saveRide(rideID,rideRecord);
}