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
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.querySelectorAll('.field-error').forEach((node) => node.remove());
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
      status.textContent = '';
      return;
    }
    form.querySelectorAll('[aria-invalid="true"]').forEach((field) => field.removeAttribute('aria-invalid'));
    summary.hidden = true;
    status.textContent = 'No information was transmitted. Online submission is still being configured, so please do not enter or upload personal documents yet.';
  });
}
