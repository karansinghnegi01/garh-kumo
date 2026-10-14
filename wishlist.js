function addToWishlist(place){
    let list = JSON.parse(localStorage.getItem("wishlist")) || [];
    list.push(place);
    localStorage.setItem("wishlist", JSON.stringify(list));
    alert("Added to Wishlist ❤️");
  }