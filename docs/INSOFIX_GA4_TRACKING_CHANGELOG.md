# Insofix GA4 Tracking Changelog

## Scope

Added privacy-safe GA4 tracking using measurement ID:

`G-9JTN04LJGB`

## Behaviour

- Loads Google tag script dynamically from `js/site.js`.
- Sends standard GA4 page views via `gtag('config', 'G-9JTN04LJGB')`.
- Tracks the first interaction with the Free Photo Review form using `form_start`.
- Tracks successful Formspree submission using `generate_lead`.

## Event parameters

The following non-personal parameters are used:

- `form_id`: `enquiry-form`
- `form_name`: `Free Photo Review`
- `lead_type`: `spray_foam_photo_review` on successful lead events

No names, email addresses, telephone numbers, postcodes, message text, property details or other form values are sent to GA4.

## Guardrails

- Formspree submission remains active.
- File upload remains disabled.
- No Cloudflare Turnstile was added.
- No Search Console or DNS changes were made.
- Existing `noindex, nofollow` page behaviour remains unchanged.
- Production indexing was not enabled.

## Testing required after deployment

- Confirm page views appear in GA4 Realtime.
- Start completing the Free Photo Review form and confirm a `form_start` event appears.
- Submit a successful test enquiry and confirm a `generate_lead` event appears.
- Confirm no personal form data appears in event parameters.
- Mark `generate_lead` as a key event/conversion in GA4 if not already configured.
