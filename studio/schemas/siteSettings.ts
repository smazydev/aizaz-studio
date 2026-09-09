import { defineArrayMember, defineField, defineType } from 'sanity';

export const siteSettings = defineType({
    name: 'siteSettings',
    title: 'Site settings',
    type: 'document',
    groups: [
        { name: 'nav', title: 'Navigation', default: true },
        { name: 'footer', title: 'Footer' },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Internal title',
            type: 'string',
            initialValue: 'Site settings',
            hidden: true,
            readOnly: true,
        }),
        defineField({
            name: 'navLinks',
            title: 'Primary navigation',
            type: 'array',
            group: 'nav',
            of: [{ type: 'link' }],
        }),
        defineField({
            name: 'navCtaLabel',
            title: 'Nav CTA label',
            type: 'string',
            group: 'nav',
        }),
        defineField({
            name: 'navCtaHref',
            title: 'Nav CTA link',
            type: 'string',
            group: 'nav',
        }),
        defineField({
            name: 'studioHeading',
            title: 'Studio heading',
            type: 'string',
            group: 'footer',
        }),
        defineField({
            name: 'studioBlurb',
            title: 'Studio blurb',
            type: 'text',
            rows: 2,
            group: 'footer',
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            group: 'footer',
        }),
        defineField({
            name: 'phone',
            title: 'Phone',
            type: 'string',
            group: 'footer',
        }),
        defineField({
            name: 'phoneHref',
            title: 'Phone href',
            type: 'string',
            group: 'footer',
            description: 'Example: tel:+923342056691',
        }),
        defineField({
            name: 'footerColumns',
            title: 'Footer columns',
            type: 'array',
            group: 'footer',
            of: [
                defineArrayMember({
                    type: 'object',
                    name: 'footerColumn',
                    fields: [
                        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
                        defineField({ name: 'links', title: 'Links', type: 'array', of: [{ type: 'link' }] }),
                    ],
                    preview: {
                        select: { title: 'heading' },
                    },
                }),
            ],
        }),
    ],
    preview: {
        prepare: () => ({ title: 'Site settings' }),
    },
});
