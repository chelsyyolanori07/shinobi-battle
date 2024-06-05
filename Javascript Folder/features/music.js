document.addEventListener('DOMContentLoaded', () => {
  let backgroundMusic = document.querySelector('#background-music');
  let playPauseButton = document.querySelector('#play-pause-button');
  let soundOnIcon = playPauseButton.querySelectorAll('svg')[0]; 
  let soundOffIcon = playPauseButton.querySelectorAll('svg')[1]; 

  function updateButtonIcons() {
    if (backgroundMusic.paused) {
      soundOnIcon.style.display = 'none';
      soundOffIcon.style.display = 'block';
    } else {
      soundOnIcon.style.display = 'block';
      soundOffIcon.style.display = 'none';
    }
  }

  if (!backgroundMusic.paused) {
    soundOnIcon.style.display = 'block';
    soundOffIcon.style.display = 'none';
  } else {
    backgroundMusic.play();
  }

  updateButtonIcons();

  playPauseButton.addEventListener('click', function() {
    if (backgroundMusic.paused) {
      backgroundMusic.play();
    } else {
      backgroundMusic.pause();
    }
    updateButtonIcons();
  });
});
