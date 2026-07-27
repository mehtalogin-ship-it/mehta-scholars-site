# Mehta Scholars — Wix → Freestanding Migration

Status as of this build: **full static site generated from real captured content.**

## 1. What's built

| Page | File | Content |
|---|---|---|
| Home | `index.html` | Hero + What We Do + values + Join CTA |
| About | `about.html` | Intro + **Our Process flowchart** + team (3 classes) |
| Alumni Companies | `alumni-companies.html` | **41 founder bios** + filterable roster (category + stage) |
| Our Investments | `our-investments.html` | 7 investment cards |
| Committee List | `committee-list.html` | **53 members** across 3 committees |
| Updates | `updates.html` | Real blog post (Startup World Cup) |
| Company detail ×41 | `companies/<slug>.html` | Per-founder template: photo · name/year · company · category+stage · bio · Linkedin/Website |

Design matches the live Wix site: greens `#0a582a` / `#038112`; **Questrial** headings,
**Playfair Display** serif accents, **Montserrat** body (free substitute for Wix's paid Proxima Nova);
company-page topographic green background; serif page-heroes on Alumni/Committee.

## 2. Data sources (all real, captured from the live site)
- `captured/founders.json` — 41 founders (name, year, company, bio, category, stage)
- `captured/committee.json` — 53 members grouped into the 3 committees + section blurbs
- `captured/company_page_template.json` — company page model
- `captured/photo_map.json` — 38 people matched to real headshots (see §4)
- `captured/sitemap.md` — full ~50-page inventory of the live site

## 3. Dropped (per owner decision — leftover Wix defaults, not used)
- Wix Bookings ("Book Now"), Members area ("My Subscriptions"/"Notifications"), Subscriptions form.
- Kept: mailto contact + Tawk.to chat hook (`TAWK_SRC` in `js/main.js`, disabled until an ID is set).

## 4. Photos
- 38 people wired to real headshots in `assets/people/`, matched by filename from the owner's
  uploaded Site Files (29 committee, 7 founders, Bazigh + Sreyas). Everyone else uses an
  initials avatar until matched.
- **Remaining:** ~90 people total; the unmatched ones have numeric/Screenshot filenames with no
  name label, so they need live-page content-matching (a browser pass) — deferred.

## 5. SEO / redirects
- `_redirects` maps old Wix slugs → new pages (Netlify/Cloudflare format).
- Old `/copy-of-*` company slugs were duplicated/mismatched on Wix and can't be 1:1 remapped;
  they redirect to the Alumni Companies hub. New pages use clean `/companies/<name>.html`.

## 6. Known follow-ups (leftover-budget / next session)
1. ✅ DONE (Jul 2026) — Real LinkedIn/Website + exact category/stage pulled from all 32 live
   `/copy-of-*` pages via a render pass. **30 founders** now have real Linkedin/Website buttons and
   exact category & funding stage (Pre-Seed → Series C), stored in `captured/founders.json`
   (`linkedin`, `website`, `cat_stage`). Also corrected Alexis Gauba's company to **Raindrop** (was
   "Dawn"). The remaining **13 founders have no live detail page**, so no links exist to pull; their
   pages show inferred category + bio with no link buttons: Ayush Jain, Rohan Agrawal (Concierge AI),
   Johnny Wang (Statics), Drew Goldstein (Ephemeral), Ravi Kapur (DiyaTV), Jason Huang (AWG),
   Jonathan Shih (Pine), Richard Wang (Clad Labs), David Zhu (Percy AI), Sri Prakash (Grey Matter),
   Jason Lin (Sidenote), Anni Ankola (Spyra Beauty).
2. Remaining headshots (content-match numeric files to people via live pages).
3. Two founders share the company "Concierge AI" (Ayush Jain '09, Rohan Agrawal '10) → one page.
4. Committee grouping is heuristic (6 named to Investment; founders→Entrepreneurship; VCs→Advisory);
   verify against the live section order if exactness matters.
5. Design polish pass (owner requested: content first, polish later).

## 7. Cutover — NOT started
Domain still points to Wix. No DNS change without explicit owner confirmation.
Preview locally: `cd mehta-scholars-site && python3 -m http.server 8747`


