function getFormValues() {
  return {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    persons: document.getElementById("persons").value.trim(),
    date: document.getElementById("date").value,
    pack: document.getElementById("package").value
  };
}


// Get destination and selected package details
function getBookingDetails() {
  var destination = (localStorage.getItem("destination") || "").trim();

  var selectedPackage = {};

  try {
    selectedPackage =
      JSON.parse(localStorage.getItem("selectedPackage") || "null") || {};
  } catch (e) {
    selectedPackage = {};
  }

  return {
    destination: destination,
    selectedPackageName: selectedPackage.name || "",
    selectedPackageDays: selectedPackage.days || "",
    selectedPackagePrice: selectedPackage.price || "",
    selectedPackageDetails: selectedPackage.details || ""
  };
}


// Submit enquiry
function submitEnquiry() {
  var f = getFormValues();

  if (!f.name || !f.phone || !f.persons || !f.date) {
    alert("Please fill in name, phone, number of persons, and travel date.");
    return;
  }

  var details = getBookingDetails();

  var packLabel =
    f.pack || details.selectedPackageName || "General enquiry";

  var enquiry = {
    name: f.name,
    email: f.email,
    phone: f.phone,
    persons: f.persons,
    date: f.date,
    package: packLabel,
    destination: details.destination,
    detailPage: "booking.html",
    selectedPackageName: details.selectedPackageName,
    selectedPackageDays: details.selectedPackageDays,
    selectedPackagePrice: String(details.selectedPackagePrice || ""),
    selectedPackageDetails: details.selectedPackageDetails
  };

  var data = JSON.parse(localStorage.getItem("enquiries") || "[]");

  data.push(enquiry);

  localStorage.setItem("enquiries", JSON.stringify(data));

  // Continue to payment
  goToPayment();
}


// Proceed to payment
function goToPayment() {
  var f = getFormValues();

  if (!f.name || !f.phone || !f.persons || !f.date) {
    alert(
      "Please fill in name, phone, number of persons, and travel date before proceeding to payment."
    );
    return;
  }

  var details = getBookingDetails();

  var prefill = {
    name: f.name,
    email: f.email,
    phone: f.phone,
    persons: f.persons,
    date: f.date,
    package: f.pack || details.selectedPackageName || "General",
    destination: details.destination,
    selectedPackageName: details.selectedPackageName,
    selectedPackageDays: details.selectedPackageDays,
    selectedPackagePrice: details.selectedPackagePrice
  };

  window.location.href =
    GarhKumoReceiptPayload.paymentPrefillHref(prefill);
}


// Get different messages for different destinations/packages
function getPackageMessage(packageName, destination) {
  var packageText = (packageName || "").toLowerCase();
  var destinationText = (destination || "").toLowerCase();

  // Check destination first
  if (destinationText.includes("kedarnath")) {
    return "Get ready for a spiritual journey to Kedarnath Dham! We look forward to helping you experience the beauty and devotion of the Himalayas.";
  }

  if (destinationText.includes("badrinath")) {
    return "Your journey to the sacred Badrinath Temple awaits! We look forward to welcoming you on this memorable spiritual trip.";
  }

  if (destinationText.includes("nainital")) {
    return "Get ready to explore the beautiful lakes, scenic views, and peaceful surroundings of Nainital!";
  }

  if (destinationText.includes("chopta")) {
    return "Your Himalayan adventure to Chopta and Chandrashila awaits! Get ready for beautiful mountain views and an unforgettable experience.";
  }

  if (destinationText.includes("roopkund")) {
    return "Prepare for an unforgettable Himalayan trekking experience. Thank you for choosing GarhKumo!";
  }

  // If destination isn't known, use the selected package
  if (packageText.includes("adventure")) {
    return "Get ready for an exciting adventure with GarhKumo! We look forward to making your journey memorable.";
  }

  if (packageText.includes("family")) {
    return "Thank you for choosing our Family Package. We hope you enjoy a wonderful holiday together!";
  }

  if (packageText.includes("luxury") || packageText.includes("vip")) {
    return "Thank you for choosing our premium travel experience. We look forward to providing you with a comfortable and memorable trip.";
  }

  if (packageText.includes("deluxe")) {
    return "Thank you for choosing our Deluxe Package. We look forward to helping you enjoy a relaxing and memorable journey.";
  }

  if (packageText.includes("standard")) {
    return "Thank you for choosing our Standard Package. We look forward to helping you enjoy a wonderful trip.";
  }

  if (packageText.includes("basic")) {
    return "Thank you for choosing our Basic Package. We look forward to helping you enjoy a comfortable trip.";
  }

  return "Thank you for choosing GarhKumo. We look forward to helping you enjoy a memorable Uttarakhand trip!";
}


// Send confirmation email
async function sendPackageConfirmation(booking) {
  if (!booking.customerEmail) {
    console.log("Customer email is missing. Confirmation email skipped.");
    return false;
  }

  var packageMessage = getPackageMessage(
    booking.packageName,
    booking.destination
  );

  var templateParams = {
    to_email: booking.customerEmail,
    customer_name: booking.customerName,
    booking_id: booking.bookingId,
    package_name: booking.packageName,
    destination: booking.destination,
    package_message: packageMessage,
    trip_date: booking.tripDate,
    persons: booking.persons
  };

  try {
    var response = await emailjs.send(
      "service_38189vl",
      "template_i6luoms",
      templateParams
    );

    console.log("Confirmation email sent successfully!", response);

    return true;

  } catch (error) {
    console.error("Email sending failed:", error);

    return false;
  }
}
