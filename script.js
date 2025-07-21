document.addEventListener('DOMContentLoaded', () => {

  // --- Dynamic Favicon ---
  const setFavicon = (emoji) => {
    const canvas = document.createElement('canvas');
    canvas.height = 64;
    canvas.width = 64;
    const ctx = canvas.getContext('2d');
    ctx.font = '58px serif';
    ctx.fillText(emoji, 0, 50);
    const url = canvas.toDataURL();
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = url;
    document.head.appendChild(link);
  };
  setFavicon('🎵');


  // --- Tab Functionality ---
  const tabs = document.querySelectorAll('.tab-button');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Deactivate all
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      // Activate clicked
      tab.classList.add('active');
      const activeContent = document.getElementById(tab.dataset.tab);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    });
  });


  // --- Mouse-tilt "Liquid" Effect ---
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 8; // Reduced intensity
    const y = (e.clientY / window.innerHeight - 0.5) * 8;
    document.body.style.transform = `perspective(1000px) rotateX(${y * -1}deg) rotateY(${x}deg)`;
  });


  // --- Particle Generation & Interaction ---
  const particleContainer = document.getElementById('particles-container');
  const particleTypes = ['🎵', '🎶', '🎤', '🎧', '🎷', '🎸'];
  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const isIcon = Math.random() > 0.7; // 30% chance of being a clickable icon
    if (isIcon) {
      particle.classList.add('icon');
      particle.addEventListener('click', () => pop(particle));
    }
    
    particle.innerHTML = particleTypes[Math.floor(Math.random() * particleTypes.length)];
    
    // Randomize position and animation
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.fontSize = `${Math.random() * 16 + 12}px`;
    const duration = Math.random() * 15 + 15; // 15-30 seconds
    const delay = Math.random() * 10; // 0-10 second delay
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s, ${delay}s`;
    
    particleContainer.appendChild(particle);
  }

  function pop(el) {
    el.classList.add('pop');
    // After animation, reset its position and remove the pop class
    setTimeout(() => {
      el.style.top = `${Math.random() * 100}vh`;
      el.style.left = `${Math.random() * 100}vw`;
      el.classList.remove('pop');
    }, 300);
  }


  // --- Audio Player for Beats Tab ---
  const playButtons = document.querySelectorAll('.play-button');
  const audioElements = document.querySelectorAll('.beat-list audio');
  let currentAudio = null;
  let currentPlayButton = null;

  playButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      const audioId = button.dataset.beat;
      const audio = document.getElementById(audioId);

      if (currentAudio && currentAudio !== audio) {
        // Stop currently playing audio
        currentAudio.pause();
        currentAudio.currentTime = 0;
        if (currentPlayButton) currentPlayButton.textContent = 'Play';
      }

      if (audio.paused) {
        audio.play();
        button.textContent = 'Pause';
        currentAudio = audio;
        currentPlayButton = button;
      } else {
        audio.pause();
        button.textContent = 'Play';
        currentAudio = null;
        currentPlayButton = null;
      }
      
      // When audio finishes, reset button
      audio.onended = () => {
        button.textContent = 'Play';
        currentAudio = null;
        currentPlayButton = null;
      };
    });
  });
});