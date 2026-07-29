# LinkedIn photo + status pass — running log

## Status changes caught
- Larissa Tyagi: Louiza Labs -> **Theora** (renamed) — FIXED on site/bio
- Neeraj Baid: Atlantic Money acquired; now Dir. of Product at Deel — RESOLVED: per bio policy, dropped current-job clause, keep acquisition (a win)
- Harish Venkatesan: now Product at FLORA — RESOLVED: per bio policy (founded-companies only), bio already covers just Designlab; no change needed
- Sri Prakash: Macrolytical current job — RESOLVED: per bio policy, bio covers only founded ventures (Grey Matter acquired, BountyME); no change
- Chris Hailey: Observee (never gained traction) -> now co-founder **OS3 (YC S26)** — FIXED: OS3 appended to bio, title set
- Rajiv Sacheti -> **Sancheti** (typo) — FIXED name+bio+photo_map key
- Arnav Joshi: Blast -> **Refactor** (healthcare/RCM) pivot, right person confirmed — FIXED: company/slug/page/sector/linkedin/bio updated; blast.html removed. NOTE: Refactor bio is high-level (grounded in confirmed RCM/healthcare + retained past jobs); deeper Refactor research still open.

## Photos done (batch: Kavita Shah, Deeya Viradia, Amira Valliani, Harish Venkatesan, Ashwini Iyer)

### earlier:
Larissa Tyagi, Varun Sivaram, Brandon Yang, Katie Siegel, Ethan Agarwal, Neeraj Baid, Shivani Mitra, Howard Tsao

## Flags / failures (needs review)
- Ashwini Iyer: LinkedIn photo is a wide stage/speaking shot (used as-is; may want a tighter headshot)
- Gobi Dasu: LinkedIn /in/gobidasu/ returns 404 (dead) — REMOVED from site; no photo. Real handle unknown (try LD Talent).
- Rajiv Sacheti: correct surname is **Sancheti** (sheet typo) — Co-Founder @ Caddy confirmed
- Chris Hailey: now **Co-Founder @ OS3 (YC S26)** (site lists Observee, YC S25) — review
- Arnav Joshi: LinkedIn (/in/arnav-rcm) = 'Refactoring American healthcare' (Refactor), NOT Blast/AI-safety — POSSIBLE WRONG PERSON or pivot; verify photo+company+linkedin
- Sri Prakash: headline now **Macrolytical** (Grey Matter/BountyMe are past ventures)
- Andy Fang (DoorDash): LinkedIn photo lightbox won't open (2 retries) — NO PHOTO pulled
- Peter Gao (Aquarium/Notion): no LinkedIn profile photo (default avatar) — NO PHOTO
- Howard Tsao (Muse Games): photo lightbox won't open (2 retries) — NO PHOTO
- Tanuj Thapliyal (Spot AI): photo lightbox won't open (3 attempts) — NO PHOTO (CEO at Spot AI confirmed)
- Tushar Dave (FarmX): photo lightbox won't open / download canceled (3 attempts) — NO PHOTO (Chairman & CEO @ FarmX confirmed)

## Session 5 — tiles + photos (autonomous)
TILES: built white-silhouette logo pipeline (icon.horse + PIL bg-removal + whiten, no card, on tinted topographic bg). Generated 41 logo tiles -> 82/106 companies now have tiles; 24 clean name-only placeholders. Underline-on-hover bug fixed. Nous Research reverted to name-tile (illustrative logo). 5 fetch-fails stay name-tiles: Bizzy, Upward, OS3, Huxe, Agence (SVG/webp icons).
PHOTOS: pulled 6 YC-verified headshots via YC data-page avatars (name-matched, no wrong-person): Andy Fang, Peter Gao, Kyle Li, Josh Zloof, Kevin Kim, Sona Sulakian(Pincites). Now 77/97 founders have photos.
STILL NO PHOTO (need LinkedIn when the account's monthly search-limit resets, or manual): Tanuj Thapliyal (Kos.ai), Eugene Huang (Torch-acq OpenAI), Matthew Huang (Lowkey-acq Niantic), Ansh Sheth (Bizzy), Emily Zhou (SoMol), Gobi Dasu, Denny Tsai, Ketul Patel, Christopher Davis, Bryan Quinn, Stephen Hughes, Ray Song, Tushar Davé, Howard Tsao. Stealth (no photo expected): Suraj Pakala, Nicholas Chuang, Vedant Shah, Justin Yang, Ravi Mishra.
NOTES: YC 'torch'/'lowkey'/'bizzy' slugs are DIFFERENT companies (name-match prevented false photos). LinkedIn browser returns are blocked on query-string (licdn tokens) + profile-search rate limit hit; alternate team pages (Bizzy/Kos) had no labeled headshots.
