const radioSettings = ["level"];


async function saveSettings() {
    const newSettings = {};

    for(const settingName of radioSettings) {
        const input = document.querySelector(`input[name="${settingName}"]:checked`);
        newSettings[settingName] = input.value;
    }

    return await Settings.merge(newSettings);
}

async function loadRadios(settingName, settings) {
    const radios = document.querySelectorAll(`input[name='${settingName}']`);
    
    for(const radio of radios) {
        radio.checked = settings[settingName] == radio.value;

        radio.addEventListener("change", async () => {
            const settings = await saveSettings();
            updateExplanations(settings);
        });
    }
}

async function loadSettings() {
    const settings = await Settings.get();
    
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
    if(Settings.getStorage()) {
        loadSettings();
    } else {
        console.warn("Storage not available, script is probably not running in extension mode. Settings won't work!");
    }
}

main();
