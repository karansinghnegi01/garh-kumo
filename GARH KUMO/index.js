// Google Translate
function googleTranslateElementInit() {
    new google.translate.TranslateElement(
      { pageLanguage: 'en' },
      'google_translate_element'
    );
  }
  
  document.addEventListener("DOMContentLoaded", function () {
  
    // Language Select
    const langSelect = document.getElementById("languageSelect");
  
    if (langSelect) {
      langSelect.addEventListener("change", function () {
  
        const lang = this.value;
  
        const checkTranslate = setInterval(function () {
  
          const select = document.querySelector(".goog-te-combo");
  
          if (select) {
            select.value = lang;
            select.dispatchEvent(new Event("change"));
            clearInterval(checkTranslate);
          }
  
        }, 500);
  
      });
    }
  
  
    // Destinations Dropdown
    const destBtn = document.getElementById("destBtn");
    const destMenu = document.getElementById("destMenu");
  
    if (destBtn && destMenu) {
  
      destBtn.addEventListener("click", function (e) {
        e.preventDefault();
        destMenu.classList.toggle("show");
      });
  
    }
  
  });
  document.addEventListener("DOMContentLoaded", function(){

    const userBtn = document.getElementById("userBtn");
    const userMenu = document.getElementById("userMenu");
    
    userBtn.addEventListener("click", function(){
    
    userMenu.classList.toggle("show");
    
    });
    
    });        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
