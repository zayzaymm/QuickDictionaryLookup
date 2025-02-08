chrome.runtime.onInstalled.addListener(()=> {
     chrome.contextMenus.create({
         id: "quickDictionaryLookup",
         title: "QDL : '%s'",
         contexts: ["selection"],
         visible: false
     });
});
chrome.runtime.onMessage.addListener((message,sender,sendResponse) => {
   if (message.type == "selectionChanged") {
      let wordCount = message.text.trim().split(/\s+/).length;
      chrome.contextMenus.update("quickDictionaryLookup",{
          visible: wordCount == 1 || wordCount == 2
      })
   }
});
chrome.contextMenus.onClicked.addListener((info,tab) => {
    if (info.menuItemId == "quickDictionaryLookup") {
       let word = encodeURIComponent(info.selectionText);
       chrome.storage.local.get(["url"], (result) => {
           let dictUrl = `${result.url}/${word}`;
           chrome.tabs.create({url: dictUrl })
       });
    }
});