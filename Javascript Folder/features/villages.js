const getVillageNameById = (villageId) => {
  const villageNames = {
    konohagakure: 'Konohagakure (The Hidden Leaf Village)',
    sunagakure: 'Sunagakure (The Hidden Sand Village)',
    kirigakure: 'Kirigakure (The Hidden Mist Village)',
    kumogakure: 'Kumogakure (The Hidden Cloud Village)',
    iwagakure: 'Iwagakure (The Hidden Stone Village)'
  };
  return villageNames[villageId] || 'Unknown Village';
};

const villageUnlockLevels = {
  konohagakure: 0, 
  sunagakure: 3,
  kirigakure: 7,
  kumogakure: 12,
  iwagakure: 17
};

const checkNewlyUnlockedVillages = (playerLevel) => {
  let newlyUnlockedVillage = null;

  for (const [villageId, requiredLevel] of Object.entries(villageUnlockLevels)) {
    if (playerLevel >= requiredLevel && !localStorage.getItem(`${villageId}_unlocked`)) {
      newlyUnlockedVillage = villageId;
      localStorage.setItem(`${villageId}_unlocked`, 'true');
    }
  }
  return newlyUnlockedVillage;
};

const unlockVillages = () => {
  const villages = document.querySelectorAll('.village');
  const selectedPlayerClassType = localStorage.getItem('selectedPlayerClassType');
  const playerId = localStorage.getItem(selectedPlayerClassType + '_playerId');
  const playerLevel = parseInt(localStorage.getItem(playerId + '_Level')) || 1;

  villages.forEach(village => {
    const villageId = village.getAttribute('id');
    const requiredLevel = villageUnlockLevels[villageId];
    const villageImg = village.querySelector('img');
    const lockIcon = village.querySelector('.lock-icon');

    if (!villageId || requiredLevel === undefined || !villageImg || !lockIcon) return;

    const isUnlocked = playerLevel >= requiredLevel;

    if (isUnlocked) {
      villageImg.classList.remove('locked');
      villageImg.classList.add('unlocked');
      lockIcon.style.display = 'none';
      village.onclick = () => selectVillageId(villageId);
    } else {
      villageImg.classList.add('locked');
      villageImg.classList.remove('unlocked');
      lockIcon.style.display = 'block';
      village.onclick = null; 
    }
  });
};

const completeLevel = () => unlockVillages();

document.addEventListener('DOMContentLoaded', () => {
  unlockVillages();
  showPlayer(); 
});
