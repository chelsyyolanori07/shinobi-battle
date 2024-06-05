const createEnemy = (clan, classType, health, maxHealth, chakra, maxChakra, strength, agility, speed, image) => {
  let level = Math.floor(Math.random() * 5) + 1;

  const adjustStats = (stat, multiplier, maxStat) => {
    let adjustedStat = Math.random() < 0.5 ? Math.floor(stat * multiplier) : stat;
    return Math.min(adjustedStat, maxStat);
  };

  let healthMultiplier = 1 + (level - 1) * 0.1;
  let chakraMultiplier = 1 + (level - 1) * 0.1;
  let strengthMultiplier = 1 + (level - 1) * 0.05;
  let agilityMultiplier = 1 + (level - 1) * 0.05;
  let speedMultiplier = 1 + (level - 1) * 0.05;

  const enemy = {
    clan,  
    classType,
    health: Math.max(adjustStats(health, healthMultiplier, maxHealth), 0),
    maxHealth: Math.max(maxHealth, 0),
    chakra: Math.max(adjustStats(chakra, chakraMultiplier, maxChakra), 0),
    maxChakra: Math.max(maxChakra, 0),
    strength: Math.max(adjustStats(strength, strengthMultiplier, strength), 0),
    agility: Math.max(adjustStats(agility, agilityMultiplier, agility), 0),
    speed: Math.max(adjustStats(speed, speedMultiplier, speed), 0),
    level: Math.max(level, 0),
    image,
    abilityCooldowns: initializeAbilityCooldowns() 
  };
  assignEnemyAbilities(enemy); 
  return enemy;
};

const predefinedEnemies = {
  "Uchiha": [
    { name: "Uchiha Madara", health: 340, maxHealth: 340, chakra: 190, maxChakra: 190, strength: 225, agility: 85, speed: 150, image: "Images/Enemies/Uchiha Clan/Uchiha Madara.jpg", clan: "Uchiha" },
    { name: "Uchiha Obito", health: 320, maxHealth: 320, chakra: 180, maxChakra: 180, strength: 210, agility: 80, speed: 140, image: "Images/Enemies/Uchiha Clan/Uchiha Obito.jpg", clan: "Uchiha" },
    { name: "Uchiha Itachi", health: 330, maxHealth: 330, chakra: 185, maxChakra: 185, strength: 215, agility: 82, speed: 145, image: "Images/Enemies/Uchiha Clan/Uchiha Itachi.jpg", clan: "Uchiha" }
  ],
  "Kazekage": [
    { name: "Gaara", health: 300, maxHealth: 300, chakra: 170, maxChakra: 170, strength: 200, agility: 75, speed: 130, image: "Images/Enemies/Kazekage Clan/Gaara.jpg", clan: "Kazekage" },
    { name: "Temari", health: 290, maxHealth: 290, chakra: 160, maxChakra: 160, strength: 190, agility: 70, speed: 120, image: "Images/Enemies/Kazekage Clan/Temari.jpg", clan: "Kazekage" },
    { name: "Kankuro", health: 280, maxHealth: 280, chakra: 150, maxChakra: 150, strength: 180, agility: 65, speed: 110, image: "Images/Enemies/Kazekage Clan/Kankuro.jpg", clan: "Kazekage" }
  ],
  "Hōzuki": [
    { name: "Hōzuki Gengetsu", health: 310, maxHealth: 310, chakra: 175, maxChakra: 175, strength: 195, agility: 77, speed: 135, image: "Images/Enemies/Hōzuki Clan/Hōzuki Gengetsu.jpg", clan: "Hōzuki" },
    { name: "Hōzuki Mangetsu", health: 305, maxHealth: 305, chakra: 172, maxChakra: 172, strength: 193, agility: 76, speed: 133, image: "Images/Enemies/Hōzuki Clan/Hōzuki Mangetsu.jpg", clan: "Hōzuki" },
    { name: "Hōzuki Suigetsu", health: 300, maxHealth: 300, chakra: 170, maxChakra: 170, strength: 190, agility: 75, speed: 130, image: "Images/Enemies/Hōzuki Clan/Hōzuki Suigetsu.jpg", clan: "Hōzuki" }
  ],
  "Yotsuki": [
    { name: "Killer-B", health: 320, maxHealth: 320, chakra: 180, maxChakra: 180, strength: 210, agility: 80, speed: 140, image: "Images/Enemies/Yotsuki Clan/Killer B.jpg", clan: "Yotsuki" },
    { name: "Omoi", health: 310, maxHealth: 310, chakra: 175, maxChakra: 175, strength: 205, agility: 78, speed: 138, image: "Images/Enemies/Yotsuki Clan/Omoi.jpg", clan: "Yotsuki" },
    { name: "Karui", health: 300, maxHealth: 300, chakra: 170, maxChakra: 170, strength: 200, agility: 75, speed: 135, image: "Images/Enemies/Yotsuki Clan/Karui.jpg", clan: "Yotsuki" }
  ],
  "Kamizuru": [
    { name: "Kamizuru Suzumebachi", health: 310, maxHealth: 310, chakra: 175, maxChakra: 175, strength: 195, agility: 77, speed: 135, image: "Images/Enemies/Kamizuru Clan/Kamizuru Suzumebachi.jpg", clan: "Kamizuru" },
    { name: "Kamizuru Kurobachi", health: 305, maxHealth: 305, chakra: 172, maxChakra: 172, strength: 193, agility: 76, speed: 133, image: "Images/Enemies/Kamizuru Clan/Kamizuru Kurobachi.jpg", clan: "Kamizuru" },
    { name: "Kamizuru Jibachi", health: 300, maxHealth: 300, chakra: 170, maxChakra: 170, strength: 190, agility: 75, speed: 130, image: "Images/Enemies/Kamizuru Clan/Kamizuru Jibachi.jpg", clan: "Kamizuru" }
  ]
};

