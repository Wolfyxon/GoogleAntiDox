async function main() {
    const settings = await Settings.get();

    let mutationObs;
    let footerLocationRemoved = false;
    let directionsRemoved = false;
    let resultsForRemoved = false;

    function run() {
        if(document.querySelector(".g-recaptcha")) {
            runCaptchaPage();
        } else {
            runNormalPage();
        }
    }

    // "Our systems have detected unusual traffic from your computer network." page
    function runCaptchaPage() {
        // the block that displays the IP address, time and URL.
        const metaText = document.querySelector("#infoDiv ~ * ~ *");

        if(metaText) {
            const lines = metaText.innerHTML.split("<br>");
            metaText.innerHTML = lines.slice(1).join("<br>"); // First line is the IP address 
            
            obs.disconnect();
        }
    }

    // Normal Google search
    function runNormalPage() {
        const mapsBanner = document.querySelector("*[data-ly]");
        const fbar = document.querySelector(".fbar");
        const locationFooterLabel = document.querySelector(".unknown_loc ~ *");
        const directionsWidget = document.querySelector("*[data-attrid='TravelGettingThereFeedback']");
        const resultsFor = document.querySelector("dynamic-visibility-control div[data-hveid]"); // "Results for <city name>" block

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

        if(resultsFor) {
            resultsFor.remove();
            resultsForRemoved = true;
        }

        if(footerLocationRemoved && (!mapsBanner || directionsRemoved) && (!resultsFor || resultsForRemoved)) {
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
