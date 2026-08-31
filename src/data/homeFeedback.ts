import { caseStudies } from './caseStudies';
import { filterPublicCaseStudies } from '../lib/case-study-visibility';

export type HomeFeedbackItem = {
  quote: string;
  author: string;
  role?: string;
  location?: string;
  sourceLabel: string;
  sourceIsUpwork: boolean;
  project?: string;
  work?: string;
  href?: string;
  engagementLabel?: string;
  problem?: string;
  solved?: string;
  deliveryTime?: string;
};

function excerptQuote(quote: string, max = 140) {
  if (quote.length <= max) return quote;
  return `${quote.slice(0, max - 1).trim()}…`;
}

function engagementValue(study: (typeof caseStudies)[number], label: string) {
  return study.engagement?.find((row) => row.label === label)?.value;
}

function firstSentence(text: string | undefined, max = 180) {
  if (!text) return undefined;
  const compact = text.replace(/\s+/g, ' ').trim();
  if (!compact) return undefined;
  const match = compact.match(/^.+?[.!?](?:\s|$)/);
  const sentence = (match?.[0] || compact).trim();
  if (sentence.length <= max) return sentence;
  return `${sentence.slice(0, max - 1).trim()}…`;
}

function documentedDelivery(study: (typeof caseStudies)[number]) {
  const explicit = study.deliveryDuration?.trim();
  if (explicit) return explicit;
  const labeled = engagementValue(study, 'Delivery')?.trim();
  if (labeled) return labeled;
  return undefined;
}

function buildFeedback(study: (typeof caseStudies)[number]): HomeFeedbackItem | null {
  const t = study.testimonial;
  if (!t?.quote || !t.author) return null;

  const sourceRaw = t.source ?? '';
  const engagementBlob = [
    engagementValue(study, 'Engagement'),
    engagementValue(study, 'Platform'),
    sourceRaw,
  ]
    .filter(Boolean)
    .join(' ');
  const sourceIsUpwork = /upwork/i.test(engagementBlob);

  const location =
    engagementValue(study, 'Client location') || engagementValue(study, 'Location') || undefined;

  const role = t.role?.trim() && t.role.trim() !== location ? t.role.trim() : undefined;

  const projectTitle = study.title.split('—')[0]?.split(':')[0]?.trim() || study.title;
  const titleWork = study.title.split('—')[1]?.trim();
  const workHint = titleWork
    || (/mvp/i.test(`${study.title} ${study.subtitle} ${study.category}`)
      ? 'SaaS MVP'
      : study.category.split('•')[0]?.trim());
  const work = workHint || engagementValue(study, 'Engagement type') || undefined;

  const engagementLabel =
    engagementValue(study, 'Engagement type') ||
    engagementValue(study, 'Engagement') ||
    undefined;

  return {
    quote: t.quote,
    author: t.author,
    role,
    location,
    sourceLabel: sourceIsUpwork
      ? 'Upwork'
      : sourceRaw.replace(/^Client feedback from\s+/i, '') || 'Client feedback',
    sourceIsUpwork,
    project: projectTitle,
    work: work || undefined,
    href: `/case-studies/${study.slug}`,
    engagementLabel,
    problem: firstSentence(study.content?.challenge),
    solved: firstSentence(study.content?.solution),
    deliveryTime: documentedDelivery(study),
  };
}

const withTestimonials = filterPublicCaseStudies(caseStudies)
  .filter((study) => study.testimonial?.quote)
  .map(buildFeedback)
  .filter((item): item is HomeFeedbackItem => Boolean(item));

/** Featured: PropertyMatch / Oran when present; otherwise first real quote. */
export const featuredFeedback: HomeFeedbackItem | undefined =
  withTestimonials.find((item) => /propertymatch|oran/i.test(`${item.project} ${item.author}`)) ??
  withTestimonials[0];

export const secondaryFeedback: HomeFeedbackItem[] = withTestimonials
  .filter((item) => item !== featuredFeedback)
  .slice(0, 2)
  .map((item) => ({
    ...item,
    quote: excerptQuote(item.quote),
  }));
