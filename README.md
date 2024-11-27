Sure! Here's a README file for your GitHub repository:

---

# MC Link Extractor by AR Chrome Extension

This Chrome extension extracts `MC` links from a webpage, filters them based on specific conditions, and provides an easy way to copy those links to your clipboard. It targets `MC` links that are in rows with either no `img` tags or those that contain a valid `img` tag with a specific `src`.

## Features

- **Extracts MC links** from the current active tab.
- **Filters rows** based on the presence of an `img` tag and its `src` value.
  - Includes rows without any `img` tag.
  - Includes rows where the `img` tag `src` matches either:
    - `https://brokersnapshot.com/images/icons/icon48_rating2_1.png`
    - `/images/icons/icon48_rating2_1.png`
- **Displays extracted links** in the extension popup.
- **Copy to clipboard** feature to easily copy all extracted links with a single click.

## Installation

1. Clone the repository or download the code as a ZIP file.
2. Open `chrome://extensions` in your Chrome browser.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select the folder where the extension files are located.

## Usage

1. Open a webpage that contains rows with `MC` links.
2. Click on the extension icon in your browser's toolbar.
3. The extension will scan the page and extract the `MC` links from rows that meet the conditions.
4. The extracted links will be displayed in the extension popup.
5. Click the **Copy Links** button to copy all the extracted links to your clipboard.

## Code Overview

### Files

- **`popup.html`**: The HTML structure for the extension popup.
- **`popup.js`**: The JavaScript that handles extracting links from the page, displaying them in the popup, and copying them to the clipboard.
- **`manifest.json`**: The metadata file that defines the extension’s settings, permissions, and background scripts.

### `popup.js` Details

- **`extractMCLinks()`**: This function extracts `MC` links from rows that either:
  - Have no `img` tag.
  - Contain an `img` tag with a valid `src` matching one of the specified values (`https://brokersnapshot.com/images/icons/icon48_rating2_1.png` or `/images/icons/icon48_rating2_1.png`).
- **`copyButton.addEventListener("click", ...)`**: Handles copying the extracted links to the clipboard when the "Copy Links" button is clicked.

## Permissions

- The extension requires the following permissions:
  - **Active Tab**: To access the current webpage and extract the links.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to customize the README as needed! Let me know if you need any adjustments.
