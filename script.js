// Write your JavaScript code here!

window.addEventListener("load", function(){
   let missionTarget = document.getElementById("missionTarget")
   let launchForm = document.getElementById("launchForm")
   let formSubmitbtn = document.getElementById("formSubmit")
   let launchStatusCheck = document.getElementById("launchStatusCheck")
   let launchStatus = document.getElementById("launchStatus")

   let faultyItems = document.getElementById("faultyItems")
   let pilotStatus = document.getElementById("pilotStatus")
   let copilotStatus = document.getElementById("copilotStatus")
   let fuelStatus = document.getElementById("fuelStatus")
   let cargoStatus = document.getElementById("cargoStatus")

   let form = document.querySelector("form")
   form.addEventListener("submit", function(){
      let pilotInput = document.querySelector("input[name=pilotName]").value;
      let copilotInput = document.querySelector("input[name=copilotName]").value;
      let fuelInput = document.querySelector("input[name=fuelLevel").value;
      let cargoInput = document.querySelector("input[name=cargoMass").value;

      if(pilotInput == "" || copilotInput == "" || fuelInput == "" || cargoInput == ""){
         alert("All fields are required.");
      } else if (isNaN(fuelInput) || isNaN(cargoInput)){
         alert("Fuel Level and Cargo Mass must be numbers.")
      } else {
         pilotStatus.innerText = `Pilot ${pilotInput} is ready for launch`
         copilotStatus.innerText = `Co-pilot ${copilotInput} is ready for launch`

         if(fuelInput < 10000){
            fuelStatus.innerText = "Fuel level too low for launch"
            launchStatus.innerText = "Shuttle not ready for launch"
            launchStatus.style.color = 'red'
         } else {
            fuelStatus.innerText = "Fuel level high enough for launch"
         }

         if(cargoInput > 10000){
            cargoStatus.innerText = "Cargo mass too high for launch"
            launchStatus.innerText = "Shuttle not ready for launch"
            launchStatus.style.color = 'red'
         } else {
            cargoStatus.innerText = "Cargo mass low enough for launch"
         }

         faultyItems.style.visibility = "visible"

         if(fuelInput >= 10000 && cargoInput <= 10000){
            launchStatus.innerText = "Shuttle is ready for launch"
            launchStatus.style.color = 'green'

            fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
               response.json().then(function(json){
                  let index = Math.floor(Math.random() * json.length);
                  missionTarget.innerHTML = `<h2>Mission Destination</h2>
                                             <ol>
                                                <li>Name: ${json[index].name}</li>
                                                <li>Diameter: ${json[index].diameter}</li>
                                                <li>Star: ${json[index].star}</li>
                                                <li>Distance from Earth: ${json[index].distance}</li>
                                                <li>Number of Moons: ${json[index].moons}</li>
                                             </ol>
                                             <img src="${json[index].image}">`

               })
            })
         }
      }
      event.preventDefault();
   })
})





/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
