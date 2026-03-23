// SEARCH FILTER
let search = document.getElementById("searchPlace");

search.addEventListener("input", function(){

  let value = this.value.toLowerCase();

  document.querySelectorAll(".place-card").forEach(card=>{
    let name = card.innerText.toLowerCase();

    if(name.includes(value)){
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });

});

// MENU
function toggleMenu(){
  document.getElementById("menuBox").classList.toggle("active");
  document.getElementById("overlay").classList.toggle("active");
}
