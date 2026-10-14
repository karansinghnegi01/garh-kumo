const packages = [

  {
    name: "Basic Roopkund Trek",
    days: "5 Days / 4 Nights",
    price: 9999,
    details: "Camping + Trek to Roopkund + Basic meals",
    link: "roopkund1.html"
  },

  {
    name: "Standard Roopkund Expedition",
    days: "6 Days / 5 Nights",
    price: 13999,
    details: "Stay + Meals + Guide + Trekking gear support",
    link: "roopkund2.html"
  },

  {
    name: "Roopkund Lake Trek Package",
    days: "7 Days / 6 Nights",
    price: 16999,
    details: "Full trek + Camping + Guide + Bonfire",
    link: "roopkund3.html"
  },

  {
    name: "Adventure Trek Package",
    days: "6 Days / 5 Nights",
    price: 14999,
    details: "High altitude trekking + Camping + Support staff",
    link: "roopkund4.html"
  },

  {
    name: "Group Roopkund Trek",
    days: "7 Days / 6 Nights",
    price: 17999,
    details: "Group trek + Food + Guide + Equipment",
    link: "roopkund5.html"
  },

  {
    name: "Deluxe Trek Experience",
    days: "7 Days / 6 Nights",
    price: 19999,
    details: "Premium camping + Better meals + Expert guide",
    link: "roopkund6.html"
  },

  

];

const container = document.getElementById("packageContainer");

// 🔥 SHOW PACKAGES
packages.forEach((p, index) => {

  container.innerHTML += `
    <div class="card">
      <h3>${p.name}</h3>
      <p><b>${p.days}</b></p>
      <p>${p.details}</p>
      <p class="price">₹${p.price}</p>
      <button type="button" onclick="goToPage(${index})">View details</button>
      <button onclick="bookPackage(${index})">Book now</button>
    </div>
  `;
});

function goToPage(index) {
  const selectedPackage = packages[index];
  if (selectedPackage && selectedPackage.link) {
    window.location.href = selectedPackage.link;
    return;
  }
  window.location.href = "package-detail.html?place=roopkund&pkg=" + index;
}

// 🔥 BOOK PACKAGE
function bookPackage(index){

  let selected = packages[index];

  // 🔥 Admin tracking ke liye
  localStorage.setItem("selectedPackage", JSON.stringify(selected));
  localStorage.setItem("destination", "Roopkund");

  alert("✅ Package Selected: " + selected.name);

  window.location.href = "booking.html";
}