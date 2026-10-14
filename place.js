const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const place = places.find(p => p.id == id);

document.getElementById("name").innerText = place.name;
document.getElementById("image").src = place.image;
document.getElementById("desc").innerText = place.description;
document.getElementById("rating").innerText = "⭐ " + place.rating;

document.getElementById("map").src =
  "https://maps.google.com/maps?q=" + place.location + "&output=embed";