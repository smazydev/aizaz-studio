import type { ContentAuthor } from '../lib/sanity/author';

/** Static author records for legacy markdown posts — mirrors Sanity person documents. */
export const LEGACY_AUTHORS = {
    ali: {
        id: 'person.ali-zafar',
        name: 'Syed Ali Zafar',
        role: 'Founder & Principal Engineer',
        photoUrl:
            'https://cdn.sanity.io/images/bmcdpga9/production/3943c20c38285a448a0bcad66d4f36d9a573a0ed-400x400.jpg?w=256&auto=format',
        linkedin: 'https://www.linkedin.com/in/syedalizfr/',
        githubUrl: 'https://github.com/smazydev',
    },
    nasir: {
        id: 'person.nasir',
        name: 'Nasir Mahmood',
        role: 'Co-Founder, ERP & Integrations',
        photoUrl:
            'https://cdn.sanity.io/images/bmcdpga9/production/29b4d1accff73b24608a597f9a5fae8ef2984c32-400x400.jpg?w=256&auto=format',
        linkedin: 'https://www.linkedin.com/in/muh-nasir-mahmood/',
        githubUrl: 'https://github.com/muh-nasiruit',
    },
    ayaz: {
        id: 'person.ayaz',
        name: 'Ayaz Khan',
        role: 'Co-Founder, Operations & Growth',
        photoUrl:
            'https://cdn.sanity.io/images/bmcdpga9/production/0f6d316d58a0e71b43c5cf65788d8f8ed724bbef-400x400.jpg?w=256&auto=format',
        linkedin: 'https://www.linkedin.com/in/ayaz-khan22/',
    },
} as const satisfies Record<string, ContentAuthor>;

export type LegacyAuthorKey = keyof typeof LEGACY_AUTHORS;
