import { defineField, defineType } from 'sanity';
import { validateContentSlug } from './slugValidation';

/**
 * Author profile document (`_type: person`, Studio title: Author).
 * Referenced by blog posts and case studies via `author` reference fields.
 */
export const person = defineType({
    name: 'person',
    title: 'Author',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (rule) => rule.required(),
            description: 'Example: Ali Zafar',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'name', maxLength: 96 },
            validation: (rule) =>
                rule.required().custom((value) => validateContentSlug(value?.current, 'author')),
            description: 'URL-safe identifier (e.g. ali-zafar). No "Slug:" prefix or slashes.',
        }),
        defineField({
            name: 'role',
            title: 'Role',
            type: 'string',
            description: 'Optional. Example: Technical Founder',
        }),
        defineField({
            name: 'bio',
            title: 'Short bio',
            type: 'text',
            rows: 3,
            description: 'Optional short bio shown on blog articles.',
        }),
        defineField({
            name: 'photo',
            title: 'Headshot',
            type: 'image',
            options: { hotspot: true },
            description: 'Optional headshot shown on blog articles and cards.',
        }),
        defineField({
            name: 'linkedin',
            title: 'LinkedIn URL',
            type: 'url',
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
            description: 'Optional.',
            validation: (rule) =>
                rule.uri({
                    scheme: ['http', 'https'],
                    allowRelative: false,
                }),
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'role',
            media: 'photo',
        },
    },
});
