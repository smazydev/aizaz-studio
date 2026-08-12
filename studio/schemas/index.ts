import { person } from './person';
import { post } from './post';
import { caseStudy } from './caseStudy';
import {
    seoFields,
    link,
    cta,
    faqItem,
    stat,
    testimonial,
    labelValue,
    caseStudySectionItem,
    caseStudySection,
} from './objects';

export const schemaTypes = [
    // Shared objects
    seoFields,
    link,
    cta,
    faqItem,
    stat,
    testimonial,
    labelValue,
    caseStudySectionItem,
    caseStudySection,
    // Documents
    person,
    post,
    caseStudy,
];
