# BOFU keyword map v1

Research branch: `seo/bofu-v1`  
Site snapshot: live redesign at `d8c0097` (`origin/main`)  
Date: 2026-08-31  
Scope: buyer-ready commercial queries only. No informational blog program. No doorway pages. No production rewrites in this pass.

**Do not create doorway pages.** Next step is content on existing URLs: titles, H1s, proof blocks, internal links, and `seoExtras` on pages that currently fall back to generic copy.

---

## How to use this map

1. **Start with P0 rows.** Those are ready-to-buy queries where Aizaz already has a URL, a buyer, and enough proof to strengthen the page without inventing a new landing.
2. **Rewrite before you add URLs.** If two live pages already target the same job (especially the two NetSuite service URLs), differentiate them. Do not spawn a third near-identical landing.
3. **One commercial URL per intent.** Supporting blogs and `/for/` industry pages are satellites, not extra service homepages.
4. **Score is not keyword volume.** P0 = high commercial intent + Aizaz can prove it. P1 = commercial, but proof or on-page content is thin. P2 = later, brand-conflicted, or too close to an existing P0 URL.
5. **Hidden work stays hidden.** `investorsgonewild-investment-platform` is excluded from the public site, sitemap, and internal links. Do not recommend it as proof.
6. **This document is research only.** It does not authorize page rewrites, new routes, or visual/shared UI changes.

### Scoring

| Score | Meaning |
| --- | --- |
| **P0** | Buyer is ready to hire. Existing URL can win the query with a rewrite plus proof already on the site (named case study, live production blog, cofounder/capability, or flagship offer). |
| **P1** | Commercial query, but the live page is generic, overlaps a sibling URL, or lacks a named proof artifact. Strengthen content and proof before expecting rankings. |
| **P2** | Later: adjacent intent, brand conflict (for example staff-augmentation leasing), or a query that should stay a section on an existing page. |

### Keep / Rewrite / New

| Action | Meaning |
| --- | --- |
| **Keep** | URL and positioning are right. Do not fork it. Light on-page polish is fine later. |
| **Rewrite** | Keep the URL. Change H1/title, body, proof, FAQs, and internal links so the page owns one intent. |
| **New** | Only if no honest existing URL can own the query. This map recommends **zero** new commercial landings in v1. |

Default CTA across service landings today: **Book a Call** → `/book-a-call`, **14 Day Sprint** → `/ai-systems-sprint`. Prefer those unless the query is clearly rescue/audit (then also `/engagement-models`).

---

## Live URL inventory (verified)

Inspected in the merged repo and spot-checked on https://aizaz.studio.

### Flagship / hub

| URL | Live H1 / title |
| --- | --- |
| `/` | H1: Senior systems team on demand |
| `/services` | Services hub (AI, product, ERP, cloud groups) |
| `/ai-systems-sprint` | AI Systems Sprint — One workflow. 14 days. Live system. |
| `/engagement-models` | Flexible Engineering Engagements for AI, SaaS & Automation Projects |
| `/book-a-call` | Book a Technical Discovery Call |

### Core service routes (known live, verified in `seoPages.ts` + extras)

| URL | Live H1 |
| --- | --- |
| `/services/ai-automation-systems` | AI Automation Systems |
| `/services/web-app-saas-development` | Web App & SaaS Development |
| `/services/api-integration` | API Integration |
| `/services/netsuite-erp-automation` | NetSuite & ERP Automation |
| `/services/aws-devops` | AWS & DevOps |
| `/services/netsuite-integration` | NetSuite Integration |
| `/services/ai-workflow-automation` | AI Workflow Automation |
| `/services/saas-mvp-development` | SaaS MVP Development |
| `/services/b2b-saas-development` | B2B SaaS Development |
| `/services/project-rescue` | Rescue a Stalled, Broken, or Overcomplicated Software Project |
| `/services/technical-audit` | Technical Audit |
| `/services/business-process-automation` | Business Process Automation |
| `/services/crm-integration` | CRM Integration |

### Buyer / industry routes that matter for BOFU

| URL | Live H1 |
| --- | --- |
| `/for/netsuite-users` | Custom Integrations for NetSuite Users |
| `/for/ecommerce-wholesale` | Automation for E commerce & Wholesale Businesses |
| `/for/ecommerce-operations` | Systems for Ecommerce Operations |
| `/for/operations-teams` | Software Systems for Operations Teams |
| `/for/saas-startups` | AI, Cloud & Automation for SaaS Startups |
| `/for/startups` | Product Engineering for Startups |
| `/for/b2b-saas` | Engineering for B2B SaaS Companies |
| `/for/agencies` | Senior Backend & Cloud Support for Agencies |

