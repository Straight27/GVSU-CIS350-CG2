

// Load on startup
window.onload = function() {
    updateHatOne();
    updateHatTwo();
};

// Listen for changes across devices/popups
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.assignments) {
    updateDisplay(changes.assignments.newValue || []);
  }
});


document.getElementById('purchaseHatOne').addEventListener('click', () => {
  chrome.storage.sync.get(["userTokens"], (result) => {
        let tokens = result.userTokens || 0;
        if (tokens >= 5) {
          chrome.storage.sync.set({ "hatOne": true }, () => {
              tokens = tokens - 5;
              chrome.storage.sync.set({ userTokens: tokens });
              document.getElementById("hatOneImage").style.opacity = 1;
            
          });
        }
    });
});

document.getElementById('purchaseHatTwo').addEventListener('click', () => {
  chrome.storage.sync.get(["userTokens"], (result) => {
        let tokens = result.userTokens || 0;
        if (tokens >= 5) {
          chrome.storage.sync.set({ "hatTwo": true }, () => {
              tokens = tokens - 5;
              chrome.storage.sync.set({ userTokens: tokens });
              document.getElementById("hatTwoImage").style.opacity = 1;
            
          });
        }
    });
});

// Developer functions below
document.getElementById('devRemove').addEventListener('click', () => {
    chrome.storage.sync.set({ "hatOne": false});
    chrome.storage.sync.set({ "hatTwo": false});
    updateHatOne();
    updateHatTwo();
    chrome.storage.sync.set({ "userTokens" : 100 });
});

function updateHatOne() {
 chrome.storage.sync.get(["hatOne"], (result) => {
    test = result.hatOne || false;
    if (test) {
        document.getElementById("hatOneImage").style.opacity = 1;
    }
    else {
        document.getElementById("hatOneImage").style.opacity = .3;
    }
    });
}

function updateHatTwo() {
 chrome.storage.sync.get(["hatTwo"], (result) => {
    test = result.hatTwo || false;
    if (test) {
        document.getElementById("hatTwoImage").style.opacity = 1;
    }
    else {
        document.getElementById("hatTwoImage").style.opacity = .3;
    }
    });
}