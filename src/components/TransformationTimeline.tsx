import React, { useEffect, useRef, useState } from 'react';
import { Search, Users, Play, Box, Settings, CheckCircle, ArrowRight } from 'lucide-react';

const steps = [
    {
        icon: Search,
        title: "Discovery Call",
        subtitle: "Problem Identification",
        description: "We start by diving deep into your current engineering challenges. We analyze your tech stack, team structure, and business goals to identify exactly where the bottlenecks are and what skills are missing.",
        details: [
            "Technical architecture review",
            "Team culture & workflow assessment",
            "Gap analysis & role definition",
            "Success metrics alignment"
        ]
    },
    {
        icon: Users,
        title: "Pod Assignment",
        subtitle: "Team Match",
        description: "Based on our discovery, we assemble a dedicated 'pod' of senior engineers who have the exact expertise you need. These aren't random freelancers; they are cohesive units that have worked together before.",
        details: [
            "Curated senior talent selection",
            "Timezone & communication alignment",
            "Cultural fit verification",
            "Pod structure definition (Lead, Devs, QA)"
        ]
    },
    {
        icon: Play,
        title: "Kick-off Sprint",
        subtitle: "Development",
        description: "We don't waste time. Within days of assignment, we launch a kick-off sprint to set up environments, establish CI/CD pipelines, and ship the first small win to prove velocity.",
        details: [
            "Environment & repo setup",
            "CI/CD pipeline configuration",
            "First feature or fix delivery",
            "Workflow integration (Jira, Slack, etc.)"
        ]
    },
    {
        icon: Box,
        title: "Weekly Delivery",
        subtitle: "Development",
        description: "Predictability is key. We work in structured weekly sprints with clear deliverables. You get a demo every week, so you always know exactly what's being built and can steer the ship.",
        details: [
            "Weekly sprint planning & review",
            "Live demos every Friday",
            "Transparent progress tracking",
            "Code quality & security checks"
        ]
    },
    {
        icon: Settings,
        title: "Continuous Optimization",
        subtitle: "Customer Success",
        description: "We don't just write code; we improve the machine. Our Customer Success managers monitor the pod's performance, optimizing processes and ensuring you're getting maximum value.",
        details: [
            "Bi-weekly performance reviews",
            "Process bottleneck removal",
            "Velocity & quality metrics tracking",
            "Proactive resource scaling"
        ]
    },
    {
        icon: CheckCircle,
        title: "Final Delivery & Hand-off",
        subtitle: "Knowledge Transfer",
        description: "When the project is done or you're ready to take it in-house, we ensure a smooth transition. We provide full documentation, training, and support to make sure your team owns the code.",
        details: [
            "Complete code documentation",
            "Architecture decision records (ADRs)",
            "Team training & workshops",
            "Post-handover support period"
        ]
    }
];

