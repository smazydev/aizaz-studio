# BOFU offer–keyword alignment v1

Research branch: `seo/bofu-v1`  
Parent: `docs/seo/bofu-keyword-map-v1.md`  
Page outlines: `docs/seo/bofu-page-structure-v1.md`  
Date: 2026-08-31  
Scope: **planning only**. Align named commercial offers to existing BOFU queries. No new doorway URLs. No UI work.

**InvestorsGoneWild stays hidden.** It is not proof for any offer below.

---

## Why this exists

Buyers search jobs (“NetSuite integration services”, “SaaS MVP development company”). Aizaz sells **offers** (Sprint, MVP Build, NetSuite integration, API integration, Project Rescue). If every service page CTAs the sprint, money queries get the wrong next step.

This matrix says: which offer closes which query, on which **existing** URL, with which CTA.

Engagement models on `/engagement-models` (current names):

| Offer id | Public name | Typical duration |
| --- | --- | --- |
| `ai-systems-sprint` | AI Systems Sprint | 14 days |
| `mvp-build` | MVP Build | 4–8 weeks |
| `engineering-retainer` | Engineering Retainer | Monthly |
| `project-rescue` | Project Rescue | 2–12 weeks, audit first |
| `technical-audit` | Technical Audit | 1–2 weeks |

Service URLs are how Google and the IA expose the work; engagement models are how the deal is packaged. v1 does not add a sixth model.

Default sitewide CTAs today: **Book a Call** → `/book-a-call`, **14 Day Sprint** → `/ai-systems-sprint`. Keep those as chrome. Change **which offer the body argues for**, not the layout.

---

## Offer 1 — AI Systems Sprint

**Primary URL:** `/ai-systems-sprint`  
**Supporting URLs:** `/services/ai-workflow-automation`, `/services/ai-automation-systems`, `/services/business-process-automation`, `/compare/ai-systems-sprint-vs-traditional-automation`  
**Package:** one workflow, 14 days, live system, monitoring + handoff.

### Keywords this offer should close

| Keyword | Pri | Land the query on | Body should say |
| --- | --- | --- | --- |
| ai workflow automation company | P0 | `/services/ai-workflow-automation` | Studio ships production workflows; start with the sprint. |
| ai workflow automation agency | P0/P1 | Same URL (no agency slug) | Same; compare vs traditional automation. |
| ai automation consultant | P0 | `/services/ai-automation-systems` | Advise + implement; sprint is the first paid implementation. |
| business process automation with ai | P1 | `/services/business-process-automation` | If AI judgment is required, route to workflow URL + sprint. |
| ai integration services | P1 | `/services/ai-automation-systems` | Wiring AI into CRM/ERP is a workflow, often a sprint — unless it is a named NetSuite storefront program. |

### Fit / not fit

**Fit:** one painful ops path (lead triage, document extract, support routing, a single exception queue). Buyer will give API/CRM access in week one.

**Not fit:**

- Greenfield SaaS with auth/billing → **SaaS MVP**
- Multi-channel Shopify + BigCommerce + 3PL program → **NetSuite integration**
- Stalled repo / failed agency handoff → **Project rescue** (audit first)
- “Put two seniors on Slack indefinitely” → compare page + engagement-models, not the sprint

### Proof you may use

Sprint page itself; AI/ops blogs (cost, identify workflows, operations examples, agent vs chatbot). SalesAngel only as AI-in-product, not as “we automated your warehouse.”

### CTA

Sprint discovery / Book a Call. Do not CTA MVP Build on Cluster C pages except as a “later platform” sentence.

---

## Offer 2 — SaaS MVP (MVP Build)

**Primary URL:** `/services/saas-mvp-development`  
**Supporting URLs:** `/engagement-models` (MVP Build card), `/for/saas-startups`, `/for/startups`, `/blog/building-production-ready-saas-mvp`  
**Sibling (do not cannibalize):** `/services/web-app-saas-development` owns “SaaS development agency” / “product engineering agency.”  
**Package:** 4–8 week v1 — auth, core workflow, Stripe if needed, AWS + CI/CD.

### Keywords this offer should close

| Keyword | Pri | Land the query on | Body should say |
| --- | --- | --- | --- |
| saas mvp development company | P0 | `/services/saas-mvp-development` | Paid studio v1, not a no-code prototype. |
| mvp software development company | P1 | Same URL | One paragraph for portals/internal tools; platform work goes to web-app-saas. |

### Adjacent queries this offer must **not** steal

| Keyword | Winner instead |
| --- | --- |
| saas development agency | `/services/web-app-saas-development` |
| product engineering agency | `/services/web-app-saas-development` + staff-aug compare |
| unfinished software project developer | `/services/project-rescue` |

### Fit / not fit

**Fit:** founder (often non-technical) needs users or investors to log into a real product. Scope can be cut to a 4–8 week v1.

