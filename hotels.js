// 🔥 HOTEL DATA
const hotelsData = [

  {
    id: 1,
    name: "Hyatt Regency Dehradun",
    region: "Garhwal",
    district: "Dehradun",
    place: "Rajpur Road",
    category: "Luxury",
    price: 9000,
    rating: 4.7,
    image: "hayat.webp",
    occupancy: "2 Adults",
    roomType: "Deluxe Mountain View",
  
    services: [
      "Free WiFi",
      "Parking",
      "Restaurant",
      "Mountain View",
      "Breakfast",
      "Room Service"
    ],
    description:
    "Luxury mountain hotel with premium rooms, valley views and modern amenities.",
    
  },

  {
    id: 2,
    name: "Zostel Rishikesh",
    region: "Garhwal",
    district: "Dehradun",
    place: "Tapovan",
    category: "Budget",
    price: 800,
    rating: 4.3,
    image: "zostel.jpg",
    occupancy: "1-4 Guests",
    roomType: "Hostel Dorm & Private Rooms",
    services: [
      "Free WiFi",
      "Cafe",
      "River View",
      "Bonfire",
      "Travel Desk"
    ],
    description:
    "Backpacker hostel near Ganga river with social vibe and adventure activities."
  },

  {
    id: 3,
    name: "JW Marriott Mussoorie",
    region: "Garhwal",
    district: "Dehradun",
    place: "Mussoorie",
    category: "Luxury",
    price: 15000,
    rating: 4.8,
    image: "jw.jpeg",
    occupancy: "2 Adults + 1 Child",
    roomType: "Luxury Valley Suite",
    services: [
      "Spa",
      "Infinity Pool",
      "Restaurant",
      "Mountain View",
      "Free Breakfast"
    ],
    description:
    "5-star luxury resort in Mussoorie with premium valley-facing suites."
  },

  {
    id: 4,
    name: "Kedarnath Base Camp Lodge",
    region: "Garhwal",
    district: "Rudraprayag",
    place: "Kedarnath",
    category: "Budget",
    price: 1200,
    rating: 4.0,
    image: "kedar.jpeg",
    occupancy: "2 Adults",
    roomType: "Standard Himalayan Room",
    services: [
      "Hot Water",
      "Mountain View",
      "Guide Support",
      "Food"
    ],
    description:
    "Affordable stay near Kedarnath temple for pilgrims and trekkers."
  },

  {
    id: 5,
    name: "Auli Ski Resort",
    region: "Garhwal",
    district: "Chamoli",
    place: "Auli",
    category: "Luxury",
    price: 10000,
    rating: 4.6,
    image: "auli.jpeg",
    occupancy: "2 Adults",
    roomType: "Premium Snow View Room",
    services: [
      "Ski Rental",
      "Cable Car",
      "Restaurant",
      "Snow View"
    ],
    description:
    "Premium ski resort surrounded by snow-covered Himalayan peaks."
  },

  {
    id: 6,
    name: "The Naini Retreat",
    region: "Kumaon",
    district: "Nainital",
    place: "Naini Lake",
    category: "Luxury",
    price: 9500,
    rating: 4.5,
    image: "naini.jpg",
    occupancy: "2 Adults",
    roomType: "Lake View Suite",
    services: [
      "Lake View",
      "Restaurant",
      "Spa",
      "Free WiFi"
    ],
    description:
    "Luxury heritage hotel overlooking beautiful Naini Lake."
  }

];



// 🔥 CONTAINER
const container =
document.getElementById("hotelContainer");



// 🔥 CATEGORY CLASS
function getCategoryClass(category){

  if(category === "Luxury"){
    return "luxury";
  }

  if(category === "Budget"){
    return "budget";
  }

  return "mid";
}



// 🔥 DISPLAY HOTELS
function displayHotels(data){

  container.innerHTML = "";

  data.forEach(hotel => {

    container.innerHTML += `

      <div class="hotel-card"
      onclick="openHotel(${hotel.id})">

        <div class="hotel-image">

          <img
          src="images/${hotel.image}"

          onerror="this.src='images/fallback.jpg'">

          <div class="overlay-gradient"></div>

          <span class="hotel-category">

            ${hotel.category}

          </span>

          <div class="hotel-rating">

            ⭐ ${hotel.rating}

          </div>

        </div>


        <div class="hotel-content">

          <h2>${hotel.name}</h2>

          <p class="hotel-location">

            📍 ${hotel.place},
            ${hotel.district}

          </p>


          <div class="hotel-features">

            <span>
              🛏 ${hotel.roomType}
            </span>

            <span>
              👥 ${hotel.occupancy}
            </span>

          </div>


          <p class="hotel-description">

            ${hotel.description}

          </p>


          <div class="hotel-bottom">

            <div>

              <h3 class="price">

                ₹${hotel.price}

              </h3>

              <small>per night</small>

            </div>


            <button class="view-btn">

              View Details

            </button>

          </div>

        </div>

      </div>

    `;
  });

}



