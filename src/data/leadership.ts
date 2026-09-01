import type { ImageMetadata } from 'astro';
import type { ContentAuthor } from '../lib/sanity/author';
import aliImage from '../assets/team/ali-final.webp';
import nasirImage from '../assets/team/nasir-final.webp';
import ayazImage from '../assets/team/ayaz-final.webp';

export type LeadershipId = 'ali' | 'nasir' | 'ayaz';

export type LeadershipProfile = {
  id: LeadershipId;
  authorId: string;
  name: string;
  displayName: string;
  shortName: string;
  role: string;
  bio: string;
  focus: string[];
  linkedin: string;
  githubUrl?: string;
  image: ImageMetadata;
  imageAlt: string;
  objectPosition: string;
};

/**
 * Homepage and About team config.
 * `image` is a local Astro asset so portraits can later move to Sanity
 * without changing card markup — swap `image` for a CMS URL/ImageMetadata.
 */
export const leadershipProfiles: LeadershipProfile[] = [
  {
    id: 'ali',
    authorId: 'person.ali-zafar',
    name: 'Syed Ali Zafar',
    displayName: 'Ali Zafar',
    shortName: 'Ali',
    role: 'Founder & Principal Engineer',
    bio: 'Technical founder focused on SaaS architecture, AI systems, backend engineering, and cloud infrastructure.',
    focus: ['Product Engineering', 'SaaS', 'AI Systems'],
    linkedin: 'https://www.linkedin.com/in/syedalizfr/',
    githubUrl: 'https://github.com/smazydev',
    image: aliImage,
    imageAlt: 'Ali Zafar, Founder and Principal Engineer at Aizaz Studio',
    objectPosition: 'center center',
  },
  {
    id: 'nasir',
    authorId: 'person.nasir',
    name: 'Nasir Mahmood',
    displayName: 'Nasir Mahmood',
    shortName: 'Nasir',
    role: 'Co Founder, ERP & Integrations',
    bio: 'Co-founder focused on ERP, NetSuite, and commerce integration work across business systems.',
    focus: ['NetSuite', 'ERP', 'Commerce Integrations'],
    linkedin: 'https://www.linkedin.com/in/muh-nasir-mahmood/',
    githubUrl: 'https://github.com/muh-nasiruit',
    image: nasirImage,
    imageAlt: 'Nasir Mahmood, Co Founder for ERP and integrations at Aizaz Studio',
    objectPosition: 'center center',
  },
  {
    id: 'ayaz',
    authorId: 'person.ayaz',
    name: 'Ayaz Khan',
    displayName: 'Ayaz Khan',
    shortName: 'Ayaz',
    role: 'Co Founder, Operations & Growth',
    bio: 'Co-founder focused on operations, growth, and keeping client delivery commercially clear.',
    focus: ['Operations', 'Growth', 'Client Delivery'],
    linkedin: 'https://www.linkedin.com/in/ayaz-khan22/',
    image: ayazImage,
    imageAlt: 'Ayaz Khan, Co Founder for operations and growth at Aizaz Studio',
    objectPosition: 'center center',
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
    photoUrl: person.image.src,
    photoObjectPosition: person.objectPosition,
    linkedin: person.linkedin,
    githubUrl: person.githubUrl,
  };
}
