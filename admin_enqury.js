function loadEnquiries(){

  let data = JSON.parse(localStorage.getItem("garhKumoEnquiries")) || [];

  let list = document.getElementById("list");
  list.innerHTML = "";

  if (!data.length) {
    list.innerHTML = `<p>No enquiries saved yet.</p>`;
    return;
  }

  data.forEach((e, i) => {

    list.innerHTML += `
      <div class="card">
        <h3>${e.customerName || "Unnamed"}</h3>

        ${e.customerEmail ? `<p>✉️ ${e.customerEmail}</p>` : ""}

        <p>📞 ${e.customerPhone || "—"}</p>

        <p>👥 ${e.guests || "—"} persons</p>

        <p>📅 ${e.travelDate || "—"}</p>

        <p>📍 ${e.destination || "—"}</p>

        <p>📦 ${e.packageName || "—"}</p>

        <p>🚖 Pickup: ${e.pickupCity || "—"}</p>

        <p>🎂 Age: ${e.age || "—"}</p>

        <p>🕒 ${e.bookingDate || "—"}</p>

        <button onclick="deleteEnquiry(${i})">
          Delete
        </button>
      </div>
    `;
  });
}


// DELETE FUNCTION

function deleteEnquiry(index){

  let data = JSON.parse(
    localStorage.getItem("garhKumoEnquiries")
  ) || [];

  data.splice(index,1);

  localStorage.setItem(
    "garhKumoEnquiries",
    JSON.stringify(data)
  );

  loadEnquiries();
}

loadEnquiries();
