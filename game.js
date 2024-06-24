document.addEventListener("DOMContentLoaded", function() {
    const resources = ["gold", "silver", "copper", "iron", "coal", "diamond", "emerald", "ruby", "sapphire", "platinum"];
    const mineLocations = [
        { name: "Gold Mine", resource: "gold", cost: 0, unlocked: true },
        { name: "Silver Mine", resource: "silver", cost: 50, unlocked: false },
        { name: "Copper Mine", resource: "copper", cost: 100, unlocked: false },
        { name: "Iron Mine", resource: "iron", cost: 200, unlocked: false },
        { name: "Coal Mine", resource: "coal", cost: 400, unlocked: false },
        { name: "Diamond Mine", resource: "diamond", cost: 800, unlocked: false },
        { name: "Emerald Mine", resource: "emerald", cost: 1600, unlocked: false },
        { name: "Ruby Mine", resource: "ruby", cost: 3200, unlocked: false },
        { name: "Sapphire Mine", resource: "sapphire", cost: 6400, unlocked: false },
        { name: "Platinum Mine", resource: "platinum", cost: 12800, unlocked: false }
    ];

    let gameData = {
        gold: 0,
        silver: 0,
        copper: 0,
        iron: 0,
        coal: 0,
        diamond: 0,
        emerald: 0,
        ruby: 0,
        sapphire: 0,
        platinum: 0,
        currentResource: "gold",
        goldPerClick: 1,
        upgradeCost: 10
    };

    if (localStorage.getItem('idleMineManagerData')) {
        gameData = JSON.parse(localStorage.getItem('idleMineManagerData'));
    }

    const resourceDisplays = {};
    resources.forEach(resource => {
        resourceDisplays[resource] = document.getElementById(resource);
    });

    const mineButton = document.getElementById("mineButton");
    const upgradeButton = document.getElementById("upgradeButton");
    const upgradeCostDisplay = document.getElementById("upgradeCost");
    const locationList = document.getElementById("locationList");

    function updateDisplay() {
        resources.forEach(resource => {
            resourceDisplays[resource].textContent = `${resource.charAt(0).toUpperCase() + resource.slice(1)}: ${gameData[resource]}`;
        });
        upgradeCostDisplay.textContent = gameData.upgradeCost;
        updateLocationList();
    }

    function saveGameData() {
        localStorage.setItem('idleMineManagerData', JSON.stringify(gameData));
    }

    function updateLocationList() {
        locationList.innerHTML = '';
        mineLocations.forEach(location => {
            const locationButton = document.createElement('button');
            locationButton.textContent = `${location.name} (Cost: ${location.cost} Gold)`;
            locationButton.disabled = location.unlocked;
            locationButton.addEventListener('click', function() {
                if (gameData.gold >= location.cost && !location.unlocked) {
                    gameData.gold -= location.cost;
                    location.unlocked = true;
                    gameData.currentResource = location.resource;
                    updateDisplay();
                    saveGameData();
                } else {
                    alert("Not enough gold to unlock this location!");
                }
            });
            locationList.appendChild(locationButton);
        });
    }

    mineButton.addEventListener("click", function() {
        gameData[gameData.currentResource] += gameData.goldPerClick;
        updateDisplay();
        saveGameData();
    });

    upgradeButton.addEventListener("click", function() {
        if (gameData.gold >= gameData.upgradeCost) {
            gameData.gold -= gameData.upgradeCost;
            gameData.goldPerClick += 1;
            gameData.upgradeCost *= 2;

            updateDisplay();
            saveGameData();
        } else {
            alert("Not enough gold to upgrade!");
        }
    });

    updateDisplay();
});
