const places = [

  {
    name: "Kedarnath Dham",
    region: "Garhwal",
    type: "Spiritual",
    image: "kedarnath2.jpeg",
    desc: "One of the holiest Shiva temples in India.",
    price: "₹1500 - Budget Stay"
  },

  {
    name: "Badrinath",
    region: "Garhwal",
    type: "Spiritual",
    image: "badrinath.jpeg",
    desc: "Sacred Vishnu temple in Himalayas.",
    price: "₹2000 - Mid Range"
  },

  {
    name: "Nainital",
    region: "Kumaon",
    type: "Hill Station",
    image: "nainital.jpeg",
    desc: "Beautiful lake city in Uttarakhand.",
    price: "₹3000 - Mid Range"
  },

  {
    name: "Roopkund",
    region: "Garhwal",
    type: "Trek",
    image: "roopkund.jpg",
    desc: "Mystery lake trek in Himalayas.",
    price: "₹1800 - Trek Camp"
  },

  {
    name: "Valley of Flowers",
    region: "Chamoli",
    type: "Nature",
    image: "valltrek.jpeg",
    desc: "UNESCO World Heritage floral valley.",
    price: "₹1200 - Budget Trek"
  },

  {
    name: "Auli",
    region: "Garhwal",
    type: "Snow Resort",
    image: "auli.jpeg",
    desc: "India’s best skiing destination.",
    price: "₹5000 - Luxury"
  }

];

const container = document.getElementById("exploreContainer");

container.classList.add("container");

places.forEach(p => {

  container.innerHTML += `
    <div class="card" onclick="openPlace('${p.name}')">
      <img src="${p.image}">
      <h3>${p.name}</h3>
      <p>${p.type} | ${p.region}</p>
      <p>${p.price}</p>
    </div>
  `;

});

function openPlace(name){
  window.location.href = "explore-details.html?name=" + name;
}