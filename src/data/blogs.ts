import type { ImageMetadata } from 'astro';
import igwCover from '../assets/igw-casestudy-cover.png';
import archiverCover from '../assets/1archiver-casestudy-cover.png';

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    readTime: string;
    image: ImageMetadata;
    category: string;
    content: string; // Markdown content
    tags?: string[];
}

export const blogs: BlogPost[] = [
    {
        id: '1',
        slug: 'future-of-fintech-2026',
        title: 'The Future of FinTech: Trends Watching in 2026',
        excerpt: 'From embedded finance to AI-driven personalization, here are the key trends shaping the financial technology landscape this year.',
        date: 'December 15, 2025',
        author: 'Aizaz K.',
        readTime: '5 min read',
        image: igwCover, // Using existing image as placeholder
        category: 'FinTech',
        tags: ['FinTech', 'AI', 'Trends'],
        content: `
## The Evolution of Financial Technology

The fintech landscape is evolving at an unprecedented pace. As we move into 2026, several key trends are emerging that will define the next generation of financial services.

### 1. Embedded Finance Everywhere

Financial services are no longer standalone products; they are becoming invisible layers within other applications. From ride-sharing apps offering instant credit to e-commerce platforms providing insurance at checkout, embedded finance is making transactions seamless.

### 2. AI-Driven Personalization

Artificial Intelligence is moving beyond chatbots. It's now powering hyper-personalized financial advice, predictive budgeting, and automated investment strategies tailored to individual risk profiles.

### 3. The Rise of DeFi for Enterprise

Decentralized Finance (DeFi) is maturing. We are seeing traditional financial institutions exploring permissioned DeFi pools to increase efficiency and transparency in settlements and lending.

## Conclusion

The future belongs to those who adapt. For fintech founders, the opportunity lies in building infrastructure that supports these shifts—secure, scalable, and user-centric.
    `
    },
    {
        id: '2',
        slug: 'scaling-react-applications',
        title: 'Scaling React Applications for Enterprise',
        excerpt: 'Best practices for maintaining performance and code quality in large-scale React applications.',
        date: 'November 28, 2025',
        author: 'Sarah J.',
        readTime: '8 min read',
        image: archiverCover, // Using existing image as placeholder
        category: 'Engineering',
        tags: ['React', 'Performance', 'Architecture'],
        content: `
## Managing Complexity in Large Codebases

As React applications grow, maintaining performance and code quality becomes a significant challenge. Here are some strategies we use at Aizaz Studio to keep our enterprise apps scalable.

### Component Composition

Avoid "God Components." Break down UIs into small, reusable, and focused components. Use composition to build complex UIs from simple building blocks.

### State Management

Don't put everything in global state. Use local state for UI interactions, context for subtree data, and libraries like Zustand or Redux only for truly global application state.

### Performance Optimization

- **Code Splitting:** Use \`React.lazy\` and \`Suspense\` to load parts of your app only when needed.
- **Memoization:** Use \`useMemo\` and \`useCallback\` judiciously to prevent expensive re-renders.
- **Virtualization:** For long lists, use windowing libraries to render only what's visible.

## Conclusion

Scalability is not an afterthought; it's a design choice. By following these principles, you can ensure your React application remains fast and maintainable as it grows.
    `
    }
];
