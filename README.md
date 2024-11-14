# Password Generator Extension

This project is a browser extension that generates secure passwords based on a master password and website-specific information. It uses PBKDF2 and SHA-256 to derive strong passwords, following security standards with mixed character types.

## Features

- **Secure Password Generation**: Uses PBKDF2 and SHA-256 to derive passwords.
- **Password Complexity**: Passwords are 13 characters long and contain uppercase letters, lowercase letters, numbers, and symbols.
- **Simple UI**: Minimalist design with a dark theme.
- **Copy to Clipboard**: One-click copy functionality for generated passwords.



## Installation

1. Clone or download this repository.
2. Open your browser and navigate to `chrome://extensions/`.
3. Enable **Developer mode**.
4. Click on **Load unpacked** and select the `PasswordGeneratorExtension` directory.

## Usage

1. Click on the extension icon (a key) to open the password generator popup.
2. Enter the **Master Password**, **Website URL**, and **Username**.
3. Click on **Generate Password**.
4. The generated password will appear in the text box. Click the copy icon to copy it to the clipboard.

## Code Overview

- **popup.html**: Provides the structure of the popup UI.
- **popup.js**: Contains the logic for generating a password, validating input, and handling the copy functionality.
- **styles.css**: CSS for basic styling of the popup window, input fields, buttons, and icons.
- **crypto.min.js**: JavaScript library for cryptographic functions (PBKDF2 and SHA-256).


## Dependencies

- **CryptoJS** (`crypto.min.js`): This library is used for PBKDF2 and SHA-256 hashing.

## License

This project is open-source. Feel free to modify and use it for personal or educational purposes.



