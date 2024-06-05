const Player = ({ playerId, classType, health, maxHealth, chakra, maxChakra, strength, agility, speed, experience, level, specialPoints }) => {
  return {
    playerId,
    classType,
    health: Math.max(health, 0),
    maxHealth: Math.max(maxHealth, 0),
    chakra: Math.max(chakra, 0),
    maxChakra: Math.max(maxChakra, 0),
    strength: Math.max(strength, 0),
    agility: Math.max(agility, 0),
    speed: Math.max(speed, 0),
    experience: Math.max(experience, 0),
    level: Math.max(level, 0),
    specialPoints: Math.max(specialPoints, 0),
    unlockedAbilities: [],
    basicAbilities: [],
    abilityCooldowns: initializeAbilityCooldowns() 
  };
};

function loadPlayer(playerId, classType) {
  let player = Player({
    playerId: playerId,
    classType: classType,
    health: Math.max(parseInt(localStorage.getItem(playerId + '_Health')) || 350, 0),
    maxHealth: Math.max(parseInt(localStorage.getItem(playerId + '_MaxHealth')) || 350, 0),
    chakra: Math.max(parseInt(localStorage.getItem(playerId + '_Chakra')) || 290, 0),
    maxChakra: Math.max(parseInt(localStorage.getItem(playerId + '_MaxChakra')) || 290, 0),
    strength: Math.max(parseInt(localStorage.getItem(playerId + '_Strength')) || 250, 0),
    agility: Math.max(parseInt(localStorage.getItem(playerId + '_Agility')) || 210, 0),
    speed: Math.max(parseInt(localStorage.getItem(playerId + '_Speed')) || 200, 0),
    experience: Math.max(parseInt(localStorage.getItem(playerId + '_Exp')) || 0, 0),
    level: Math.max(parseInt(localStorage.getItem(playerId + '_Level')) || 1, 0),
    specialPoints: Math.max(parseInt(localStorage.getItem(playerId + '_SpecialPoints')) || 0, 0),
    unlockedAbilities: [],
    basicAbilities: [],
    abilityCooldowns: initializeAbilityCooldowns() 
  });
  assignAbilities(player);
  return player;
}

const showPlayer = function() {
    
  let getInterface = document.querySelector(".interface");
  let classType = localStorage.getItem('selectedPlayerClassType');
  let playerId = localStorage.getItem(classType + '_playerId');

  if (!playerId) {
    playerId = classType + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem(classType + '_playerId', playerId);
  }

  player = loadPlayer(playerId, classType); 
  
  switch (classType) {
    case "Naruto Uzumaki":
      player = Player({
        playerId: playerId,
        classType : classType,
        health : 350,
        maxHealth : 350,
        chakra : 290,
        maxChakra : 290,
        strength : 250,
        agility : 210,
        speed : 200,
        experience: 0, 
        level: 1, 
        specialPoints: 0,
        unlockedAbilities: [], 
        basicAbilities: [], 
        abilityCooldowns: {}
      });
      break;
    case "Sasuke Uchiha":
      player = Player({
        playerId: playerId,
        classType : classType,
        health : 340,
        maxHealth : 340,
        chakra : 270,
        maxChakra : 270,
        strength : 250,
        agility : 200,
        speed : 200,
        experience: 0, 
        level: 1, 
        specialPoints: 0,
        unlockedAbilities: [], 
        basicAbilities: [], 
        abilityCooldowns: {}
      })
      break;
    case "Sakura Haruno":
      player = Player({
        playerId: playerId,
        classType : classType,
        health : 335,
        maxHealth : 335,
        chakra : 240,
        maxChakra : 240, 
        strength : 235,
        agility : 200,
        speed : 180,
        experience: 0, 
        level: 1, 
        specialPoints: 0,
        unlockedAbilities: [], 
        basicAbilities: [], 
        abilityCooldowns: {}
      })
      break;
    case "Kakashi Sensei":
      player = Player({
        playerId: playerId,
        classType : classType,
        health : 340,
        maxHealth : 340,
        chakra : 250,
        maxChakra : 250,
        strength : 240,
        agility : 200,
        speed : 200,
        experience: 0, 
        level: 1, 
        specialPoints: 0,
        unlockedAbilities: [], 
        basicAbilities: [], 
        abilityCooldowns: {}
      })
      break;
  }

  getInterface.innerHTML = `
  <div class="character-container">
   <div class="avatar-container">
    <img src="Images/Characters/${classType.toLowerCase()}.jpg" class="img-avatar">
    <button id="special-points-button" class="hidden"></button>
   </div>
    <div class="player-details">
      <h3>${classType}</h3>
      <p class="health-player"></p>
      <p class="chakra-player"></p>
      <p class="strength-player">Strength: ${player.strength}</p>
      <p class="agility-player">Agility: ${player.agility}</p>
      <p class="speed-player">Speed: ${player.speed}</p>
    </div>
    <div class="player-bars"> 
      <div class="health-bar">
        <div class="heptagon-badge">
          <span class="icon-heart"></span>
        </div>
        <div class="health-fill"></div>
        <div class="health-value"></div>
        <div class="health-plus-button-container"></div>
      </div>
      <div class="chakra-bar">
        <div class="heptagon-badge">
          <span class="icon-yinyang"></span>
        </div>
        <div class="chakra-fill">
          <div class="chakra-cost-overlay"></div>
        </div>
        <div class="chakra-value"></div>
        <div class="chakra-plus-button-container"></div>
      </div>
      <div class="level-container">
        <div class="level-badge">
          <span class="icon-star"></span>
        </div>
        <div id="exp-bar-container">
          <div id="exp-bar">
            <span id="level-display"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
  GameManager.setPreFight();
  _updateBars();
  LevelUpSystem.loadProgress();
}

const getPlayer = () => {
  return player;
}

const updatePlayerUI = () => {
  document.querySelector('.health-player').textContent = `Health: ${Math.max(player.health, 0)}`;
  document.querySelector('.chakra-player').textContent = `Chakra: ${Math.max(player.chakra, 0)}`;
  document.querySelector('.strength-player').textContent = `Strength: ${Math.max(player.strength, 0)}`;
  document.querySelector('.agility-player').textContent = `Agility: ${Math.max(player.agility, 0)}`;
  document.querySelector('.speed-player').textContent = `Speed: ${Math.max(player.speed, 0)}`;
};