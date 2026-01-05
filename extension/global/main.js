async function main() {
    const settings = await Settings.get();

    let mutationObs;

    let pageFullyLoaded = false;
    let footerLocationRemoved = false;
    let directionsRemoved = false;
    let resultsForRemoved = false;
    let ipRemoved = false;

    function run() {
        if(document.querySelector("#captcha-form")) {
            runCaptchaPage();
        } else {
            runNormalPage();
        }
    }

    // "Our systems have detected unusual traffic from your computer network." page
    function runCaptchaPage() {
        const metaText = document.querySelector("#captcha-form ~ div > :last-child");

        if(!ipRemoved && metaText) {
            const prevText = metaText.innerText;
            metaText.innerText = "";

            // First line is the IP address
            for(const line of prevText.split("\n").slice(1)) {
                const div = document.createElement("div");
                div.innerText = line;
                metaText.append(div);
            }

            ipRemoved = true;
            mutationObs.disconnect();
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
            if(locationFooterLabel) {
                locationFooterLabel.innerText = " ";
                footerLocationRemoved = true;
            }

            if(settings.level == "country" || (!locationFooterLabel && pageFullyLoaded) ) {
                if(fbar) {
                    fbar.remove();
                    footerLocationRemoved = true;
                }
            }
        }

        if(!directionsRemoved && directionsWidget) {
            const widgetParent = directionsWidget.parentElement;

            const container = document.createElement("div");
            const mainText = document.createElement("div");
            const smallText = document.createElement("div");

            mainText.innerText = "Directions hidden to protect your privacy";
            mainText.classList.add("main-text");

            smallText.innerText = "GoogleAntiDox";
            smallText.classList.add("small-text");

            container.classList.add("googleantidox-hidden-directions");
            container.append(mainText, smallText);

            for(const child of widgetParent.children) {
                child.remove();
            }

            widgetParent.append(container);

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
        childList: true,
        subtree: true
    });

    window.addEventListener("load", () => {
        pageFullyLoaded = true;
        run();
    });

    run();
}

main();
