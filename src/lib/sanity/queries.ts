import groq from 'groq';
import { authorProjection } from './author';
import { seoProjection } from './seo';

/**
 * Published posts = non-draft documents that are not scheduled for the future.
 * `publishedAt` is optional: if missing, a published (non-draft) document still appears.
 */
const publishedPostFilter = `_type == "post" && !(_id in path("drafts.**")) && (!defined(publishedAt) || publishedAt <= now())`;

export const publishedPostsQuery = groq`
  *[${publishedPostFilter}] | order(coalesce(publishedAt, _updatedAt) desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    body,
    bodyBlocks,
    category,
    tags,
    faqs[]{ question, answer, enabled },
    ${authorProjection},
    publishedAt,
    _createdAt,
    ${seoProjection},
    seoTitle,
    metaDescription,
    canonicalPath,
    focusKeyword,
    coverImage,
    ogImage,
    _updatedAt
  }
`;

export const postBySlugQuery = groq`
  *[${publishedPostFilter} && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    body,
    bodyBlocks,
    category,
    tags,
    faqs[]{ question, answer, enabled },
    ${authorProjection},
    publishedAt,
    _createdAt,
    ${seoProjection},
    seoTitle,
    metaDescription,
    canonicalPath,
    focusKeyword,
    coverImage,
    ogImage,
    _updatedAt
  }
`;

export const caseStudiesQuery = groq`
  *[_type == "caseStudy" && !(_id in path("drafts.**"))] | order(_updatedAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    subtitle,
    description,
    client,
    location,
    industry,
    challenge,
    solution,
    outcome,
    projectValue,
    projectPeriod,
    deliveryDuration,
    deliveredBy,
    engagementNote,
    portfolioNote,
    atAGlance[]{ value, label, sublabel },
    engagement[]{ label, value },
    stats[]{ label, value },
    testimonial{
      quote,
      author,
      role,
      company,
      rating,
      source,
      engagementMeta
    },
    detailedContent[]{
      title,
      content,
      items[]{
        title,
        description,
        points,
        image,
        table[]{ label, value },
        tableCaption,
        tableHeaderLeft,
        tableHeaderRight
      }
    },
    gallery,
    backgroundImages,
    cta{
      headline,
      body,
      buttonText,
      buttonHref,
      secondaryButtonText,
      secondaryButtonHref
    },
    ${authorProjection},
    ${seoProjection},
    seoTitle,
    seoDescription,
    focusKeyword,
    coverImage
  }
`;

export const landingPagesQuery = groq`
  *[_type == "landingPage" && !(_id in path("drafts.**")) && defined(slug.current)] | order(title asc) {
    _id,
    category,
    title,
    "slug": slug.current,
    audienceLabel,
    heroSubtitle,
    keywords,
    problem,
    solution,
    capabilities,
    useCases,
    faqs[]{ question, answer, enabled },
    relatedSlugs,
    primaryCta{ label, href },
    secondaryCta{ label, href },
    ctaTitle,
    ctaLede,
    benefits[]{ title, description },
    seoSections[]{ heading, paragraphs, bullets },
    processSteps[]{ step, title, subtitle, description },
    proof{ eyebrow, heading, body, links[]{ label, href } },
    ${seoProjection}
  }
`;

export const technologyPagesQuery = groq`
  *[_type == "technologyPage" && !(_id in path("drafts.**")) && defined(slug.current)] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    heroSubtitle,
    outcomes,
    useCases,
    stackNotes,
    relatedServices[]{ label, href },
    faqs[]{ question, answer, enabled },
    ${seoProjection}
  }
`;

export const comparePagesQuery = groq`
  *[_type == "comparePage" && !(_id in path("drafts.**")) && defined(slug.current)] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    heroSubtitle,
    intro,
    comparisonRows[]{ label, optionA, optionB },
    sections[]{ heading, paragraphs },
    faqs[]{ question, answer, enabled },
    ctaText,
    relatedLinks[]{ label, href },
    ${seoProjection}
  }
`;

export const sitePagesQuery = groq`
  *[_type == "sitePage" && !(_id in path("drafts.**")) && defined(pageKey)] {
    _id,
    pageKey,
    title,
    heroEyebrow,
    heroHighlight,
    heroSubtitle,
    intro,
    faqs[]{ question, answer, enabled },
    relatedLinks[]{ label, href },
    cards[]{ eyebrow, heading, body },
    models[]{ id, name, summary, duration, bestFor, deliverables, startingFrom },
    comparisonHeaders,
    comparisonRows[]{ feature, sprint, project, dedicated, retainer },
    included,
    notIncluded,
    selectorGuide[]{ heading, body },
    listSections[]{ key, heading, items },
    projects[]{ slug, name, category, summary, outcomes, stack, href },
    quotes[]{ quote, author, role, company },
    contentSections[]{ heading, paragraphs, bullets },
    processSteps[]{ step, title, subtitle, description },
    values[]{ heading, body },
    jobs[]{ title, department, location, type, description },
    sectionEyebrow,
    sectionTitle,
    sectionLede,
    ctaTitle,
    ctaLede,
    ${seoProjection}
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    navLinks[]{ label, href },
    navCtaLabel,
    navCtaHref,
    studioHeading,
    studioBlurb,
    email,
    phone,
    phoneHref,
    footerColumns[]{ heading, links[]{ label, href } }
  }
`;

export const personsQuery = groq`
  *[_type == "person" && !(_id in path("drafts.**"))]{
    _id,
    name,
    "slug": slug.current,
    role,
    bio,
    focus,
    linkedin,
    githubUrl,
    photo
  }
`;

