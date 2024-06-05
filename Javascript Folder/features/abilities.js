let abilities = {
  naruto: {
    rasengan: {
      name: "Rasengan",
      description: "Damage enemy health (-50)<br>chakra cost (-25)",
      image: "Images/Abilities/Rasengan.jpg",
      levelRequired: 6,
      chakraCost: 25,
      cooldown: 3,
      onUse: function(player, enemy) {
        player.chakra = Math.max(player.chakra - 25, 0);
        enemy.health = Math.max(enemy.health - 50, 0);
      }
    },
    rasenshuriken: {
      name: "Rasenshuriken",
      description: "Damage enemy health (-70)<br>chakra cost (-30)",
      image: "Images/Abilities/Rasenshuriken.jpg",
      levelRequired: 7,
      chakraCost: 30,
      cooldown: 3,
      onUse: function(player, enemy) {
        player.chakra = Math.max(player.chakra - 30, 0);
        enemy.health = Math.max(enemy.health - 70, 0);
      }
    },
    kuchiyoseNoJutsu: {
      name: "Kuchiyose no Jutsu: Gamabunta",
      description: "Consume health (-15)<br>Buff chakra (+70)<br>strength (+30)<br>chakra cost (-20)",
      image: "Images/Abilities/Kuchiyose no Jutsu Gamabunta.jpg",
      levelRequired: 7,
      chakraCost: 20,
      cooldown: 4,
      onUse: function(player, enemy) {
        player.chakra = Math.max(player.chakra - 20, 0);
        player.health = Math.max(player.health - 15, 0);
        player.chakra = Math.min(player.chakra + 70, player.maxChakra);
        player.strength += 30;
      }
    },
    nineTailsChakraMode: {
      name: "Nine-tails Chakra Mode",
      description: "Consume health (-30)<br>Buff chakra (+100)<br>maxChakra (+70)<br>strength (+50)<br>chakra cost (-25)",
      image: "Images/Abilities/Nine-Tails Chakra Mode.jpg",
      levelRequired: 8,
      chakraCost: 25,
      cooldown: 5,
      onUse: function(player, enemy) {
        player.chakra = Math.max(player.chakra - 25, 0);
        player.health = Math.max(player.health - 30, 0);
        player.chakra = Math.min(player.chakra + 100, player.maxChakra);
        player.maxChakra += 70;
        player.strength += 50;
      }
    }
  },
  basic: {
    healingJutsu: {
      name: "Healing Jutsu",
      description: "Heals (+100)<br>maxHealth (+70)<br>chakra cost (-20)",
      image: "Images/Abilities/Healing Jutsu.jpg",
      levelRequired: 2,
      chakraCost: 20,
      cooldown: 1,
      onUse: function(player, enemy) {
        player.chakra = Math.max(player.chakra - 20, 0);
        player.health = Math.min(player.health + 100, player.maxHealth);
        player.maxHealth += 50;
      }
    },
    kunaiStorm: {
      name: "Kunai Storm",
      description: "Consume health (-15)<br>Debuff enemy health (-35)<br>enemy agility (-35)<br>chakra cost (-20)",
      image: "Images/Abilities/Kunai Storm.jpg",
      levelRequired: 3,
      chakraCost: 20,
      cooldown: 2,
      onUse: function(player, enemy) {
        player.chakra = Math.max(player.chakra - 20, 0);
        player.health = Math.max(player.health - 15, 0);
        enemy.health = Math.max(enemy.health - 35, 0);
        enemy.agility = Math.max(enemy.agility - 35, 0);
      }
    },
    blazingStrike: {
      name: "Blazing Strike",
      description: "Consume health (-30)<br>Debuff enemy health (-30)<br>strength (-50)<br>chakra cost (-30)",
      image: "Images/Abilities/Blazing Strike.jpg",
      levelRequired: 4,
      chakraCost: 30,
      cooldown: 2,
      onUse: function(player, enemy) {
        player.chakra = Math.max(player.chakra - 30, 0);
        player.health = Math.max(player.health - 30, 0);
        enemy.health = Math.max(enemy.health - 30, 0);
        enemy.strength = Math.max(enemy.strength - 50, 0);
      }
    },
    shunshinNoJutsu: {
      name: "Shunshin no Jutsu",
      description: "Buff speed (+50)<br>agility (+50)<br>chakra cost (-30)",
      image: "Images/Abilities/Shushin No Jutsu.jpg",
      levelRequired: 5,
      chakraCost: 30,
      cooldown: 2,
      onUse: function(player, enemy) {
        player.chakra = Math.max(player.chakra - 30, 0);
        player.speed += 50;
        player.agility += 50;
      }
    }
  },
  clans: {
    Konohagakure: {
      Uchiha: {
        MangekyoSharingan: {
          name: "Mangekyo Sharingan",
          description: "Buff chakra (+100)<br>strength (+50)<br>Debuff player chakra (-50)<br>player strength (-50)<br>chakra cost (-30)",
          image: "Images/Abilities/Mangekyo Sharingan.jpg",
          chakraCost: 30,
          onUse: function(enemy, player) {
            enemy.chakra = Math.max(enemy.chakra - 30, 0);
            player.chakra = Math.max(player.chakra - 50, 0);
            player.strength = Math.max(player.strength - 50, 0);
            enemy.strength += 100;
          }
        }
      }
    },
    Sunagakure: {
      Kazekage: {
        SandShield: {
          name: "Sand Shield",
          description: "Debuff player chakra (-50)<br>chakra cost (-20)",
          image: "Images/Abilities/Sand Shield.jpg",
          chakraCost: 20,
          onUse: function(enemy, player) {
            enemy.chakra = Math.max(enemy.chakra - 20, 0);
            player.chakra = Math.max(player.chakra - 50, 0);
          }
        }
      }
    },
    Kirigakure: {
      Hōzuki: {
        WaterReleaseTateEboshi: {
          name: "Water Release: Tate Eboshi",
          description: "Buff strength (+50)<br>debuff player health (-50)<br>chakra cost (-20)",
          image: "Images/Abilities/Water Release Tate Eboshi.jpg",
          chakraCost: 20,
          onUse: function(enemy, player) {
            enemy.chakra = Math.max(enemy.chakra - 20, 0);
            enemy.strength += 50;
            player.health = Math.max(player.health - 50, 0);
          }
        }
      }
    },
    Kumogakure: {
      Yotsuki: {
        BlackLightningBolts: {
          name: "Black Lightning Bolts",
          description: "Debuff player chakra (-45)<br>player agility (-40)<br>chakra cost (-20)",
          image: "Images/Abilities/Black Lightning Bolt.jpg",
          chakraCost: 20,
          onUse: function(enemy, player) {
            enemy.chakra = Math.max(enemy.chakra - 20, 0);
            player.chakra = Math.max(player.chakra - 45, 0);
            player.agility = Math.max(player.agility - 40, 0);
          }
        }
      }
    },
    Iwagakure: {
      Kamizuru: {
        HoneyTrap: {
          name: "Honey Trap",
          description: "Debuff player speed (-50)<br>player agility (-50)<br>chakra cost (-20)",
          image: "Images/Abilities/Honey Trap.jpg",
          chakraCost: 20,
          onUse: function(enemy, player) {
            enemy.chakra = Math.max(enemy.chakra - 20, 0);
            player.speed = Math.max(player.speed - 50, 0);
            player.agility = Math.max(player.agility - 50, 0);
          }
        }
      }
    }
  }
};

