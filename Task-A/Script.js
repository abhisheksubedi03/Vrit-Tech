const cards = document.querySelectorAll('.card');
let activeIndex = 1; // Start with the middle card active
let startY = 0;
let isDragging = false;

function updateCardPositions() {
  cards.forEach((card, index) => {
    // Calculate the offset relative to the active card
    const offset = index - activeIndex;

    // Adjust transform values based on the card's relative position
    if (offset < 0) {
      // Cards above the active card (lower them slightly)
      card.style.transform = `translateY(calc(${offset * 100}% + 130px)) scale(${1 - Math.abs(offset) * 0.3})`;
    } else if (offset > 0) {
      // Cards below the active card (raise them slightly)
      card.style.transform = `translateY(calc(${offset * 100}% - 130px)) scale(${1 - Math.abs(offset) * 0.3})`;
    } else {
      // Active card
      card.style.transform = `translateY(0) scale(1)`;
    }

    // Adjust z-index and opacity
    card.style.zIndex = 10 - Math.abs(offset); // Ensure active card stays on top
    card.style.opacity = offset === 0 ? 1 : 0.8; // Reduce opacity for non-active cards
  });
}

function handleScroll(deltaY) {
  if (deltaY > 0 && activeIndex < cards.length - 1) {
    // Scroll down
    activeIndex++;
    updateCardPositions();
  } else if (deltaY < 0 && activeIndex > 0) {
    // Scroll up
    activeIndex--;
    updateCardPositions();
  }
}

function handleDragStart(e) {
  isDragging = true;
  startY = e.touches ? e.touches[0].clientY : e.clientY;
}

function handleDragMove(e) {
  if (!isDragging) return;
  const currentY = e.touches ? e.touches[0].clientY : e.clientY;
  const deltaY = currentY - startY;

  if (deltaY > 50) {
    handleScroll(-1); // Scroll up
    isDragging = false;
  } else if (deltaY < -50) {
    handleScroll(1); // Scroll down
    isDragging = false;
  }
}

function handleDragEnd() {
  isDragging = false;
}

// Mouse and Touch Event Listeners
cards.forEach((card) => {
  card.addEventListener('mousedown', handleDragStart);
  card.addEventListener('mousemove', handleDragMove);
  card.addEventListener('mouseup', handleDragEnd);
  card.addEventListener('touchstart', handleDragStart);
  card.addEventListener('touchmove', handleDragMove);
  card.addEventListener('touchend', handleDragEnd);
});

// Wheel Scroll Event Listener
document.addEventListener('wheel', (e) => {
  handleScroll(e.deltaY);
});

// Initialize card positions
updateCardPositions();


