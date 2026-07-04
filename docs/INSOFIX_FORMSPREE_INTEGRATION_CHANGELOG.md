# Insofix Formspree Integration Changelog

## Scope

Connected the visible Free Photo Review form to Formspree using the verified endpoint:

`https://formspree.io/f/mkolkjga`

## Behaviour

- Uses JavaScript `fetch` so visitors remain on the same page.
- Shows inline success and failure messages.
- Disables the submit button while sending.
- Prevents duplicate submissions during the send state.
- Clears the form only after a confirmed success.
- Preserves entered data if sending fails.
- Moves focus to the status message after success or error.
- Keeps required-field validation and the existing error summary.
- Keeps the customer email field named `email` for reply-to handling by Formspree.
- Adds `_subject` with `New Insofix website enquiry`.

## Files and uploads

Photo upload remains disabled for the initial launch. Visitors are asked to email safe photographs or installation paperwork separately to `info@insofixltd.co.uk` using their name and postcode in the subject line.

## Not included

- No Cloudflare Turnstile.
- No GA4 or Google Ads tracking.
- No Search Console or DNS changes.
- No production indexing changes.
- No thank-you page or redirect.
