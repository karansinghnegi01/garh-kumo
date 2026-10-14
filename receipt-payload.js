/**
 * Pass receipt / booking data between pages using a simple query string
 * (no JSON). Example: booking_reicpt.html?name=...&phone=...&date=...
 *
 * Reads: ?query first, then #query (same format after #).
 */
(function (global) {
  var MAX_LEN = 800;

  function truncate(s) {
    s = String(s);
    return s.length > MAX_LEN ? s.slice(0, MAX_LEN) + "..." : s;
  }

  /** Plain object -> application/x-www-form-urlencoded style string */
  function toQueryString(obj) {
    if (!obj || typeof obj !== "object") return "";
    var p = new URLSearchParams();
    var keys = Object.keys(obj).sort();
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      var v = obj[k];
      if (v === undefined || v === null) continue;
      if (typeof v === "object") continue;
      p.set(k, truncate(String(v)));
    }
    return p.toString();
  }

  /** "a=1&b=2" or "?a=1" -> plain object */
  function fromQueryString(qs) {
    if (qs == null || qs === "") return null;
    qs = String(qs).replace(/^\?/, "").replace(/^#/, "").trim();
    if (!qs) return null;
    var p = new URLSearchParams(qs);
    if (!p.toString()) return null;
    var o = {};
    p.forEach(function (val, key) {
      o[key] = val;
    });
    if (!o.receiptId && !o.name) return null;
    return o;
  }

  function fromLocation() {
    var loc = global.location;
    if (!loc) return null;
    if (loc.search && loc.search.length > 1) return fromQueryString(loc.search.slice(1));
    var h = (loc.hash || "").replace(/^#/, "");
    if (h && h.indexOf("=") >= 0) return fromQueryString(h);
    return null;
  }

  function receiptHref(obj) {
    var q = toQueryString(obj);
    return q ? "booking_reicpt.html?" + q : "booking_reicpt.html";
  }

  function paymentPrefillHref(obj) {
    var q = toQueryString(obj);
    return q ? "payment.html?" + q : "payment.html";
  }

  global.GarhKumoReceiptPayload = {
    toQueryString: toQueryString,
    fromQueryString: fromQueryString,
    fromLocation: fromLocation,
    receiptHref: receiptHref,
    paymentPrefillHref: paymentPrefillHref,
  };
})(typeof window !== "undefined" ? window : this);
