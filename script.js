const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";

// Currency code to name mapping (add more as needed)
const currencyNames = {
    "USD": "United States Dollar",
    "INR": "Indian Rupee",
    "EUR": "Euro",
    "GBP": "British Pound Sterling",
    "JPY": "Japanese Yen",
    "AUD": "Australian Dollar",
    "CAD": "Canadian Dollar",
    "CHF": "Swiss Franc",
    "CNY": "Chinese Yuan",
    "SGD": "Singapore Dollar",
    "HKD": "Hong Kong Dollar",
    "NZD": "New Zealand Dollar",
    "ZAR": "South African Rand",
    // ... add more as needed
};

// DOM Elements
const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");

// Fetch and Populate Currencies
async function loadCurrencies() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const currencies = Object.keys(data.rates);

        currencies.forEach(currency => {
            const option1 = document.createElement("option");
            const option2 = document.createElement("option");
            const name = currencyNames[currency] || currency;
            option1.value = option2.value = currency;
            option1.textContent = option2.textContent = `${name} (${currency})`;
            fromCurrency.appendChild(option1);
            toCurrency.appendChild(option2);
        });

        fromCurrency.value = "USD";
        toCurrency.value = "INR";
    } catch (error) {
        alert("Failed to load currencies.");
    }
}

// Convert Currency
async function convertCurrency() {
    const amount = amountInput.value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (!amount || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const exchangeRate = data.rates[to] / data.rates[from];
        const convertedAmount = (amount * exchangeRate).toFixed(2);

        result.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
    } catch (error) {
        alert("Error converting currency.");
    }
}

// Event Listeners
convertBtn.addEventListener("click", convertCurrency);
window.addEventListener("load", loadCurrencies);
