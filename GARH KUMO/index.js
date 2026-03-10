const searchInput = document.getElementById("search");
const cards = document.querySelectorAll(".card");

searchInput.addEventListener("keyup", function () {
  let filter = searchInput.value.toLowerCase();

  cards.forEach(card => {
    let title = card.querySelector(".place-name");

    if (title) {
      let text = title.innerText.toLowerCase();

      if (text.includes(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search");
  const cards = document.querySelectorAll(".card");

  searchInput.addEventListener("input", function () {
    const searchValue = searchInput.value.toLowerCase();

    cards.forEach(card => {
      const title = card.querySelector(".place-name");

      if (!title) return;

      const text = title.textContent.toLowerCase();

      if (text.includes(searchValue)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
