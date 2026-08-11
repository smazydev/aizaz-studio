import groq from 'groq';

export const publishedPostsQuery = groq`
  *[_type == "post" && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    body,
    category,
    tags,
    author,
    publishedAt,
    seoTitle,
    metaDescription,
    canonicalPath,
    focusKeyword,
    coverImage,
    ogImage
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug && defined(publishedAt) && publishedAt <= now()][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    body,
    category,
    tags,
    author,
    publishedAt,
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
  *[_type == "caseStudy"] | order(_updatedAt desc) {
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
    seoTitle,
    seoDescription,
    focusKeyword,
    coverImage
  }
`;
