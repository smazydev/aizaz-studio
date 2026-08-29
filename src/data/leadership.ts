import type { ContentAuthor } from '../lib/sanity/author';
import { LEGACY_AUTHORS } from './authors';

export type LeadershipProfile = ContentAuthor & {
  id: string;
  bio: string;
  focus: string[];
};

/**
 * Homepage Meet the Team — real leadership only.
 * Bios stay short and grounded; focus tags mirror public roles.
 */
export const leadershipProfiles: LeadershipProfile[] = [
  {
    ...LEGACY_AUTHORS.ali,
    id: 'ali',
    bio: 'Technical founder focused on SaaS architecture, AI systems, backend engineering, and cloud infrastructure.',
    focus: ['Product Engineering', 'SaaS', 'AI Systems', 'Cloud / Backend'],
  },
  {
    ...LEGACY_AUTHORS.nasir,
    id: 'nasir',
    bio: 'Co-founder focused on ERP, NetSuite, and commerce integration work across business systems.',
    focus: ['NetSuite', 'ERP', 'Commerce Integrations', 'Business Systems'],
  },
  {
    ...LEGACY_AUTHORS.ayaz,
    id: 'ayaz',
    bio: 'Co-founder focused on operations, growth, and keeping client delivery commercially clear.',
    focus: ['Operations', 'Growth', 'Client Delivery', 'Commercial Strategy'],
  },
];
