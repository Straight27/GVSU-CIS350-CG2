// Updates coin amount when item purchased and etc...
function updateTokenDisplay() {
    chrome.storage.sync.get(["userTokens"], (result) => {
    document.getElementById("tokenDisplay").textContent =
        result.userTokens || 0;   
    });
}

window.onload = function () { 

    chrome.storage.sync.set({ spriteOne: true });


};
    updateTokenDisplay();
    updateSpriteOne();
    updateSpriteTwo();
    updateSpriteThree();
    updateSpriteFour();
    checkEquippedSprite();



// PURCHASE SPRITE TWO
document.getElementById('purchaseSpriteTwo').addEventListener('click', () => {
    chrome.storage.sync.get(["userTokens"], (result) => {
        let tokens = result.userTokens || 0;

        if (tokens >= 5) {
            tokens -= 5;

            chrome.storage.sync.set({ userTokens: tokens, spriteTwo: true }, () => {
                updateSpriteTwo();
                updateTokenDisplay();
            });
        }
    });
});

 // PURCHASE SPRITE THREE
document.getElementById('purchaseSpriteThree').addEventListener('click', () => {
    chrome.storage.sync.get(["userTokens"], (result) => {
        let tokens = result.userTokens || 0;

        if (tokens >= 5) {
            tokens -= 5;

            chrome.storage.sync.set({ userTokens: tokens, spriteThree: true }, () => {
                updateSpriteThree();
                updateTokenDisplay();
            });
        }
    });
});

 // PURCHASE SPRITE FOUR
document.getElementById('purchaseSpriteFour').addEventListener('click', () => {
    chrome.storage.sync.get(["userTokens"], (result) => {
        let tokens = result.userTokens || 0;

        if (tokens >= 5) {
            tokens -= 5;

            chrome.storage.sync.set({ userTokens: tokens, spriteFour: true }, () => {
                updateSpriteFour();
                updateTokenDisplay();
            });
        }
    });
});



// EQUIP SPRITE ONE
document.getElementById('equipSpriteOne').addEventListener('click', () => {
    chrome.storage.sync.set({ selectedSprite: "/closet/calm_cat.gif" }, () => {
        checkEquippedSprite();
    });
});

// EQUIP SPRITE TWO
document.getElementById('equipSpriteTwo').addEventListener('click', () => {
    chrome.storage.sync.set({ selectedSprite: "/closet/calm_frog.gif" }, () => {
        checkEquippedSprite();
    });
});

// EQUIP Sprite THREE
document.getElementById('equipSpriteThree').addEventListener('click', () => {
    chrome.storage.sync.set({ selectedSprite: "/closet/calm_dog.gif" }, () => {
        checkEquippedSprite();
    });
});

// EQUIP SPRITE FOUR
document.getElementById('equipSpriteFour').addEventListener('click', () => {
    chrome.storage.sync.set({ selectedSprite: "/closet/calm_penguin.gif" }, () => {
        checkEquippedSprite();
    });
});

function updateSpriteOne() {
    chrome.storage.sync.get(["spriteOne"], (result) => {
        const purchased = true

        if (purchased) {
            document.getElementById("purchaseSpriteOne").style.display = "none";
            document.getElementById("coinCountSpriteOne").style.display = "none";
            document.getElementById("equipSpriteOne").style.display = "block";
            document.getElementById("spriteOneImage").style.opacity = 1;
        } else {
            document.getElementById("purchaseSpriteOne").style.display = "block";
            document.getElementById("coinCountSpriteOne").style.display = "inline";
            document.getElementById("equipSpriteOne").style.display = "none";
            document.getElementById("spriteOneImage").style.opacity = 0.3;
        }
    });
}

