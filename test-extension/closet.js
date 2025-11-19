window.onload = function () {
    chrome.storage.sync.set({ hatOne: true });
    updateHatOne();
    updateHatTwo();
    updateHatThree();
    updateHatFour();
    updateHatFive();
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

 // PURCHASE HAT THREE
document.getElementById('purchaseHatThree').addEventListener('click', () => {
    chrome.storage.sync.get(["userTokens"], (result) => {
        let tokens = result.userTokens || 0;

        if (tokens >= 5) {
            tokens -= 5;

            chrome.storage.sync.set({ userTokens: tokens, hatThree: true }, () => {
                updateHatThree();
            });
        }
    });
});

 // PURCHASE HAT FOUR
document.getElementById('purchaseHatFour').addEventListener('click', () => {
    chrome.storage.sync.get(["userTokens"], (result) => {
        let tokens = result.userTokens || 0;

        if (tokens >= 5) {
            tokens -= 5;

            chrome.storage.sync.set({ userTokens: tokens, hatFour: true }, () => {
                updateHatFour();
            });
        }
    });
});


 // PURCHASE HAT FIVE
document.getElementById('purchaseHatFive').addEventListener('click', () => {
    chrome.storage.sync.get(["userTokens"], (result) => {
        let tokens = result.userTokens || 0;

        if (tokens >= 5) {
            tokens -= 5;

            chrome.storage.sync.set({ userTokens: tokens, hatFive: true }, () => {
                updateHatFive();
            });
        }
    });
});

// EQUIP HAT ONE
document.getElementById('equipHatOne').addEventListener('click', () => {
    chrome.storage.sync.set({ selectedHat: "/closet/calm_cat.gif" }, () => {
        checkEquippedHat();
    });
});

// EQUIP HAT TWO
document.getElementById('equipHatTwo').addEventListener('click', () => {
    chrome.storage.sync.set({ selectedHat: "/closet/calm_frog.gif" }, () => {
        checkEquippedHat();
    });
});

// EQUIP HAT THREE
document.getElementById('equipHatThree').addEventListener('click', () => {
    chrome.storage.sync.set({ selectedHat: "/closet/calm_dog.gif" }, () => {
        checkEquippedHat();
    });
});

// EQUIP HAT FOUR
document.getElementById('equipHatFour').addEventListener('click', () => {
    chrome.storage.sync.set({ selectedHat: "/closet/study_sprite_logo.png" }, () => {
        checkEquippedHat();
    });
});

// EQUIP HAT FIVE
document.getElementById('equipHatFive').addEventListener('click', () => {
    chrome.storage.sync.set({ selectedHat: "/closet/z14by14Coin.png" }, () => {
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
// UPDATE HAT THREE DISPLAY
function updateHatThree() {
    chrome.storage.sync.get(["hatThree"], (result) => {
        const purchased = result.hatThree || false;

        if (purchased) {
            document.getElementById("purchaseHatThree").style.display = "none";
            document.getElementById("coinCountHatThree").style.display = "none";
            document.getElementById("equipHatThree").style.display = "block";
            document.getElementById("hatThreeImage").style.opacity = 1;
        } else {
            document.getElementById("purchaseHatThree").style.display = "block";
            document.getElementById("coinCountHatThree").style.display = "inline";
            document.getElementById("equipHatThree").style.display = "none";
            document.getElementById("hatThreeImage").style.opacity = 0.3;
        }
    });
}

// UPDATE HAT FOUR DISPLAY
function updateHatFour() {
    chrome.storage.sync.get(["hatFour"], (result) => {
        const purchased = result.hatFour || false;

        if (purchased) {
            document.getElementById("purchaseHatFour").style.display = "none";
            document.getElementById("coinCountHatFour").style.display = "none";
            document.getElementById("equipHatFour").style.display = "block";
            document.getElementById("hatFourImage").style.opacity = 1;
        } else {
            document.getElementById("purchaseHatFour").style.display = "block";
            document.getElementById("coinCountHatFour").style.display = "inline";
            document.getElementById("equipHatFour").style.display = "none";
            document.getElementById("hatFourImage").style.opacity = 0.3;
        }
    });
}

function updateHatFive() {
    chrome.storage.sync.get(["hatFive"], (result) => {
        const purchased = result.hatFive || false;

        if (purchased) {
            document.getElementById("purchaseHatFive").style.display = "none";
            document.getElementById("coinCountHatFive").style.display = "none";
            document.getElementById("equipHatFive").style.display = "block";
            document.getElementById("hatFiveImage").style.opacity = 1;
        } else {
            document.getElementById("purchaseHatFive").style.display = "block";
            document.getElementById("coinCountHatFive").style.display = "inline";
            document.getElementById("equipHatFive").style.display = "none";
            document.getElementById("hatFiveImage").style.opacity = 0.3;
        }
    });
}

// CHECK WHICH HAT IS EQUIPPED
function checkEquippedHat() {
    chrome.storage.sync.get(["selectedHat"], (result) => {
        let selected = result.selectedHat || "/closet/calm_cat.gif";

        if (selected === "/closet/calm_cat.gif") {
            document.getElementById("equipHatOne").textContent = "Equipped";
            document.getElementById("equipHatTwo").textContent = "Equip";
            document.getElementById("equipHatThree").textContent = "Equip";
            document.getElementById("equipHatFour").textContent = "Equip";
            document.getElementById("equipHatFive").textContent = "Equip";
        }

        else if (selected === "/closet/calm_frog.gif") {
            document.getElementById("equipHatOne").textContent = "Equip";
            document.getElementById("equipHatTwo").textContent = "Equipped";
            document.getElementById("equipHatThree").textContent = "Equip";
            document.getElementById("equipHatFour").textContent = "Equip";
            document.getElementById("equipHatFive").textContent = "Equip";
        }
        
        else if (selected === "/closet/calm_dog.gif") {
            document.getElementById("equipHatOne").textContent = "Equip";
            document.getElementById("equipHatTwo").textContent = "Equip";
            document.getElementById("equipHatThree").textContent = "Equipped";
            document.getElementById("equipHatFour").textContent = "Equip";
            document.getElementById("equipHatFive").textContent = "Equip";
            
        }

        else if (selected === "/closet/study_sprite_logo.png") {
            document.getElementById("equipHatOne").textContent = "Equip";
            document.getElementById("equipHatTwo").textContent = "Equip";
            document.getElementById("equipHatThree").textContent = "Equip";
            document.getElementById("equipHatFour").textContent = "Equipped";
            document.getElementById("equipHatFive").textContent = "Equip";
        }

        else if (selected === "/closet/z14by14Coin.png") {
            document.getElementById("equipHatOne").textContent = "Equip";
            document.getElementById("equipHatTwo").textContent = "Equip";
            document.getElementById("equipHatThree").textContent = "Equip";
            document.getElementById("equipHatFour").textContent = "Equip";
            document.getElementById("equipHatFive").textContent = "Equipped";
        }

        else {
            // Nothing equipped yet
            document.getElementById("equipHatOne").textContent = "Equip";
            document.getElementById("equipHatTwo").textContent = "Equip";
            document.getElementById("equipHatThree").textContent = "Equip";
            document.getElementById("equipHatFour").textContent = "Equip";
            document.getElementById("equipHatFive").textContent = "Equip";

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
        selectedHat: "/closet/calm_cat.gif",
        userTokens: 100
    }, () => {
        updateHatOne();
        updateHatTwo();
        updateHatThree();
        updateHatFour();
        updateHatFive();
        checkEquippedHat();

    });
});