# Insofix Phase 2 Image and Copy Changelog

## Images implemented

| Image | Source path retained | Delivery path | Page using image | Alt text used |
|---|---|---|---|---|
| Spray foam mortgage evidence | `images/spray-foam-mortgage-evidence.png` | `images/spray-foam-mortgage-evidence.png` | `mortgage-problem.html`, `index.html` | Homeowner reviewing loft photographs and property information for a spray foam mortgage enquiry |
| Safe loft photo review | `images/safe-loft-photo-review.png` | `images/safe-loft-photo-review.png` | `free-photo-review.html` | Photographs being taken safely from a loft access hatch for a remote spray foam review |
| Closed-cell older roof assessment | `images/closed-cell-older-roof-assessment.png` | `images/closed-cell-older-roof-assessment.png` | `closed-cell-foam-older-roofs.html`, `index.html` | Technician carefully inspecting dense spray foam bonded around an older roof structure |
| Spray foam scam warning checklist | `images/spray-foam-scam-warning-checklist.png` | `images/spray-foam-scam-warning-checklist.png` | `avoiding-spray-foam-scams.html` | Homeowner checking spray foam contractor details and written information before booking |

## Image optimisation performed

The supplied PNG files were preserved and used directly because adding new binary WebP derivatives blocks the current Codex Create PR flow. HTML still includes explicit width and height attributes to reduce layout shift, and images below the initial viewport use `loading="lazy"`. WebP optimisation should be completed outside this PR flow if binary uploads are supported later.

## Process diagram implementation

`removal-process.html` now uses a semantic ordered-list pathway styled with responsive CSS rather than a raster image. The pathway includes Free Remote Photo Review, Chargeable On-Site Assessment, Options Explained, Agreed Work and Post-Work Evidence. It stacks on smaller screens and makes the free remote review visually distinct.

## Differentiation sections added

- Homepage and process page now include assessment-first/no automatic removal positioning.
- Homepage includes a “What has brought you here?” orientation card section.
- Process page includes possible outcomes from an evidence-led review.
- Process page includes a Completion Evidence Pack section using “may include” and “as relevant to the agreed scope” style wording.
- Closed-cell page includes a stop-and-explain trust statement.

## Scam-awareness additions

`avoiding-spray-foam-scams.html` now includes claims worth checking carefully, important distinctions and a practical contractor checklist. The page uses verification questions and calm consumer-protection language rather than accusing named companies.

## Disclaimer text consolidated or removed

Repeated broad caveat blocks were removed from conversion pages and replaced with contextual qualifications where relevant. The fuller explanatory caveats remain on `faq.html` and `regulation-standards-training.html`.

## Homepage conversion changes

The homepage now presents the problem, calm first step, assessment-first approach, orientation cards, main service pathways, concise “Why Insofix?” differentiators and a clear CTA with phone and email support.

## Navigation changes

Primary navigation was reduced to the main commercial journey: Home, Spray Foam Removal, Mortgage & Survey Issues, Process, Free Photo Review, About and Contact. Supporting guidance pages remain available in the footer and contextual links.

## Internal-link changes

Added or strengthened links between Mortgage Problems and Free Photo Review, Mortgage Problems and the lender/surveyor checklist, Closed-Cell Foam and On-Site Assessment, Avoiding Scams and Regulation & Standards, Removal Process and Completion Evidence Pack, and homepage orientation cards and guidance pages.

## Unverified owner-led claims deliberately withheld

A stronger claim that enquiries are reviewed directly by people responsible for planning and delivering the work was not added because operational accuracy requires confirmation. Existing approved owner-led wording in source assumptions remains noted but was not expanded into a new contractor-network comparison claim.

## Commercial details still requiring Elliott’s confirmation

Assessment prices, travel bands, VAT treatment, fee-credit arrangements, cancellation terms, current insurance, waste-carrier/disposal process and any named training or accreditation evidence still require confirmation before production.

## Genuine photographs still required from Elliott

Genuine project, staff, PPE, equipment, before/during/after, waste-handling and completion-documentation photographs are still required before trust or evidence sections imply real Insofix work.

## Old images that should eventually be replaced

Existing generic spray-foam, rafters, loft and removal images should eventually be replaced with genuine Insofix photography where authenticity is important.

## Questions or blockers

- Confirm owner-led/direct case-handling wording before publishing stronger operational claims.
- Confirm final commercial assessment terms before publication.
- Confirm any accreditation, training, insurance or waste-handling claims before adding named claims.
