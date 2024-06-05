const attack = (attacker, defender) => {
  attacker.strength = Math.max(attacker.strength, 0);  
  const baseDamage = attacker.strength * attacker.agility / 2500;
  const offsetDamage = Math.floor(Math.random() * 7);
  const outputDamage = Math.floor(baseDamage + offsetDamage);
  const numberOfHits = Math.floor(Math.random() * Math.max(attacker.agility / 15, 1)) + 1;
  const totalDamage = outputDamage * numberOfHits;

  defender.health = Math.floor(Math.max(defender.health - totalDamage, 0)); 
  alert(`${attacker.classType} hit ${outputDamage} damage ${numberOfHits} times.`);
  updateHealthOnUI();
};

const characterMoves = (player, enemy) => {
  const playerTurn = () => {
    attack(player, enemy);
    if (enemy.health <= 0) return;
  };

  const enemyTurn = () => {
    enemyAI(enemy, player);
    if (player.health <= 0) return;
  };

  if (player.speed >= enemy.speed) {
    playerTurn();
    if (enemy.health > 0) {
      enemyTurn();
    }
  } else {
    enemyTurn();
    if (player.health > 0) {
      playerTurn();
    }
  }

  decrementCooldowns(player);
};

const updateHealthOnUI = () => {
  const playerHealthElem = document.querySelector(".health-player");
  const enemyHealthElem = document.querySelector(".health-enemy");
  const enemyHealthBar = document.querySelector('.enemy-bars .health-fill');
  const enemyChakraBar = document.querySelector('.enemy-bars .chakra-fill');
  EntityBars.updateBars(enemyHealthBar, enemyChakraBar, enemy.health, enemy.maxHealth, enemy.chakra, enemy.maxChakra);

  if (enemy.health <= 0) {
    alert("You win bruhhh lessgooo :) Searching for a new enemy...");
    enemyDefeated();
    playerHealthElem.innerHTML = `Health: ${player.health}`;
    enemyHealthElem.innerHTML = 'Health: 0';
    LevelUpSystem.onEnemyDefeated();
    LevelUpSystem.saveProgress();
  } else if (player.health <= 0) {
    alert("You lose, you can try again if you want :( Searching for a new enemy or refresh the browser...");
    playerHealthElem.innerHTML = 'Health: 0';
    enemyHealthElem.innerHTML = `Health: ${enemy.health}`;
    GameManager.setPreFight();
    LevelUpSystem.saveProgress();
  } else {
    playerHealthElem.innerHTML = `Health: ${player.health}`;
    enemyHealthElem.innerHTML = `Health: ${enemy.health}`;
  }
};