### Update (Jul 2026, pass 2): remaining founders' links filled
Sourced the 13 founders that had no live `/copy-of-*` detail page via the Wix editor gallery
metadata (authoritative Link field) + web lookup verified by company:
**39/43 founders now have LinkedIn, 34/43 have a website.** New this pass: Johnny Wang, Jonathan
Shih (Pine), Drew Goldstein (Ephemeral), Richard Wang (Clad Labs), David Zhu (Percival), Sri Prakash
(BountyMe), Ravi Kapur (DiyaTV), Anni Ankola (Spyra Beauty), Ayush Jain + Rohan Agrawal (Concierge AI,
askconcierge.ai), Barrett Glasauer (Rejigg).
Only **2 left with no link** — Jason Huang (AWG) and Jason Lin (Sidenote) — common names where a
confident match couldn't be verified; left blank rather than risk mislinking a real person.

### Update (Jul 2026, pass 3): committee LinkedIns
Committee tiles now show LinkedIn buttons. Bios were already captured (49/53 from warmup).
LinkedIns sourced via LinkedIn-restricted web search verified by firm (+ reused from founders for
the 8 committee members who are also alumni founders). **45/53 members now have a LinkedIn button.**
Left blank (common names / stealth / not confidently found — not fabricated): Jia Xu, Ding Zhou,
Alex Rabodzey, Amol Patel (Stealth AI), Laurence Kao, Ravi Kapur, Wei-han Lien, Kevin Xu.
Editor-gallery extraction was attempted first (per owner request) but that gallery's panel wouldn't
expose the Link field (iframed, non-scrolling), so we used verified web lookup.

### Update (Jul 2026, pass 3b): committee tiles → clickable modal
Redesigned committee tiles to be **clickable** (photo + name + firm only, cleaner landing page).
Clicking opens a **modal** with the full bio + LinkedIn (or Instagram for Ravi Kapur) + a Company
link. Added the 8 remaining LinkedIns (owner-provided) → **53/53 members now have a personal link**;
**38/53 have a company link** (founder company sites + confident VC-firm domains; uncertain firm
domains omitted, not fabricated). Data in `captured/committee.json` (`linkedin`, `company_url`).
`js/main.js?v=3` (cache-busted) drives the modal. Note: the earlier inline "LinkedIn button" never
showed because it required a hard refresh; the modal replaces it.

### Update (Jul 2026, pass 4): committee company links + all photos + bio corrections
Re-pulled the live pages `mehtascholars.com/team-3` (committee) and `/works` (alumni founders),
parsing the Wix Pro Gallery items (title + description + image `mediaUrl`) from the SSR/warmup HTML.
- **Company links:** web-searched + verified 9 more committee firm domains → **47/53 have a company
  link** (Collate, Catalyst Business Partners, Pulsar Ventures, OPES VP, Consonant Ventures, Mousse
  Partners, MindWorks, Commure, Swiftly). Remaining 6 blank are stealth / no public site
  (Jarvis Family Investments, J. West Investments, Statics, Stealth AI) or unverified (Kevin Xu/IGG,
  Nemo Yang/Cortex).
- **Photos:** downloaded authoritative headshots for **all 96 people** (53 committee + 43 founders)
  straight from the live galleries (static.wixstatic.com) — **zero people left on initials avatars**.
  `captured/photo_map.json` now has 96 entries, all files present, no collisions.
- **Bio corrections:** comparing my stored bios to the live descriptions caught **7 committee bios
  that described the WRONG person** (copy-paste errors in the source capture): Alex Rampell had
  Rabodzey's bio, David Chang had Christopher Chang's, Andrew Jin had Andrew Luo's, Rohan Shah had
  Rohan Chopra's, Steven Tam had Gautam Krishnamurti's, Sean Turner had Sean Doherty's, Kevin Xu had
  Jia Xu's. All 25 mismatched bios were replaced with the exact live text.
- **Roster gap — RESOLVED:** added the 3 members the live page had that we were missing →
  **committee now 56/56**: Sean Doherty '09 (Awary, Entrepreneurship), Rahul Madduluri '12 (Doppel,
  Entrepreneurship), R Wang (Constellation Research, Venture Advisory) — with live bios, LinkedIns,
  photos, and company links (awary.com, doppel.com, constellationr.com). **Company links now 50/56.**

### Update (Jul 2026, pass 8): full roster from master scoreboard (43 → 105 companies)
Rebuilt the whole Alumni Companies dataset from the owner's master spreadsheet
(`Mehta Scholar Scoreboard 2025.26.xlsx`, 107 rows). New pipeline: `captured/companies.json`
is the single source; the generator renders the alumni grid + per-founder detail pages from it.
- **105 companies** (32 real logo tiles carried over + **73 colorful auto-generated placeholder
  tiles** — per-company color + topographic SVG overlay + company name; real-logo fetch still TODO).
