// ===========================
// Claude Code for Beginners
// Main JavaScript
// ===========================

document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Nav Toggle ---
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when a link is clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // --- Navbar scroll shadow ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- Code Tabs (Install section) ---
  document.querySelectorAll('.code-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      // Update tabs
      tab.parentElement.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update panels
      const panels = tab.closest('.step-content').querySelectorAll('.code-panel');
      panels.forEach(p => p.classList.remove('active'));
      document.getElementById('panel-' + target).classList.add('active');
    });
  });

  // --- Accordion ---
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.parentElement;
      const content = item.querySelector('.accordion-content');
      const isOpen = item.classList.contains('open');

      // Close all others
      document.querySelectorAll('.accordion-item').forEach(other => {
        other.classList.remove('open');
        other.querySelector('.accordion-content').style.maxHeight = null;
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // --- Scroll Animations ---
  const animateElements = () => {
    // Add fade-in class to elements we want to animate
    const targets = document.querySelectorAll(
      '.access-card, .benefit-card, .step, .accordion-item, .tip-bubble, .resource-link, .comparison-card, .step-celebration'
    );

    targets.forEach(el => {
      if (!el.classList.contains('fade-in')) {
        el.classList.add('fade-in');
      }
    });

    // Check visibility
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    targets.forEach(el => observer.observe(el));
  };

  animateElements();

  // --- Terminal Typing Effect ---
  const typingSequences = [
    {
      command: 'claude "Create a simple landing page with a hero section"',
      output: `  Creating landing page...\n  ✓ Created index.html with hero section\n  ✓ Added responsive CSS styles\n  ✓ Done! Open index.html to preview.`
    },
    {
      command: 'claude "Explain what this codebase does"',
      output: `  Scanning project files...\n  This is a React app with 12 components.\n  It handles user auth, a dashboard, and\n  a REST API integration with pagination.`
    },
    {
      command: 'claude "Find and fix any bugs in app.js"',
      output: `  Analyzing app.js...\n  Found 2 issues:\n  ✓ Fixed missing null check on line 42\n  ✓ Fixed async/await in fetchData()\n  All bugs resolved!`
    }
  ];

  let sequenceIndex = 0;

  const typeCommand = (text, element, cursor, callback) => {
    let i = 0;
    element.textContent = '';
    cursor.style.display = 'inline';

    const interval = setInterval(() => {
      element.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        cursor.style.display = 'none';
        setTimeout(callback, 400);
      }
    }, 35);
  };

  const showOutput = (text, outputEl, callback) => {
    outputEl.textContent = text;
    outputEl.classList.add('visible');
    setTimeout(callback, 3000);
  };

  const clearTerminal = (commandEl, outputEl, callback) => {
    outputEl.classList.remove('visible');
    setTimeout(() => {
      commandEl.textContent = '';
      outputEl.textContent = '';
      callback();
    }, 300);
  };

  const runSequence = () => {
    const seq = typingSequences[sequenceIndex];
    const commandEl = document.getElementById('typed-command');
    const cursorEl = document.getElementById('terminal-cursor');
    const outputEl = document.getElementById('terminal-output');

    typeCommand(seq.command, commandEl, cursorEl, () => {
      showOutput(seq.output, outputEl, () => {
        clearTerminal(commandEl, outputEl, () => {
          sequenceIndex = (sequenceIndex + 1) % typingSequences.length;
          setTimeout(runSequence, 500);
        });
      });
    });
  };

  // Start typing after a short delay
  setTimeout(runSequence, 800);

  // --- Smooth scroll for CTA button ---
  document.querySelector('.btn-primary').addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(e.currentTarget.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
