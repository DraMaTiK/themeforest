const stateButton = document.getElementById("prod");

if (localStorage.getItem("PROD") === null) {
    localStorage.setItem("PROD", "false")
}

chrome.storage.sync.get(['PROD'], function (data) {

    if (data.PROD === true) {
        stateButton.setAttribute("checked", 'true')
    } else {
        stateButton.removeAttribute("checked")
    }

});

updateButton.addEventListener(`click`, function Settings() {
    chrome.storage.sync.set({'PROD': stateButton.checked});
    window.close();
})