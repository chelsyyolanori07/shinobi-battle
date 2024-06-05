const LevelUpSystem = {
  onEnemyDefeated: () => {
    const experienceGained = 5;
    LevelUpSystem.gainExperience(experienceGained);
    const playerId = localStorage.getItem(player.classType + '_playerId');

    saveEnemyProgress();
    localStorage.removeItem(`currentEnemy_${playerId}`);
    showDefeatedEnemy(enemy);
    GameManager.setPreFight();
  },

  getMaxExperienceForLevel: (level) => {
    const baseExperience = 10; 
    const experienceIncrement = 10;
    const scalingFactor = 0.3 + (level - 1) * 0.1;
    const rawExperience = baseExperience + (level - 1) * experienceIncrement * Math.pow(scalingFactor, level - 1);

    return Math.floor(rawExperience); 
  },

  gainExperience: (enemyLevel) => {
    const baseExperience = 5; 
    const levelMultiplier = 0.7; 

    const experienceGained = Math.floor(baseExperience + (enemyLevel - 1) * levelMultiplier);

    player.experience += experienceGained;
    player.experience >= LevelUpSystem.getMaxExperienceForLevel(player.level) ? LevelUpSystem.levelUp() : null;
    LevelUpSystem.updateExperienceBar();
  },

  levelUp: () => {
    player.level++;
    player.specialPoints += 3; 
    
    LevelUpSystem.resetExperienceBar();
    LevelUpSystem.saveProgress(); 
    LevelUpSystem.showSpecialPointsButton(); 
    updatePlayerUI();
    LevelUpSystem.addPlusButtons();
  
    const newlyUnlockedVillage = checkNewlyUnlockedVillages(player.level);
    if (newlyUnlockedVillage) {
      const villageName = getVillageNameById(newlyUnlockedVillage);
      alert(`Congratulations! Hehehe wohoo you have unlocked ${villageName} :)`);
    }
    completeLevel();
    checkForNewAbilities();
  },  

  showSpecialPointsButton: () => {
    const specialPointsButton = document.getElementById('special-points-button');
    
    if (player.specialPoints > 0) {
      specialPointsButton.classList.remove('hidden');
      specialPointsButton.textContent = `${player.specialPoints} SP`; 
      LevelUpSystem.addPlusButtons(); 
    } else {
      specialPointsButton.classList.add('hidden'); 
      LevelUpSystem.removePlusButtons(); 
    }
  },

  initSpecialPointsButton: () => {
    const specialPointsButton = document.getElementById('special-points-button');
    if (specialPointsButton) {
      specialPointsButton.addEventListener('click', () => {
        LevelUpSystem.togglePlusButtons();
      });
    }
  },

  togglePlusButtons: () => {
    const plusButtons = document.querySelectorAll('.plus-button');
    const plusButtonsVisible = Array.from(plusButtons).some(button => !button.classList.contains('hidden')); //his approach ensures that all plus buttons will either show or hide together, depending on whether any of them is currently visible.
    plusButtons.forEach(button => button.classList.toggle('hidden', plusButtonsVisible));
  },

  addPlusButtons: () => {
    const properties = ['health', 'chakra', 'strength', 'agility', 'speed'];
    properties.forEach(property => {
      
      const plusButton = document.createElement('button');
      plusButton.textContent = '+';
      plusButton.classList.add('plus-button');
      plusButton.onclick = () => LevelUpSystem.allocatePoints(property);
  
      let containerSelector = '';
      switch (property) {
        case 'health':
          containerSelector = '.health-plus-button-container';
          break;
        case 'chakra':
          containerSelector = '.chakra-plus-button-container';
          break;
        default:
          containerSelector = `.${property}-player`;
          break;
      }
  
      const container = document.querySelector(containerSelector);
  
      if (player.specialPoints >= 1) {
        if (!container.querySelector('.plus-button')) {
          container.appendChild(plusButton);
        }
      }
    });
  },

  removePlusButtons: () => {
    const allPlusButtons = document.querySelectorAll('.plus-button');
    allPlusButtons.forEach(button => button.remove());
  },

  allocatePoints: (property) => {
    const pointsToAdd = property === 'health' || property === 'chakra' ? 15 : 25;
    const specialPointsCost = 1;
  
    if (player.specialPoints >= specialPointsCost) {
      if (property === 'health') {
        player.maxHealth += pointsToAdd; 
        localStorage.setItem(`${player.classType}_maxHealth`, player.maxHealth);
      } else if (property === 'chakra') {
        player.maxChakra += pointsToAdd; 
        localStorage.setItem(`${player.classType}_maxChakra`, player.maxChakra);
      } else {
        player[property] += pointsToAdd; 
      }
  
      player.specialPoints -= specialPointsCost;
  
      updatePlayerUI();
      LevelUpSystem.saveProgress();
      LevelUpSystem.showSpecialPointsButton();
      _updatePlayerBars();
    }
  },
  
  resetExperienceBar: () => {
    player.experience = 0; 
    LevelUpSystem.updateExperienceBar();
  },
  
  updateExperienceBar: () => {
    const expBar = document.getElementById('exp-bar');
    const levelDisplay = document.getElementById('level-display');
    const maxExp = LevelUpSystem.getMaxExperienceForLevel(player.level);
    const expPercentage = (player.experience / maxExp) * 100;
    
    expBar.style.width = `${expPercentage}%`;
    levelDisplay.textContent = `lvl ${player.level} - ${player.experience}/${maxExp}`;
  },
  
  saveProgress: () => {
    localStorage.setItem(player.playerId + '_Level', player.level);
    localStorage.setItem(player.playerId + '_Exp', player.experience);
    localStorage.setItem(player.playerId + '_SpecialPoints', player.specialPoints);
    localStorage.setItem(player.playerId + '_Health', player.health);
    localStorage.setItem(player.playerId + '_MaxHealth', player.maxHealth);
    localStorage.setItem(player.playerId + '_Chakra', player.chakra);
    localStorage.setItem(player.playerId + '_MaxChakra', player.maxChakra);
    localStorage.setItem(player.playerId + '_Strength', player.strength);
    localStorage.setItem(player.playerId + '_Agility', player.agility);
    localStorage.setItem(player.playerId + '_Speed', player.speed);
  },
  
  loadProgress: () => {
    if (player) {
      player.level = parseInt(localStorage.getItem(player.playerId + '_Level')) || player.level;
      player.experience = parseInt(localStorage.getItem(player.playerId + '_Exp')) || player.experience;
      player.specialPoints = parseInt(localStorage.getItem(player.playerId + '_SpecialPoints')) || player.specialPoints;
      player.health = parseInt(localStorage.getItem(player.playerId + '_Health')) || player.health;
      player.maxHealth = parseInt(localStorage.getItem(player.playerId + '_MaxHealth')) || player.maxHealth;
      player.chakra = parseInt(localStorage.getItem(player.playerId + '_Chakra')) || player.chakra;
      player.maxChakra = parseInt(localStorage.getItem(player.playerId + '_MaxChakra')) || player.maxChakra;
      player.strength = parseInt(localStorage.getItem(player.playerId + '_Strength')) || player.strength;
      player.agility = parseInt(localStorage.getItem(player.playerId + '_Agility')) || player.agility;
      player.speed = parseInt(localStorage.getItem(player.playerId + '_Speed')) || player.speed;
  
      LevelUpSystem.updateExperienceBar();
      updatePlayerUI();
      loadEnemy();
      showDefeatedEnemy();
      LevelUpSystem.showSpecialPointsButton();
      LevelUpSystem.initSpecialPointsButton();
    }
  },
};