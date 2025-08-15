const flag = (el) => {
    let op = el.options[el.selectedIndex];
    console.log(op);
    let nf = op.dataset.flag;
    console.log(nf);
    let imgSrc = `https://flagsapi.com/${nf}/flat/64.png`;
    let img = el.parentElement;
    img.querySelector("img").src = imgSrc;

 
}
const updateUI = () => {
    const fromSel = document.querySelector(".from select");
    const toSel = document.querySelector(".to select");
    flag(fromSel);
    flag(toSel);
    convert();
};

const sel = document.querySelectorAll(".exchange select");
for (let key of sel) {
    for (let code of countryData) {
        let opt = document.createElement("option");
        opt.innerText = `${code.name} (${code.currency})`;
        opt.value = `${(code.currency).toLocaleLowerCase()}`;
        opt.dataset.flag = `${code.flag}`;
        key.append(opt);
        if (key.name === "from" && code.currency === "USD") {
            opt.selected = "selected";
        }
        if (key.name === "to" && code.currency === "INR") {
            opt.selected = "selected";
        }


    }
    
    


    key.addEventListener("change", (e) => { //Add listiner to both select dropdown
        // console.log((e.target).value);
        // flag(e.target);
        // convert();
        updateUI();
    })
}


const base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const btn = document.querySelector(".convert");
let disprate = document.querySelector(".rate span")


const convert =async (e)=>{
    let fromCrr=document.querySelector(".from select").value;
    let toCrr=document.querySelector(".to select").value;
    let amt = document.querySelector(".amount input");

    console.log(`${fromCrr}, ${toCrr}`);
    const new_url = `${base_url}/${fromCrr}.json`
    let response = await fetch(new_url);
    let data = await response.json();
    console.log(data[fromCrr][toCrr]);
    let rate = await data[fromCrr][toCrr];
    disprate.innerText = rate.toFixed(2);
    let val = (amt.value)*rate;
    console.log(val);
    document.querySelector(".disp").innerText= val.toFixed(2);
}
let amt = document.querySelector(".amount input");
amt.addEventListener("change", (e)=>{
         if(amt.value<1){
        amt.value = 1;
        alert("Only Enter Positive numerical values!")
    }
    })


// convert();
updateUI();

btn.addEventListener("click", ()=>{
    // convert();
    updateUI();
})
document.getElementById("rev").addEventListener("click", (e)=>{
    let a = document.querySelector(".from select");
    let b = document.querySelector(".to select");
    let temp = a.selectedIndex;
    a.selectedIndex=b.selectedIndex;
    b.selectedIndex= temp;
    // flag(a);
    // flag(b);
    // convert();
    updateUI(); 
})

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        updateUI();
    }
});