- **9 sector filters** (AI · Health & Bio · Fintech · Security · Enterprise/SaaS · Commerce/Consumer ·
  Energy/Climate · Media/Gaming · Hardware/Deep-Tech), one primary sector each, default "All".
- **4 stage groups**, Acquired/IPO'd FIRST (**13 exits**: DoorDash IPO, Windsurf, Commure, Glow,
  Pincites→Filevine, Flipturn→Einride, Torch→OpenAI, Aquarium→Notion, Atlantic Money, Mida→Sanas,
  Coterie, Adaptiv). Then Pre-Seed / Seed / Series A & Later.
- **Repeat founders share ONE page** (8 of them: Jason Lin=Sidenote+Mida, Dawson Chen=Letterbook+Martin,
  Johnny Wang=Hinoki+Crosswire, etc.); both company tiles link to the shared founder bio page.
- **Detail pages** show founder · title · company · founded · city · sector · stage · funding ·
  investors (from the sheet) as fact cards.
- **Descriptions:** 82 companies have full researched/known descriptions; **23 have factual
  sheet-derived stubs** (flagged `bio_stub` in companies.json) — these need deeper research.
- **Footer** now shows BOTH MehtaScholars@harker.org + harkermehtascholars@gmail.com + 500 Saratoga Ave.
- **Updated spreadsheet** written to `~/Downloads/Mehta Scholar Scoreboard 2025.26 - UPDATED.xlsx`
  (added Website Sector / Stage Group / Description columns, 105 rows).
- **Git:** repo initialized + committed locally (255 files) with `netlify.toml` + README. NOT pushed
  (no `gh`/credentials on this machine — see handoff).

**OPEN ITEMS (continuing autonomous work / owner):**
1. **Deeper research for 23 stub companies** (Inventive, Quant, Designlab, Pamastay, Louiza Labs,
   Altitude IQ, Upward, Backbone, LD Talent, Hailcube, Agora, Kos.ai, aPriori, Danger Devices,
   Shopsense, FarmX, Hawala, Agence, Pokedata, Sound of Molecules, Potluck Labs, Lume, 3× Stealth).
2. **Real company-logo tiles** — currently colorful name-tiles; fetch/composite actual logos.
3. **2 empty sheet rows** (Hannah Bollar, "Tanuj") — no company; need info to add.
4. **Push to GitHub** — needs `gh` installed + auth (or a remote): `gh repo create mehta-scholars-site
   --private --source=. --push` from the site dir.
5. Some slugs still reflect sheet spellings (e.g., stealth-chuang); fine, cleaned the worst ones.

### Update (Jul 2026, pass 7): Alumni Companies tab rebuilt (company tiles)
Full redesign of `alumni-companies.html` per owner spec:
- **Removed** the "Meet the Founders" bio gallery (redundant — tiles link to founder bios).
- **Company logo tiles**: pulled the 32 composed tiles from the owner's Site Files (`1–33.png`,
  identified via a labeled montage; #11 & #30 both Rejigg). Copied to `assets/tiles/<slug>.png`.
  **10 companies have no tile → green placeholder** (company name on green): AWG, Clad Labs, DiyaTV,
  Ephemeral, Grey Matter/BountyMe, Hinoki, Percy/Percival, Pine, Sanas, Spyra Beauty.
- **Whole tile clickable** → company detail page; hover = committee-style lift (`translateY(-4px)`).
- **Grouped by 4 stage buckets** (owner-approved), Acquired/IPO'd FIRST to showcase wins:
  Acquired/IPO'd (1) · Pre-Seed (15) · Seed (13) · Series A and Later (14).
- **6 sector filters** (mutually exclusive, default "All"): AI · Health & Bio · Fintech · Security ·
  Enterprise · Commerce. Filter keeps stage grouping and hides empty groups. Nav dropdown updated to
  match. `data-sector` drives `js/main.js?v=4`; styles in `css/styles.css?v=6`.
- Stage + sector stored per founder in `founders.json` (`stage_group`, `sector`, `sector_key`, `tile`).
- Stages re-researched (best-effort, current as of Jul 2026); acquisitions verified: **Sidenote→Sanas
  (Jason Lin)** is the confirmed exit. Future merged w/ Autograph (kept in Series C, not "wins").

