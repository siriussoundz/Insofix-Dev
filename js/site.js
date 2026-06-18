const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('is-open', !expanded);
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
    status.textContent = 'No information was transmitted. A secure form backend is required before enquiries or uploads can be sent.';
  });
}
