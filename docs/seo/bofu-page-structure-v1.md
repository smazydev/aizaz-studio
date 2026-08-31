# BOFU page structure v1

Research branch: `seo/bofu-v1`  
Parent research: `docs/seo/bofu-keyword-map-v1.md` + `docs/seo/bofu-keyword-map-v1.csv`  
Companion: `docs/seo/bofu-offer-keyword-alignment-v1.md`  
Site snapshot: `origin/main` at `5797620` (post-launch polish) merged into this branch  
Date: 2026-08-31  
Scope: **planning only**. No new routes. No production UI, layout, CSS, or visual-component work in this pass.

**Do not create doorway pages.** v1 strengthens existing URLs. The only later URL that may be added is an optional **named NetSuite / ecommerce case study**, not a new service landing.

**InvestorsGoneWild stays hidden.** Do not link `/case-studies/investorsgonewild-investment-platform` from any BOFU outline, sitemap note, or proof block.

---

## How to use this document

1. Treat the keyword map as the source of commercial queries. This document clusters those queries, maps them onto **live URLs**, and proposes H2 outlines for a later `seoExtras` / copy pass.
2. One commercial URL owns each intent. `/for/` pages, compare pages, and blogs are satellites.
3. Shared SeoLanding H2s (`The problem`, `How we help`, `Capabilities`, `Example use cases`, `How we deliver`, `Frequently Asked Questions`) stay as the page skeleton. Unique BOFU headings live in `seoSections` so a later content pass does **not** require changing `SeoLanding.astro` or visual components.
4. Pages that currently fall back to `buildFallbackSeoExtras()` (`{Title} for operations heavy teams` / `When to invest in {title}`) are the highest-leverage rewrites. That is copy data, not a new page.
5. This document does not authorize implementation.

---

## Shared page skeleton (do not fork in v1)

Every `/services/*` and `/for/*` landing currently renders, in order:

| Slot | Current H2 | v1 rule |
| --- | --- | --- |
| H1 | `page.title` | Keep URL. Tighten title/H1 in a later copy pass where noted below. |
| Problem / solution | The problem / How we help | Keep. Rewrite body to match the winning intent. |
| Capabilities | Capabilities (or What we build on `/for/`) | Keep. Reorder bullets so the winning query appears first. |
| Use cases | Example use cases | Keep. Make examples storefront- or offer-specific. |
| Benefits | Why teams choose us for this | Keep heading. Replace generic fallback cards via `seoExtras`. |
| Unique longform | `seoSections[].heading` | **This is the BOFU outline.** Write 3–5 unique H2s per P0 URL. |
| Process | How we deliver | Keep. Point sprint vs MVP vs audit in the step copy. |
| FAQ | Frequently Asked Questions | Keep. Add 2–3 commercial FAQs (Shopify/BigCommerce, Sprint vs MVP, audit-first). |
| Related | Related groups | Planning only: listed as internal-link targets below. |
| CTA | Book a Call + 14 Day Sprint | Default. Rescue/audit pages should also point `/engagement-models` and `/services/technical-audit`. |

Do **not** add a second layout, a new service template, or a doorway slug to “win” a keyword variant.

---

## BOFU keyword clustering

Queries from the v1 map, grouped by buyer job. Winner URL is the page that should rank; satellites support, they do not compete.

### Cluster A — NetSuite connectors (ecommerce / 3PL / inventory)

**Buyer job:** Connect storefronts, warehouses, and CRMs to NetSuite so orders and inventory stop living in CSVs.

| Query | Pri | Winner URL | Satellite |
| --- | --- | --- | --- |
| netsuite integration services | P0 | `/services/netsuite-integration` | `/for/netsuite-users` |
| netsuite ecommerce integration | P0 | `/services/netsuite-integration` | `/for/ecommerce-wholesale`, `/for/ecommerce-operations` |
| shopify netsuite integration | P0 | `/services/netsuite-integration` | `/blog/netsuite-shopify-integration-pitfalls` |
| bigcommerce netsuite integration | P0 (map) / P1 (CSV) | `/services/netsuite-integration` | `/blog/bigcommerce-netsuite-integration-production-problems` |
| netsuite integration developer | P1 | `/services/netsuite-integration` | — |
| netsuite inventory sync | P1 | `/services/netsuite-integration` (section, not a slug) | `/services/netsuite-erp-automation` |
| netsuite integration consultant | P1 | `/for/netsuite-users` | `/services/netsuite-integration` |