**OPEN ITEMS (owner to drive / later pass):**
1. **Refresh company descriptions** (owner deferred deep content research to a later pass). While
   assigning sectors I found **6 more copy-pasted-WRONG founder bios** in `founders.json` that this
   pass will fix: Advanced Optronics (has Kaizen's bio), Built Robotics (OneSchema's), Clad Labs
   (Statics'), Convey (Concierge's), Future (Descope's), Squadz (Kaizen's).
2. **Company renames surfaced by research** (confirm in the description pass): Percy AI → **Percival**
   (YC X25, AI data automation); Clad Labs = "Chad IDE" (YC F25); Grey Matter → **BountyMe**.
3. **Wins/exits**: owner will connect a **Google Sheet** listing all wins/exits/acquisitions +
   shutdowns → use it to populate the Acquired/IPO'd group and correct any shut-down companies
   (place under their last-known stage, per owner).
4. Low-confidence stages to reconcile against the sheet: Pine, DiyaTV, AWG, Grey Matter, Ephemeral,
   Rejigg (bootstrapped), Rye.

### Update (Jul 2026, pass 6): owner-supplied links + Hinoki pivot + bio fixes
- Committee company links (owner-supplied): Will Jarvis → jarvisinvestments.com, Kevin Xu → igg.com,
  Nemo Yang → withcortex.ai. **Committee links now 54/56** — only Jia Xu (J. West Investments, a
  real-estate LLC with no site) and Amol Patel (Stealth AI) remain blank.
- **Johnny Wang pivot:** Statics → **Hinoki Security** (YC-backed; continuous vulnerability scanning
  + patching, co-founded with Kunaal). Updated his founder + committee bio, org, website
  (hinoki.security), category (ai), slug (`companies/statics.html` → `companies/hinoki-security.html`,
  old file removed, sitemap updated).
- **Founder LinkedIns:** Jason Huang → /in/jason-huang-4023066 (+enriched AWG/SiC-GaN/Sentec bio),
  Jason Lin → /in/jason-chen-lin. **Founders with LinkedIn now 41/43** (only Rohan Agrawal &
  Ravi Kapur left; Ravi uses Instagram on the committee side).
- **Bug fixed:** Jason Lin's founder bio was a copy of Jason Huang's AWG bio → rewritten to a correct
  Sidenote (YC S23) bio.
- **Flags RESOLVED (owner input):** (1) Amol Patel / Stealth AI → linkedin.com/company/stealthaistartup
  (**committee links now 55/56**; only Jia Xu / J. West left, a real-estate LLC with no site).
  (2) Jason Lin → he founded Sidenote (YC S23), acquired by **Sanas**; per owner we feature him under
  **Sanas** (company=Sanas, website sanas.ai, slug `companies/sidenote.html`→`companies/sanas.html`,
  bio keeps the Sidenote-founder story). (3) Nemo Yang / Cortex bio rewritten from withcortex.ai — it's
  an AI desktop app automating document→software data entry across accounting, legal, and
  mortgage/lending (the old "developer-productivity platform" text was the wrong Cortex).

### Update (Jul 2026, pass 5): committee modal standardized to a fixed shape
The member modal previously grew with bio length — long bios (Laurence Kao) rendered tall & thin,
short bios (Satish) wide & short, because the photo column stretched to match card height. Rebuilt
`.modal-card` in `css/styles.css` as a **fixed landscape card** — `width: min(900px,94vw);
height: min(520px,86vh)` — modeled on the well-proportioned Gautam Krishnamurti window, scaled up.
Photo is a fixed inset rounded card (left); the info column is a flex column with name/org pinned at
top, **`#mBio` scrolling internally** (flex:1, overflow-y:auto) when the bio is long, and the
LinkedIn/Company buttons pinned at the bottom. Every member now gets an identical shape — long bios
scroll, short bios leave whitespace. Stylesheet is cache-busted (`styles.css?v=5`).

### Update (Jul 2026, pass 3c): committee bios verified full + gaps filled
Tested the editor-Description pull method (focus field → Cmd+A → Cmd+C → read clipboard via
computer-use). Verified **Satish Dharmaraj and Will Jarvis are byte-for-byte identical** to the
bios already stored — so the committee bios are the FULL editor text, not partial (the "partial"
look was the 3-line tile clamp; the modal shows the complete bio). The 4 members that previously
had empty bios (Sreyas Misra, Amit Mukherjee, Amol Patel, Glenn Reddy) had bios in the captured
warmup that weren't paired due to name-matching; now filled. **53/53 committee bios complete,
53/53 personal links, 38/53 company links.** Modal + clickable tiles verified working.
