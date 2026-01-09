# GoogleAntiDox
A browser extension that removes things that give off your location in Google search.
Prevents you from accidentally leaking sensitive information when making screenshots.

Should be compatible with Firefox and all Chromium-based browsers (requires manual installation at the moment).

**[Install for Firefox](https://addons.mozilla.org/en-US/firefox/addon/googleantidox/)**

> [!IMPORTANT]
> This extension is not guaranteed to work if Google changes their code. If it doesn't work, open an issue ASAP!

## What's hidden
- Your location on the footer
- "Results for &lt;city name&gt; (+) Use precise location"
- Directions widget that sometimes appears when searching for places
- Your IP address on the captcha page

## Screenshots

![](.github/screenshots/directions.png)
![](.github/screenshots/footer.png)
![](.github/screenshots/settings.png)


## Manual installation
### Chromium (Chrome, Edge, Brave, Opera)
1. Download and extract the source code
2. Open your browser and go to `chrome://extensions`
3. Turn on *developer mode* in the top right corner
4. Click *load unpacked* on the top right
5. Navigate to the repository files
6. Select the *extension* folder
7. Done

### Firefox
**Note**: Due to Firefox's security, manually installed extensions are removed when you close your browser. Please use the Firefox Add-Ons store when the extension becomes available there.

1. Build the extension or download the source code
2. Open Firefox and go to `about:debugging`
3. Click on *This Firefox* on the left
4. Click *Load temporary addon*
5. Find and open the extension `.xpi` file or `manifest.json` inside the `extension` folder
6. Done

## Building
### Manual
Simply archive the *extension* folder in the zip format, then change the extension to `.xpi`.

Structure:
```
GoogleAntiDox.xpi
|_ global
|_ settings
|_ manifest.json
```

### Automated (recommended for development. Linux only)
Install `node`, `zip` and run
```
npm run build
```