**Note:** The CSV maps “consultant” to the service URL. Page structure follows the keyword-map cannibalization rule: consultant / ops-leader intent lives on `/for/netsuite-users`; implementation lives on `/services/netsuite-integration`.

**Do not create:** `/services/shopify-netsuite-integration`, `/services/bigcommerce-netsuite-integration`, `/services/netsuite-inventory-sync`, `/services/netsuite-ecommerce-integration`.

### Cluster B — NetSuite inside the ERP (SuiteScript / order ops)

**Buyer job:** Automate work *inside* NetSuite (workflows, SuiteScript, finance/ops), not just the connector layer.

| Query | Pri | Winner URL | Satellite |
| --- | --- | --- | --- |
| netsuite order automation | P1 | `/services/netsuite-erp-automation` | `/services/netsuite-integration` |
| (SuiteScript / ERP workflow phrasing) | — | `/services/netsuite-erp-automation` | `/for/netsuite-users` |

Current extras on this URL still talk like a connector page (“NetSuite integration services for ecommerce…”). v1 outline must **differentiate**, not duplicate Cluster A.

### Cluster C — AI systems + 14-day sprint

**Buyer job:** Hire a studio to ship production AI/automation, usually starting with one workflow.

| Query | Pri | Winner URL | Conversion offer |
| --- | --- | --- | --- |
| ai automation consultant | P0 | `/services/ai-automation-systems` | `/ai-systems-sprint` |
| ai workflow automation company | P0 | `/services/ai-workflow-automation` | `/ai-systems-sprint` |
| ai workflow automation agency | P0/P1 | `/services/ai-workflow-automation` | `/compare/ai-systems-sprint-vs-traditional-automation` |
| business process automation with ai | P1 | `/services/business-process-automation` | Sprint; workflow page as sibling |
| ai integration services | P1 | `/services/ai-automation-systems` | `/services/api-integration` as sibling, not a new slug |

**Do not create:** `/services/ai-workflow-automation-agency`, a second sprint landing, or `/services/ai-integration`.

### Cluster D — SaaS MVP vs product studio

**Buyer job:** Pay a studio to ship v1, or hire a product team past prototype.

| Query | Pri | Winner URL | Offer |
| --- | --- | --- | --- |
| saas mvp development company | P0 | `/services/saas-mvp-development` | Engagement **MVP Build** |
| mvp software development company | P1 | `/services/saas-mvp-development` | Same |
| saas development agency | P0 | `/services/web-app-saas-development` | Book a call / retainer |
| product engineering agency | P0/P1 | `/services/web-app-saas-development` | `/compare/aizaz-vs-staff-augmentation` |

`/services/b2b-saas-development`, `/for/saas-startups`, `/for/startups` stay audience/depth pages — not extra MVP homepages.

**Do not create:** `/services/saas-mvp-development-company`, `/services/product-engineering-agency`.

### Cluster E — API / ecommerce integrations (non-NetSuite-primary)

**Buyer job:** Connect product/ops to third-party APIs; ecommerce when NetSuite is not the named system of record.

| Query | Pri | Winner URL | Satellite |
| --- | --- | --- | --- |
| api integration services | P0/P1 | `/services/api-integration` | NetSuite + ecommerce `/for/` |
| api integration developer | P1 | `/services/api-integration` | — |
| ecommerce integration services | P1 | `/for/ecommerce-wholesale` (and `/for/ecommerce-operations` as sibling) | `/services/netsuite-integration`, `/services/api-integration` |

**Do not create:** `/services/ecommerce-integration`.

### Cluster F — Rescue, audit, not staff-aug

**Buyer job:** Take over a stalled build, or buy an independent review before rebuilding. Do **not** productize leased engineers.

| Query | Pri | Winner URL | Offer |
| --- | --- | --- | --- |
| software project rescue service | P0 | `/services/project-rescue` | Project Rescue (audit first) |
| unfinished software project developer | P1 | `/services/project-rescue` | Same |
| technical codebase audit | P1 | `/services/technical-audit` | Technical Audit |
| embedded software engineers | P2 | `/engagement-models` | Dedicated pod language only |
| software engineering augmentation | P2 | `/compare/aizaz-vs-staff-augmentation` | Book a call (fit check) |

**Do not create:** `/services/staff-augmentation`, `/services/embedded-software-engineers`, `/services/unfinished-software-project`.

---

## Page / topic mapping (existing URLs first)

Priority is “strengthen this live URL,” not “add a landing.”

