const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
const dropdown = document.querySelector('.nav-dropdown');
const dropdownButton = document.querySelector('.nav-dropdown-toggle');
const dropdownMenu = document.querySelector('.nav-dropdown-menu');

function closeDropdown() {
  if (!dropdown || !dropdownButton || !dropdownMenu) return;
  dropdown.classList.remove('is-open');
  dropdownButton.setAttribute('aria-expanded', 'false');
}

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('is-open', !expanded);
    if (expanded) closeDropdown();
  });
}

if (dropdown && dropdownButton && dropdownMenu) {
  dropdownButton.addEventListener('click', () => {
    const expanded = dropdownButton.getAttribute('aria-expanded') === 'true';
    dropdownButton.setAttribute('aria-expanded', String(!expanded));
    dropdown.classList.toggle('is-open', !expanded);
  });

  dropdown.addEventListener('focusout', (event) => {
    if (!dropdown.contains(event.relatedTarget)) closeDropdown();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeDropdown();
      if (dropdown.contains(document.activeElement)) dropdownButton.focus();
    }
  });
}

const form = document.querySelector('#enquiry-form');
if (form) {
  const summary = document.querySelector('#error-summary');
  const status = document.querySelector('#form-status');
  const submitButton = form.querySelector('button[type="submit"]');
  const defaultButtonText = submitButton ? submitButton.textContent : '';

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    form.querySelectorAll('.field-error').forEach((node) => node.remove());
    form.querySelectorAll('[aria-invalid="true"]').forEach((field) => field.removeAttribute('aria-invalid'));
    status.textContent = '';

    const invalid = Array.from(form.querySelectorAll('[required]')).filter((field) => !field.checkValidity());
    if (invalid.length) {
      const list = invalid.map((field) => {
        const label = field.closest('label');
        const text = label ? label.childNodes[0].textContent.trim() : field.name;
        const message = document.createElement('span');
        message.className = 'field-error';
        message.textContent = ' Please complete this required field.';
        field.setAttribute('aria-invalid', 'true');
        field.setAttribute('aria-describedby', `${field.name}-error`);
        message.id = `${field.name}-error`;
        field.after(message);
        return `<li><a href="#${field.name}-error">${text}</a></li>`;
      }).join('');
      summary.innerHTML = `<h2>Please check the enquiry form</h2><ul>${list}</ul>`;
      summary.hidden = false;
      summary.focus();
      return;
    }

    summary.hidden = true;
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) {
        throw new Error('The form could not be sent.');
      }

      form.reset();
      status.textContent = 'Thanks — your enquiry has been received. We’ll review the information and contact you about the most sensible next step. To include photographs or installation paperwork, email them to info@insofixltd.co.uk using your name and postcode in the subject line.';
      status.focus();
    } catch (error) {
      status.textContent = 'Sorry, the enquiry could not be sent. Please check your connection and try again, or email info@insofixltd.co.uk directly.';
      status.focus();
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = defaultButtonText;
      }
    }
  });
}
