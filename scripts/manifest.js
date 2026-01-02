import { GOOGLE_DOMAIN_ENDS } from "./googleDomainEnds.js";
import * as fs from "fs";

const EXTENSION_DIR = import.meta.dirname + "/../extension";
const MANIFEST_PATH = EXTENSION_DIR + "/manifest.json";

const URL_DIRECTORIES = ["search", "sorry"];

function createMatchURL(domainEnd, directory) {
    return `*://*.google.${domainEnd}/${directory}*`;
}

function makeMatchURLs() {
    const res = [];

    for(const directory of URL_DIRECTORIES) {
        for(const domainEnd of GOOGLE_DOMAIN_ENDS) {
            res.push(createMatchURL(domainEnd, directory));
        }
    }

    return res;
}

function getManifest() {
    const text = fs.readFileSync(MANIFEST_PATH);
    return JSON.parse(text);
}

function getUpdatedManifest() {
    const manifest = getManifest();
    const matchURLs = makeMatchURLs();

    manifest.content_scripts[0].matches = matchURLs;
    
    return manifest;
}

function main() {
    console.log("Updating manifest...");

    const manifest = getUpdatedManifest();
    const path = EXTENSION_DIR + "/manifest.json";

    console.log("Success, writing file...");
    fs.writeFileSync(path, JSON.stringify(manifest, null, "     "));

    console.log("Manifest successfully updated");
}

main();
