import { defineField, defineType } from 'sanity';
import { validateContentSlug } from './slugValidation';

/**
 * Person document (`_type: person`, Studio title: Author).
 * One record is both a blog/case-study Author and (when Team fields are set) a team member.
 * Referenced by blog posts and case studies via `author` reference fields.
 */
export const person = defineType({
    name: 'person',
    title: 'Author',
    type: 'document',
    groups: [
        { name: 'profile', title: 'Author profile', default: true },
        { name: 'team', title: 'Team' },
    ],
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            group: 'profile',
            validation: (rule) => rule.required(),
            description: 'Example: Syed Ali Zafar',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            group: 'profile',
            options: { source: 'name', maxLength: 96 },
            validation: (rule) =>
                rule.required().custom((value) => validateContentSlug(value?.current, 'author')),
            description: 'URL-safe identifier (e.g. ali-zafar). No "Slug:" prefix or slashes.',
        }),
        defineField({
            name: 'shortName',
            title: 'Short name',
            type: 'string',
            group: 'team',
            description: 'Optional caption name on the team roster (e.g. Ali). Defaults to the first word of Name.',
        }),
        defineField({
            name: 'role',
            title: 'Role',
            type: 'string',
            group: 'profile',
            description: 'Example: Founder & Principal Engineer',
        }),
        defineField({
            name: 'bio',
            title: 'Short bio',
            type: 'text',
            rows: 3,
            group: 'profile',
            description: 'Short bio shown on blog articles and the team roster.',
        }),
        defineField({
            name: 'focus',
            title: 'Focus areas',
            type: 'array',
            group: 'team',
            of: [{ type: 'string' }],
            description: 'Shown as the team “Focus” list. Example: Product Engineering, SaaS, AI Systems.',
        }),
        defineField({
            name: 'photo',
            title: 'Headshot',
            type: 'image',
            group: 'profile',
            options: { hotspot: true },
            description:
                'Portrait for blog cards and the team roster. Set the hotspot/crop so a new photo does not require frontend changes.',
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Alt text',
                    type: 'string',
                    description:
                        'Example: Syed Ali Zafar, Founder and Principal Engineer at Aizaz Studio. Defaults to the person’s name when blank.',
                }),
            ],
        }),
        defineField({
            name: 'linkedin',
            title: 'LinkedIn URL',
            type: 'url',
            group: 'profile',
            validation: (rule) =>
                rule.uri({
                    scheme: ['http', 'https'],
                    allowRelative: false,
                }),
        }),
        defineField({
            name: 'xUrl',
            title: 'X (Twitter) URL',
            type: 'url',
            group: 'profile',
            description: 'Optional.',
            validation: (rule) =>
                rule.uri({
                    scheme: ['http', 'https'],
                    allowRelative: false,
                }),
        }),
        defineField({
            name: 'githubUrl',
            title: 'GitHub URL',
            type: 'url',
            group: 'profile',
            description: 'Optional.',
            validation: (rule) =>
                rule.uri({
                    scheme: ['http', 'https'],
                    allowRelative: false,
                }),
        }),
        defineField({
            name: 'order',
            title: 'Display order',
            type: 'number',
            group: 'team',
            description: 'Lower numbers appear first on the team roster. Leave blank to sort by name.',
            validation: (rule) => rule.integer().min(0),
        }),
        defineField({
            name: 'showOnTeam',
            title: 'Show on team roster',
            type: 'boolean',
            group: 'team',
            description: 'When enabled, this Author also appears as a team member (About, and homepage when wired).',
            initialValue: false,
        }),
        defineField({
            name: 'featuredOnHomepage',
            title: 'Featured on homepage',
            type: 'boolean',
            group: 'team',
            description:
                'When enabled, this person is a candidate for the homepage team section. No effect until the homepage roster reads CMS team data.',
            initialValue: false,
        }),
    ],
    orderings: [
        {
            title: 'Team order',
            name: 'teamOrder',
            by: [
                { field: 'order', direction: 'asc' },
                { field: 'name', direction: 'asc' },
            ],
        },
        {
            title: 'Name',
            name: 'nameAsc',
            by: [{ field: 'name', direction: 'asc' }],
        },
    ],
    preview: {
        select: {
            title: 'name',
            role: 'role',
            media: 'photo',
            showOnTeam: 'showOnTeam',
            featuredOnHomepage: 'featuredOnHomepage',
        },
        prepare({ title, role, media, showOnTeam, featuredOnHomepage }) {
            const badges = [
                showOnTeam ? 'Team' : 'Author',
                featuredOnHomepage ? 'Homepage' : null,
            ].filter(Boolean);
            return {
                title: title || 'Untitled',
                subtitle: [role, badges.join(' · ')].filter(Boolean).join(' — '),
                media,
            };
        },
    },
});
