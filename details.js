const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

const container = document.getElementById("detailsContainer");

// 🔥 DATA YAHI SE AA RAHA HAI (hotels.js se)
const hotel = hotelsData.find(h => h.id === id);

if(hotel){
  container.innerHTML = `
    <img src="${hotel.image}" style="width:100%; height:300px; object-fit:cover;">

    <h2>${hotel.name}</h2>

    <p>${hotel.place}, ${hotel.district}</p>

    <p>Category: ${hotel.category}</p>

    <p>Price: ₹${hotel.price}</p>

    <p>⭐ ${hotel.rating}</p>

    <button onclick="alert('Booking Done')">Book Now</button>
  `;
}else{
  container.innerHTML = "<h2>Hotel not found</h2>";
}
function openHotel(id) {
  window.location.href = "details.html?id=" + id;
}