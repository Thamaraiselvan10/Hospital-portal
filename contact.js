// Year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Simple client-side validation + success message (no backend connected)
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return; // native messages

      // Simulate a submit
      status.style.color = 'var(--ok)';
      status.textContent = 'Thank you! Your request has been recorded. Our team will contact you shortly.';
      form.reset();
      // Smooth scroll back to top of form status
      status.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });