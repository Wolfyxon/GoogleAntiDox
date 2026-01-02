import { GOOGLE_DOMAIN_ENDS } from "./googleDomainEnds.js";
import * as fs from "fs";

const DIRECTORIES = ["search", "sorry/index"];
const EXTENSION_DIR = import.meta.dirname + "../extension";

function createMatchURL(domainEnd, directory) {
    return `*://*.google.${domainEnd}/${directory}/*`;
}

function makeMatchURLs() {
    const res = [];

    for(const directory of DIRECTORIES) {
        for(const domainEnd of GOOGLE_DOMAIN_ENDS) {
            res.push(createMatchURL(domainEnd, directory));
        }
    }

    return res;
}

function getManifestTemplate() {
    const text = fs.readFileSync(import.meta.dirname + "/manifest.json");
    return JSON.parse(text);
}

function makeManifest() {
    const manifest = getManifestTemplate();
    const matchURLs = makeMatchURLs();

    manifest.content_scripts[0].matches = matchURLs;
    manifest.host_permissions = matchURLs;

    return manifest;
}

function build() {
    console.log("Generating manifest...");

    const manifest = makeManifest();
    const path = EXTENSION_DIR + "/manifest.json";

    console.log("Success, writing file...");
    fs.writeFileSync(JSON.stringify(path));

    console.log("Manifest successfully generated at")
    console.log(path);
}

build();
