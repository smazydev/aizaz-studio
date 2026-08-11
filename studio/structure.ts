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
            S.documentTypeListItem('person').title('Authors'),
            S.documentTypeListItem('post').title('Blog posts'),
            S.documentTypeListItem('caseStudy').title('Case studies'),
        ]);
