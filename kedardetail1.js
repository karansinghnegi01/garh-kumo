id="scr1">
document.querySelectorAll(".card").forEach(card=>{
  card.addEventListener("mouseenter",()=>card.style.boxShadow="0 15px 35px rgba(0,0,0,0.2)");
  card.addEventListener("mouseleave",()=>card.style.boxShadow="0 8px 25px rgba(0,0,0,0.1)");
});
 id="darkjs"
const toggle = document.getElementById("darkToggle");

toggle.onclick = () => {
  document.body.classList.toggle("dark");
};


