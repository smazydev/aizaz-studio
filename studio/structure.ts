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
                .title('People')
                .child(S.documentTypeList('person').title('Authors')),
            S.listItem()
                .title('Content')
                .child(
                    S.list()
                        .title('Content')
                        .items([
                            S.documentTypeListItem('post').title('Blog posts'),
                            S.documentTypeListItem('caseStudy').title('Case studies'),
                        ]),
                ),
            S.divider(),
            S.listItem()
                .title('Pages')
                .id('pages-placeholder')
                .child(
                    S.list()
                        .title('Pages')
                        .items([
                            S.listItem()
                                .title('Coming in Phase 3')
                                .id('pages-phase3')
                                .child(
                                    S.list()
                                        .title('Marketing pages')
                                        .items([]),
                                ),
                        ]),
                ),
            S.listItem()
                .title('SEO landings')
                .id('seo-landings-placeholder')
                .child(
                    S.list()
                        .title('SEO landings')
                        .items([
                            S.listItem()
                                .title('Coming in Phase 2')
                                .id('seo-landings-phase2')
                                .child(
                                    S.list()
                                        .title('Services · Industries · Technologies · Compare')
                                        .items([]),
                                ),
                        ]),
                ),
        ]);
