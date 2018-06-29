const convertCurrency = (amount, fromCurrency, toCurrency) => {
  // set default values
  let value = document.getElementById("value").value,
    conversion = document.getElementById("conversion"),
    madeSelection = document.getElementById("selection"), // get the select
    selection = madeSelection.options[madeSelection.selectedIndex].value, // get the selected option
    ans = "USD_ZAR";
  amount = value;
  value = parseFloat(value);

  if (!isNaN(value)) {
    switch (selection) {
      case "6":
        ans = "EUR_USD";
        break;
      case "5":
        ans = "USD_ZAR";
        break;
      case "4":
        ans = "USD_EUR";
        break;
      case "3":
        ans = "USD_CNY";
        break;
      case "2":
        ans = "USD_NZD";
        break;
      case "1":
        ans = "USD_AUD";
        break;
      default:
        ans = 1;
        break;
    }
  }

  let query = ans;
  let url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`;
  fetch(url, { mode: "cors" })
    .then(data => {
      return data.json();
    })
    .then(res => {
      const convertedValue = `${Object.values(res)}`;
      storeDB(res);
      conversion.value = (Number(convertedValue) * Number(amount)).toFixed(2);
    })
    .catch(error => {
      alert("there was an error: ", error);
    });
};
//   https://free.currencyconverterapi.com/api/v5/convert?q=USD_ZAR&compact=ultra

// Store response in the indexedDB
function storeDB(data) {
  let indexedDB =
    self.indexedDB ||
    self.mozIndexedDB ||
    self.webkitIndexedDB ||
    self.msIndexedDB;

  let open = indexedDB.open("currency-db", 1);

  open.onupgradeneeded = () => {
    let db = open.result;
    db.createObjectStore("currencyStore", { autoIncrement: true });
  };

  open.onsuccess = () => {
    let db = open.result;
    let tx = db.transaction("currencyStore", "readwrite");
    let store = tx.objectStore("currencyStore");

    store.put(data);

    tx.oncomplete = () => {
      db.close();
    };
  };
}

// <!-- Register Service Worker -->
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .then(function(registration) {
      registration.addEventListener("updatefound", function() {
        var installingWorker = registration.installing;
        console.log(
          "A new service worker is being installed:",
          installingWorker
        );
      });
    })
    .catch(function(error) {
      console.log("Service worker registration failed:", error);
    });
} else {
  console.log("Service workers are not supported.");
}
