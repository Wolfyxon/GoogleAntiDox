const defaultSettings = {
    "level": "city"
};

const radioSettings = ["level"];

async function hasSettings() {
    const keys = await browser.storage.sync.getKeys();
    return keys.length != 0; 
}

function saveSettings() {
    const newSettings = { ...defaultSettings };

    for(const settingName of radioSettings) {
        const input = document.querySelector(`input[name="${settingName}"]:checked`);
        newSettings[settingName] = input.value;
    }

    browser.storage.sync.set(newSettings);
    return newSettings;
}

async function loadRadios(settingName, settings) {
    const radios = document.querySelectorAll(`input[name='${settingName}']`);
    
    for(const radio of radios) {
        radio.checked = settings[settingName] == radio.value;

        radio.addEventListener("change", () => {
            const settings = saveSettings();
            updateExplanations(settings);
        });
    }
}

async function loadSettings() {
    const settings = await browser.storage.sync.get();
    
    for(const setting of radioSettings) {
        loadRadios(setting, settings);
    }

    updateExplanations(settings);
}

function updateExplanations(settings) {
    const levelExpl = document.getElementById("setting-level-explanation");

    if(settings.level == "city") {
        levelExpl.innerText = "Your approximate city will be protected but your country will still be visible. Standard protection level.";
    } else if(settings.level == "country") {
        levelExpl.innerText = "Both your city and country will be protected. Maximum protection level.";
    }
}

async function main() {
    if(browser) {
        if(!await hasSettings()) {
            saveSettings();
        }

        loadSettings();
    } else {
        console.warn("'browser' not available, script is not running in extension mode. Settings won't work!");
    }
}

main();
