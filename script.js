const base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");

const fromcurr = document.querySelector("select[name='from']");
const tocurr = document.querySelector("select[name='to']");
const msg = document.querySelector(".msg");

for (let currCode in countryList) {
    let newOptionFrom = document.createElement("option");
    newOptionFrom.innerText = currCode;
    newOptionFrom.value = currCode;
    if (currCode === "INR") newOptionFrom.selected = true;
    fromcurr.append(newOptionFrom);

    let newOptionTo = document.createElement("option");
    newOptionTo.innerText = currCode;
    newOptionTo.value = currCode;
    if (currCode === "USD") newOptionTo.selected = true; 
    tocurr.append(newOptionTo);
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

fromcurr.addEventListener("change", (evt) => {
    updateFlag(evt.target);
});

tocurr.addEventListener("change", (evt) => {
    updateFlag(evt.target);
});

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".money input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    
    const fromCode = fromcurr.value.toLowerCase();
    const toCode = tocurr.value.toLowerCase();
    const URL = `${base_url}/${fromCode}.json`;
    
    try {
        let response = await fetch(URL);
        let data = await response.json();
        
        let rate = data[fromCode][toCode];
        
        let finalamt = amtVal * rate;
        
        msg.innerText = `${amtVal} ${fromcurr.value} = ${finalamt.toFixed(2)} ${tocurr.value}`;
        
    } catch (error) {
        console.error("Fetch error details:", error);
        msg.innerText = "Error fetching exchange rates.";
    }
});