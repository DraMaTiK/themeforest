const stateButton = document.getElementById("state");


chrome.storage.sync.get(['STATE'], function (data) {

    if (data.STATE === true) {
        stateButton.setAttribute("checked", 'true')
    } else {
        stateButton.removeAttribute("checked")
    }

});

updateButton.addEventListener(`click`, function Settings() {
    chrome.storage.sync.set({'STATE': stateButton.checked});
    window.close();
})