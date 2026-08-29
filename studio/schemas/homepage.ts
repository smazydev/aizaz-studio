import { defineArrayMember, defineField, defineType } from 'sanity';

/** Public case-study slugs still primarily sourced from code (not Sanity docs). */
export const PUBLIC_CASE_STUDY_SLUG_OPTIONS = [
    { title: 'PropertyMatch — Real Estate SaaS MVP', value: 'propertymatchmaker-real-estate-saas' },
    { title: 'SalesAngel — AI Sales Platform', value: 'designing-multi-tenant-crm-architecture' },
    { title: '1Archiver — Compliance Email Archiving', value: '1archiver-compliance-platform' },
    {
        title: 'Multi-Language Code Checking Tool',
        value: 'modernizing-multi-language-code-checking-tool',
    },
] as const;

/**
 * Homepage singleton — frequently edited proof/copy only.
 * Layout, hero, services cards, reviews, and SEO remain code-controlled in this phase.
 */
export const homepage = defineType({
    name: 'homepage',
    title: 'Homepage',
    type: 'document',
    groups: [
        { name: 'stats', title: 'Stats', default: true },
        { name: 'marquee', title: 'Proof marquee' },
        { name: 'showcase', title: 'Featured case studies' },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Internal title',
            type: 'string',
            initialValue: 'Homepage',
            hidden: true,
            readOnly: true,
        }),
        defineField({
            name: 'stats',
            title: 'Stats bar',
            type: 'array',
            group: 'stats',
            description:
                'Ordered stats shown under the hero. Only enter values you can stand behind — do not invent client counts or revenue.',
            of: [
                defineArrayMember({
                    type: 'object',
                    name: 'homepageStat',
                    fields: [
                        defineField({
                            name: 'value',
                            title: 'Value',
                            type: 'string',
                            description: 'Example: 14',
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'suffix',
                            title: 'Suffix',
                            type: 'string',
                            description: 'Optional. Example: " days" or "%"',
                        }),
                        defineField({
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'supportingText',
                            title: 'Supporting text',
                            type: 'string',
                            description: 'Optional. Not shown on the current layout unless wired later.',
                        }),
                        defineField({
                            name: 'enabled',
                            title: 'Enabled',
                            type: 'boolean',
                            initialValue: true,
                        }),
                    ],
                    preview: {
                        select: { title: 'label', subtitle: 'value', enabled: 'enabled' },
                        prepare({ title, subtitle, enabled }) {
                            return {
                                title: title || 'Stat',
                                subtitle: `${subtitle || ''}${enabled === false ? ' (disabled)' : ''}`,
                            };
                        },
                    },
                }),
            ],
        }),
        defineField({
            name: 'marqueeLabel',
            title: 'Marquee label',
            type: 'string',
            group: 'marquee',
            description: 'Small uppercase line above the scrolling names.',
        }),
        defineField({
            name: 'marqueeItems',
            title: 'Marquee names',
            type: 'array',
            group: 'marquee',
            description:
                'Ordered proof names. The site may duplicate this list in the animation for seamless scrolling — do not create duplicate CMS rows for that.',
            of: [
                defineArrayMember({
                    type: 'object',
                    name: 'marqueeItem',
                    fields: [
                        defineField({
                            name: 'name',
                            title: 'Name',
                            type: 'string',
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'href',
                            title: 'Optional URL',
                            type: 'string',
                            description: 'Internal path or full URL. Leave blank for plain text.',
                        }),
                        defineField({
                            name: 'enabled',
                            title: 'Enabled',
                            type: 'boolean',
                            initialValue: true,
                        }),
                    ],
                    preview: {
                        select: { title: 'name', enabled: 'enabled' },
                        prepare({ title, enabled }) {
                            return {
                                title: title || 'Item',
                                subtitle: enabled === false ? 'Disabled' : undefined,
                            };
                        },
                    },
                }),
            ],
        }),
        defineField({
            name: 'showcaseEyebrow',
            title: 'Showcase eyebrow',
            type: 'string',
            group: 'showcase',
        }),
        defineField({
            name: 'showcaseTitle',
            title: 'Showcase heading',
            type: 'string',
            group: 'showcase',
        }),
        defineField({
            name: 'showcaseDescription',
            title: 'Showcase supporting text',
            type: 'text',
            rows: 2,
            group: 'showcase',
        }),
        defineField({
            name: 'featuredCaseStudies',
            title: 'Featured case studies',
            type: 'array',
            group: 'showcase',
            description:
                'Order controls homepage showcase tabs. Uses public case-study slugs (code + Sanity merged). InvestorsGoneWild is not available.',
            of: [
                defineArrayMember({
                    type: 'object',
                    name: 'featuredCaseStudy',
                    fields: [
                        defineField({
                            name: 'caseStudySlug',
                            title: 'Case study',
                            type: 'string',
                            options: {
                                list: [...PUBLIC_CASE_STUDY_SLUG_OPTIONS],
                            },
                            validation: (rule) => rule.required(),
                        }),
                        defineField({
                            name: 'labelOverride',
                            title: 'Tab label override',
                            type: 'string',
                            description: 'Optional. Defaults to the case study category label.',
                        }),
                        defineField({
                            name: 'enabled',
                            title: 'Enabled',
                            type: 'boolean',
                            initialValue: true,
                        }),
                    ],
                    preview: {
                        select: { title: 'caseStudySlug', subtitle: 'labelOverride', enabled: 'enabled' },
                        prepare({ title, subtitle, enabled }) {
                            const match = PUBLIC_CASE_STUDY_SLUG_OPTIONS.find((opt) => opt.value === title);
                            return {
                                title: match?.title || title || 'Case study',
                                subtitle: `${subtitle || ''}${enabled === false ? ' (disabled)' : ''}`.trim() || undefined,
                            };
                        },
                    },
                }),
            ],
        }),
    ],
    preview: {
        prepare: () => ({ title: 'Homepage' }),
    },
});
