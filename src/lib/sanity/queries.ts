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
    category,
    tags,
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
    category,
    tags,
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
