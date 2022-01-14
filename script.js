// Write your JavaScript code here!
window.addEventListener("load", function() {

    let listedPlanets;
    document.querySelector("#faultyItems").style.visibility = "hidden";
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch(); // Promise object
    console.log(listedPlanetsResponse);
    listedPlanetsResponse.then(planets => {
        console.log(planets);
        let planet = pickPlanet(planets);

        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        addDestinationInfo(document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image);
        
        const form = document.getElementsByTagName("form")[0];
        form.addEventListener("submit", function (event) {
           const list = document.querySelector("#faultyItems");
           const pilot = document.querySelector("#pilotName").value;
           const coPilot = document.querySelector("input[name='copilotName']").value;
           const fuelLevel = document.querySelector("input[name='fuelLevel']").value;
           const cargoMass = document.querySelector("input[name='cargoMass']").value;
           formSubmission(document, list, pilot, coPilot, fuelLevel, cargoMass);
event.preventDefault();
   
       });
    });
   
});