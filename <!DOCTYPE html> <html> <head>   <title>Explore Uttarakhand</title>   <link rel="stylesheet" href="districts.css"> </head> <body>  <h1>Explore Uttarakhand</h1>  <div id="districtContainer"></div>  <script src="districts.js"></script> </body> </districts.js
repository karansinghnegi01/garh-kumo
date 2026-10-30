const districts = [
  "Dehradun","Haridwar","Nainital","Udham Singh Nagar",
  "Pauri Garhwal","Tehri Garhwal","Uttarkashi",
  "Rudraprayag","Chamoli","Almora","Bageshwar",
  "Pithoragarh","Champawat"
];

const container = document.getElementById("districtContainer");

districts.forEach(d => {
  container.innerHTML += `
    <div class="card" onclick="openDistrict('${d}')">
      <h2>${d}</h2>
      <p>View Hotels</p>
    </div>
  `;
});

function openDistrict(d){
  window.location.href = "hotels.html?district=" + d;
}