// 🔍 SEARCH
function searchHotel(){

  const input =
  document.getElementById("search")
  .value.toLowerCase();

  const filtered =
  hotelsData.filter(hotel =>

    hotel.name.toLowerCase().includes(input)

    ||

    hotel.place.toLowerCase().includes(input)

    ||

    hotel.district.toLowerCase().includes(input)
  );

  displayHotels(filtered);

}



// 🔤 SORT A-Z
function sortHotelsAZ(){

  const sorted =
  [...hotelsData].sort((a,b)=>

    a.name.localeCompare(b.name)

  );

  displayHotels(sorted);

}



// 💰 SORT PRICE
function sortByPrice(){

  const sorted =
  [...hotelsData].sort((a,b)=>

    a.price - b.price

  );

  displayHotels(sorted);

}



// ⭐ SORT RATING
function sortByRating(){

  const sorted =
  [...hotelsData].sort((a,b)=>

    b.rating - a.rating

  );

  displayHotels(sorted);

}



// 🔥 FILTER CATEGORY
function filterCategory(category){

  const filtered =
  hotelsData.filter(hotel =>

    hotel.category === category

  );

  displayHotels(filtered);

}



// 🔥 OPEN HOTEL PANEL
function openHotel(id){

  const hotel =
  hotelsData.find(h => h.id === id);

  const panel =
  document.getElementById("hotelPanel");

  const data =
  document.getElementById("panelData");



  const images = [

    `images/${hotel.image}`,

    "images/room1.jpg",

    "images/room2.jpg"

  ];



  let current = 0;



  data.innerHTML = `

    <div class="details-hero">

      <img
      id="sliderImg"
      src="${images[0]}">

      <div class="details-overlay">

        <h1>${hotel.name}</h1>

        <p>

          📍 ${hotel.place},
          ${hotel.district}

        </p>

      </div>

    </div>



    <div class="details-content">

      <div class="details-top">

        <span class="details-badge">

          ${hotel.category}

        </span>

        <span class="details-rating">

          ⭐ ${hotel.rating}

        </span>

      </div>



      <h2 class="details-price">

        ₹${hotel.price}

        <span>/night</span>

      </h2>



      <div class="occupancy-box">

        <div>

          <h4>Room Type</h4>

          <p>${hotel.roomType}</p>

        </div>

        <div>

          <h4>Occupancy</h4>

          <p>${hotel.occupancy}</p>

        </div>

      </div>



      <div class="service-box">

        <h3>Services & Amenities</h3>

        <div class="services-grid">

          ${hotel.services.map(service => `
            <span>${service}</span>
          `).join("")}

        </div>

      </div>



      <div class="description-box">

        <h3>About Hotel</h3>

        <p>${hotel.description}</p>

      </div>



      <iframe
      width="100%"
      height="240"

      src="https://maps.google.com/maps?q=${hotel.place}&output=embed">

      </iframe>



      <button class="book-btn">

        Reserve Now

      </button>

    </div>

  `;



  panel.classList.add("active");



  // 🔥 IMAGE SLIDER
  const sliderImg =
  document.getElementById("sliderImg");



  const nextBtn =
  document.createElement("button");

  nextBtn.innerHTML = "❯";

  nextBtn.className =
  "slider-btn next";



  const prevBtn =
  document.createElement("button");

  prevBtn.innerHTML = "❮";

  prevBtn.className =
  "slider-btn prev";



  document
  .querySelector(".details-hero")
  .appendChild(nextBtn);

  document
  .querySelector(".details-hero")
  .appendChild(prevBtn);



  nextBtn.onclick = () => {

    current++;

    if(current >= images.length){
      current = 0;
    }

    sliderImg.src = images[current];
  };



  prevBtn.onclick = () => {

    current--;

    if(current < 0){
      current = images.length - 1;
    }

    sliderImg.src = images[current];
  };

}




function closePanel(){

  document
  .getElementById("hotelPanel")
  .classList
  .remove("active");

}




displayHotels(hotelsData);