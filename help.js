// MENU
function toggleMenu(){
    document.getElementById("menuBox").classList.toggle("active");
    document.getElementById("overlay").classList.toggle("active");
  }
  
  // FAQ TOGGLE
  function toggleFAQ(el){
    let p = el.querySelector("p");
    p.style.display = p.style.display === "block" ? "none" : "block";
  }
  
  // FAKE SEND
  function sendMsg(){
    alert("Message sent successfully ✅");
  }