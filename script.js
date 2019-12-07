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

      if (inputPilotName === "" || !isNaN(inputPilotName) || inputCopilotName === "" || !isNaN(inputCopilotName)) {
         alert("Please make sure the Pilot and Co-pilot have names with only letters before submitting the form.");
         event.preventDefault();
      };

      if (isNaN(inputFuelLevel) || inputFuelLevel === "" || isNaN(inputCargoMass) || inputCargoMass === "") {
         alert("Plese make sure that there are numeric values for the Fuel Level and the Cargo Mass.");
         event.preventDefault();
      };

      Number(inputFuelLevel);

      document.getElementById("pilotStatus").innerHTML += `: ${inputPilotName}`;
      document.getElementById("copilotStatus").innerHTML += `: ${inputCopilotName}`;

      if (inputFuelLevel < 10000 || inputCargoMass > 10000) {
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("launchStatus").style.color = "red";   
         document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready for Launch";
         if (inputFuelLevel < 10000) {
            document.getElementById("fuelStatus").innerHTML = "There is not enough fuel for the journey."
         }
         if (inputCargoMass > 10000) {
            document.getElementById("cargoStatus").innerHTML = "There is too much cargo for the journey."
         }
         event.preventDefault();
      } else {
         document.getElementById("launchStatus").style.color = "green";
         document.getElementById("launchStatus").innerHTML = "Shuttle is Ready for Launch!";
         event.preventDefault();
      }

   });

});
