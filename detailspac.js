const data = {
    "kedarnath-2d1n": {
      title: "2 Days / 1 Night Kedarnath Package",
      price: "₹6,999",
      hotel: "Hotel Himalayan View",
      itinerary: [
        "Day 1: Haridwar → Gaurikund → Stay",
        "Day 2: Kedarnath Darshan → Return"
      ],
      includes: ["Hotel", "Meals", "Transport"]
    },
  
    "kedarnath-3d2n": {
      title: "3 Days / 2 Nights Kedarnath Package",
      price: "₹9,999",
      hotel: "Deluxe Kedarnath Camp",
      itinerary: [
        "Day 1: Haridwar → Sitapur",
        "Day 2: Trek → Kedarnath",
        "Day 3: Return"
      ],
      includes: ["Hotel", "Meals", "Guide", "Transport"]
    }
  };
  
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  
  const pkg = data[id];
  
  document.getElementById("details").innerHTML = `
    <h1>${pkg.title}</h1>
    <h2>${pkg.price}</h2>
  
    <h3>Hotel</h3>
    <p>${pkg.hotel}</p>
  
    <h3>Itinerary</h3>
    <ul>
      ${pkg.itinerary.map(i => `<li>${i}</li>`).join("")}
    </ul>
  
    <h3>Includes</h3>
    <ul>
      ${pkg.includes.map(i => `<li>${i}</li>`).join("")}
    </ul>
  
    <a href="index.html" class="btn">Back</a>
  `;