### Compare (decision-stage, not extra service homepages)

| URL | Live H1 |
| --- | --- |
| `/compare/aizaz-vs-staff-augmentation` | Product Engineering Agency vs Staff Augmentation |
| `/compare/agency-vs-freelancer` | Product Engineering Agency vs Freelancer |
| `/compare/ai-systems-sprint-vs-traditional-automation` | AI Systems Sprint vs Traditional Automation |

### Public case studies (safe to recommend)

- `/case-studies/propertymatchmaker-real-estate-saas` — PropertyMatch — Real Estate SaaS MVP
- `/case-studies/designing-multi-tenant-crm-architecture` — SalesAngel — AI Sales Platform
- `/case-studies/1archiver-compliance-platform` — 1Archiver — Compliance Email Archiving
- `/case-studies/modernizing-multi-language-code-checking-tool` — Modernizing a Multi-Language Code Checking Tool

**Do not link:** `/case-studies/investorsgonewild-investment-platform` (hidden from public site, sitemap, and `internalLinks.ts`).

### Supporting blogs (static + verified CMS)

Static in `src/data/blogs.ts`:

- `/blog/netsuite-shopify-integration-pitfalls`
- `/blog/ai-automation-workflows-for-operations-teams`
- `/blog/identify-workflows-worth-automating-with-ai`
- `/blog/how-much-does-ai-automation-cost`
- `/blog/building-production-ready-saas-mvp`
- `/blog/rescue-a-half-built-saas-product`
- `/blog/ai-agent-vs-chatbot-for-business`

Verified live in CMS (not in `blogs.ts`, but 200 on production):

- `/blog/bigcommerce-netsuite-integration-production-problems`
- `/blog/automate-manual-business-workflow-with-ai`

Linked in `internalLinks.ts` (treat as supporting only if still published): `/blog/has-ai-made-software-development-cheaper`.

---

## Cluster tables

Full row-level fields also live in `docs/seo/bofu-keyword-map-v1.csv`.

### NetSuite / ERP

Live overlap to resolve in content, **not** with new URLs:

- `/services/netsuite-integration` should own **connector / storefront / 3PL / inventory-order sync** (Shopify + BigCommerce + custom).
- `/services/netsuite-erp-automation` should own **SuiteScript, ERP workflows, finance/ops automation inside NetSuite**.
- `/for/netsuite-users` should own **ops-leader / “we already run NetSuite”** consultant intent.

BigCommerce is already a homepage technology logo and a live production blog. It is **not** a missing service route.

| Keyword | Intent | Likely buyer | Existing URL | Current H1 / title | Action | Supporting proof | Case study | Supporting blog | CTA | Pri |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| netsuite integration consultant | Hire a specialist who can scope and own NetSuite middleware | Ops / finance lead, ecommerce operator already on NetSuite | `/for/netsuite-users` | Custom Integrations for NetSuite Users | Rewrite | ERP cofounder (Nasir), SuiteScript/REST claims, two ecommerce blogs | **Gap** — no public NetSuite CS | Shopify pitfalls + BigCommerce production problems | Book a call | P1 |
| netsuite integration services | Buy a NetSuite integration engagement | Ops / ecommerce / wholesale | `/services/netsuite-integration` | NetSuite Integration | Rewrite | Live page + related blog cluster; homepage ERP card currently points at the sibling URL | **Gap** | Shopify pitfalls + BigCommerce production problems | Book a call; Sprint only if one workflow | P0 |
| netsuite ecommerce integration | Connect storefront(s) to NetSuite | Ecommerce ops, wholesale | `/services/netsuite-integration` | NetSuite Integration | Rewrite | Shopify FAQ already on page; BigCommerce missing from H1/capabilities | **Gap** | Both ecommerce blogs | Book a call | P0 |
| bigcommerce netsuite integration | Fix or build BC ↔ NetSuite sync | BigCommerce + NetSuite operator | `/services/netsuite-integration` | NetSuite Integration | Rewrite | Strong live blog; homepage lists BigCommerce; service H1/body is Shopify-first | **Gap** | `/blog/bigcommerce-netsuite-integration-production-problems` | Book a call | P0 |
| shopify netsuite integration | Fix or build Shopify ↔ NetSuite sync | Shopify + NetSuite operator | `/services/netsuite-integration` | NetSuite Integration | Rewrite | FAQs and use cases already Shopify-centric; extras on sibling page call out Shopify ↔ NetSuite | **Gap** | `/blog/netsuite-shopify-integration-pitfalls` | Book a call | P0 |
| netsuite integration developer | Hire engineers (SuiteScript, REST, middleware) | Technical buyer, agency, existing NetSuite partner | `/services/netsuite-integration` | NetSuite Integration | Keep | Capabilities already list REST + SuiteScript 2.x | **Gap** | Shopify + BigCommerce blogs | Book a call | P1 |
| netsuite inventory sync | Stop oversell / inventory drift | Ecommerce ops | `/services/netsuite-integration` | NetSuite Integration | Rewrite | Use case exists (“prevent oversell”); not an H1-level section | **Gap** | Both ecommerce blogs (inventory sections) | Book a call | P1 |
| netsuite order automation | Orders → NetSuite → fulfillment without CSV | Ecommerce / wholesale ops | `/services/netsuite-erp-automation` | NetSuite & ERP Automation | Rewrite | Order → 3PL use cases on both NetSuite URLs; needs clearer split from the integration page | **Gap** | Shopify + BigCommerce blogs | Book a call | P1 |

