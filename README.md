# ELI Web Extension Frontend

Welcome to the frontend repository of the ELI (Enhanced Learning Interface) web extension. This extension is designed to enhance user interaction with web content by providing a dynamic and customizable interface. Our focus is on improving accessibility and user engagement through a resizable and interactive extension.

## Features

- **Resizable Interface:** Users can adjust the size of the extension and its components to enhance readability and interaction.
- **Interactive Elements:** Includes various interactive elements such as buttons and sliders to provide an engaging user experience.
- **Dynamic Content Loading:** Allows for seamless interaction with web content without the need for page refreshes.
- **User Customization:** Enables users to adjust settings and preferences within the extension to suit their needs.

## Installation

To install the ELI extension in your Chrome browser, follow these steps:

1. **Download the Extension:**
   - Navigate to [ELI GitHub Repository](https://github.com/invalidexplorer/ELI_Vanilla/) and download the repository as a ZIP file. Alternatively, you can clone the repository using:
     ```bash
     git clone https://github.com/invalidexplorer/ELI_Vanilla.git
     ```

2. **Extract the ZIP File:**
   - If you downloaded the ZIP file, extract it to a folder on your computer.

3. **Load the Extension in Chrome:**
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode" at the top right.
   - Click "Load unpacked" and select the folder where you extracted the ELI extension.

## File Structure

- `manifest.json` - Configures the extension's settings and permissions.
- `background.js` - Handles background processes of the extension.
- `content.js` - Manages interactions with the content of the web page.
- `popup.js` - Controls the behavior of the popup window.
- `popup.html` - Markup for the popup window.
- `popup.css` - Styles for the popup window.

## Contributing

We welcome contributions to the ELI project. If you have suggestions or improvements, please fork the repository and submit a pull request:

1. **Fork the Repository**
2. **Create a Feature Branch:**
   ```bash
   git checkout -b feature-your-new-feature
   ```
3. **Commit Your Changes:**
   ```bash
   git commit -am 'Add some feature'
   ```
4. **Push to the Branch:**
   ```bash
   git push origin feature-your-new-feature
   ```
5. **Submit a Pull Request**

## Support

For support, please open an issue through the GitHub issue tracker. Our team will get back to you as soon as possible.
