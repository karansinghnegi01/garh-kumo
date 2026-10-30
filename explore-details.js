const places = [

  {
    name: "Kedarnath Dham",
    region: "Garhwal",
    type: "Spiritual",
    image: "https://source.unsplash.com/900x500/?kedarnath",
    desc: "Kedarnath is one of the holiest Hindu temples dedicated to Lord Shiva. Located in the Himalayas, it is part of Char Dham Yatra.",
    price: "₹1500 - Budget Stay nearby",
    hotels: "Many GMVN & private lodges available"
  },

  {
    name: "Badrinath",
    region: "Garhwal",
    type: "Spiritual",
    image: "https://source.unsplash.com/900x500/?badrinath",
    desc: "Badrinath is a sacred Vishnu temple and one of the Char Dham sites in Uttarakhand.",
    price: "₹2000 - Mid Range Stay",
    hotels: "Hotels near Joshimath available"
  },

  {
    name: "Nainital",
    region: "Kumaon",
    type: "Hill Station",
    image: "https://source.unsplash.com/900x500/?nainital-lake",
    desc: "Nainital is famous for its beautiful lake, hills, and tourism activities.",
    price: "₹3000 - Mid Range Hotels",
    hotels: "Luxury + Budget hotels available"
  },

  {
    name: "Roopkund",
    region: "Garhwal",
    type: "Trek",
    image: "https://source.unsplash.com/900x500/?himalaya-trek",
    desc: "Roopkund is a mysterious lake trek known as Skeleton Lake in Himalayas.",
    price: "₹1800 - Trek Camp",
    hotels: "Trek camps only"
  }

];

// 🔥 GET NAME FROM URL
const params = new URLSearchParams(window.location.search);
const name = params.get("name");

const place = places.find(p => p.name === name);

const container = document.getElementById("placeContainer");

if(place){

  container.innerHTML = `
    <div class="container">

      <img src="${place.image}">

      <h1>${place.name}</h1>

      <p class="info"><b>Region:</b> ${place.region}</p>
      <p class="info"><b>Type:</b> ${place.type}</p>

      <p class="info">${place.desc}</p>

      <p class="price">${place.price}</p>

      <p class="info"><b>Hotels:</b> ${place.hotels}</p>

      <button onclick="window.location.href='hotels.html'">
        Book Nearby Hotels
      </button>

    </div>
  `;

}
else{
  container.innerHTML = "<h2>Place not found</h2>";
}
