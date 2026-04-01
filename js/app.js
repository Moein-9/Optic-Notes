/* ==========================================================================
   Optic Notes — app.js
   Lightweight interactions. No frameworks, no bloat.
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Nav scroll shadow ---------- */
  const nav = document.querySelector('.nav');
  if (nav) {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      nav.classList.toggle('nav--scrolled', y > 10);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile nav toggle ---------- */
  const mobileToggle = document.querySelector('.nav__mobile-toggle');
  const navLinks = document.querySelector('.nav__links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      // Update icon
      const icon = mobileToggle.querySelector('svg use');
      if (icon) {
        icon.setAttribute('href', isOpen ? '#icon-close' : '#icon-menu');
      }
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Category filter ---------- */
  const categoryBtns = document.querySelectorAll('.category-btn');
  const postCards = document.querySelectorAll('.post-card[data-category]');

  if (categoryBtns.length && postCards.length) {
    categoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active state
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.category;
        let anyVisible = false;

        postCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = '';
            anyVisible = true;
          } else {
            card.style.display = 'none';
          }
        });

        // Show empty state
        const grid = document.querySelector('.posts-grid');
        let emptyEl = grid.querySelector('.posts-empty');
        if (!anyVisible) {
          if (!emptyEl) {
            emptyEl = document.createElement('p');
            emptyEl.className = 'posts-empty';
            emptyEl.textContent = 'No posts in this category yet. Check back soon.';
            grid.appendChild(emptyEl);
          }
          emptyEl.style.display = '';
        } else if (emptyEl) {
          emptyEl.style.display = 'none';
        }
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback: show everything
    reveals.forEach(el => el.classList.add('visible'));
  }

  /* ---------- Back to top ---------- */
  const backBtn = document.querySelector('.back-to-top');
  if (backBtn) {
    window.addEventListener('scroll', () => {
      backBtn.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });

    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Auto-generate Table of Contents ---------- */
  const tocList = document.querySelector('.toc__list');
  const articleContent = document.querySelector('.article-content');

  if (tocList && articleContent) {
    const headings = articleContent.querySelectorAll('h2, h3');
    if (headings.length === 0) {
      // Hide TOC if no headings
      const toc = document.querySelector('.toc');
      if (toc) toc.style.display = 'none';
    } else {
      headings.forEach((heading, i) => {
        // Set id for anchor link
        if (!heading.id) {
          heading.id = 'section-' + (i + 1);
        }
        const li = document.createElement('li');
        if (heading.tagName === 'H3') li.classList.add('toc--h3');
        const a = document.createElement('a');
        a.href = '#' + heading.id;
        a.textContent = heading.textContent;
        li.appendChild(a);
        tocList.appendChild(li);
      });
    }
  }

  /* ---------- Newsletter form ---------- */
  const nlForm = document.querySelector('.newsletter__form');
  if (nlForm) {
    nlForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = nlForm.querySelector('.newsletter__input');
      const btn = nlForm.querySelector('.newsletter__btn');
      if (input && input.value.includes('@')) {
        btn.textContent = 'Subscribed';
        btn.style.background = '#5F7053';
        input.disabled = true;
        btn.disabled = true;
        input.value = '';
        setTimeout(() => {
          input.placeholder = 'You\'re on the list!';
        }, 100);
      }
    });
  }

  /* ---------- Share buttons ---------- */
  document.querySelectorAll('.share-bar__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.share;
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(document.title);
      let shareUrl = '';

      switch (type) {
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
          break;
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
          break;
        case 'copy':
          navigator.clipboard.writeText(window.location.href).then(() => {
            const svg = btn.querySelector('svg');
            btn.style.background = 'var(--color-accent-light)';
            btn.style.borderColor = 'var(--color-accent)';
            setTimeout(() => {
              btn.style.background = '';
              btn.style.borderColor = '';
            }, 1500);
          });
          return;
      }

      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
      }
    });
  });
  /* ---------- Scheduled Publishing ---------- */
  (function () {
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    // Hide unpublished posts on homepage
    document.querySelectorAll('[data-publish-date]').forEach(function (el) {
      var pubDate = new Date(el.getAttribute('data-publish-date') + 'T00:00:00');
      if (pubDate > today) {
        el.style.display = 'none';
      }
    });

    // Hide unpublished sitemap entries
    document.querySelectorAll('.sitemap-list [data-publish-date]').forEach(function (el) {
      var pubDate = new Date(el.getAttribute('data-publish-date') + 'T00:00:00');
      if (pubDate > today) {
        el.style.display = 'none';
      }
    });
  })();

  /* ---------- FAQ Accordion ---------- */
  document.querySelectorAll('.article-content h3[id^="faq-"]').forEach(function (q) {
    q.addEventListener('click', function () {
      var isOpen = q.classList.contains('faq-open');

      // Close all others
      document.querySelectorAll('.article-content h3[id^="faq-"].faq-open').forEach(function (openQ) {
        if (openQ !== q) openQ.classList.remove('faq-open');
      });

      // Toggle clicked
      q.classList.toggle('faq-open', !isOpen);
    });
  });

})();