function assignAbilities(player) {
  switch (player.classType) {
    case "Naruto Uzumaki":
      player.unlockedAbilities.push(
        abilities.naruto.rasengan,
        abilities.naruto.kuchiyoseNoJutsu,
        abilities.naruto.nineTailsChakraMode,
        abilities.naruto.rasenshuriken
      );
      player.unlockedAbilities.push(
        abilities.basic.blazingStrike, 
      );
      break;
    case "Sasuke Uchiha":
      player.unlockedAbilities.push(
        abilities.basic.shunshinNoJutsu, 
        abilities.basic.kunaiStorm, 
        abilities.basic.blazingStrike, 
        abilities.basic.healingJutsu 
      );
      break;
    case "Sakura Haruno":
      player.unlockedAbilities.push(
        abilities.basic.healingJutsu, 
        abilities.basic.blazingStrike, 
        abilities.basic.kunaiStorm 
      );
      break;
    case "Kakashi Hatake":
      player.unlockedAbilities.push(
        abilities.basic.shunshinNoJutsu, 
        abilities.basic.blazingStrike, 
        abilities.basic.kunaiStorm, 
        abilities.basic.healingJutsu 
      );
      break;
  }
};

const enemyAbilities = {
  "Uchiha": [
    abilities.clans.Konohagakure.Uchiha.MangekyoSharingan
  ],
  "Kazekage": [
    abilities.clans.Sunagakure.Kazekage.SandShield
  ],
  "Hōzuki": [
    abilities.clans.Kirigakure.Hōzuki.WaterReleaseTateEboshi
  ],
  "Yotsuki": [
    abilities.clans.Kumogakure.Yotsuki.BlackLightningBolts
  ],
  "Kamizuru": [
    abilities.clans.Iwagakure.Kamizuru.HoneyTrap
  ],
  "DefaultClan": [] 
};

