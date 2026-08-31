/**
 * Assert Blog Post `author` is a reference to `person` (Author),
 * and Author document fields are present in schemaTypes.
 *
 * Usage: npm run verify:author-schema
 */
import { schemaTypes } from '../schemas';

type AnySchema = {
    name?: string;
    title?: string;
    type?: string;
    fields?: Array<{
        name?: string;
        title?: string;
        type?: string;
        to?: Array<{ type?: string }>;
    }>;
};

const types = schemaTypes as AnySchema[];

function fail(message: string): never {
    console.error(`FAIL: ${message}`);
    process.exit(1);
}

const person = types.find((t) => t.name === 'person');
if (!person) fail('person (Author) document is not registered in schemaTypes');
if (person.title !== 'Author') fail(`person title should be "Author", got "${person.title}"`);

const requiredPersonFields = [
    'name',
    'role',
    'bio',
    'photo',
    'linkedin',
    'xUrl',
    'githubUrl',
    'shortName',
    'focus',
    'order',
    'showOnTeam',
    'featuredOnHomepage',
];
const personFieldNames = new Set((person.fields ?? []).map((f) => f.name));
for (const field of requiredPersonFields) {
    if (!personFieldNames.has(field)) fail(`Author document missing field: ${field}`);
}

const photo = (person.fields ?? []).find((f) => f.name === 'photo');
if (photo?.type !== 'image') fail('Author photo/headshot must be type image');
if (photo?.title !== 'Headshot') {
    console.warn(`WARN: photo title is "${photo?.title}" (expected Headshot)`);
}

const post = types.find((t) => t.name === 'post');
if (!post) fail('post (Blog Post) is not registered in schemaTypes');

const author = (post.fields ?? []).find((f) => f.name === 'author');
if (!author) fail('Blog Post missing author field');
if (author.type !== 'reference') {
    fail(`Blog Post author must be type "reference", got "${author.type}"`);
}
const targets = (author.to ?? []).map((t) => t.type);
if (!targets.includes('person')) {
    fail(`Blog Post author must reference person, got: ${targets.join(', ') || '(none)'}`);
}

const caseStudy = types.find((t) => t.name === 'caseStudy');
if (!caseStudy) fail('caseStudy document is not registered in schemaTypes');
const caseStudyFields = new Set((caseStudy.fields ?? []).map((f) => f.name));
for (const field of ['coverImage', 'logo', 'gallery', 'featuredOnHomepage', 'deliveryDuration', 'challenge', 'solution', 'testimonial']) {
    if (!caseStudyFields.has(field)) fail(`Case study missing field: ${field}`);
}

const homepage = types.find((t) => t.name === 'homepage');
if (!homepage) fail('homepage document is not registered in schemaTypes');
const homepageFields = new Set((homepage.fields ?? []).map((f) => f.name));
if (!homepageFields.has('featuredTeam')) fail('Homepage missing featuredTeam field');
if (!homepageFields.has('featuredCaseStudies')) fail('Homepage missing featuredCaseStudies field');

console.log('OK: Blog Post.author → reference(person/Author)');
console.log('OK: Author fields:', [...personFieldNames].join(', '));
console.log('OK: Case study media fields:', ['coverImage', 'logo', 'gallery', 'featuredOnHomepage'].join(', '));
console.log('OK: Homepage featuredTeam + featuredCaseStudies');
console.log('');
console.log('If Sanity Dashboard still shows a text Author field, deploy the schema store:');
console.log('  cd studio && npm run deploy:schema');
console.log('  cd studio && npm run deploy:studio');
