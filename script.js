const countryList = {
    AED: "AE",
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    AQD: "AQ",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    XOF: "BE",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    NOK: "BV",
    BWP: "BW",
    BYR: "BY",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    XAF: "CF",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CYP: "CY",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    ECS: "EC",
    EEK: "EE",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KPW: "KP",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LTL: "LT",
    LVL: "LV",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MRO: "MR",
    MTL: "MT",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    XPF: "NC",
    NGN: "NG",
    NIO: "NI",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SGD: "SG",
    SKK: "SK",
    SLL: "SL",
    SOS: "SO",
    SRD: "SR",
    STD: "ST",
    SVC: "SV",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VEF: "VE",
    VND: "VN",
    VUV: "VU",
    YER: "YE",
    ZAR: "ZA",
    ZMK: "ZM",
    ZWD: "ZW",
};

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#getRate");
const fromCurr = document.querySelector("#fromSelect");
const toCurr = document.querySelector("#toSelect");
const msg = document.querySelector(".msg");

// Populate dropdowns with currency codes
for (let select of dropdowns) {
    for (let code in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if (select.name === "form" && code === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && code === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

// Function to update flag images based on selected currency
const updateFlag = (flagCode) => {
    let curCode = flagCode.value;
    let countryCode = countryList[curCode];
    let newScr = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = flagCode.parentElement.querySelector("img");
    if (img) {
        img.src = newScr;
    }
};

// Function to fetch and display USD to INR rate (or any default)
function printMsg() {
    fetch(`https://v6.exchangerate-api.com/v6/aa91af5ce54a20f13d748166/latest/usd`)
        .then((response) => response.json())
        .then((data) => {
            const inrRate = data.conversion_rates['INR'];
            let finalAmount = inrRate * 1;
            msg.innerText = `1 USD = ${finalAmount} INR`;
        })
        .catch((error) => console.error('Error:', error));
}

// Event listener for the button to fetch conversion
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amountInput = document.querySelector(".amount input");
    let amtVal = amountInput.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amountInput.value = 1;
    }
    const fromCurrency = fromCurr.value;
    const toCurrency = toCurr.value;

    fetch(`https://v6.exchangerate-api.com/v6/aa91af5ce54a20f13d748166/latest/${fromCurrency}`)
        .then((response) => response.json())
        .then((data) => {
            const rate = data.conversion_rates[toCurrency];
            let finalAmount = rate * amtVal;
            msg.innerText = `${amtVal} ${fromCurrency} = ${finalAmount} ${toCurrency}`;
        })
        .catch((error) => console.error('Error:', error));
});

// Initialize default selection and fetch rate on page load
window.addEventListener('load', () => {
    fromCurr.value = "USD";
    toCurr.value = "INR";

    updateFlag(fromCurr);
    updateFlag(toCurr);

    // Trigger the rate fetch for default currencies
    document.querySelector("#getRate").click();
});