const assignEnemyAbilities = (enemy) => {
  if (!enemyAbilities.hasOwnProperty(enemy.clan)) {
    enemyAbilities[enemy.clan] = enemyAbilities.DefaultClan;
  }
  const clanAbilities = enemyAbilities[enemy.clan];
};

const enemyAI = (enemy, player) => {
  const shouldUseAbility = () => {
    if (enemyAbilities[enemy.clan] && enemyAbilities[enemy.clan].length > 0) {
      return Math.random() < 0.25; 
    }
    return false;
  };

  if (shouldUseAbility()) {
    const availableAbilities = enemyAbilities[enemy.clan].filter(ability => {
      const abilityName = ability.name; 
      const cooldown = enemy.abilityCooldowns.clans[abilityName] || 0;
      const canUse = cooldown === 0 && enemy.chakra >= ability.chakraCost;
      return canUse;
    });

    if (availableAbilities.length > 0) {
      const ability = availableAbilities[Math.floor(Math.random() * availableAbilities.length)];
      const abilityName = ability.name;
      
      ability.onUse(enemy, player);
      alert(`${enemy.classType} used ${abilityName} againts you :(`);
    } else {
      attack(enemy, player);
    }
  } else {
    attack(enemy, player);
  }
  updatePlayerUI();
  updateEnemyUI();
};

const checkForNewAbilities = () => {
  let newlyUnlockedAbilities = [];

  for (const category in abilities) {
    for (const key in abilities[category]) {
      const ability = abilities[category][key];

      if (player.level >= ability.levelRequired && !localStorage.getItem(`${key}_unlocked`)) {
        player.unlockedAbilities.push(key); 
        localStorage.setItem(`${key}_unlocked`, 'true'); 
        newlyUnlockedAbilities.push(ability.name); 
      }
    }
  }
  if (newlyUnlockedAbilities.length > 0) {
    alert(`Congratss you have unlocked new abilities: ${newlyUnlockedAbilities.join(', ')} hehehe :)`);
  }
};

function initializeAbilityCooldowns() {
  const cooldowns = {
    naruto: {},
    basic: {},
    clans: {}
  };
  for (let category in abilities) {
    for (let abilityKey in abilities[category]) {
      cooldowns[category][abilityKey] = abilities[category][abilityKey].cooldown;
    }
  }
  return cooldowns;
}

const decrementCooldowns = () => {
  for (let category in player.abilityCooldowns) {
    for (let abilityKey in player.abilityCooldowns[category]) {
      player.abilityCooldowns[category][abilityKey] = Math.max(player.abilityCooldowns[category][abilityKey] - 1, 0);
    }
  }
};

const useAbility = (abilityKey, category, player, enemy) => {
  const ability = abilities[category][abilityKey];

  if (player.abilityCooldowns[category][abilityKey] > 0) {
    alert(`Ability is on cooldown for ${player.abilityCooldowns[category][abilityKey]} more turn(s)!`);
    return;
  }

  if (player.chakra < ability.chakraCost) {
    alert("There is not enough chakra to use this ability...");
    return;
  }

  if (player.level >= ability.levelRequired) {
    (category === 'naruto' || category === 'basic') ? ability.onUse(player, enemy) : ability.onUse(enemy, player);

    player.abilityCooldowns[category][abilityKey] = ability.cooldown;

    updatePlayerUI();
    updateEnemyUI();
    _updateBars();
    LevelUpSystem.saveProgress();
    saveEnemyProgress();
  } else {
    alert("You need to reach level " + ability.levelRequired + " to use this ability");
  }
};

