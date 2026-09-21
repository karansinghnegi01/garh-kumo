(function (w) {
  function newReceiptId() {
    var y = new Date().getFullYear();
    return "GK" + y + "-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  }

  function pushEnquiry(record) {
    var data = JSON.parse(localStorage.getItem("enquiries")) || [];
    data.push(record);
    localStorage.setItem("enquiries", JSON.stringify(data));
  }

  function goReceipt(receipt) {
    if (w.GarhKumoReceiptPayload && typeof w.GarhKumoReceiptPayload.receiptHref === "function") {
      w.location.href = w.GarhKumoReceiptPayload.receiptHref(receipt);
      return;
    }
    var p = new URLSearchParams();
    var maxLen = 800;
    Object.keys(receipt)
      .sort()
      .forEach(function (k) {
        var v = receipt[k];
        if (v === undefined || v === null) return;
        if (typeof v === "object") return;
        var s = String(v);
        if (s.length > maxLen) s = s.slice(0, maxLen) + "...";
        p.set(k, s);
      });
    w.location.href = "booking_reicpt.html?" + p.toString();
  }

  function fdTrim(fd, key) {
    var v = fd.get(key);
    return v == null ? "" : String(v).trim();
  }

  /**
   * Kedarnath package detail pages (kedardetail*.html)
   */
  function submitKedarPackageForm(ev, form) {
    if (ev) ev.preventDefault();
    var fd = new FormData(form);
    var name = fdTrim(fd, "name");
    var mobile = fdTrim(fd, "mobile");
    var people = fdTrim(fd, "people");
    var traveldate = fdTrim(fd, "traveldate");
    var packageLabel = fdTrim(fd, "package");
    var placeName = fdTrim(fd, "placeName") || "Kedarnath";
    var detailPage = fdTrim(fd, "detailPage");
    var email = fdTrim(fd, "email");
    var age = fdTrim(fd, "age");
    var pickupCity = fdTrim(fd, "pickupCity");
    var medical = fdTrim(fd, "medical");
    var fileInputs = form.querySelectorAll('input[type="file"]');
    var uploadNote =
      fileInputs.length > 0
        ? "Guest selected " + fileInputs.length + " attachment(s) on the enquiry form."
        : "";

    if (!name || !mobile || !people || !traveldate) {
      alert("Please fill in full name, mobile, number of people, and preferred travel date.");
      return false;
    }

    var enquiryRecord = {
      name: name,
      phone: mobile,
      persons: people,
      date: traveldate,
      package: packageLabel,
      destination: placeName,
      email: email,
      ageDetails: age,
      pickupCity: pickupCity,
      medical: medical,
      detailPage: detailPage,
      uploadNote: uploadNote,
      sourceForm: "kedarnath-package-detail"
    };
    pushEnquiry(enquiryRecord);

    var receipt = {
      source: "enquiry",
      enquiryKind: "package-detail",
      receiptId: newReceiptId(),
      createdAt: new Date().toISOString(),
      name: name,
      email: email,
      phone: mobile,
      persons: people,
      date: traveldate,
      package: packageLabel,
      destination: placeName,
      placeName: placeName,
      detailPage: detailPage,
      ageDetails: age,
      pickupCity: pickupCity,
      medicalNote: medical,
      uploadNote: uploadNote
    };
    goReceipt(receipt);
    return false;
  }

  /**
   * place-detail.html — quick enquiry for any catalogued place
   */
  function submitPlaceDetailForm(ev, form) {
    if (ev) ev.preventDefault();
    var fd = new FormData(form);
    var name = fdTrim(fd, "name");
    var phone = fdTrim(fd, "phone");
    var persons = fdTrim(fd, "persons");
    var date = fdTrim(fd, "date");
    var email = fdTrim(fd, "email");
    var message = fdTrim(fd, "message");
    var destination = fdTrim(fd, "destination");
    var detailPage = fdTrim(fd, "detailPage");

    if (!name || !phone || !persons || !date || !destination) {
      alert("Please fill in name, phone, number of persons, travel date, and place.");
      return false;
    }

    var enquiryRecord = {
      name: name,
      phone: phone,
      persons: persons,
      date: date,
      package: "Place enquiry",
      destination: destination,
      email: email,
      message: message,
      detailPage: detailPage,
      sourceForm: "place-detail"
    };
    pushEnquiry(enquiryRecord);

    goReceipt({
      source: "enquiry",
      enquiryKind: "place-detail",
      receiptId: newReceiptId(),
      createdAt: new Date().toISOString(),
      name: name,
      email: email,
      phone: phone,
      persons: persons,
      date: date,
      package: "General enquiry — " + destination,
      destination: destination,
      placeName: destination,
      detailPage: detailPage,
      message: message
    });
    return false;
  }

  w.GarhKumoDetailEnquiry = { submit: submitKedarPackageForm };
  w.GarhKumoPlaceDetail = { submit: submitPlaceDetailForm };
})(window);
