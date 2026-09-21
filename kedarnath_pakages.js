const packages = [

  {
    name: "Basic Kedarnath Darshan",
    days: "2 Days / 1 Night",
    price: 5999,
    details: "Stay near Kedarnath + Darshan + Basic transport",
    link: "kedardetail1.html"
  },

  {
    name: "Standard Kedarnath Yatra",
    days: "3 Days / 2 Nights",
    price: 8999,
    details: "Hotel + Meals + Trek guidance + Darshan",
    link: "kedardetail2.html"
  },

  {
    name: "Deluxe Kedarnath Tour",
    days: "4 Days / 3 Nights",
    price: 12999,
    details: "Deluxe stay + Meals + VIP darshan + Guide",
    link: "kedardetail3.html"
  },

  {
    name: "Family Kedarnath Package",
    days: "4 Days / 3 Nights",
    price: 15999,
    details: "Family rooms + Food + Transport + Assistance",
    link: "kedardetail4.html"
  },

  {
    name: "Luxury Kedarnath Package",
    days: "5 Days / 4 Nights",
    price: 21999,
    details: "Luxury stay + Meals + VIP darshan + Private guide",
    link: "kedardetail5.html"
  },

  {
    name: "Kedarnath + Badrinath Combo",
    days: "6 Days / 5 Nights",
    price: 26999,
    details: "Both dham darshan + Stay + Transport",
    link: "kedardetail6.html"
  },

  {
    name: "Adventure Kedarnath Trek",
    days: "5 Days / 4 Nights",
    price: 18999,
    details: "Trekking + Camping + Darshan",
    link: "kedardetail7.html"
  },

  {
    name: "Premium VIP Kedarnath",
    days: "6 Days / 5 Nights",
    price: 34999,
    details: "Helicopter option + VIP darshan + Luxury stay",
    link: "kedardetail8.html"
  }

];

const container = document.getElementById("packageContainer");

// 🔥 SHOW PACKAGES
packages.forEach((p) => {

  container.innerHTML += `
    <div class="card">
      <h3>${p.name}</h3>
      <p><b>${p.days}</b></p>
      <p>${p.details}</p>
      <p class="price">₹${p.price}</p>

      <button onclick="goToPage('${p.link}')">Enquire Now</button>
    </div>
  `;
});


// 🔥 REDIRECT FUNCTION
function goToPage(link){
  window.location.href = link;
}