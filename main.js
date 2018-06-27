function convertCurrency(amount, fromCurrency, toCurrency) {
  var value = document.getElementById("value").value,
    conversion = document.getElementById("conversion"),
    madeSelection = document.getElementById("selection"), // get the select
    selection = madeSelection.options[madeSelection.selectedIndex].value, // get the selected option
    ans = 1;
  value = parseFloat(value);
  if (!isNaN(value)) {
    switch (selection) {
      case "6":
        ans = "EUR_US";
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
  let url =
    "https://free.currencyconverterapi.com/api/v5/convert?q=" +
    query +
    "&compact=ultra";

  fetch(url)
    .then(data => {
      return data.json();
    })
    .then(res => {
      console.log(`${Object.values(res)}`);
      const convertedValue = `${Object.values(res)}`;
      conversion.value = Number(convertedValue).toFixed(2);
    })
    .catch(error => {
      alert("there was an error: ", error);
      console.log(error);
    });
}
//   https://free.currencyconverterapi.com/api/v5/convert?q=USD_ZAR&compact=ultra
