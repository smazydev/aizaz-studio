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
                .title('Site settings')
                .id('siteSettings')
                .child(
                    S.document()
                        .schemaType('siteSettings')
                        .documentId('siteSettings')
                        .title('Site settings'),
                ),
            S.divider(),
            S.listItem()
                .title('Landing pages')
                .child(
                    S.list()
                        .title('Landing pages')
                        .items([
                            S.listItem()
                                .title('Services')
                                .child(
                                    S.documentTypeList('landingPage')
                                        .title('Services')
                                        .filter('_type == "landingPage" && category == "service"')
                                        .defaultOrdering([{ field: 'title', direction: 'asc' }]),
                                ),
                            S.listItem()
                                .title('Industries')
                                .child(
                                    S.documentTypeList('landingPage')
                                        .title('Industries')
                                        .filter('_type == "landingPage" && category == "industry"')
                                        .defaultOrdering([{ field: 'title', direction: 'asc' }]),
                                ),
                            S.listItem()
                                .title('Integrations')
                                .child(
                                    S.documentTypeList('landingPage')
                                        .title('Integrations')
                                        .filter('_type == "landingPage" && category == "integration"')
                                        .defaultOrdering([{ field: 'title', direction: 'asc' }]),
                                ),
                            S.listItem()
                                .title('Sprint offer')
                                .child(
                                    S.documentTypeList('landingPage')
                                        .title('Sprint offer')
                                        .filter('_type == "landingPage" && category == "sprint"'),
                                ),
                            S.documentTypeListItem('technologyPage').title('Technologies'),
                            S.documentTypeListItem('comparePage').title('Compare'),
                            S.documentTypeListItem('sitePage').title('Commercial & site pages'),
                        ]),
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
            S.listItem()
                .title('Authors')
                .child(
                    S.documentTypeList('person')
                        .title('Authors')
                        .defaultOrdering([{ field: 'name', direction: 'asc' }]),
                ),
        ]);
