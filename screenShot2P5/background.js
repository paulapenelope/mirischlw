let imageSend;

function onCaptured(imageUri) {
    imageSend = imageUri;
    //console.log(imageUri);
}

function onError(error) {
    console.log(`Error: ${error}`);
}

function sendMessageToTabs(tabs) {
   
        for (const tab of tabs) {
          browser.tabs
            .sendMessage(tab.id, { data: imageSend })
            .catch(onError);
        }
   
}




//browser.browserAction.onClicked.addListener(() => {
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {   
    let capturing = browser.tabs.captureTab();
   
    capturing
        .then(onCaptured)
        .then((response) => {
            browser.tabs
                .query({
                    currentWindow: true,
                    active: true,
                })
                .then(sendMessageToTabs)

        })
        .catch(onError);

});