const showAbilities = () => {
  let abilitiesDiv = document.getElementById('abilities');
  abilitiesDiv.innerHTML = '';

  const selectedAbilityPanel = document.createElement('div');
  selectedAbilityPanel.id = 'selected-ability-panel';
  selectedAbilityPanel.style.display = 'none';
  abilitiesDiv.appendChild(selectedAbilityPanel);

  const selectedAbilityImage = document.createElement('img');
  const abilityName = document.createElement('h3');
  const abilityDescription = document.createElement('p');
  const useButton = document.createElement('button');

  selectedAbilityPanel.appendChild(selectedAbilityImage);
  selectedAbilityPanel.appendChild(abilityName);
  selectedAbilityPanel.appendChild(abilityDescription);
  selectedAbilityPanel.appendChild(useButton);

  let closeAbilitiesButton = document.createElement('span');
  closeAbilitiesButton.className = 'close-abilities-button';
  closeAbilitiesButton.textContent = 'X';
  closeAbilitiesButton.addEventListener('click', function() {
    abilitiesDiv.style.display = 'none';
    document.getElementById('toggleAbilitiesButton').textContent = 'Abilities';
  });
  abilitiesDiv.appendChild(closeAbilitiesButton);

  const closeButton = document.createElement('span');
  closeButton.textContent = 'X';
  closeButton.className = 'close-abilities-button';
  closeButton.onclick = function() {
    selectedAbilityPanel.style.display = 'none';
  };
  selectedAbilityPanel.appendChild(closeButton);

  const categoriesToShow = player.classType === 'Naruto Uzumaki' ? ['naruto', 'basic'] : ['basic'];

  const displayCategory = (category) => {
    if (abilities[category]) {
      let categoryHeader = document.createElement('h2');
      categoryHeader.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      categoryHeader.classList.add('category-header');
      abilitiesDiv.appendChild(categoryHeader);

      for (let abilityKey in abilities[category]) {
        let ability = abilities[category][abilityKey];
        if (player.level >= ability.levelRequired) {
          let abilityDiv = document.createElement('div');
          abilityDiv.classList.add('ability-item');
          abilityDiv.setAttribute('data-chakra-cost', ability.chakraCost);

          let abilityImage = document.createElement('img');
          abilityImage.src = ability.image;
          abilityImage.alt = ability.name;
          abilityImage.classList.add('item-image');

          let abilityText = document.createElement('p');
          abilityText.textContent = ability.name;

          abilityImage.addEventListener('click', () => {
            selectedAbilityImage.src = ability.image;
            abilityName.textContent = ability.name;
            abilityDescription.innerHTML = ability.description;
            useButton.textContent = 'Use';

            useButton.onclick = () => {
              if (player.chakra >= ability.chakraCost) {
                useAbility(abilityKey, category, player, enemy);
                selectedAbilityPanel.style.display = 'none';
              } else {
                alert("There is not enough chakra to use this ability.");
              }
            };
            selectedAbilityPanel.style.display = 'block';
          });

          abilityDiv.addEventListener('mouseenter', () => {
            const chakraElement = document.querySelector('.player-bars .chakra-fill');
            const chakraCost = parseInt(abilityDiv.getAttribute('data-chakra-cost'));
            EntityBars.updateChakraCostOverlay(chakraElement, chakraCost, player.maxChakra, player.chakra);
          
            const updatedChakra = player.chakra - chakraCost;
            EntityBars.updateBars(
              document.querySelector('.player-bars .health-fill'),
              chakraElement,
              player.health,
              player.maxHealth,
              updatedChakra,
              player.maxChakra
            );
          });
          
          abilityDiv.addEventListener('mouseleave', () => {
            const chakraElement = document.querySelector('.player-bars .chakra-fill');
            EntityBars.updateChakraCostOverlay(chakraElement, 0, player.maxChakra, player.chakra);
          
            EntityBars.updateBars(
              document.querySelector('.player-bars .health-fill'),
              chakraElement,
              player.health,
              player.maxHealth,
              player.chakra,
              player.maxChakra
            );
          });

          abilityDiv.appendChild(abilityImage);
          abilityDiv.appendChild(abilityText);
          abilitiesDiv.appendChild(abilityDiv);
        }
      }
    }
  };

  categoriesToShow.forEach(category => {
    if (category === 'naruto') {
      let narutoAbilitiesAvailable = Object.values(abilities[category]).some(ability => player.level >= ability.levelRequired);
      if (narutoAbilitiesAvailable) {
        displayCategory(category);
      }
    } else {
      displayCategory(category);
    }
  });
};

document.addEventListener('click', function(event) {
  let abilitiesDiv = document.getElementById('abilities');
  let toggleAbilitiesButton = document.getElementById('toggleAbilitiesButton');
  if (abilitiesDiv.style.display === 'block' && !abilitiesDiv.contains(event.target) && event.target !== toggleAbilitiesButton) {
    abilitiesDiv.style.display = 'none';
    toggleAbilitiesButton.textContent = 'Abilities';
  }
});
