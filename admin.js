// ================= LOAD DATA =================
let hotelsData = JSON.parse(localStorage.getItem("hotelsData")) || [];

// 🔥 ENSURE STORAGE EXISTS
if (!localStorage.getItem("hotelsData")) {
  localStorage.setItem("hotelsData", JSON.stringify([]));
  hotelsData = [];
}

// ================= SHOW HOTELS =================
function loadHotels() {

  let hotels = JSON.parse(localStorage.getItem("hotelsData")) || [];

  let list = document.getElementById("hotelList");
  list.innerHTML = "";

  if (hotels.length === 0) {
    list.innerHTML = "<p>No hotels added yet</p>";
    return;
  }

  hotels.forEach((h) => {
    list.innerHTML += `
      <div class="hotel-card">
        <h3>${h.name}</h3>
        <p>${h.place}</p>
        <p>₹${h.price}</p>
        <p>${h.category}</p>
        <button onclick="deleteHotel(${h.id})">Delete</button>
      </div>
    `;
  });
}

loadHotels();

// ================= ADD HOTEL =================
function addHotel() {

  let name = document.getElementById("name").value;
  let place = document.getElementById("place").value;
  let price = document.getElementById("price").value;
  let category = document.getElementById("category").value;

  if (!name || !place || !price) {
    alert("Fill all fields");
    return;
  }

  let hotels = JSON.parse(localStorage.getItem("hotelsData")) || [];

  let newHotel = {
    id: Date.now(),
    name,
    place,
    price: Number(price),
    category,
    rating: 4.0,
    image: "https://source.unsplash.com/400x300/?hotel"
  };

  hotels.push(newHotel);

  localStorage.setItem("hotelsData", JSON.stringify(hotels));

  loadHotels();

  alert("Hotel Added 🎉");
}

// ================= DELETE HOTEL =================
function deleteHotel(id) {

  let hotels = JSON.parse(localStorage.getItem("hotelsData")) || [];

  hotels = hotels.filter(h => h.id !== id);

  localStorage.setItem("hotelsData", JSON.stringify(hotels));

  loadHotels();

  alert("Hotel Deleted ❌");
}