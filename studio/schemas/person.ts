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
