// Google Translate
function googleTranslateElementInit() {
    new google.translate.TranslateElement(
      { pageLanguage: 'en' },
      'google_translate_element'
    );
  }
  
  document.addEventListener("DOMContentLoaded", function () {
  
    // Language Select
    const langSelect = document.getElementById("languageSelect");
  
    if (langSelect) {
      langSelect.addEventListener("change", function () {
  
        const lang = this.value;
  
        const checkTranslate = setInterval(function () {
  
          const select = document.querySelector(".goog-te-combo");
  
          if (select) {
            select.value = lang;
            select.dispatchEvent(new Event("change"));
            clearInterval(checkTranslate);
          }
  
        }, 500);
  
      });
    }
  
    const places = [
      "Kedarnath",
      "Badrinath",
      "Nainital",
      "Mussoorie",
      "Rishikesh",
      "Haridwar",
      "Auli",
    "Chopta",
    "Roopkund"
      if (input === "") return;
  
      let filtered = places.filter(place =>
          place.toLowerCase().includes(input)
      );
  
      filtered.forEach(place => {
          let div = document.createElement("div");
          div.classList.add("suggestion-item");
          div.innerText = place;
  
          div.onclick = function () {
              document.getElementById("searchInput").value = place;
              suggestionBox.innerHTML = "";
              searchLocation();
          };
  
          suggestionBox.appendChild(div);
      });
  }
  
  function searchLocation() {
      let input = document.getElementById("searchInput").value.toLowerCase().trim();
  
      if (input === "") {
          alert("Please enter a destination");
          return;
      }
  
      if (input.includes("kedarnath")) {
          window.location.href = "kedarnath.html";
      } 
      else if (input.includes("badrinath")) {
          window.location.href = "badrinath.html";
      } 
      else if (input.includes("nainital")) {
          window.location.href = "nainital.html";
      } 
      else if (input.includes("mussoorie")) {
          window.location.href = "mussoorie.html";
      } 
      else if (input.includes("rishikesh")) {
          window.location.href = "rishikesh.html";
      } 
      else if (input.includes("haridwar")) {
          window.location.href = "haridwar.html";
      } 
      else if (input.includes("auli")) {
          window.location.href = "auli.html";
      } 
      else if (input.includes("chopta")) {
          window.location.href = "chopta.html";
      } 
      else if (input.includes("roopkund")) {
          window.location.href = "roopkund.html";
      } 
      else {
          window.location.href = "alldestination.html?search=" + input;
      }
  }function showPlaces(type){

  let box = document.getElementById("infoBox");
  box.innerHTML = "";

  let places = [];

  if(type === "all"){
    places = [...data.chardham, ...data.wildlife, ...data.hill];
  } else {
    places = data[type];
  }

  places.forEach(p => {

    let div = document.createElement("div");

    div.innerHTML = `
      <div style="padding:10px; border-bottom:1px solid #ddd; cursor:pointer;">
        <b>${p.name}</b><br>
        <small>${p.info}</small>
      </div>
    `;

    // 👉 CLICK ACTION (NEW PAGE)
    div.onclick = function(){
      localStorage.setItem("placeName", p.name);
      localStorage.setItem("placeInfo", p.info);
      window.location.href = "place.html";
    };

    box.appendChild(div);
  });
  window.addEventListener("load", function(){
    document.getElementById("loader").style.display = "none";
  });
  document.querySelectorAll(".point").forEach(p => {
    p.addEventListener("click", function(){
      let place = this.getAttribute("title");
      localStorage.setItem("placeName", place);
      window.location.href = "place.html";
    });
  });
   data = {
    chardconstham: [
      { name: "Kedarnath", info: "Shiva Temple in Himalayas" },
      { name: "Badrinath", info: "Vishnu Temple" },
      { name: "Gangotri", info: "Origin of Ganga" },
      { name: "Yamunotri", info: "Origin of Yamuna" }
    ],
  
    wildlife: [
      { name: "Jim Corbett", info: "Tiger Reserve Forest" },
      { name: "Rajaji National Park", info: "Elephants & Wildlife" }
    ],
  
    hill: [
      { name: "Nainital", info: "Lake City" },
      { name: "Mussoorie", info: "Queen of Hills" }
    ]
  };function openPlacePage(){
    window.location.href = "place.html";
  }
  }
}
const container = document.getElementById("placesContainer");

const container = document.getElementById("placesContainer");

// SHOW ALL PLACES
function displayPlaces(data) {
  if (!container) return;

  container.innerHTML = "";

  data.forEach(place => {
    container.innerHTML += `
      <div class="card" onclick="openPlace(${place.id})">
        <h3>${place.name}</h3>
        <p>${place.description}</p>
        <span>⭐ ${place.rating}</span>
      </div>
    `;
  });
}

// LOAD DATA
displayPlaces(places);

// OPEN PLACE PAGE
function openPlace(id) {
  window.location.href = "place.html?id=" + id;
}

// SEARCH FILTER
const filterInput = document.getElementById("filterInput");

if (filterInput) {
  filterInput.addEventListener("input", function(e) {
    let value = e.target.value.toLowerCase();

    let filtered = places.filter(p =>
      p.name.toLowerCase().includes(value)
    );

    displayPlaces(filtered);
  });
}
// PLACE PAGE
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (id) {
  const place = places.find(p => p.id == id);

  if (place) {
    document.getElementById("title").innerText = place.name;
    document.getElementById("desc").innerText = place.description;
    document.getElementById("rating").innerText = "⭐ " + place.rating;

    document.getElementById("map").src =
      "https://www.google.com/maps?q=" + place.location + "&output=embed";
  }
}



localStorage.setItem("destination", "Kedarnath");
