import type { StructureBuilder } from 'sanity/structure';
import { SeoDashboard } from './components/SeoDashboard';

export const structure = (S: StructureBuilder) =>
    S.list()
        .title('Aizaz Studio')
        .items([
            S.listItem()
                .title('SEO Dashboard')
                .child(S.component(SeoDashboard).title('SEO Dashboard')),
            S.divider(),
            S.listItem()
                .title('Homepage')
                .id('homepage')
                .child(S.document().schemaType('homepage').documentId('homepage').title('Homepage')),
            S.listItem()
                .title('Team')
                .child(
                    S.documentTypeList('person')
                        .title('Team')
                        .filter('_type == "person" && showOnTeam == true')
                        .defaultOrdering([
                            { field: 'order', direction: 'asc' },
                            { field: 'name', direction: 'asc' },
                        ]),
                ),
            S.listItem()
                .title('Authors')
                .child(
                    S.documentTypeList('person')
                        .title('Authors')
                        .defaultOrdering([{ field: 'name', direction: 'asc' }]),
                ),
            S.listItem()
                .title('Content')
                .child(
                    S.list()
                        .title('Content')
                        .items([
                            S.documentTypeListItem('post').title('Blog Posts'),
                            S.documentTypeListItem('caseStudy').title('Case Studies'),
                        ]),
                ),
        ]);
