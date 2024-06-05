let player;
let enemy;

const GameManager = {
  startArena: function(classType) {
    showPlayer(classType);
    GameManager.setPreFight();
    LevelUpSystem.loadProgress();
    LevelUpSystem.initSpecialPointsButton();
    loadEnemy();
    _updateBars();
  },

  setPreFight: function() {
    const playerId = localStorage.getItem(player.classType + '_playerId');
    const savedEnemy = localStorage.getItem(`currentEnemy_${playerId}`);
    if (!savedEnemy) {
      let getHeader = document.querySelector(".header");
      let getActions = document.querySelector(".actions");
      let getArena = document.querySelector(".arena");
      getHeader.innerHTML = '<p>Task: Find an enemy!</p>';
      getActions.innerHTML = `
        <a href="#" class="btn-prefight" onclick="GameManager.setFight()">Search for enemy</a>
        <a href="villages.html" class="btn-prefight">Travel</a>
      `;
      getArena.style.visibility = "visible";
      showDefeatedEnemy();
    } else {
      this.setFight(); 
    }
  },

  setFight: async function() {
    let getHeader = document.querySelector(".header");
    let getActions = document.querySelector(".actions");
    let getEnemy = document.querySelector(".enemy");

    getActions.innerHTML = '';

    let attackButton = document.createElement('a');
    attackButton.href = '#';
    attackButton.className = 'btn-prefight';
    attackButton.textContent = 'Attack';
    attackButton.addEventListener('click', function() {
      characterMoves(player, enemy);
      updatePlayerUI();
      updateEnemyUI();
      _updateBars();
      LevelUpSystem.showSpecialPointsButton();
      LevelUpSystem.saveProgress();
      decrementCooldowns();
    });
    getActions.appendChild(attackButton);

    let toggleAbilitiesButton = document.createElement('button');
    toggleAbilitiesButton.id = 'toggleAbilitiesButton';
    toggleAbilitiesButton.textContent = 'Abilities';
    toggleAbilitiesButton.addEventListener('click', function() {
      let abilitiesDiv = document.getElementById('abilities');
      if (abilitiesDiv.style.display === 'block') {
        abilitiesDiv.style.display = 'none';
        toggleAbilitiesButton.textContent = 'Abilities';
      } else {
        abilitiesDiv.style.display = 'block';
        toggleAbilitiesButton.textContent = 'Close Abilities';
        showAbilities(); 
      }
    });
    getActions.appendChild(toggleAbilitiesButton);
    toggleAbilitiesButton.style.display = 'inline-block';

    let toggleInventoryButton = document.createElement('button');
    toggleInventoryButton.id = 'toggleInventoryButton';
    toggleInventoryButton.textContent = 'Inventory';
    toggleInventoryButton.addEventListener('click', function() {
      let inventoryDiv = document.getElementById('inventory');
      if (inventoryDiv.style.display === 'block') {
        inventoryDiv.style.display = 'none';
        toggleInventoryButton.textContent = 'Inventory';
      } else {
        inventoryDiv.style.display = 'block';
        toggleInventoryButton.textContent = 'Close Inventory';
        showInventory();
        loadInventory();
      }
    });
    getActions.appendChild(toggleInventoryButton);
    toggleInventoryButton.style.display = 'inline-block';

    getHeader.innerHTML = '<p>Task: Choose your move</p>';

    const playerId = localStorage.getItem(player.classType + '_playerId');
    const savedEnemy = localStorage.getItem(`currentEnemy_${playerId}`);
    
    if (savedEnemy) {
      enemy = JSON.parse(savedEnemy);
    } else {
      let village = localStorage.getItem('selectedVillageId')
      let clan;
      switch (village) {
      case 'Konohagakure':
        clan = 'Uchiha';
        break;
      case 'Sunagakure':
        clan = 'Kazekage';
        break;
      case 'Kirigakure':
        clan = 'Hōzuki';
        break;
      case 'Kumogakure':
        clan = 'Yotsuki';
        break;
      case 'Iwagakure':
        clan = 'Kamizuru';
        break;
      default:
        clan = 'Uchiha'; 
    }

      const apiEnemies = await fetchEnemiesFromAPI(clan);
      const combinedEnemies = apiEnemies.length > 0 ? predefinedEnemies[clan].concat(apiEnemies) : predefinedEnemies[clan];
      
      let randomIndex = Math.floor(Math.random() * combinedEnemies.length);
      let chosenEnemy = combinedEnemies[randomIndex];

      enemy = createEnemy(
        chosenEnemy.clan,
        chosenEnemy.name,
        chosenEnemy.health,
        chosenEnemy.maxHealth,
        chosenEnemy.chakra,
        chosenEnemy.maxChakra,
        chosenEnemy.strength,
        chosenEnemy.agility,
        chosenEnemy.speed,
        chosenEnemy.image
      );
      saveEnemyProgress();
    }

    showEnemy();

    getEnemy.innerHTML = `
    <div class="character-container">
      <img src="${enemy.image}" alt="${enemy.classType}" class="img-avatar" id="enemy-image">
      <div id="defeated-overlay" class="hidden"></div>
      <div class="enemy-details">
        <h3>${enemy.classType}</h3>
        <p class="health-enemy">Health: ${enemy.health}</p>
        <p class="chakra-enemy">Chakra: ${enemy.chakra}</p>
        <p class="strength-enemy">Strength: ${enemy.strength}</p>
        <p class="agility-enemy">Agility: ${enemy.agility}</p>
        <p class="speed-enemy">Speed: ${enemy.speed}</p>
      </div>
      <div class="enemy-bars">
        <div class="health-bar">
          <div class="heptagon-badge">
            <span class="icon-heart"></span>
          </div>
          <div class="health-fill"></div>
          <div class="health-value"></div>
        </div>
        <div class="chakra-bar">
          <div class="heptagon-badge">
            <span class="icon-yinyang"></span>
          </div>
          <div class="chakra-fill"></div>
          <div class="chakra-cost-overlay"></div>
          <div class="chakra-value"></div>
        </div>
        <div class="level-container">
          <div class="level-badge">
            <span class="icon-star"></span>
          </div>
          <div id="exp-bar-container">
            <div id="exp-bar">
              <span id="level-display">lvl ${enemy.level}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
    _updateBars();
  },
};


