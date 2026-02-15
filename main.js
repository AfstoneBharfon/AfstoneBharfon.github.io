// Dev.Journal — Main JS

document.addEventListener('DOMContentLoaded', () => {

  // ── Tag Filter ─────────────────────────────────
  const tagBtns   = document.querySelectorAll('.tag-btn');
  const cards     = document.querySelectorAll('.post-card');
  const noPostMsg = document.getElementById('noPostsMsg');

  tagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tag = btn.dataset.tag;

      // Update active button
      tagBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter cards
      let visible = 0;
      cards.forEach(card => {
        const cardTags = card.dataset.tags || '';
        const show = tag === 'all' || cardTags.includes(tag);

        card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

        if (show) {
          card.style.opacity  = '1';
          card.style.transform = '';
          card.style.display  = '';
          visible++;
        } else {
          card.style.opacity  = '0';
          card.style.transform = 'translateY(6px)';
          // Hide after fade
          setTimeout(() => {
            if (!show) card.style.display = 'none';
          }, 260);
        }
      });

      if (noPostMsg) {
        noPostMsg.style.display = visible === 0 ? 'block' : 'none';
      }
    });
  });

  // ── Staggered card entry animation ─────────────
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`;
    requestAnimationFrame(() => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 60);
    });
  });

});
