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
}

async function loadRadios(settingName, settings) {
    const radios = document.querySelectorAll(`input[name='${settingName}']`);
    
    for(const radio of radios) {
        radio.checked = settings[settingName] == radio.value;

        radio.addEventListener("change", saveSettings);
    }
}

async function loadSettings() {
    const settings = await browser.storage.sync.get();

    for(const setting of radioSettings) {
        loadRadios(setting, settings);
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