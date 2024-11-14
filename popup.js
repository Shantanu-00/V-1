// Utility function for SHA-256 hashing
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }
  
  // Function to derive a password using PBKDF2
  async function generatePassword(basePassword, salt) {
    const encoder = new TextEncoder();
    const baseKey = await crypto.subtle.importKey(
      "raw",
      encoder.encode(basePassword),
      "PBKDF2",
      false,
      ["deriveBits", "deriveKey"]
    );
  
    const derivedKey = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: encoder.encode(salt),
        iterations: 100000,
        hash: "SHA-256"
      },
      baseKey,
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );
  
    const derivedBits = await crypto.subtle.exportKey("raw", derivedKey);
    const hashArray = Array.from(new Uint8Array(derivedBits));
    const password = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return password.substring(0, 16);  // Adjust length as needed
  }
  
  // Event listener for the Generate Password button
  document.getElementById("generate").addEventListener("click", async () => {
    const basePassword = document.getElementById("password").value;
    const salt = document.getElementById("salt").value || "default_salt";  // Use a default salt if none is provided
  
    if (!basePassword) {
      alert("Please enter a base password.");
      return;
    }
  
    const hashedPassword = await generatePassword(basePassword, salt);
    document.getElementById("result").innerText = "Generated Password: " + hashedPassword;
  });
  