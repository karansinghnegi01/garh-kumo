const packages = [

  {
    name: "Basic Chopta Trek",
    days: "2 Days / 1 Night",
    price: 3999,
    details: "Camping in Chopta + Basic trek to Tungnath",
    link: "chopta1.html"
  },

  {
    name: "Chopta Tungnath Trek",
    days: "3 Days / 2 Nights",
    price: 6999,
    details: "Stay + Meals + Tungnath trek + Guide",
    link: "chopta2.html"
  },

  {
    name: "Chandrashila Summit Package",
    days: "3 Days / 2 Nights",
    price: 7999,
    details: "Sunrise trek to Chandrashila + Camping + Guide",
    link: "chopta3.html"
  },

  {
    name: "Standard Trek Package",
    days: "4 Days / 3 Nights",
    price: 9999,
    details: "Stay + Food + Trekking + Bonfire",
    link: "chopta4.html"
  },

  {
    name: "Adventure Camping Package",
    days: "4 Days / 3 Nights",
    price: 11999,
    details: "Camping + Trek + Adventure activities",
    link: "chopta5.html"
  },

  {
    name: "Deluxe Chopta Stay",
    days: "3 Days / 2 Nights",
    price: 13999,
    details: "Deluxe cottages + Meals + Trek guide",
    link: "chopta6.html"
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
  window.location.href = "package-detail.html?place=chopta&pkg=" + index;
}

// 🔥 BOOK PACKAGE
function bookPackage(index){

  let selected = packages[index];

  // 🔥 IMPORTANT (Admin ke liye)
  localStorage.setItem("selectedPackage", JSON.stringify(selected));
  localStorage.setItem("destination", "Chopta Tungnath Chandrashila");

  alert("✅ Package Selected: " + selected.name);

  window.location.href = "booking.html";
}