function run() {
    // Your approximate city label on the footer
    const locationFooterLabel = document.querySelector(".unknown_loc ~ *");

    // When searching for towns in your country a widget with directions may appear
    const directionsWidget = document.querySelector("*[data-attrid='TravelGettingThereFeedback']");

    if(locationFooterLabel) {
        locationFooterLabel.innerText = " ";
    }
    
    if(directionsWidget) {
        directionsWidget.parentElement.innerHTML = `
            <div style="display: flex; flex-direction: column; justify-content: center; height: 100%; text-align: center; gap: 10px">
                <div>
                    <b>Directions removed to protect your privacy.</b>
                </div>
                <div style="font-size: 80%">
                    GoogleAntiDox
                </div>
            </div>
        `;
    }
}

function removeIfExists(element) {
    if(element) {
        element.remove();
    }
}

const observeConfig = {
    attributes: true, 
    childList: false,
  	subtree: true
}

const footer = document.getElementById("sfooter");
const mapsBanner = document.querySelector("*[data-ly]");
const mutationObs = new MutationObserver(run);

if(footer) {
    mutationObs.observe(footer, observeConfig);
}

if(mapsBanner) {
    mutationObs.observe(mapsBanner, observeConfig);
}

run();
