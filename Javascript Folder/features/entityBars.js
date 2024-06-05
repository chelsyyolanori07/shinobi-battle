const EntityBars = (() => {
  const updateBars = (healthElement, chakraElement, health, maxHealth, chakra, maxChakra) => {
    const healthWidthRatio = (health / maxHealth) * 100;
    const chakraWidthRatio = (chakra / maxChakra) * 100;

    healthElement.style.width = healthWidthRatio + '%';
    chakraElement.style.width = chakraWidthRatio + '%';

    const healthPercentage = (health / maxHealth) * 100;
    healthElement.style.backgroundColor = healthPercentage < 30 ? 'rgba(255, 0, 0, 0.7)' : 'rgb(13 216 13)';

    const chakraPercentage = (chakra / maxChakra) * 100;
    chakraElement.style.backgroundColor = chakraPercentage < 50 ? 'rgba(0, 0, 255, 0.6)' : 'rgb(61 148 241)';

    let healthValueElement = healthElement.parentNode.querySelector('.health-value');
    let chakraValueElement = chakraElement.parentNode.querySelector('.chakra-value');

    if (!healthValueElement) {
      healthValueElement = document.createElement('span');
      healthValueElement.className = 'health-value';
      healthElement.parentNode.appendChild(healthValueElement);
    }
    if (!chakraValueElement) {
      chakraValueElement = document.createElement('span');
      chakraValueElement.className = 'chakra-value';
      chakraElement.parentNode.appendChild(chakraValueElement);
    }

    healthValueElement.textContent = health + '/' + maxHealth;
    chakraValueElement.textContent = chakra + '/' + maxChakra;
  };

  const updateChakraCostOverlay = (chakraElement, cost, maxChakra) => {
    const chakraCostOverlay = chakraElement.querySelector('.chakra-cost-overlay');
    if (cost > 0 && cost <= maxChakra) {
      const costWidthRatio = (cost / maxChakra) * 100;

      chakraCostOverlay.style.width = costWidthRatio + '%';
      chakraCostOverlay.textContent = `-${cost}`;
      chakraCostOverlay.style.display = 'flex';
    } else {
      chakraCostOverlay.style.display = 'none';
    }
  };

  return {
    updateBars,
    updateChakraCostOverlay,
  };
})();

const _updateBars = function() {
  _updatePlayerBars();
  _updateEnemyBars();
}

const _updatePlayerBars = function() {
  if (player) {
    const playerMaxHealth = player.maxHealth;
    const playerMaxChakra = player.maxChakra;

    EntityBars.updateBars(
      document.querySelector('.player-bars .health-fill'),
      document.querySelector('.player-bars .chakra-fill'),
      player.health,
      playerMaxHealth,
      player.chakra,
      playerMaxChakra
    );
  }
}

const _updateEnemyBars = function() {
  if (enemy) {
    const enemyMaxHealth = enemy.maxHealth;
    const enemyMaxChakra = enemy.maxChakra;

    EntityBars.updateBars(
      document.querySelector('.enemy-bars .health-fill'),
      document.querySelector('.enemy-bars .chakra-fill'),
      enemy.health,
      enemyMaxHealth,
      enemy.chakra,
      enemyMaxChakra
    );
  }
}
