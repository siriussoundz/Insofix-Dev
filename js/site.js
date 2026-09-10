const GA4_MEASUREMENT_ID = 'G-9JTN04LJGB';
const CONSENT_STORAGE_KEY = 'insofix-analytics-consent';

function setAnalyticsConsent(choice) {
  const granted = choice === 'granted';
  window.gtag('consent', 'update', {
    analytics_storage: choice,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });
  localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  document.querySelector('.cookie-banner')?.remove();
  if (granted) {
    trackAnalyticsEvent('consent_update', { analytics_storage: 'granted' });
  }
}

function showConsentBanner() {
  const banner = document.createElement('aside');
  banner.className = 'cookie-banner';
  banner.setAttribute('aria-label', 'Analytics cookie choices');
  banner.innerHTML = '<p><strong>Analytics cookies</strong><br>We use Google Analytics to understand how the website is used. You can accept or reject analytics cookies. <a href="privacy.html">Privacy notice</a></p><div class="actions"><button class="button" type="button" data-consent="granted">Accept analytics</button><button class="button secondary" type="button" data-consent="denied">Reject analytics</button></div>';
  banner.addEventListener('click', (event) => {
    const button = event.target.closest('[data-consent]');
    if (button) setAnalyticsConsent(button.dataset.consent);
  });
  document.body.appendChild(banner);
}

function initialiseAnalytics() {
  if (!GA4_MEASUREMENT_ID || window.__insofixAnalyticsLoaded) return;
  window.__insofixAnalyticsLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
  });
  const savedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
  if (savedConsent === 'granted') {
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
  }
  window.gtag('js', new Date());
  window.gtag('config', GA4_MEASUREMENT_ID, {
    send_page_view: true
  });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_MEASUREMENT_ID)}`;
  document.head.appendChild(script);
}

function trackAnalyticsEvent(eventName, params = {}) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, params);
}

initialiseAnalytics();

if (!localStorage.getItem(CONSENT_STORAGE_KEY)) {
  window.addEventListener('DOMContentLoaded', showConsentBanner, { once: true });
}

document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href^="tel:"], a[href^="mailto:"]');
  if (!link) return;
  const isPhone = link.href.startsWith('tel:');
  trackAnalyticsEvent(isPhone ? 'phone_click' : 'email_click', {
    link_url: link.getAttribute('href'),
    link_text: link.textContent.trim()
  });
});

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
  let formStartTracked = false;

  const trackFormStart = () => {
    if (formStartTracked) return;
    formStartTracked = true;
    trackAnalyticsEvent('form_start', {
      form_id: 'enquiry-form',
      form_name: 'Free Photo Review'
    });
  };

  form.addEventListener('focusin', trackFormStart, { once: true });
  form.addEventListener('input', trackFormStart, { once: true });
  form.addEventListener('change', trackFormStart, { once: true });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    trackFormStart();
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

      trackAnalyticsEvent('generate_lead', {
        form_id: 'enquiry-form',
        form_name: 'Free Photo Review',
        lead_type: 'spray_foam_photo_review'
      });

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
