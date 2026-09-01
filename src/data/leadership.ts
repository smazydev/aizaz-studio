import type { ImageMetadata } from 'astro';
import type { ContentAuthor } from '../lib/sanity/author';
import aliImage from '../assets/team/ali.webp';
import nasirImage from '../assets/team/nasir.webp';
import ayazImage from '../assets/team/ayaz.webp';
import aliFounderImage from '../assets/team/ali-founder.jpg';
import nasirFounderImage from '../assets/team/nasir-founder.jpg';
import ayazFounderImage from '../assets/team/ayaz-founder.jpg';

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
  founderImage: ImageMetadata;
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
    focus: ['Product Engineering', 'SaaS', 'AI Systems', 'Cloud / Backend'],
    linkedin: 'https://www.linkedin.com/in/syedalizfr/',
    githubUrl: 'https://github.com/smazydev',
    image: aliImage,
    founderImage: aliFounderImage,
    imageAlt: 'Syed Ali Zafar, Founder and Principal Engineer at Aizaz Studio',
    objectPosition: '50% 28%',
  },
  {
    id: 'nasir',
    authorId: 'person.nasir',
    name: 'Nasir Mahmood',
    displayName: 'Nasir Mahmood',
    shortName: 'Nasir',
    role: 'Co-Founder, ERP & Integrations',
    bio: 'Co-founder focused on ERP, NetSuite, and commerce integration work across business systems.',
    focus: ['NetSuite', 'ERP', 'Commerce Integrations', 'Business Systems'],
    linkedin: 'https://www.linkedin.com/in/muh-nasir-mahmood/',
    githubUrl: 'https://github.com/muh-nasiruit',
    image: nasirImage,
    founderImage: nasirFounderImage,
    imageAlt: 'Nasir Mahmood, Co-Founder for ERP and integrations at Aizaz Studio',
    objectPosition: '50% 30%',
  },
  {
    id: 'ayaz',
    authorId: 'person.ayaz',
    name: 'Ayaz Khan',
    displayName: 'Ayaz Khan',
    shortName: 'Ayaz',
    role: 'Co-Founder, Operations & Growth',
    bio: 'Co-founder focused on operations, growth, and keeping client delivery commercially clear.',
    focus: ['Operations', 'Growth', 'Client Delivery', 'Commercial Strategy'],
    linkedin: 'https://www.linkedin.com/in/ayaz-khan22/',
    image: ayazImage,
    founderImage: ayazFounderImage,
    imageAlt: 'Ayaz Khan, Co-Founder for operations and growth at Aizaz Studio',
    objectPosition: '50% 22%',
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
