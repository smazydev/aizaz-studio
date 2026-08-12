import { defineField, defineType } from 'sanity';

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
        }),
        defineField({
            name: 'role',
            title: 'Role',
            type: 'string',
            description: 'Example: Founder, Senior Engineer, Technical Writer',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'bio',
            title: 'Short bio',
            type: 'text',
            rows: 3,
            description: 'Optional. Used when author profiles are shown in more detail.',
        }),
        defineField({
            name: 'photo',
            title: 'Photo',
            type: 'image',
            options: { hotspot: true },
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
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'role',
            media: 'photo',
        },
    },
});