Do **not** add `/services/bigcommerce-netsuite-integration` or `/services/shopify-netsuite-integration`. Those would be doorway duplicates of `/services/netsuite-integration`.

### AI / automation

Live overlap to resolve in content:

- `/services/ai-automation-systems` = umbrella AI systems (agents, chat, docs, CRM).
- `/services/ai-workflow-automation` = multi-step ops workflows with AI decision nodes.
- `/services/business-process-automation` = orchestration when AI is optional.
- `/ai-systems-sprint` = 14-day conversion offer, not a second agency homepage.

Extra service URLs (`ai-workflow-automation` and most of `servicePagesExtra.ts`) currently **lack `seoExtras`**, so live body falls back to generic capability cards. That is a rewrite, not a new page.

| Keyword | Intent | Likely buyer | Existing URL | Current H1 / title | Action | Supporting proof | Case study | Supporting blog | CTA | Pri |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ai workflow automation company | Hire a studio to ship production AI workflows | Ops lead, founder | `/services/ai-workflow-automation` | AI Workflow Automation | Rewrite | Sprint offer + several AI blogs; on-page extras are generic | SalesAngel (adjacent: AI in product, not ops workflow) | Automate manual workflow; identify workflows; cost | Sprint + book a call | P0 |
| ai workflow automation agency | Same as above, agency-style search | Ops lead, founder | `/services/ai-workflow-automation` | AI Workflow Automation | Rewrite | Same page; H1 is service not “agency” | SalesAngel (adjacent) | Same cluster | Sprint + book a call | P1 |
| ai automation consultant | Advise + implement, not a tool license | Ops / founder | `/services/ai-automation-systems` | AI Automation Systems | Keep | Flagship service; homepage card; `seoExtras` already written | SalesAngel | Cost, identify workflows, operations examples | Sprint | P0 |
| business process automation with ai | Automate messy multi-tool ops, AI where useful | Ops team | `/services/business-process-automation` | Business Process Automation | Rewrite | Strong extras; should point harder at AI workflow + sprint | **Gap** for named ops CS | Automate manual workflow; operations examples | Sprint | P1 |
| ai integration services | Wire AI into CRM/ERP/APIs | Ops / product | `/services/ai-automation-systems` | AI Automation Systems | Rewrite | Extras already mention HubSpot, Salesforce, NetSuite | SalesAngel | Automate manual workflow | Sprint | P1 |

### Product / SaaS

Live overlap to resolve in content:

- `/services/saas-mvp-development` = v1 / founder MVP.
- `/services/web-app-saas-development` = production web app / SaaS platform.
- `/services/b2b-saas-development` = multi-tenant / enterprise-ready SaaS.
- `/for/saas-startups` and `/for/startups` are audience pages, not extra product homepages.

