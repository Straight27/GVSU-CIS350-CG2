window.onload = function () {
    chrome.storage.sync.set({ hatOne: true });
    updateHatOne();
    updateHatTwo();
    checkEquippedHat();
};

// PURCHASE HAT ONE
document.getElementById('purchaseHatOne').addEventListener('click', () => {
    chrome.storage.sync.get(["userTokens"], (result) => {
        let tokens = result.userTokens || 0;

        if (tokens >= 5) {
            tokens -= 5;

            chrome.storage.sync.set({ userTokens: tokens, hatOne: true }, () => {
                updateHatOne();
            });
        }
    });
});

// PURCHASE HAT TWO
document.getElementById('purchaseHatTwo').addEventListener('click', () => {
    chrome.storage.sync.get(["userTokens"], (result) => {
        let tokens = result.userTokens || 0;

        if (tokens >= 5) {
            tokens -= 5;

            chrome.storage.sync.set({ userTokens: tokens, hatTwo: true }, () => {
                updateHatTwo();
            });
        }
    });
});

// EQUIP HAT ONE
document.getElementById('equipHatOne').addEventListener('click', () => {
    chrome.storage.sync.set({ selectedHat: "/closet/study_sprite_logo.png" }, () => {
        checkEquippedHat();
    });
});

// EQUIP HAT TWO
document.getElementById('equipHatTwo').addEventListener('click', () => {
    chrome.storage.sync.set({ selectedHat: "/closet/temp_gif.gif" }, () => {
        checkEquippedHat();
    });
});

// UPDATE HAT ONE DISPLAY
function updateHatOne() {
    chrome.storage.sync.get(["hatOne"], (result) => {
        const purchased = result.hatOne || false;

        if (purchased) {
            document.getElementById("purchaseHatOne").style.display = "none";
            document.getElementById("coinCountHatOne").style.display = "none";
            document.getElementById("equipHatOne").style.display = "block";
            document.getElementById("hatOneImage").style.opacity = 1;
        } else {
            document.getElementById("purchaseHatOne").style.display = "block";
            document.getElementById("coinCountHatOne").style.display = "inline";
            document.getElementById("equipHatOne").style.display = "none";
            document.getElementById("hatOneImage").style.opacity = 0.3;
        }
    });
}

// UPDATE HAT TWO DISPLAY
function updateHatTwo() {
    chrome.storage.sync.get(["hatTwo"], (result) => {
        const purchased = result.hatTwo || false;

        if (purchased) {
            document.getElementById("purchaseHatTwo").style.display = "none";
            document.getElementById("coinCountHatTwo").style.display = "none";
            document.getElementById("equipHatTwo").style.display = "block";
            document.getElementById("hatTwoImage").style.opacity = 1;
        } else {
            document.getElementById("purchaseHatTwo").style.display = "block";
            document.getElementById("coinCountHatTwo").style.display = "inline";
            document.getElementById("equipHatTwo").style.display = "none";
            document.getElementById("hatTwoImage").style.opacity = 0.3;
        }
    });
}

// CHECK WHICH HAT IS EQUIPPED
function checkEquippedHat() {
    chrome.storage.sync.get(["selectedHat"], (result) => {
        let selected = result.selectedHat || "/closet/study_sprite_logo.png";

        if (selected === "/closet/study_sprite_logo.png") {
            document.getElementById("equipHatOne").textContent = "Equipped";
            document.getElementById("equipHatTwo").textContent = "Equip";
        }

        else if (selected === "/closet/temp_gif.gif") {
            document.getElementById("equipHatOne").textContent = "Equip";
            document.getElementById("equipHatTwo").textContent = "Equipped";
        }

        else {
            // Nothing equipped yet
            document.getElementById("equipHatOne").textContent = "Equip";
            document.getElementById("equipHatTwo").textContent = "Equip";
        }
    });
}

// --- DEV RESET BUTTON ---
// This will reset hats to NOT purchased
document.getElementById('devRemove').addEventListener('click', () => {
    chrome.storage.sync.set({
        hatTwo: false,
        hatThree: false,
        hatFour: false,
        hatFive: false,
        hatSix: false,
        hatSeven: false,
        hatEight: false,
        selectedHat: "/closet/study_sprite_logo.png",
        userTokens: 100
    }, () => {
        updateHatOne();
        updateHatTwo();
        checkEquippedHat();

    });
});