| Pri | Existing URL | Owns (cluster) | Does not own | Later content action |
| --- | --- | --- | --- | --- |
| 1 | `/services/netsuite-integration` | A — connectors, Shopify, BigCommerce, inventory sync | SuiteScript-inside-ERP (B) | Add real `seoExtras`. BigCommerce as first-class as Shopify. |
| 2 | `/services/netsuite-erp-automation` | B — SuiteScript, internal workflows, order automation | Storefront-pair landings | Rewrite extras so H2s no longer clone the integration page. |
| 3 | `/for/netsuite-users` | A satellite — consultant / “we already run NetSuite” | Implementation homepage | Point to integration URL for build work. |
| 4 | `/services/ai-workflow-automation` | C — multi-step AI workflows | Umbrella AI systems; sprint offer page | Add `seoExtras`; CTA the sprint. |
| 5 | `/services/ai-automation-systems` | C — AI consultant / systems umbrella | Single-workflow conversion | Keep; link workflow + sprint. |
| 6 | `/ai-systems-sprint` | C — 14-day conversion offer | Agency homepage | Keep URL. Light proof/internal-link notes only. |
| 7 | `/services/saas-mvp-development` | D — founder v1 / investor-ready MVP | Ongoing platform engineering | Add `seoExtras`. Lead with PropertyMatch. |
| 8 | `/services/web-app-saas-development` | D — SaaS / product engineering agency | Tight 4–8 week MVP | Differentiate from MVP page; link PropertyMatch, SalesAngel, 1Archiver. |
| 9 | `/services/api-integration` | E — APIs, webhooks, middleware | Named NetSuite storefront pairs | Add `seoExtras`. Ecommerce + ERP examples. Link both integration blogs. |
| 10 | `/services/project-rescue` | F — stalled / half-built / agency handoff | Staff-aug seats | Add `seoExtras`. CodeChecker as closest public extend-existing proof. Honest: not a failed-SaaS rescue story. |
| 11 | `/services/technical-audit` | F — paid review before rescue/rebuild | The rescue engagement itself | Add `seoExtras`. CTA: audit then rescue. |
| 12 | `/engagement-models` | Offer chooser (Sprint, MVP, Rescue, Audit, retainer) | Extra service homepage | Make dedicated-pod language explicit without selling hours. |
| 13 | `/for/ecommerce-wholesale` + `/for/ecommerce-operations` | E satellite — ecommerce ops buyer | Third ecommerce service slug | Related links to NetSuite + API. |
| 14 | `/services/business-process-automation` | C satellite — orchestration when AI is optional | AI-workflow company queries | Point harder at workflow URL + sprint. |
| 15 | Compare URLs | Decision-stage only | New service homepages | Keep. Staff-aug compare should mention `/engagement-models` in a later IA pass. |

`seoExtras` today exist only for the original set (`ai-automation-systems`, `web-app-saas-development`, `aws-devops`, `netsuite-erp-automation`, `business-process-automation`, plus several `/for/` pages). **P0 extra-service URLs buyers actually search still render generic fallback H2s.** That is the v1 content gap.

---

## Offer-to-keyword alignment (summary)

Full matrix: `docs/seo/bofu-offer-keyword-alignment-v1.md`.

| Named offer | Primary URL | Keywords it should close | Do not use this offer when |
| --- | --- | --- | --- |
| **AI Systems Sprint** | `/ai-systems-sprint` | AI workflow company/agency, AI automation consultant, BPA with AI (one workflow) | Multi-month SaaS MVP; full NetSuite program; stalled-codebase rescue |
| **SaaS MVP** | `/services/saas-mvp-development` + engagement **MVP Build** | SaaS MVP company, MVP software company | Ops wants one automation in 14 days; buyer wants staff-aug seats |
| **NetSuite integration** | `/services/netsuite-integration` | NetSuite services/ecommerce/Shopify/BigCommerce/developer/inventory | Pure SuiteScript-inside-ERP (use ERP automation URL); unnamed IGW work |
| **API integration** | `/services/api-integration` | API integration services/developer; ecommerce integration when ERP is unnamed | Buyer said “Shopify ↔ NetSuite” (send to NetSuite URL) |
| **Project rescue** | `/services/project-rescue` (+ audit) | Software project rescue, unfinished project developer | Greenfield MVP; “we just need extra engineers” (compare + engagement-models) |

