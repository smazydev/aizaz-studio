import type { ImageMetadata } from 'astro';
import type { ContentAuthor } from '../lib/sanity/author';
import aliImage from '../assets/team/ali.webp';
import nasirImage from '../assets/team/nasir.webp';
import ayazImage from '../assets/team/ayaz.webp';

export type LeadershipId = 'ali' | 'nasir' | 'ayaz';

/**
 * Team card data. `image` is the local fallback; `imageUrl` is a Sanity CDN URL
 * (hotspot → objectPosition). TeamPortrait prefers imageUrl when present so a
 * new portrait does not require component changes.
 */
export type LeadershipProfile = {
  id: string;
  authorId: string;
  name: string;
  shortName: string;
  role: string;
  bio: string;
  focus: string[];
  linkedin: string;
  githubUrl?: string;
  image?: ImageMetadata;
  imageUrl?: string;
  imageAlt: string;
  objectPosition: string;
  order?: number;
  featuredOnHomepage?: boolean;
  showOnTeam?: boolean;
};

/**
 * Homepage and About team config (static fallback).
 * CMS overlays live in `src/lib/sanity/team.ts` and keep this shape.
 */
export const leadershipProfiles: LeadershipProfile[] = [
  {
    id: 'ali',
    authorId: 'person.ali-zafar',
    name: 'Syed Ali Zafar',
    shortName: 'Ali',
    role: 'Founder & Principal Engineer',
    bio: 'Technical founder focused on SaaS architecture, AI systems, backend engineering, and cloud infrastructure.',
    focus: ['Product Engineering', 'SaaS', 'AI Systems', 'Cloud / Backend'],
    linkedin: 'https://www.linkedin.com/in/syedalizfr/',
    githubUrl: 'https://github.com/smazydev',
    image: aliImage,
    imageAlt: 'Syed Ali Zafar, Founder and Principal Engineer at Aizaz Studio',
    objectPosition: '50% 28%',
    order: 0,
    showOnTeam: true,
    featuredOnHomepage: true,
  },
  {
    id: 'nasir',
    authorId: 'person.nasir',
    name: 'Nasir Mahmood',
    shortName: 'Nasir',
    role: 'Co-Founder, ERP & Integrations',
    bio: 'Co-founder focused on ERP, NetSuite, and commerce integration work across business systems.',
    focus: ['NetSuite', 'ERP', 'Commerce Integrations', 'Business Systems'],
    linkedin: 'https://www.linkedin.com/in/muh-nasir-mahmood/',
    githubUrl: 'https://github.com/muh-nasiruit',
    image: nasirImage,
    imageAlt: 'Nasir Mahmood, Co-Founder for ERP and integrations at Aizaz Studio',
    objectPosition: '50% 30%',
    order: 1,
    showOnTeam: true,
    featuredOnHomepage: true,
  },
  {
    id: 'ayaz',
    authorId: 'person.ayaz',
    name: 'Ayaz Khan',
    shortName: 'Ayaz',
    role: 'Co-Founder, Operations & Growth',
    bio: 'Co-founder focused on operations, growth, and keeping client delivery commercially clear.',
    focus: ['Operations', 'Growth', 'Client Delivery', 'Commercial Strategy'],
    linkedin: 'https://www.linkedin.com/in/ayaz-khan22/',
    image: ayazImage,
    imageAlt: 'Ayaz Khan, Co-Founder for operations and growth at Aizaz Studio',
    objectPosition: '50% 22%',
    order: 2,
    showOnTeam: true,
    featuredOnHomepage: true,
  },
];

export const leadershipById = Object.fromEntries(
  leadershipProfiles.map((person) => [person.id, person]),
) as Record<LeadershipId, LeadershipProfile>;

export function leadershipToAuthor(person: LeadershipProfile): ContentAuthor {
  return {
    id: person.authorId,
    name: person.name,
    role: person.role,
    bio: person.bio,
    photoUrl: person.imageUrl || person.image?.src,
    photoObjectPosition: person.objectPosition,
    photoAlt: person.imageAlt,
    linkedin: person.linkedin,
    githubUrl: person.githubUrl,
  };
}
