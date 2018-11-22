# Better 9gag

A WebExtension that provides improvements to the browsing experience for 9gag.

<!-- TOC -->

- [Features](#features)
- [Coming features](#coming-features)
- [Installation](#installation)
  - [Google Chrome](#google-chrome)
- [Packaging](#packaging)
  - [Firefox](#firefox)
  - [Edge](#edge)
- [Authors](#authors)
- [License](#license)
- [Disclaimer](#disclaimer)

<!-- /TOC -->

## Features

Provides features, such as:

- A dark or night theme
- Video controls for videos and gifs
- Show NSFW images and gifs when you're not logged in
- Removing the sharing buttons
- General style tweaks

### Coming features

Features that are planned for the future:

- [x] Persistent night theme _(planned for v1.5)_
- [ ] Configure extension settings _(planned for v2.0)_
- [ ] Some more style tweaks

## Installation

[![Firefox](.github/firefox-logo.png)](https://addons.mozilla.org/de/firefox/addon/better-9gag/) | [![Edge](.github/edge-logo.png)](https://www.microsoft.com/store/apps/9MT68CJLB6HL)
------------ | -------------
Click above for the <br> Firefox listing | Click above for the <br> Edge listing

### Google Chrome

![Chrome](.github/chrome-logo-small.png)
**Note**: For Chrome only manual installation is currently supported. To do this, follow these instructions:

1. Download the extension file (Better-9gag.crx) [here](https://github.com/Saphareas/Better-9gag/releases/latest)
2. Go to Chrome's Extensions page ( chrome://extensions/ )
3. Activate the developer mode (it's a switch in the top right) and reload the page
4. Drag and drop the downloaded file from your downloads folder into the page

## Packaging

_This section is mostly for myself, to have all packaging scripts in one place._ <br><br>
You might need to install the tools web-ext and ManifoldJS before:

```bash
npm install --global web-ext
npm install -g manifoldjs
```

### Firefox

```bash
web-ext build
```

### Edge

```bash
cd ..
manifoldjs -l debug -p edgeextension -f edgeextension -m Better-9gag/manifest.json
# Update the appxmanifest.xml and store assets with your/your extension's information before continuing.
manifoldjs -l debug -p edgeextension package Better\ 9gag/edgeextension/manifest\
```

## Authors

- **Fabian Große** - *Initial work* - [Saphareas](https://github.com/Saphareas)

## License

This project is licensed under the GPLv3 License - see the [LICENSE](LICENSE) file for details

## Disclaimer

Me, the other authors and this project are not in any way associated with 9gag.com and/or it's creators.
