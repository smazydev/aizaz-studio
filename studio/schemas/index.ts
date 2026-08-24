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
    bodyImage,
    blockContent,
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
    bodyImage,
    blockContent,
    // Documents
    person,
    post,
    caseStudy,
];
