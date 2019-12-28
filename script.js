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
      let inputError = false;

      if (inputPilotName === "" || inputCopilotName === "" || inputFuelLevel ==="" || inputCargoMass === "") {
         alert("Please make sure all fields are filled in with corresponding information.")
         inputError = true;
         event.preventDefault();
      } else {
         if (!isNaN(inputPilotName) || !isNaN(inputCopilotName)) {
            alert("Please make sure the Pilot and Co-pilot have names with only letters before submitting the form.");
            inputError = true;
            event.preventDefault();
         };
         if (isNaN(inputFuelLevel) || isNaN(inputCargoMass)) {
            alert("Plese make sure that there are numeric values for the Fuel Level and the Cargo Mass.");
            inputError = true;
            event.preventDefault();
         };
      }
      
      document.getElementById("pilotStatus").innerHTML = `Pilot: ${inputPilotName}`;
      document.getElementById("copilotStatus").innerHTML = `Copilot: ${inputCopilotName}`;
      document.getElementById("fuelStatus").innerHTML = "Fuel level high enough for launch"
      document.getElementById("cargoStatus").innerHTML = "Cargo mass low enough for launch"

      if (inputError || inputFuelLevel < 10000 || inputCargoMass > 10000) {
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("launchStatus").style.color = "red";   
         document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready for Launch";
         event.preventDefault();

         if (inputFuelLevel < 10000 || isNaN(inputFuelLevel)) {
            document.getElementById("fuelStatus").innerHTML = "There is not enough fuel for launch."
            event.preventDefault();
         }

         if (inputCargoMass > 10000 || isNaN(inputCargoMass)) {
            document.getElementById("cargoStatus").innerHTML = "Cargo too heavy for launch."
            event.preventDefault();
         } 

      } else {
         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("launchStatus").style.color = "green";
         document.getElementById("launchStatus").innerHTML = "Shuttle is Ready for Launch!";
         event.preventDefault();
      }

   });

});