**Not fit:** one ops automation (sprint); salvage an existing repo (rescue); enterprise multi-tenant from day one without a v1 (B2B SaaS page + web-app-saas, still no new slug).

### Proof you may use

**PropertyMatch** (`/case-studies/propertymatchmaker-real-estate-saas`) is the direct named MVP story. Do not retarget that case study as NetSuite or sprint-of-record if the public story is a SaaS MVP.

1Archiver and SalesAngel support the **agency/platform** sibling, not this offer’s H1.

### CTA

Book a call. Mention MVP Build on `/engagement-models`. Sprint is a valid *later* sentence (“automate onboarding after v1”), not the primary CTA on this URL.

---

## Offer 3 — NetSuite integration

**Primary URL:** `/services/netsuite-integration`  
**Supporting URLs:** `/for/netsuite-users` (consultant / ops-leader), `/services/netsuite-erp-automation` (inside-ERP / SuiteScript), ecommerce `/for/` pages, both NetSuite ecommerce blogs  
**Package:** connector/middleware engagement — REST, SuiteScript where needed, validation, retries, ops dashboard. Not a 14-day default.

### Keywords this offer should close

| Keyword | Pri | Land the query on | Body should say |
| --- | --- | --- | --- |
| netsuite integration services | P0 | `/services/netsuite-integration` | This is the money page. |
| netsuite ecommerce integration | P0 | Same | Storefronts + 3PL + inventory. |
| shopify netsuite integration | P0 | Same | First-class H2 + Shopify pitfalls blog. |
| bigcommerce netsuite integration | P0/P1 | Same | First-class H2 + BigCommerce production blog. **No new URL.** |
| netsuite integration developer | P1 | Same | REST / SuiteScript 2.x / RESTlets as how, not a split page. |
| netsuite inventory sync | P1 | Same (section) | Oversell / drift; ERP-automation is sibling for inside-ERP order logic. |
| netsuite integration consultant | P1 | `/for/netsuite-users` | Consultant intent; implementation CTA to the service URL. |

### Sibling split (required)

| Query / job | URL |
| --- | --- |
| Connect Shopify / BigCommerce / 3PL / CRM | `/services/netsuite-integration` |
| SuiteScript, saved-search replacement, finance/ops **inside** NetSuite | `/services/netsuite-erp-automation` |
| “We run NetSuite and need a partner” | `/for/netsuite-users` |
| `netsuite order automation` | `/services/netsuite-erp-automation` (link integration for storefront ingest) |

### Fit / not fit

**Fit:** ecommerce or wholesale already on NetSuite; native connector failed; inventory/order drift; BigCommerce or Shopify is in the stack.

**Not fit:**

- One AI exception workflow with NetSuite as *a* system of record → Sprint may be the wedge; still do not create a sprint-NetSuite doorway.
- Greenfield SaaS → MVP
- Unpublished / hidden work → **never** InvestorsGoneWild

### Proof you may use

Two live production blogs; logos; ERP cofounder. **No public named NetSuite case study in v1.** Optional later: a named `/case-studies/...` ERP/ecommerce story — proof page, not `/services/bigcommerce-netsuite-integration`.

### CTA

Book a call. Sprint **only** if the buyer insists on one workflow (e.g. failed-order retry queue) before a program.

---

## Offer 4 — API integration

**Primary URL:** `/services/api-integration`  
**Supporting URLs:** `/services/crm-integration`, `/services/netsuite-integration` (when NetSuite is named), `/for/ecommerce-operations`, Shopify pitfalls blog (add BigCommerce CMS post in a later link pass)  
**Package:** inbound/outbound APIs, webhooks, middleware, mappings, retries — production software, not Zap scripts.

### Keywords this offer should close

| Keyword | Pri | Land the query on | Body should say |
| --- | --- | --- | --- |
| api integration services | P0/P1 | `/services/api-integration` | REST/GraphQL/SOAP/webhooks + monitoring. |
| api integration developer | P1 | Same URL | Developer phrasing in an H2, not a new slug. |
| ecommerce integration services | P1 | `/for/ecommerce-wholesale` (ops) + this URL as implementer | If they name NetSuite, **hand off** to Offer 3. |
| ai integration services (when the job is APIs, not agents) | P1 | This URL as sibling of AI systems | Do not create `/services/ai-integration`. |

### Fit / not fit

**Fit:** product or ops needs vendor APIs (payments, shipping, CRM, KYC) with failure handling. Ecommerce without a named ERP.

**Not fit:** the search is “Shopify NetSuite” or “BigCommerce NetSuite” — those belong on the NetSuite integration URL even though they are “API work.” Sending them here dilutes Cluster A.

### Proof you may use

