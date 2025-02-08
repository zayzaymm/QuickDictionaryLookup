chrome.storage.local.get(["url"], (result) => {
    if (!result.url) {
       chrome.storage.local.set({url: "https://dictionary.cambridge.org/dictionary/english"});
    }
});
document.addEventListener("selectionchange",() => {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
        chrome.runtime.sendMessage({
            type: "selectionChanged",
            text: selectedText
        });
    }
});