Default CTAs remain **Book a Call** → `/book-a-call` and **14 Day Sprint** → `/ai-systems-sprint`, except rescue/audit (add audit-first) and NetSuite (Sprint only if one order/inventory exception workflow).

---

## Proposed H2 outlines (existing service pages)

H1 notes are copy suggestions for a later pass. Unique H2s are proposed `seoSections` headings. Template H2s from SeoLanding are omitted unless the page should change their *body* emphasis.

### 1. `/services/netsuite-integration` — rewrite (P0)

**H1 keep:** NetSuite Integration  
**Meta emphasis:** Shopify **and** BigCommerce, inventory, 3PL — not Shopify-only.

**Unique H2s**

1. **NetSuite integration services for Shopify, BigCommerce, and 3PL** — own “integration services” + ecommerce in one section. State this page is connector/middleware work.
2. **Shopify ↔ NetSuite: orders, inventory, and fulfillment without CSV** — existing FAQ is Shopify-centric; promote it to an H2. Link `/blog/netsuite-shopify-integration-pitfalls`.
3. **BigCommerce ↔ NetSuite in production** — first-class, not an afterthought. Link `/blog/bigcommerce-netsuite-integration-production-problems`. Do **not** spawn a BC service URL.
4. **Inventory sync that prevents oversell** — section for `netsuite inventory sync`. Validation, retry, ops dashboard.
5. **When a native connector is not enough** — SuiteScript/REST/RESTlet as *implementation detail*, then link `/services/netsuite-erp-automation` for inside-ERP workflows.
6. **What we need to scope a NetSuite engagement** — consultant-adjacent, but send “hire a NetSuite consultant” intent to `/for/netsuite-users`.

**Proof (honest):** two production blogs, ERP cofounder positioning, homepage tech logos. **No named NetSuite case study.** Do not invent clients. Do not use InvestorsGoneWild.

**CTA:** Book a call. Sprint only if the buyer has **one** order/inventory exception workflow.

**Internal links:** `netsuite-erp-automation`, `api-integration`, `/for/netsuite-users`, both ecommerce `/for/` pages, both blogs.

### 2. `/services/netsuite-erp-automation` — rewrite extras (P1, cannibalization fix)

**H1 keep:** NetSuite & ERP Automation  
**Current extras problem:** H2 “NetSuite integration services for ecommerce…” competes with the integration URL.

**Unique H2s (replace current extras headings)**

1. **SuiteScript and ERP workflows inside NetSuite** — own Cluster B.
2. **Order automation: sales order → fulfillment → finance, without another connector landing** — `netsuite order automation`. Mention storefronts only as sources, then link the integration page for Shopify/BigCommerce sync.
3. **Finance and ops automation the native workflow manager cannot finish** — saved searches vs scheduled scripts vs middleware.
4. **How this differs from NetSuite integration** — explicit split paragraph + link to `/services/netsuite-integration`.

**Related slugs to add in a later IA pass (not this docs commit):** `netsuite-integration`, `api-integration` (today: BPA + AWS only).

**Proof:** same blogs; still no public NetSuite CS.

### 3. `/for/netsuite-users` — rewrite (P1)

**H1 keep or tighten:** Custom Integrations for NetSuite Users → optionally “NetSuite integration consultant for ops and finance teams” in meta, not a new slug.

**Unique H2s**

1. **When you need a NetSuite integration consultant, not another iPaaS license**
2. **Implementation lives on the NetSuite integration service** — hard link to `/services/netsuite-integration`.
3. **Making NetSuite data usable outside finance** — keep existing extras theme.

### 4. `/services/ai-workflow-automation` — rewrite / add extras (P0)

**H1 keep:** AI Workflow Automation  
**Meta:** “company/agency” variants stay on this URL.

**Unique H2s**

1. **AI workflow automation company for multi-step operations** — own company/agency queries without a new slug.
2. **Custom workflows vs Zapier, Make, and native CRM automations** — link `/compare/ai-systems-sprint-vs-traditional-automation`.
3. **AI decision nodes on CRM, email, and ERP data** — honest “ai integration services” support; HubSpot/Salesforce/NetSuite as systems, not a new AI-integration page.
4. **Start with one workflow in 14 days** — conversion to `/ai-systems-sprint`.
5. **What production monitoring looks like** — retries, alerts, human-in-the-loop.

**Proof:** SalesAngel **only** as AI-in-product (CRM architecture), not as an ops-ERP workflow case study. Link cost / identify-workflows / ops-automation blogs.

