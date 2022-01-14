// Write your helper functions here!
try {
    require('isomorphic-fetch');
} catch (e) {
    //do nothing
}

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    document.querySelector("#missionTarget").innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">
    `;
}

function validateInput(testInput) {
    if (testInput === '') {
        return "Empty";
    } else if (isNaN(testInput)) {
        return "Not a Number";
    } else {
        return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
    let valid = 0;

    if (validateInput(pilot) === 'Empty') {
        alert("All fields are required!");
        document.querySelector("#pilotStatus").innerHTML = `Pilot is not Ready`;
    } else if(validateInput(pilot) !== 'Not a Number') {
        alert("Make sure to enter valid information for each field!");
        document.querySelector("#pilotStatus").innerHTML = `Pilot is not Ready`;
    } else {
        valid++;
        document.querySelector("#pilotStatus").innerHTML = `Pilot ${pilot} is ready for launch`;
    }

    if (validateInput(copilot) === 'Empty') {
        alert("All fields are required!");
        document.querySelector("#copilotStatus").innerHTML = `Co-pilot is not Ready`;
    } else if(validateInput(copilot) !== 'Not a Number') {
        alert("Make sure to enter valid information for each field!");
        document.querySelector("#copilotStatus").innerHTML = `Co-pilot is not Ready`;
    } else {
        valid++;
        document.querySelector("#copilotStatus").innerHTML = `Co-pilot ${copilot} is ready for launch`;
    }

    if (validateInput(fuelLevel) === 'Empty') {
        alert("All fields are required!");
        document.querySelector("#fuelStatus").innerHTML = "Fuel level too low for launch"
    } else if (validateInput(fuelLevel) === 'Not a Number') {
        alert("Make sure to enter valid information for each field!");
    } else if (fuelLevel < 10000 && validateInput(fuelLevel) === "Is a Number") {
        alert("Fuel level too low for launch");
        document.querySelector("#fuelStatus").innerHTML = "Fuel level too low for launch"
        document.querySelector("#launchStatus").innerHTML = "Shuttle Not Ready for Launch";
        document.querySelector("#launchStatus").style.color = "rgb(199, 37, 78)";
    } else {
        document.querySelector("#fuelStatus").innerHTML = "Fuel level high enough for launch";
        valid++;
    }

    if (validateInput(cargoMass) === 'Empty') {
        alert("All fields are required!");
    } else if (validateInput(cargoMass) === 'Not a Number') {
        alert("Make sure to enter valid information for each field!");
    } else if (cargoMass > 10000 && validateInput(cargoMass) === 'Is a Number') {
        alert("Cargo mass too heavy for launch");
        document.querySelector("#cargoStatus").innerHTML = "There is too much mass for the shuttle to take off"
        document.querySelector("#launchStatus").innerHTML = "Shuttle Not Ready for Launch";
        document.querySelector("#launchStatus").style.color = "rgb(199, 37, 78)";
    } else {
        document.querySelector("#cargoStatus").innerHTML = "Cargo mass low enough for launch"
        valid++;
    }

    if (valid === 4) {
        document.querySelector("#launchStatus").style.color = "rgb(65, 159, 106)";
        document.querySelector("#launchStatus").innerHTML = "Shuttle is Ready for Launch";
    }

    list.style.visibility = "visible";
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(result => result.json());

    return planetsReturned;
}

function pickPlanet(planets) {
    let randomIndex = Math.floor(Math.random()*planets.length);
    return planets[randomIndex];
}

try {
    module.exports.addDestinationInfo = addDestinationInfo;
    module.exports.validateInput = validateInput;
    module.exports.formSubmission = formSubmission;
    module.exports.pickPlanet = pickPlanet; 
    module.exports.myFetch = myFetch;
} catch (e) {
    // do nothing
}
