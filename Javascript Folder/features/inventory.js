let inventoryItems = {
  chakraPotion: {
    name: "Chakra Potion",
    description: "Chakra (+50)",
    quantity: 0,
    image: "Images/Inventory/Chakra Potion.jpg"  
  },
  chuninVest: {
    name: "Chunin Vest",
    description: "Strength (+30)<br>Max Health (+20)",
    quantity: 0,
    image: "Images/Inventory/Chunin Vest.jpg"
  },
  healthPotion: {
    name: "Health Potion",
    description: "Health (+50)",
    quantity: 0,
    image: "Images/Inventory/Health Potion.jpg"
  },
  ramenBowl: {
    name: "Ramen Bowl",
    description: "Health (+50)<br>Chakra (+50)",
    quantity: 0,
    image: "Images/Inventory/Ramen Bowl.jpg"
  },
  shuriken: {
    name: "Shuriken",
    description: "Agility (+25)",
    quantity: 0,
    image: "Images/Inventory/Shuriken.jpg"
  },
  kunai: {
    name: "Kunai",
    description: "Strength (+25)",
    quantity: 0,
    image: "Images/Inventory/Kunai.jpg"
  },
  hokageHat: {
    name: "Hokage Hat",
    description: "Health (+50)<br>Chakra (+30)<br>Strength (+20)<br>Agility (+20)<br>Speed (+20)",
    quantity: 0,
    image: "Images/Inventory/Hokage Hat.jpg"
  }
}

const showInventory = () => {
  let inventoryDiv = document.getElementById('inventory');
  inventoryDiv.innerHTML = '';

  const selectedItemPanel = document.createElement('div');
  selectedItemPanel.id = 'selected-item-panel';
  selectedItemPanel.style.display = 'none'; 
  inventoryDiv.appendChild(selectedItemPanel);

  const selectedItemImage = document.createElement('img');
  const itemName = document.createElement('h3');
  const itemDescription = document.createElement('p');
  const useButton = document.createElement('button'); 

  selectedItemPanel.appendChild(selectedItemImage);
  selectedItemPanel.appendChild(itemName);
  selectedItemPanel.appendChild(itemDescription);
  selectedItemPanel.appendChild(useButton); 

  let closeInventoryButton = document.createElement('span');
  closeInventoryButton.className = 'close-inventory-button';
  closeInventoryButton.textContent = 'X';
  closeInventoryButton.addEventListener('click', function() {
    inventoryDiv.style.display = 'none';
    document.getElementById('toggleInventoryButton').textContent = 'Inventory';
  });
  inventoryDiv.appendChild(closeInventoryButton);

  const closeButton = document.createElement('span'); 
  closeButton.textContent = 'X';
  closeButton.className = 'close-inventory-button'; 
  closeButton.onclick = function() {
  selectedItemPanel.style.display = 'none';
  };
  selectedItemPanel.appendChild(closeButton);

  for (let itemKey in inventoryItems) {
    let item = inventoryItems[itemKey];

    if (item.quantity > 0) {
      let itemDiv = document.createElement('div');
      itemDiv.classList.add('inventory-item');

      let itemImage = document.createElement('img');
      itemImage.src = item.image;
      itemImage.alt = item.name;
      itemImage.classList.add('item-image');

      let quantityBadge = document.createElement('span');
      quantityBadge.classList.add('quantity-badge');
      quantityBadge.textContent = item.quantity;

      let itemText = document.createElement('p');
      itemText.textContent = item.name; 

      itemImage.addEventListener('click', () => {
        selectedItemImage.src = item.image;
        itemName.textContent = item.name;
        itemDescription.innerHTML = item.description; 
        useButton.textContent = 'Use'; 
      
        useButton.onclick = () => {
          applyItemEffect(itemKey); 
          
          quantityBadge.textContent = inventoryItems[itemKey].quantity;

          if (inventoryItems[itemKey].quantity <= 0) {
            itemDiv.remove();
            selectedItemPanel.style.display = 'none';
          }
      
          if (document.getElementById('special-points-button').classList.contains('hidden')) {
            LevelUpSystem.removePlusButtons(); 
          } else {
            LevelUpSystem.addPlusButtons(); 
          }
        };
        selectedItemPanel.style.display = 'block'; 
      });      
      itemDiv.appendChild(itemImage);
      itemDiv.appendChild(quantityBadge);
      itemDiv.appendChild(itemText); 
      inventoryDiv.appendChild(itemDiv);
    }
  }

  const specialPointsButton = document.getElementById('special-points-button');
  if (specialPointsButton) {
    if (specialPointsButton.classList.contains('hidden')) {
      LevelUpSystem.removePlusButtons(); 
    } else {
      LevelUpSystem.addPlusButtons();
    }
  }
};

const saveInventory = () => {
  localStorage.setItem('inventory', JSON.stringify(inventoryItems));
};

const loadInventory = () => {
  const savedInventory = localStorage.getItem('inventory');
  if (savedInventory) {
    inventoryItems = JSON.parse(savedInventory);
  }
};

const applyItemEffect = (itemKey) => {
  let player = getPlayer(); 
  let item = inventoryItems[itemKey];
  if (item && item.quantity > 0) { 
    switch (itemKey) {
      case 'healthPotion':
        player.health = Math.min(player.health + 50, player.maxHealth);
        break;
      case 'chakraPotion':
        player.chakra = Math.min(player.chakra + 50, player.maxChakra); 
        break;
      case 'chuninVest':
        player.strength += 30;
        player.maxHealth += 20;
        break;
      case 'ramenBowl':
        player.health = Math.min(player.health + 50, player.maxHealth);
        player.chakra = Math.min(player.chakra + 50, player.maxChakra); 
        break;
      case 'shuriken':
        player.agility += 25;
        break;
      case 'kunai':
        player.strength += 25; 
        break;
      case 'hokageHat':
        player.health = Math.min(player.health + 50, player.maxHealth);
        player.chakra = Math.min(player.chakra + 30, player.maxChakra);
        player.strength += 20;
        player.agility += 20;
        player.speed += 20;
        break;
    }
    item.quantity--;  
    saveInventory();
    updatePlayerUI(); 
    _updatePlayerBars();
    LevelUpSystem.saveProgress(); 
  }
};

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('inventory').style.display = 'none';
  loadInventory(); 
  showInventory(); 
});

const addItemToInventory = (itemKey) => {
  if (inventoryItems.hasOwnProperty(itemKey)) {
    inventoryItems[itemKey].quantity++;
    showInventory();
  }
  saveInventory();
};

const removeItemFromInventory = (itemKey) => {
  inventoryItems[itemKey].quantity--;
  showInventory();
};

const enemyDefeated = () => {
  let itemKeys = Object.keys(inventoryItems);
  let randomItemKey = itemKeys[Math.floor(Math.random() * itemKeys.length)];
  addItemToInventory(randomItemKey);
  alert(`You have received a ${inventoryItems[randomItemKey].name}! Wohooo :)`);
};

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('inventory').style.display = 'none';
});

document.addEventListener('click', function(event) {
  let inventoryDiv = document.getElementById('inventory');
  let toggleInventoryButton = document.getElementById('toggleInventoryButton');
  if (inventoryDiv.style.display === 'block' && !inventoryDiv.contains(event.target) && event.target !== toggleInventoryButton) {
    inventoryDiv.style.display = 'none';
    toggleInventoryButton.textContent = 'Inventory';
  }
});