**CTA:** Sprint primary; Book a call for multi-workflow.

### 5. `/services/ai-automation-systems` — keep URL, light rewrite (P0)

**H1 keep:** AI Automation Systems

**Unique H2s (evolve existing extras)**

1. Keep **AI automation agency for operations heavy businesses** (already present).
2. Keep **When to choose custom AI automation over off the shelf tools**.
3. Add **AI automation consultant: advise and implement, not a tool license**.
4. Add **Where this sits vs AI workflow automation and the sprint** — link those two URLs.

**CTA:** Sprint.

### 6. `/ai-systems-sprint` — keep (P0 conversion)

Existing H2s are already offer-shaped: Why teams stall / What you walk away with / Perfect for teams who need momentum / Sprint examples / Sprint timeline / FAQs.

**Later copy-only adds (still this URL):**

- H2 **Which problems fit a 14-day sprint** (one workflow: lead triage, document extract, one NetSuite exception path).
- H2 **What does not fit a sprint** (greenfield SaaS MVP → MVP page; stalled codebase → rescue; multi-storefront NetSuite program → integration page).
- Proof: do not over-claim PropertyMatch as a sprint if the public story is a 14-day **SaaS MVP**. Use sprint as the AI/ops offer; PropertyMatch stays on the MVP URL.

No second sprint URL.

### 7. `/services/saas-mvp-development` — rewrite / add extras (P0)

**H1 keep:** SaaS MVP Development

**Unique H2s**

1. **SaaS MVP development company for founders who need a real v1** — own company/MVP-software queries.
2. **What “investor-ready” means here** — auth, Stripe, AWS, CI/CD; 4–8 week MVP Build. Link `/engagement-models`.
3. **PropertyMatch: a production SaaS MVP, not a clickable prototype** — `/case-studies/propertymatchmaker-real-estate-saas`. Named testimonial is fair game.
4. **MVP vs ongoing product engineering** — link `/services/web-app-saas-development`. One paragraph for non-SaaS portals, then send platform work to the web-app URL.
5. **If the repo is already half-built** — link `/services/project-rescue` and `/blog/rescue-a-half-built-saas-product`. Do not turn this page into a rescue page.

**CTA:** Book a call; mention MVP Build on engagement-models.

### 8. `/services/web-app-saas-development` — rewrite extras (P0)

**H1 keep:** Web App & SaaS Development  
**Current extras still say “launching a founder MVP”** — that cannibalizes the MVP URL.

**Unique H2s (replace overlap)**

1. **SaaS development agency for products past prototype** — own agency query.
2. **Product engineering vs staff augmentation or a freelancer** — link both compare URLs.
3. **Platform foundations: auth, billing, APIs, multi-tenant paths** — 1Archiver + SalesAngel as production proof; PropertyMatch only as “we also ship v1” with a link to the MVP page.
4. **Taking over an existing SaaS codebase** — light rescue pointer, not a duplicate of project-rescue.

**Related slugs to add later:** `saas-mvp-development` (today the related list skips it).

### 9. `/services/api-integration` — rewrite / add extras (P0/P1)

**H1 keep:** API Integration

**Unique H2s**

1. **API integration services: REST, GraphQL, SOAP, and webhooks with retries**
2. **Ecommerce and ERP examples (Shopify, BigCommerce, NetSuite, 3PL)** — then hard-link `/services/netsuite-integration` for named NetSuite storefront work.
3. **Middleware when two vendors cannot talk directly**
4. **What an API integration developer actually delivers** — mappings, versioned adapters, failure dashboards (keep developer query on this URL).

**Proof:** no named middleware CS. Use Shopify pitfalls + BigCommerce production blog as failure-mode proof. SalesAngel CRM architecture is adjacent only.

**CTA:** Book a call. Sprint only if the “integration” is one AI/ops workflow.

### 10. `/services/project-rescue` — rewrite / add extras (P0)

**H1 keep:** Rescue a Stalled, Broken, or Overcomplicated Software Project (already commercial).

**Unique H2s**

1. **Software project rescue after a stalled agency or freelancer handoff**
2. **Unfinished or half-built products: audit, stabilize, then ship** — keep unfinished-developer query here. Link the rescue blog.
3. **Rescue vs rewrite vs MVP from scratch** — decision table in copy; link technical-audit, saas-mvp-development.
4. **Closest public proof: extending an existing production tool** — `/case-studies/modernizing-multi-language-code-checking-tool` (CodeChecker). Label honestly: existing-codebase modernization, **not** a dramatic failed-SaaS rescue. Do not invent a rescue client.