| Keyword | Intent | Likely buyer | Existing URL | Current H1 / title | Action | Supporting proof | Case study | Supporting blog | CTA | Pri |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| saas mvp development company | Pay to ship an investor/user-ready MVP | Non-technical or lightly technical founder | `/services/saas-mvp-development` | SaaS MVP Development | Rewrite | PropertyMatch is direct proof (14-day SaaS MVP, named testimonial) | PropertyMatch | Building a production-ready SaaS MVP | Book a call; engagement MVP build | P0 |
| saas development agency | Hire a product studio for SaaS | Founder / product lead | `/services/web-app-saas-development` | Web App & SaaS Development | Rewrite | 1Archiver + PropertyMatch + SalesAngel; extras already written | PropertyMatch, SalesAngel, 1Archiver | Production-ready SaaS MVP | Book a call | P0 |
| mvp software development company | Same as SaaS MVP, slightly broader | Founder | `/services/saas-mvp-development` | SaaS MVP Development | Keep | Same proof as SaaS MVP | PropertyMatch | Production-ready SaaS MVP; rescue half-built SaaS | Book a call | P1 |
| product engineering agency | Outcome-owned product team vs contractors | Founder, agency, B2B product | `/services/web-app-saas-development` | Web App & SaaS Development | Keep | Compare pages already argue agency vs staff-aug / freelancer | PropertyMatch, SalesAngel | Production-ready SaaS MVP | Book a call | P1 |

### Rescue / augmentation

Brand constraint: Aizaz **sells outcomes**, not leased seats. `/compare/aizaz-vs-staff-augmentation` explicitly says the studio is not staff augmentation. Capture those queries on compare + engagement-models. Do **not** create `/services/staff-augmentation` or `/services/embedded-engineers`.

| Keyword | Intent | Likely buyer | Existing URL | Current H1 / title | Action | Supporting proof | Case study | Supporting blog | CTA | Pri |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| software project rescue service | Take over a stalled/broken build | Founder, ops lead after a bad agency | `/services/project-rescue` | Rescue a Stalled, Broken, or Overcomplicated Software Project | Rewrite | Strong H1/FAQ; missing `seoExtras`; CodeChecker is extend-existing, not a dramatic rescue story | CodeChecker (closest public; not a failed-SaaS rescue) | `/blog/rescue-a-half-built-saas-product` | Book a call; audit first | P0 |
| unfinished software project developer | Finish someone else’s codebase | Founder | `/services/project-rescue` | Rescue a Stalled… | Keep | Same URL; blog is a close match | CodeChecker | Rescue a half-built SaaS | Book a call | P1 |
| embedded software engineers | Add senior people inside the team | Founder / CTO with a roadmap | `/engagement-models` | Flexible Engineering Engagements… | Rewrite | Table already has “Dedicated pod / Embedded senior engineer(s)”; models list does not name that offer as clearly as Sprint/MVP | 1Archiver review (“felt like our own team”) | — | Book a call | P2 |
| software engineering augmentation | Buy capacity / extra engineers | CTO / founder | `/compare/aizaz-vs-staff-augmentation` | Product Engineering Agency vs Staff Augmentation | Keep | Page already ranks the decision; do not productize augmentation | — | — | Book a call; engagement-models | P2 |
| technical codebase audit | Paid independent review before rebuild/hire | Founder, acquirer, ops lead | `/services/technical-audit` | Technical Audit | Rewrite | Engagement model + service URL exist; no `seoExtras`; CodeChecker is the public “existing codebase” story | CodeChecker | Rescue blog; Vercel→AWS | Book a call | P1 |

### Integrations

| Keyword | Intent | Likely buyer | Existing URL | Current H1 / title | Action | Supporting proof | Case study | Supporting blog | CTA | Pri |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| api integration services | Connect product to third-party APIs | Product / ops / ecommerce | `/services/api-integration` | API Integration | Rewrite | Homepage “Systems Integration” card already points here; no named CS | **Gap** (SalesAngel CRM architecture is adjacent) | Shopify pitfalls (integration failures) | Book a call | P0 |
| api integration developer | Hire engineers for APIs/webhooks | Technical buyer | `/services/api-integration` | API Integration | Keep | Capabilities already REST/GraphQL/webhooks | **Gap** | Shopify pitfalls | Book a call | P1 |
| ecommerce integration services | Storefront ↔ ERP/3PL/CRM | Ecommerce ops | `/for/ecommerce-wholesale` | Automation for E commerce & Wholesale Businesses | Rewrite | Satellite to NetSuite + API pages; `/for/ecommerce-operations` is a sibling — do not add a third | **Gap** | Shopify + BigCommerce blogs | Book a call | P1 |

---

## Top 10 BOFU opportunities

Ranked by commercial intent × existing URL × proof on the current site.

