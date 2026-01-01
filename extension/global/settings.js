const DEFAULT_SETTINGS = {
    "level": "city"
};

class Settings {
    static getStorage() {
        // 'typeof' doesn't throw errors with undefined identifiers

        if(typeof(browser) !== "undefined") { // Firefox
            return browser.storage.sync;
        }

        if(typeof(chrome) !== "undefined") {
            return chrome.storage.local;
        }
    }

    static async exist() {
        const keys = await this.getStorage().getKeys();
        return keys.length != 0;
    }

    static async get() {
        const storage = this.getStorage();
        const settings = await storage.get();
        
        for(const [key, defaultValue] of Object.entries(DEFAULT_SETTINGS)) {
            if(settings[key] === undefined) {
                settings[key] = defaultValue;
            }
        }

        return settings;
    }

    static async overwrite(newSettings) {
        return await this.getStorage().set(newSettings);
    }

    static async merge(newSettings) {
        const current = await this.get();

        for(const [key, value] of Object.entries(newSettings)) {
            current[key] = value;
        }

        this.overwrite(current);
        return current;
    }
}
