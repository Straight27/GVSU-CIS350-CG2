// Load on startup
window.onload = function() {
    updateHatOne();
    updateHatTwo();
    checkEquippedHat();
};

// Listen for changes across devices/popups
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.assignments) {
    updateDisplay(changes.assignments.newValue || []);
  }
});

// Runs when the user clicks the purchase button
document.getElementById('purchaseHatOne').addEventListener('click', () => {
  chrome.storage.sync.get(["userTokens"], (result) => {
        let tokens = result.userTokens || 0;
        // Checks if the user has enough tokens to purchase the cosmetic
        if (tokens >= 5) {
          chrome.storage.sync.set({ "hatOne": true }, () => {
              tokens = tokens - 5;
              chrome.storage.sync.set({ userTokens: tokens });
              document.getElementById("hatOneImage").style.opacity = 1;
              document.getElementById("purchaseHatOne").style.opacity = 0;
              document.getElementById("equipHatOne").style.opacity = 1;
          });
        }
    });
});

// Runs when the user clicks the purchase button
document.getElementById('purchaseHatTwo').addEventListener('click', () => {
  chrome.storage.sync.get(["userTokens"], (result) => {
        let tokens = result.userTokens || 0;
        // Checks if the user has enough tokens to purchase the cosmetic
        if (tokens >= 5) {
          chrome.storage.sync.set({ "hatTwo": true }, () => {
              tokens = tokens - 5;
              chrome.storage.sync.set({ userTokens: tokens });
              document.getElementById("hatTwoImage").style.opacity = 1;
              document.getElementById("purchaseHatTwo").style.opacity = 0;
              document.getElementById("equipHatTwo").style.opacity = 1;
          });
        }
    });
});

// Equip hat one
document.getElementById('equipHatOne').addEventListener('click', () => {
      document.getElementById('equipHatOne').textContent = 'Equipped';
      document.getElementById('equipHatTwo').textContent = 'Equip';
      chrome.storage.sync.set({ "selectedHat": "/closet/study_sprite_logo.png"});
});

// Equip hat two
document.getElementById('equipHatTwo').addEventListener('click', () => {
      document.getElementById('equipHatOne').textContent = 'Equip';
      document.getElementById('equipHatTwo').textContent = 'Equipped';
      chrome.storage.sync.set({ "selectedHat": "/closet/temp_gif.gif"});
});

// Developer functions below
document.getElementById('devRemove').addEventListener('click', () => {
    chrome.storage.sync.set({ "hatOne": false});
    chrome.storage.sync.set({ "hatTwo": false});
    chrome.storage.sync.set({ "selectedHat": "empty"});
    updateHatOne();
    updateHatTwo();
    chrome.storage.sync.set({ "userTokens" : 100 });
});

// Function to check if the user has hat one purchased. If they do, checks if it is equipped.
function updateHatOne() {
 chrome.storage.sync.get(["hatOne"], (result) => {
    purchased = result.hatOne || false;
    if (purchased) {
        document.getElementById("hatOneImage").style.opacity = 1;
        document.getElementById("purchaseHatOne").style.opacity = 0;
        document.getElementById("equipHatOne").style.opacity = 1;
    }
    else {
        document.getElementById("hatOneImage").style.opacity = .3;
        document.getElementById("purchaseHatOne").style.opacity = 1;
        document.getElementById("equipHatOne").style.opacity = 0;
    }
    });
}

// Function to check if the user has hat two purchased.
function updateHatTwo() {
    chrome.storage.sync.get(["hatTwo"], (result) => {
        purchased = result.hatTwo || false;
        if (purchased) {
            document.getElementById("hatTwoImage").style.opacity = 1;
            document.getElementById("purchaseHatTwo").style.opacity = 0;
            document.getElementById("equipHatTwo").style.opacity = 1;
        }
        else {
            document.getElementById("hatTwoImage").style.opacity = .3;
            document.getElementById("purchaseHatTwo").style.opacity = 1;
            document.getElementById("equipHatTwo").style.opacity = 0;
        }
    });
}

function checkEquippedHat() {
    chrome.storage.sync.get(["selectedHat"], (result) => {
        selected_value = result.selectedHat || "empty";
        console.log(selected_value);
        if (selected_value == "/closet/study_sprite_logo.png"){
            document.getElementById('equipHatOne').textContent = 'Equipped';
            document.getElementById('equipHatTwo').textContent = 'Equip';
        }
        if (selected_value == "/closet/temp_gif.gif"){
            document.getElementById('equipHatOne').textContent = 'Equip';
            document.getElementById('equipHatTwo').textContent = 'Equipped';
        }
    });
}