// UPDATE SPRITE TWO DISPLAY
function updateSpriteTwo() {
    chrome.storage.sync.get(["spriteTwo"], (result) => {
        const purchased = result.spriteTwo || false;

        if (purchased) {
            document.getElementById("purchaseSpriteTwo").style.display = "none";
            document.getElementById("coinCountSpriteTwo").style.display = "none";
            document.getElementById("equipSpriteTwo").style.display = "block";
            document.getElementById("spriteTwoImage").style.opacity = 1;
        } else {
            document.getElementById("purchaseSpriteTwo").style.display = "block";
            document.getElementById("coinCountSpriteTwo").style.display = "inline";
            document.getElementById("equipSpriteTwo").style.display = "none";
            document.getElementById("spriteTwoImage").style.opacity = 0.3;
        }
    });
}
// UPDATE SPRITE THREE DISPLAY
function updateSpriteThree() {
    chrome.storage.sync.get(["spriteThree"], (result) => {
        const purchased = result.spriteThree || false;

        if (purchased) {
            document.getElementById("purchaseSpriteThree").style.display = "none";
            document.getElementById("coinCountSpriteThree").style.display = "none";
            document.getElementById("equipSpriteThree").style.display = "block";
            document.getElementById("spriteThreeImage").style.opacity = 1;
        } else {
            document.getElementById("purchaseSpriteThree").style.display = "block";
            document.getElementById("coinCountSpriteThree").style.display = "inline";
            document.getElementById("equipSpriteThree").style.display = "none";
            document.getElementById("spriteThreeImage").style.opacity = 0.3;
        }
    });
}

// UPDATE SPRITE FOUR DISPLAY
function updateSpriteFour() {
    chrome.storage.sync.get(["spriteFour"], (result) => {
        const purchased = result.spriteFour || false;

        if (purchased) {
            document.getElementById("purchaseSpriteFour").style.display = "none";
            document.getElementById("coinCountSpriteFour").style.display = "none";
            document.getElementById("equipSpriteFour").style.display = "block";
            document.getElementById("spriteFourImage").style.opacity = 1;
        } else {
            document.getElementById("purchaseSpriteFour").style.display = "block";
            document.getElementById("coinCountSpriteFour").style.display = "inline";
            document.getElementById("equipSpriteFour").style.display = "none";
            document.getElementById("spriteFourImage").style.opacity = 0.3;
        }
    });
}


// CHECK WHICH SPRITE IS EQUIPPED
function checkEquippedSprite() {
    chrome.storage.sync.get(["selectedSprite"], (result) => {
        let selected = result.selectedSprite || "/closet/calm_cat.gif";

        if (selected === "/closet/calm_cat.gif") {
            document.getElementById("equipSpriteOne").textContent = "Equipped";
            document.getElementById("equipSpriteTwo").textContent = "Equip";
            document.getElementById("equipSpriteThree").textContent = "Equip";
            document.getElementById("equipSpriteFour").textContent = "Equip";
        }

        else if (selected === "/closet/calm_frog.gif") {
            document.getElementById("equipSpriteOne").textContent = "Equip";
            document.getElementById("equipSpriteTwo").textContent = "Equipped";
            document.getElementById("equipSpriteThree").textContent = "Equip";
            document.getElementById("equipSpriteFour").textContent = "Equip";
        }
        
        else if (selected === "/closet/calm_dog.gif") {
            document.getElementById("equipSpriteOne").textContent = "Equip";
            document.getElementById("equipSpriteTwo").textContent = "Equip";
            document.getElementById("equipSpriteThree").textContent = "Equipped";
            document.getElementById("equipSpriteFour").textContent = "Equip";
            
        }

        else if (selected === "/closet/calm_penguin.gif") {
            document.getElementById("equipSpriteOne").textContent = "Equip";
            document.getElementById("equipSpriteTwo").textContent = "Equip";
            document.getElementById("equipSpriteThree").textContent = "Equip";
            document.getElementById("equipSpriteFour").textContent = "Equipped";
        }

        else {
            // Nothing equipped yet
            document.getElementById("equipSpriteOne").textContent = "Equip";
            document.getElementById("equipSpriteTwo").textContent = "Equip";
            document.getElementById("equipSpriteThree").textContent = "Equip";
            document.getElementById("equipSpriteFour").textContent = "Equip";
            document.getElementById("equipSriteFive").textContent = "Equip";

        }
    });
}

// --- DEV RESET BUTTON ---
// This will reset everything to NOT purchased
document.getElementById('devRemove').addEventListener('click', () => {
    chrome.storage.sync.set({
        spriteTwo: false,
        spriteThree: false,
        spriteFour: false,
        selectedSprite: "/closet/calm_cat.gif",
        userTokens: 100
    }, () => {
        updateSpriteOne();
        updateSpriteTwo();
        updateSpriteThree();
        updateSpriteFour();
        checkEquippedSprite();
        updateTokenDisplay();
    });

    });