No named middleware case study. Use integration-failure blogs. SalesAngel multi-tenant CRM architecture is adjacent (APIs inside a product), not an ecommerce sync story.

### CTA

Book a call. Sprint only when the integration *is* the one AI/ops workflow.

---

## Offer 5 — Project rescue (audit first)

**Primary URL:** `/services/project-rescue`  
**Front door:** `/services/technical-audit`  
**Supporting URLs:** `/engagement-models` (Project Rescue + Technical Audit cards), `/blog/rescue-a-half-built-saas-product`  
**Package:** 1–2 week audit, then scoped stabilize/ship. Not staff-aug.

### Keywords this offer should close

| Keyword | Pri | Land the query on | Body should say |
| --- | --- | --- | --- |
| software project rescue service | P0 | `/services/project-rescue` | Takeover, stabilize, path forward. |
| unfinished software project developer | P1 | Same URL | Half-built repo H2; no new slug. |
| technical codebase audit | P1 | `/services/technical-audit` | Paid independent review; rescue is the follow-on. |

### Keywords this offer must refuse to productize

| Keyword | Pri | Winner | Why |
| --- | --- | --- | --- |
| embedded software engineers | P2 | `/engagement-models` + staff-aug compare | Outcome-owned pods, not leased seats. |
| software engineering augmentation | P2 | `/compare/aizaz-vs-staff-augmentation` | Brand: Aizaz sells outcomes. No `/services/staff-augmentation`. |

### Fit / not fit

**Fit:** agency/freelancer left; deploys fail; founder cannot trust the repo; need a go/no-go on rewrite.

**Not fit:** blank-slate MVP (Offer 2); “just add capacity” (compare + fit-check call).

### Proof you may use

CodeChecker (`/case-studies/modernizing-multi-language-code-checking-tool`) as **closest public existing-codebase** story. Label it honestly: extend/modernize, not “we rescued a failed SaaS.” Rescue blog for narrative. Do not invent a failed-agency client. Do not use IGW.

### CTA

Book a call **and** technical audit first. Then Project Rescue on engagement-models. Do not lead with the 14-day sprint on these two URLs (chrome can still show it; body should not argue sprint-as-rescue).

---

## Query → offer → URL cheat sheet

| Cluster | If the buyer says… | Offer | Winner URL | Primary CTA |
| --- | --- | --- | --- | --- |
| C | “AI workflow / automation company / consultant” | Sprint | Workflow or AI systems page → sprint | Sprint |
| D | “SaaS MVP company” | MVP Build | `/services/saas-mvp-development` | Book a call |
| D | “SaaS / product engineering agency” | Project / retainer (not MVP-only) | `/services/web-app-saas-development` | Book a call |
| A | “NetSuite integration / Shopify / BigCommerce” | NetSuite integration | `/services/netsuite-integration` | Book a call |
| B | “Order automation / SuiteScript inside NetSuite” | NetSuite ERP automation | `/services/netsuite-erp-automation` | Book a call |
| E | “API integration” | API integration | `/services/api-integration` | Book a call |
| E | “Ecommerce integration” (no NetSuite named) | API + ecommerce `/for/` | `/for/ecommerce-wholesale` | Book a call |
| F | “Rescue / unfinished project” | Project rescue | `/services/project-rescue` | Audit first |
| F | “Codebase audit” | Technical audit | `/services/technical-audit` | Book a call |
| F | “Embedded / augmentation” | None of the five as a product | Compare + `/engagement-models` | Fit-check call |

---

## Conversion paths (still existing URLs)

Keep one hop. Do not add funnel landings.

```
AI / ops query  →  /services/ai-workflow-automation or /services/ai-automation-systems
                →  /ai-systems-sprint
                →  /book-a-call

SaaS MVP query  →  /services/saas-mvp-development
                →  /engagement-models (MVP Build)
                →  /book-a-call
                →  PropertyMatch case study (proof, not a doorway)

NetSuite query  →  /services/netsuite-integration
                →  /for/netsuite-users (consultant) or /services/netsuite-erp-automation (inside ERP)
                →  Shopify + BigCommerce blogs
                →  /book-a-call
                →  [optional later] named NetSuite case study

API query       →  /services/api-integration
                →  NetSuite URL only if they named NetSuite
                →  /book-a-call

Rescue query    →  /services/technical-audit
                →  /services/project-rescue
                →  /engagement-models
                →  /book-a-call
```

Blogs and `/for/` pages never become a sixth offer. Compare pages never become service homepages.

---

## v1 constraints (repeat so this file cannot be used to spawn pages)

- No new service URLs for keyword variants.
- Optional later proof URL: **named** NetSuite/ecommerce case study only.
- InvestorsGoneWild remains unpublished and unlinked.
- Homepage / ClonePage / CSS / visual components are out of scope.
- Implementation is a later copy/`seoExtras` pass on the URLs above, not this document.