1. **NetSuite integration services** → rewrite `/services/netsuite-integration` (P0). Primary money page. Split from `/services/netsuite-erp-automation`.
2. **BigCommerce ↔ NetSuite** → same URL, add BC as a first-class storefront (P0). Proof: live production blog. Do not create a new landing.
3. **Shopify ↔ NetSuite** → same URL (P0). Proof: live pitfalls blog + FAQs already on page.
4. **SaaS MVP development company** → rewrite `/services/saas-mvp-development` (P0). Proof: PropertyMatch.
5. **AI workflow automation company** → rewrite `/services/ai-workflow-automation` (P0). Add real `seoExtras`; CTA the sprint.
6. **AI automation consultant / systems** → keep `/services/ai-automation-systems` + `/ai-systems-sprint` (P0). Flagship cluster.
7. **SaaS / product engineering agency** → rewrite `/services/web-app-saas-development` so it is not a clone of the MVP page (P0).
8. **API / ecommerce integration services** → rewrite `/services/api-integration` and link NetSuite + ecommerce `/for/` pages (P0/P1).
9. **Software project rescue** → rewrite `/services/project-rescue` with CodeChecker + rescue blog as proof (P0).
10. **Technical audit** → rewrite `/services/technical-audit` as the paid entry to rescue/rebuild (P1).

---

## Existing pages to strengthen (priority order)

Do this instead of adding routes.

| Priority | URL | What to change in a later content pass |
| --- | --- | --- |
| 1 | `/services/netsuite-integration` | Own Shopify **and** BigCommerce, inventory sync, order automation. Add `seoExtras`. Link both ecommerce blogs. State clearly this is connector/middleware work. |
| 2 | `/services/netsuite-erp-automation` | Differentiate: SuiteScript, internal ERP workflows, reporting. Related services today are BPA + AWS only — must also link `netsuite-integration` and `api-integration`. |
| 3 | `/for/netsuite-users` | Consultant / ops-leader intent. Point to the integration URL for implementation. |
| 4 | `/services/ai-workflow-automation` | Add `seoExtras` (currently generic live body). Tie FAQs to sprint. Link SalesAngel only as AI-in-product proof, honestly. |
| 5 | `/services/ai-automation-systems` | Keep as umbrella. Make related links include workflow automation + sprint (sprint is already in cluster extras). |
| 6 | `/ai-systems-sprint` | Conversion page for AI/automation BOFU. Keep. |
| 7 | `/services/saas-mvp-development` | Add `seoExtras`. Lead with PropertyMatch. Differentiate from web-app-saas. |
| 8 | `/services/web-app-saas-development` | Platform / ongoing product engineering, not v1 MVP. Related slugs today skip the MVP URL. |
| 9 | `/services/api-integration` | Ecommerce + ERP examples. Link NetSuite pages and both integration blogs. |
| 10 | `/services/project-rescue` + `/services/technical-audit` | Add `seoExtras`. Link CodeChecker + rescue blog. CTA: audit then rescue. |
| 11 | `/engagement-models` | Make “embedded senior engineers / dedicated pod” explicit without selling staff-aug hours. |
| 12 | `/for/ecommerce-wholesale` and `/for/ecommerce-operations` | Satellites for ecommerce integration queries. `ecommerce-operations` related slugs currently miss NetSuite. |

`seoExtras` today only cover the original service/industry set (`ai-automation-systems`, `web-app-saas-development`, `aws-devops`, `netsuite-erp-automation`, `business-process-automation`, plus several `/for/` pages). **Most extra service URLs that buyers actually search** (`netsuite-integration`, `ai-workflow-automation`, `saas-mvp-development`, `api-integration`, `project-rescue`, `technical-audit`) render generic rich content. That is the highest-leverage content gap on existing URLs.

---

## New pages (few — none in v1)

**Create zero new commercial landings in this cycle.**

Rejected on purpose (doorway / cannibalization / brand conflict):

- `/services/bigcommerce-netsuite-integration`
- `/services/shopify-netsuite-integration`
- `/services/netsuite-inventory-sync`
- `/services/netsuite-order-automation`
- `/services/ai-workflow-automation-agency` (title variant of an existing slug)
- `/services/saas-mvp-development-company`
- `/services/staff-augmentation`
- `/services/embedded-software-engineers`
- `/services/ecommerce-integration`

Optional **later** (P2, only after the rewrites above still leave a hole): none identified. If BigCommerce demand is huge, it still belongs as a section + FAQ on `/services/netsuite-integration`, plus the existing blog.

