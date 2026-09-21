/* ====== UTTARAKHAND ALL DATA ====== */
const data = [
    {name:"Kedarnath", type:"temple", location:"Rudraprayag", rating:5},
    {name:"Badrinath", type:"temple", location:"Chamoli", rating:5},
    {name:"Gangotri", type:"temple", location:"Uttarkashi", rating:4.9},
    {name:"Yamunotri", type:"temple", location:"Uttarkashi", rating:4.8},
    {name:"Tungnath", type:"temple", location:"Rudraprayag", rating:4.9},
    {name:"Kalpeshwar", type:"temple", location:"Chamoli", rating:4.7},
  
    {name:"Mussoorie", type:"hill", location:"Dehradun", rating:4.5},
    {name:"Nainital", type:"hill", location:"Nainital", rating:4.6},
    {name:"Auli", type:"hill", location:"Chamoli", rating:4.7},
    {name:"Chopta", type:"hill", location:"Rudraprayag", rating:4.8},
  
    {name:"Rishikesh Rafting", type:"adventure", location:"Rishikesh", rating:4.9},
    {name:"Valley of Flowers", type:"adventure", location:"Chamoli", rating:5},
  
    {name:"Dehradun", type:"hill", location:"Dehradun", rating:4.3},
    {name:"Haridwar", type:"temple", location:"Haridwar", rating:4.6},
    {name:"Rishikesh", type:"adventure", location:"Haridwar", rating:4.8}
  ];
  
  
  /* ====== ELEMENTS ====== */
  const cards = document.getElementById("cards");
  const search = document.getElementById("search");
  const map = document.getElementById("map"); // 👈 ADD THIS
  
  
  /* ====== WISHLIST ====== */
  let wishlist = JSON.parse(localStorage.getItem("wish")) || [];
  
  
  /* ====== SHOW DATA ====== */
  function showData(list){
    cards.innerHTML="";
  
    list.forEach(place=>{
      let heart = wishlist.includes(place.name) ? "❤️" : "🤍";
  
      let div = document.createElement("div");
      div.className="card";
  
      div.innerHTML=`
        <img src="https://source.unsplash.com/300x200/?${place.name}">
        <div class="card-content">
          <h3>${place.name}</h3>
          <p>⭐ ${place.rating}</p>
          <p>📍 ${place.location}</p>
          <button onclick="toggleWish('${place.name}')">${heart}</button>
        </div>
      `;
  
      cards.appendChild(div);
    });
  }
  
  showData(data);
  
  
  /* ====== FILTER ====== */
  function filterData(type){
    document.querySelectorAll(".filters button").forEach(btn=>btn.classList.remove("active"));
    event.target.classList.add("active");
  
    if(type==="all") showData(data);
    else showData(data.filter(d=>d.type===type));
  }
  
  
  /* ====== SEARCH + MAP UPDATE 🔥 ====== */
  search.addEventListener("input",()=>{
    let val = search.value.toLowerCase();
  
    let filtered = data.filter(d =>
      d.name.toLowerCase().includes(val) ||
      d.location.toLowerCase().includes(val)
    );
  
    showData(filtered);
  
    /* 🔥 MAP UPDATE */
    if(val !== ""){
      map.src = `https://maps.google.com/maps?q=${val}&output=embed`;
    } else {
      map.src = `https://maps.google.com/maps?q=uttarakhand&output=embed`;
    }
  });
  
  
  /* ====== WISHLIST ====== */
  function toggleWish(name){
    if(wishlist.includes(name)){
      wishlist = wishlist.filter(i=>i!==name);
    } else {
      wishlist.push(name);
    }
  
    localStorage.setItem("wish", JSON.stringify(wishlist));
    showData(data);
  }
  
  
  /* ====== DARK MODE ====== */
  document.getElementById("darkBtn").onclick=()=>{
    document.body.classList.toggle("dark");
  };
  
  
  /* ====== SCROLL FIXED ====== */
  const topBtn = document.getElementById("topBtn");
  
  window.onscroll = ()=>{
    topBtn.style.display = window.scrollY > 200 ? "block" : "none";
  };
  
  topBtn.onclick=()=>{
    window.scrollTo({top:0, behavior:"smooth"});
  };