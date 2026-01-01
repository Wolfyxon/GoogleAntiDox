async function main() {
    const settings = await browser.storage.sync.get();

    let mutationObs;
    let footerLocationRemoved = false;
    let directionsRemoved = false;

    function run() {
        const mapsBanner = document.querySelector("*[data-ly]");

        // Your approximate city label on the footer
        const locationFooterLabel = document.querySelector(".unknown_loc ~ *");

        // When searching for towns in your country a widget with directions may appear
        const directionsWidget = document.querySelector("*[data-attrid='TravelGettingThereFeedback']");

        if(locationFooterLabel) {
            if(!settings.level || settings.level == "city") {
                locationFooterLabel.innerText = " ";
            } else {
                // this can probably be done better
                locationFooterLabel.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
            }

            footerLocationRemoved = true;
        }
        
        if(directionsWidget) {
            directionsWidget.parentElement.innerHTML = `
                <div class="googleantidox-hidden-directions">
                    <div>
                        <b>Directions hidden to protect your privacy.</b>
                    </div>
                    <div style="font-size: 80%">
                        GoogleAntiDox
                    </div>
                </div>
            `;

            directionsRemoved = true;
        }

        if(footerLocationRemoved && (!mapsBanner || directionsRemoved)) {
            mutationObs.disconnect();
        }
    }

    mutationObs = new MutationObserver(run);

    mutationObs.observe(document, {
        attributes: true, 
        childList: false,
        subtree: true
    });

    window.addEventListener("load", run);
}

main();