---

## Case-study / proof gaps

| Cluster | What exists | What is missing |
| --- | --- | --- |
| NetSuite / ecommerce integrations | Two production blogs; homepage BigCommerce + Shopify + NetSuite logos; ERP cofounder; capability copy | **No public named NetSuite, Shopify, or BigCommerce case study.** This is the largest BOFU proof hole. |
| AI / ops automation | SalesAngel (AI sales platform / CRM architecture); sprint offer; several AI blogs | No named “we automated this ops workflow in production” case study. |
| SaaS MVP / product | PropertyMatch (strong), 1Archiver, SalesAngel | Enough to sell MVP/product. Do not over-claim NetSuite from these. |
| Rescue / audit | CodeChecker (extend existing tool, CI/CD, cleanup); rescue blog | No named “stalled SaaS / failed agency handoff” case study. |
| API integrations | Generic use cases | No named middleware/sync case study. |
| Hidden | InvestorsGoneWild | Must stay unpublished. Do not use as NetSuite/fintech proof. |

Until a NetSuite case study can be published, NetSuite pages should use: the two blogs, workflow diagrams, failure-mode FAQs, and cofounder/ERP positioning — not invented client names.

---

## Internal-link gaps

Observed in `internalLinks.ts`, `relatedSlugs`, and the live homepage (read-only).

1. **Homepage ERP card** (`ClonePage` services list) links `/services/netsuite-erp-automation` and **not** `/services/netsuite-integration`. Integration BOFU therefore depends on the weaker sibling + organic. Do not edit homepage in this branch; flag for a later content/IA pass.
2. **`netsuite-erp-automation.relatedSlugs`** = `business-process-automation`, `aws-devops`. Missing: `netsuite-integration`, `api-integration`.
3. **NetSuite cluster extras have no case studies** (correct today — none are safe). When a public ERP study exists, add it here only.
4. **`ai-workflow-automation` has no case study link.** SalesAngel is the only honest adjacent option; label it as AI-in-product, not ERP ops.
5. **`project-rescue` / `technical-audit` do not link CodeChecker** in cluster extras.
6. **`api-integration` does not link NetSuite integration as a related service in extras** (the page `relatedSlugs` do include it — keep that; extras only have industries + Shopify blog).
7. **`/for/ecommerce-operations.relatedSlugs`** = BPA + web-app-saas. Missing NetSuite + API.
8. **Staff-aug compare page** does not link `/engagement-models`.
9. **Extra service pages missing `seoExtras`** means they also miss the unique H2s that should internally link to sprint, NetSuite, and MVP.
10. **CMS blogs** for BigCommerce and “automate manual workflow” are live and already wired in `internalLinks.ts`. Keep those links. Do not duplicate them as new static posts.

---

## Cannibalization rules (so this map is not used to spawn pages)

| Intent | Winner URL | Must not compete |
| --- | --- | --- |
| NetSuite connectors (Shopify, BigCommerce, 3PL) | `/services/netsuite-integration` | New storefront-pair landings; keep ERP-automation distinct |
| NetSuite SuiteScript / ERP workflows | `/services/netsuite-erp-automation` | Copy-paste of the integration page |
| NetSuite ops buyer | `/for/netsuite-users` | Another “NetSuite consultant” service slug |
| AI workflows | `/services/ai-workflow-automation` | Separate “agency” / “company” URLs |
| AI systems umbrella + consultant | `/services/ai-automation-systems` | — |
| 14-day offer | `/ai-systems-sprint` | A second sprint landing |
| SaaS MVP | `/services/saas-mvp-development` | Extra “MVP company” slug |
| Product / SaaS agency | `/services/web-app-saas-development` | Extra “product engineering agency” slug |
| Rescue | `/services/project-rescue` | Extra “unfinished project” slug |
| Audit | `/services/technical-audit` | Extra “codebase audit” slug |
| Augmentation / embedded | `/compare/aizaz-vs-staff-augmentation` + `/engagement-models` | Any service URL that sells rented developers |

---

## Explicit next step

**Do not create doorway pages.**

Next implementation step (separate pass, not this branch’s visual/shared UI work):

1. Write `seoExtras` + proof/internal links on the existing P0 URLs above.
2. Differentiate the two NetSuite service pages.
3. Publish a real NetSuite/ecommerce case study when one can be named.
4. Leave homepage/visual components to the polish track.

This research pass stops here.
