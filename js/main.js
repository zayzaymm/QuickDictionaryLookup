var sw1 = document.querySelector("#sw-1");
var sw2 = document.querySelector("#sw-2");
var sw3 = document.querySelector("#sw-3");
var switches = document.querySelectorAll(".form-check-input");
var search = document.querySelector("#search");
chrome.storage.local.get(["url"], (result) => {
   if (result.url) {
      switches.forEach((res) => {
         if (res.value == result.url) {
            res.checked = true;
            res.disabled = true;
         }
      });
   }
});
function toggleSwitch(sw) {
    sw1.checked = false;
    sw1.disabled = false;
    sw2.checked = false;
    sw2.disabled = false;
    sw3.checked = false;
    sw3.disabled = false;
    sw.checked = true;
    sw.disabled = true;
    chrome.storage.local.set({url: sw.value});
}
sw1.addEventListener("change",()=> {
    if (sw1.checked) {
        toggleSwitch(sw1)
    }
});
sw2.addEventListener("change",()=> {
    if (sw2.checked) {
        toggleSwitch(sw2)
    }
});
sw3.addEventListener("change",()=> {
    if (sw3.checked) {
        toggleSwitch(sw3)
    }
});
window.onload = ()=> {
    search.focus();
}
search.addEventListener("keydown",(event)=> {
    var text = search.value;
    if (event.key == "Enter") {
        chrome.storage.local.get(["url"],(result) => {
            var dictUrl = `${result.url}/${text}`;
            chrome.tabs.create({url: dictUrl});
        });
    }
});