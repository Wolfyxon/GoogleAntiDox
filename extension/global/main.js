async function main() {
    const settings = await Settings.get();

    let mutationObs;
    let footerLocationRemoved = false;
    let directionsRemoved = false;

    function run() {
        const mapsBanner = document.querySelector("*[data-ly]");
        const fbar = document.querySelector(".fbar");
        const locationFooterLabel = document.querySelector(".unknown_loc ~ *");
        const directionsWidget = document.querySelector("*[data-attrid='TravelGettingThereFeedback']");

        if(!footerLocationRemoved) {
            if(settings.level == "city") {
                if(locationFooterLabel) {
                    locationFooterLabel.innerText = " ";
                    footerLocationRemoved = true;
                } else if(fbar) {
                    fbar.remove();
                    footerLocationRemoved = true;
                }
            } else {
                if(fbar) {
                    fbar.remove();
                    footerLocationRemoved = true;
                }
            }
        }

        if(!directionsRemoved && directionsWidget) {
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