**CTA:** Book a call + `/services/technical-audit` first. Mention Project Rescue on `/engagement-models`.

### 11. `/services/technical-audit` — rewrite / add extras (P1)

**H1 keep:** Technical Audit

**Unique H2s**

1. **Technical codebase audit before you rebuild, raise, or hire**
2. **What the 1–2 week deliverable includes** — risk map, go/no-go on rewrite, effort ranges.
3. **Audit as the paid front door to project rescue** — link `/services/project-rescue`.
4. **Code and cloud we actually review** — repos, CI/CD, AWS; CodeChecker as quality/existing-code proof, not as a sample audit PDF.

**CTA:** Book a call (audit first).

### 12. `/engagement-models` — keep URL, later copy (P1/P2)

Not a SeoLanding page. Existing sections (models, chooser, comparison table, included/not included, FAQ) are enough **if** copy names:

- AI Systems Sprint → Cluster C
- MVP Build → Cluster D
- Project Rescue + Technical Audit → Cluster F
- Dedicated pod / embedded senior engineers → **outcome-owned**, with a disqualifier for open-ended staff-aug (link compare page)

No new model cards in v1.

### 13. Supporting pages (short)

**`/services/business-process-automation`** — keep extras vs Zapier; add H2 **When the workflow needs AI decision nodes** → `/services/ai-workflow-automation` + sprint.

**`/for/ecommerce-wholesale`** — keep multi-channel extras; add H2 **Ecommerce integration vs NetSuite integration** that routes named NetSuite work to the service URL.

**`/for/ecommerce-operations`** — later related-slug fix: add NetSuite + API (today BPA + web-app-saas). Optional H2 **Storefront ↔ ERP/3PL without a new service slug**.

**`/for/saas-startups` / `/for/startups` / `/services/b2b-saas-development`** — satellites for Cluster D. Do not retarget them at “SaaS MVP development company.”

**Compare pages** — keep as decision-stage. Staff-aug compare should eventually link `/engagement-models`. Sprint-vs-traditional compare already supports Cluster C.

---

## New URLs in v1

**Zero new commercial landings.**

Rejected (doorway / cannibalization / brand):

- `/services/bigcommerce-netsuite-integration`
- `/services/shopify-netsuite-integration`
- `/services/netsuite-inventory-sync`
- `/services/netsuite-order-automation`
- `/services/ai-workflow-automation-agency`
- `/services/saas-mvp-development-company`
- `/services/ecommerce-integration`
- `/services/staff-augmentation`
- `/services/embedded-software-engineers`

### Optional later (not v1, not a service doorway)

A **named public NetSuite / Shopify or BigCommerce case study** (new `/case-studies/...` slug) once a client can be named. That is proof, not a third NetSuite service URL. Until then, NetSuite pages use the two blogs, failure-mode FAQs, and cofounder/ERP positioning.

**Still never:** InvestorsGoneWild as that case study, or any public internal link to it.

---

## Proof rules for every outline above

| Cluster | Public proof you may cite | You may not cite |
| --- | --- | --- |
| NetSuite / ecommerce | Shopify pitfalls blog; BigCommerce production blog; logos; Nasir/ERP positioning | Invented clients; IGW; PropertyMatch as ERP proof |
| AI / ops | Sprint offer; AI blogs; SalesAngel labeled as AI-in-product | SalesAngel as a NetSuite ops workflow |
| SaaS MVP / product | PropertyMatch, SalesAngel, 1Archiver | Over-claiming NetSuite from these |
| Rescue / audit | CodeChecker (extend existing); rescue blog | A fake “failed agency SaaS” case study |
| API | Integration failure blogs; SalesAngel CRM architecture (adjacent) | A named middleware CS that does not exist |

---

## Later implementation pass (explicitly out of scope here)

When a **separate** content branch is allowed to touch copy data (still not visual/shared UI):

1. Author `seoExtras` for P0 extra-service slugs using the unique H2s above.
2. Rewrite `netsuite-erp-automation` extras so they no longer target “integration services.”
3. Differentiate `web-app-saas-development` extras from the MVP page.
4. Wire related slugs / `internalLinks` gaps listed in the keyword map (ERP ↔ integration, ecommerce-operations → NetSuite, project-rescue → CodeChecker, etc.).
5. Leave homepage / ClonePage / CSS to the polish track.

This structure pass stops here.