async function fetchEnemiesFromAPI(clanName) {
  try {
    const response = await fetch(`https://narutodb.xyz/api/clan/search?name=${clanName}`);
    const data = await response.json();

    if (!Array.isArray(data.characters)) {
      throw new Error('API response does not contain characters array');
    }

    return data.characters.map(character => {
      const { name, images } = character;
      const image = images[0]; 

      const health = Math.max(Math.floor(Math.random() * 50) + 250, 0); 
      const chakra = Math.max(Math.floor(Math.random() * 50) + 250, 0); 
      const strength = Math.max(Math.floor(Math.random() * 50) + 200, 0); 
      const agility = Math.max(Math.floor(Math.random() * 50) + 100, 0);
      const speed = Math.max(Math.floor(Math.random() * 50) + 150, 0); 
      const clan = clanName; 

      let level = Math.floor(Math.random() * 5) + 1;

      const adjustStats = (stat, multiplier, maxStat) => {
        let adjustedStat = Math.random() < 0.5 ? Math.floor(stat * multiplier) : stat;
        return Math.max(Math.min(adjustedStat, maxStat), 0);
      };

      let healthMultiplier = 1 + (level - 1) * 0.1;
      let chakraMultiplier = 1 + (level - 1) * 0.1;
      let strengthMultiplier = 1 + (level - 1) * 0.05;
      let agilityMultiplier = 1 + (level - 1) * 0.05;
      let speedMultiplier = 1 + (level - 1) * 0.05;

      const adjustedHealth = adjustStats(health, healthMultiplier, health + 100);
      const adjustedChakra = adjustStats(chakra, chakraMultiplier, chakra + 100);
      const adjustedStrength = adjustStats(strength, strengthMultiplier, strength);
      const adjustedAgility = adjustStats(agility, agilityMultiplier, agility);
      const adjustedSpeed = adjustStats(speed, speedMultiplier, speed);

      const maxHealth = adjustedHealth;
      const maxChakra = adjustedChakra;

      return {
        clan,
        name,
        image,
        health: adjustedHealth,
        maxHealth,
        chakra: adjustedChakra,
        maxChakra,
        strength: adjustedStrength,
        agility: adjustedAgility,
        speed: adjustedSpeed,
        level: Math.max(level, 0),
      };
    });
  } catch (error) {
    console.error('Error fetching enemies from API:', error);
    return [];
  }
}

const saveEnemyProgress = () => {
  const playerId = localStorage.getItem(player.classType + '_playerId');
  localStorage.setItem(`currentEnemy_${playerId}`, JSON.stringify(enemy));
}

const loadEnemy = () => {
  const playerId = localStorage.getItem(player.classType + '_playerId');
  const savedEnemy = localStorage.getItem(`currentEnemy_${playerId}`);
  if (savedEnemy) {
    enemy = JSON.parse(savedEnemy);
    if (enemy.health <= 0) {
      showDefeatedEnemy(enemy); 
      GameManager.setPreFight(); 
    } else {
      GameManager.setFight(); 
    }
  } else GameManager.setPreFight(); 
};

const showDefeatedEnemy = (enemy) => {
  if (enemy && enemy.health <= 0) {
    const enemyImage = document.getElementById('enemy-image');
    if (enemyImage) {
      enemyImage.style.filter = 'grayscale(100%)';
    }
    const defeatedOverlay = document.getElementById('defeated-overlay');
    if (defeatedOverlay) {
      defeatedOverlay.classList.remove('hidden');
    }
  }
};

const showEnemy = () => {
  document.querySelector('.enemy').style.display = 'block';
};

const updateEnemyUI = () => {
  document.querySelector('.health-enemy').textContent = `Health: ${Math.max(enemy.health, 0)}`;
  document.querySelector('.chakra-enemy').textContent = `Chakra: ${Math.max(enemy.chakra, 0)}`;
  document.querySelector('.strength-enemy').textContent = `Strength: ${Math.max(enemy.strength, 0)}`;
  document.querySelector('.agility-enemy').textContent = `Agility: ${Math.max(enemy.agility, 0)}`;
  document.querySelector('.speed-enemy').textContent = `Speed: ${Math.max(enemy.speed, 0)}`;
};
