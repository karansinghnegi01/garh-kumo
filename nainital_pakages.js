const packages = [

  {
    name: "Basic Nainital Trip",
    days: "2 Days / 1 Night",
    price: 3999,
    details: "Hotel stay + Naini Lake visit + Mall Road",
    link: "nainital1.html"
  },

  {
    name: "Standard Nainital Tour",
    days: "3 Days / 2 Nights",
    price: 6999,
    details: "Hotel + Meals + Local sightseeing",
    link: "nainital2.html"
  },

  {
    name: "Lake View Package",
    days: "3 Days / 2 Nights",
    price: 8999,
    details: "Lake view hotel + Boating + Mall Road",
    link: "nainital3.html"
  },

  {
    name: "Family Nainital Package",
    days: "4 Days / 3 Nights",
    price: 11999,
    details: "Family rooms + Sightseeing + Zoo visit",
    link: "nainital4.html"
  },

  {
    name: "Deluxe Nainital Tour",
    days: "4 Days / 3 Nights",
    price: 13999,
    details: "Deluxe hotel + Meals + Cable car ride",
    link: "nainital5.html"
  },

  {
    name: "Nainital + Bhimtal Combo",
    days: "5 Days / 4 Nights",
    price: 15999,
    details: "Nainital + Bhimtal + Sattal sightseeing",
    link: "nainital6.html"
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
  window.location.href = "package-detail.html?place=nainital&pkg=" + index;
}

// 🔥 BOOK PACKAGE
function bookPackage(index){

  let selected = packages[index];

  // 🔥 Admin ke liye important
  localStorage.setItem("selectedPackage", JSON.stringify(selected));
  localStorage.setItem("destination", "Nainital");

  alert("✅ Package Selected: " + selected.name);

  window.location.href = "booking.html";
}