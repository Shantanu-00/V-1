document.getElementById('generate-button').addEventListener('click', function() {
  const masterPassword = document.getElementById('master-password').value;
  const websiteUrl = document.getElementById('website-url').value;
  const userName = document.getElementById('user-name').value;

  if (!masterPassword || !websiteUrl || !userName) {
    alert("Please fill out all fields.");
    return;
  }

  const salt = websiteUrl + userName;

  // Generate password using PBKDF2 and SHA-256
  generatePassword(masterPassword, salt).then(password => {
    document.getElementById('generated-password').value = password;
  });
});

function generatePassword(masterPassword, salt) {
  return new Promise((resolve, reject) => {
    // Use PBKDF2 to generate the key
    const key = CryptoJS.PBKDF2(masterPassword, salt, { keySize: 256 / 32, iterations: 100000 });

    // Hash the key with SHA-256
    const hashedPassword = CryptoJS.SHA256(key);

    // Convert the hashed password to Base64 and slice it to 13 characters
    let password = hashedPassword.toString(CryptoJS.enc.Base64).slice(0, 13);

    resolve(ensurePasswordComplexity(password));
  });
}

function ensurePasswordComplexity(password) {
  const lowerCase = /[a-z]/;
  const upperCase = /[A-Z]/;
  const number = /\d/;
  const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

  // Ensure the password contains at least one of each required character type
  const passwordArr = password.split('');
  
  if (!lowerCase.test(password)) passwordArr.push('a');  // Add lowercase if missing
  if (!upperCase.test(password)) passwordArr.push('A'); // Add uppercase if missing
  if (!number.test(password)) passwordArr.push('1');    // Add a number if missing
  if (!specialChar.test(password)) passwordArr.push('!'); // Add special character if missing

  // Shuffle the password array to make sure the characters are mixed up
  passwordArr.sort(() => Math.random() - 0.5);

  // Join the array back into a string and ensure the password is exactly 13 characters long
  password = passwordArr.join('').slice(0, 13);

  return password;
}

// Function to copy password to clipboard
document.getElementById('copy-button').addEventListener('click', function() {
  const passwordField = document.getElementById('generated-password');
  
  // Select the text in the password field
  passwordField.select();
  document.execCommand('copy');
});
