const packages = [
  {
    name: "Basic Darshan Package",
    days: "2 Days / 1 Night",
    price: 4999,
    details: "Hotel stay + Badrinath darshan + local travel",
    link: "badrinath1.html"
  },
  {
    name: "Standard Pilgrimage Package",
    days: "3 Days / 2 Nights",
    price: 7999,
    details: "Hotel + Meals + Darshan + Transport",
    link: "badrinath2.html"
  },
  {
    name: "Deluxe Badrinath Tour",
    days: "4 Days / 3 Nights",
    price: 11999,
    details: "Deluxe hotel + Meals + VIP darshan",
    link: "badrinath3.html"
  },
  {
    name: "Family Package",
    days: "4 Days / 3 Nights",
    price: 14999,
    details: "Family rooms + Food + Transport",
    link: "badrinath4.html"
  },

  {
    name: "Luxury Spiritual Package",
    days: "5 Days / 4 Nights",
    price: 19999,
    details: "Luxury hotel + Guide + VIP darshan",
    link: "badrinath5.html"
  },
  {
    name: "Char Dham Combo (Short)",
    days: "6 Days / 5 Nights",
    price: 24999,
    details: "Badrinath + Kedarnath + Transport + Stay",
    link: "badrinath6.html"
  },
];
const container = document.getElementById("packageContainer");
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
  window.location.href = "package-detail.html?place=badrinath&pkg=" + index;
}
function bookPackage(index){
  let selected = packages[index];
  localStorage.setItem("selectedPackage", JSON.stringify(selected));
  localStorage.setItem("destination", "Badrinath");

  alert("Package Selected: " + selected.name);

  window.location.href = "booking.html";
}