export const TransformationTimeline: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState(0);
    const [progressHeight, setProgressHeight] = useState(0);

    const EXTRA_TOP = 0; // No extension up
    const EXTRA_BOTTOM = 96; // Extend down towards footer (matches main pb-24)

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const container = containerRef.current;
            const rect = container.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate how far we've scrolled relative to the container top
            const visualTop = rect.top;
            const startOffset = windowHeight / 2;
            const scrolled = startOffset - visualTop;

            // Total visual height = container height + bottom ext
            const totalHeight = rect.height + EXTRA_BOTTOM;

            // Clamp progress
            const progress = Math.max(0, Math.min(scrolled, totalHeight));
            setProgressHeight(progress);

            // Determine active step based on progress
            const effectiveProgress = progress;

            const stepElements = container.querySelectorAll('[data-step-index]');
            let currentActive = 0;

            stepElements.forEach((el, index) => {
                const stepRect = el.getBoundingClientRect();
                const stepTopRelative = stepRect.top - rect.top;

                if (effectiveProgress >= stepTopRelative) {
                    currentActive = index;
                }
            });

            // Special case for CTA (last item)
            // If we are near the end of the timeline, activate CTA
            if (effectiveProgress >= rect.height - 100) { // -100 buffer
                currentActive = steps.length;
            }

            setActiveStep(currentActive);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Check if CTA is active (it's the last item, index = steps.length)
    const isCTAActive = activeStep === steps.length;

    return (
        <div ref={containerRef} className="relative space-y-24 pb-24">
            {/* Vertical Line Background */}
            <div
                className="absolute left-5 md:left-1/2 w-0.5 bg-zinc-800 -translate-x-1/2"
                style={{ top: '0', bottom: `-${EXTRA_BOTTOM}px` }}
            />

            {/* Vertical Line Progress (Blue) */}
            <div
                className="absolute left-5 md:left-1/2 w-0.5 bg-primary-500 -translate-x-1/2 transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(14,165,233,0.5)]"
                style={{ top: '0', height: `${progressHeight}px` }}
            />

            {steps.map((step, index) => {
                const isActive = index <= activeStep;
                const isCurrent = index === activeStep;

                return (
                    <div
                        key={index}
                        data-step-index={index}
                        className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                    >

                        {/* Icon Marker */}
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-all duration-500 ${isActive
                            ? 'bg-primary-500 border-primary-500 shadow-[0_0_20px_rgba(14,165,233,0.4)] scale-110'
                            : 'bg-zinc-950 border-zinc-800'
                            }`}>
                            <step.icon
                                size={20}
                                className={`transition-colors duration-500 ${isActive ? 'text-white' : 'text-zinc-600'}`}
                            />
                        </div>

                        {/* Content Card */}
                        <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-8 rounded-2xl border transition-all duration-500 ${isCurrent
                            ? 'bg-zinc-900 border-primary-500/50 shadow-[0_0_30px_rgba(14,165,233,0.1)] translate-x-2 md:translate-x-0'
                            : 'bg-zinc-900/50 border-white/5 opacity-70 grayscale-[0.5]'
                            }`}>
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded transition-colors duration-500 ${isActive ? 'text-primary-500 bg-primary-500/10' : 'text-zinc-500 bg-zinc-800'
                                    }`}>
                                    Step 0{index + 1}
                                </span>
                                <span className="text-sm text-zinc-500 font-medium">{step.subtitle}</span>
                            </div>
                            <h3 className={`text-2xl font-bold mb-4 transition-colors duration-500 ${isActive ? 'text-white' : 'text-zinc-400'}`}>
                                {step.title}
                            </h3>
                            <p className="text-zinc-400 mb-6 leading-relaxed">
                                {step.description}
                            </p>
                            <ul className="space-y-2">
                                {step.details.map((detail, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                                        <div className={`mt-1.5 w-1 h-1 rounded-full shrink-0 transition-colors duration-500 ${isActive ? 'bg-primary-500' : 'bg-zinc-700'}`} />
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                );
            })}

            {/* CTA Section - Treated as the final step */}
            <div
                data-step-index={steps.length}
                className={`relative z-10 mt-32 text-center p-12 rounded-3xl border transition-all duration-500 ${isCTAActive
                    ? 'bg-zinc-900 border-primary-500 shadow-[0_0_40px_rgba(14,165,233,0.15)] scale-105'
                    : 'bg-zinc-900 border-white/5 opacity-80'
                    }`}
            >
                <h2 className={`text-3xl font-bold mb-6 transition-colors duration-500 ${isCTAActive ? 'text-white' : 'text-zinc-300'}`}>
                    Ready to transform your engineering?
                </h2>
                <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
                    Stop letting technical debt and hiring bottlenecks slow you down. Let's build something great together.
                </p>
                <button className={`px-8 py-4 rounded-full font-bold transition-all duration-300 inline-flex items-center gap-2 ${isCTAActive
                    ? 'bg-primary-600 text-white hover:bg-primary-500 shadow-lg shadow-primary-500/25'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                    }`}>
                    Book a Discovery Call <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
};
