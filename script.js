// Write your JavaScript code here!
window.addEventListener("load", function() {

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(destinations) {
         let randomDestinationIndex = Math.floor(Math.random() * destinations.length);
         // console.log(destinations[randomDestinationIndex]);
         document.getElementById("missionTarget").innerHTML = `
            <h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${destinations[randomDestinationIndex].name}</li>
                  <li>Diameter: ${destinations[randomDestinationIndex].diameter}</li>
                  <li>Star: ${destinations[randomDestinationIndex].star}</li>
                  <li>Distance from Earth: ${destinations[randomDestinationIndex].distance}</li>
                  <li>Number of Moons: ${destinations[randomDestinationIndex].moons}</li>
               </ol>
            <img src="${destinations[randomDestinationIndex].image}"></img>
            `;

      });
   });

   let form = document.querySelector("form");

   form.addEventListener("submit", function(event) {

      let inputPilotName = form.pilotName.value;
      let inputCopilotName = form.copilotName.value;
      let inputFuelLevel = form.fuelLevel.value;
      let inputCargoMass = form.cargoMass.value;
      let error = false;

      if (inputPilotName === "" || !isNaN(inputPilotName) || inputCopilotName === "" || !isNaN(inputCopilotName)) {
         alert("Please make sure the Pilot and Co-pilot have names with only letters before submitting the form.");
         error = true;
         event.preventDefault();
      };

      if (isNaN(inputFuelLevel) || inputFuelLevel === "" || isNaN(inputCargoMass) || inputCargoMass === "") {
         alert("Plese make sure that there are numeric values for the Fuel Level and the Cargo Mass.");
         error = true;
         event.preventDefault();
      };

      Number(inputFuelLevel);
      Number(inputCargoMass);

      document.getElementById("pilotStatus").innerHTML = `Pilot: ${inputPilotName}`;
      document.getElementById("copilotStatus").innerHTML = `Copilot: ${inputCopilotName}`;

      if (inputFuelLevel < 10000 || inputCargoMass > 10000 || error) {
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("launchStatus").style.color = "red";   
         document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready for Launch";
         if (inputFuelLevel < 10000) {
            document.getElementById("fuelStatus").innerHTML = "Not enough fuel for launch."; 
         } 
         if (inputCargoMass > 10000) {
            document.getElementById("cargoStatus").innerHTML = "Cargo too heavy for launch.";
         }
         event.preventDefault();
      } else {
         document.getElementById("faultyItems").style.visibility = "hidden";
         document.getElementById("launchStatus").style.color = "green";
         document.getElementById("launchStatus").innerHTML = "Shuttle is Ready for Launch!";
         event.preventDefault();
      }

   });

});
