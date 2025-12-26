import React, { useRef, useEffect, useState, forwardRef } from 'react';
import { Search, Users, Play, Settings, Box, CheckCircle, ArrowRight } from 'lucide-react';

interface ProcessStepProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  isActive?: boolean;
}

const ProcessStep = forwardRef<HTMLDivElement, ProcessStepProps>(
  ({ icon, title, subtitle, isActive }, ref) => (
    <div
      ref={ref}
      className={`rounded-xl p-4 flex items-center gap-4 shadow-lg min-w-[240px] relative z-10 border transition-all duration-500 ${isActive
        ? 'bg-zinc-800 border-primary-500 shadow-[0_0_30px_rgba(14,165,233,0.2)] scale-105'
        : 'bg-zinc-900 border-white/5'
        }`}
    >
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-500 ${isActive
        ? 'bg-primary-500 text-white'
        : 'bg-primary-500/10 text-primary-500'
        }`}>
        {icon}
      </div>
      <div>
        <div className={`text-xs font-bold uppercase tracking-wider mb-0.5 transition-colors duration-500 ${isActive ? 'text-primary-400' : 'text-primary-500'
          }`}>
          {title}
        </div>
        <div className="text-sm font-medium text-white leading-tight">
          {subtitle}
        </div>
      </div>
    </div>
  )
);

ProcessStep.displayName = 'ProcessStep';

export const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [svgPaths, setSvgPaths] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [showPath, setShowPath] = useState(false);

  const getAnchorPoint = (el: HTMLElement, container: HTMLElement, side: 'top' | 'bottom' | 'left' | 'right') => {
    const rect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const relTop = rect.top - containerRect.top;
    const relLeft = rect.left - containerRect.left;

    switch (side) {
      case 'top': return { x: relLeft + rect.width / 2, y: relTop };
      case 'bottom': return { x: relLeft + rect.width / 2, y: relTop + rect.height };
      case 'left': return { x: relLeft, y: relTop + rect.height / 2 };
      case 'right': return { x: relLeft + rect.width, y: relTop + rect.height / 2 };
    }
  };

  // Horizontal -> Vertical -> Horizontal
  const drawHorizontalPath = (p1: { x: number, y: number }, p2: { x: number, y: number }) => {
    const midX = (p1.x + p2.x) / 2;
    return `M ${p1.x} ${p1.y} L ${midX} ${p1.y} L ${midX} ${p2.y} L ${p2.x} ${p2.y}`;
  };

  // Vertical -> Horizontal -> Vertical
  const drawVerticalPath = (p1: { x: number, y: number }, p2: { x: number, y: number }) => {
    const midY = (p1.y + p2.y) / 2;
    return `M ${p1.x} ${p1.y} L ${p1.x} ${midY} L ${p2.x} ${midY} L ${p2.x} ${p2.y}`;
  };

  const updatePaths = () => {
    if (!containerRef.current || stepRefs.current.length < 6) return;
    if (stepRefs.current.some(ref => !ref)) return;

    const container = containerRef.current;

    // 0 -> 1 (Right -> Left)
    const p0 = getAnchorPoint(stepRefs.current[0]!, container, 'right');
    const p1 = getAnchorPoint(stepRefs.current[1]!, container, 'left');

    // 1 -> 2 (Right -> Left)
    const p2 = getAnchorPoint(stepRefs.current[1]!, container, 'right');
    const p3 = getAnchorPoint(stepRefs.current[2]!, container, 'left');

    // 2 -> 3 (Bottom -> Top) - Vertical
    const p4 = getAnchorPoint(stepRefs.current[2]!, container, 'bottom');
    const p5 = getAnchorPoint(stepRefs.current[3]!, container, 'top');

    // 3 -> 4 (Left -> Right) - Weekly is Right, Cont is Left
    const p6 = getAnchorPoint(stepRefs.current[3]!, container, 'left');
    const p7 = getAnchorPoint(stepRefs.current[4]!, container, 'right');

    // 4 -> 5 (Bottom -> Top) - Vertical
    const p8 = getAnchorPoint(stepRefs.current[4]!, container, 'bottom');
    const p9 = getAnchorPoint(stepRefs.current[5]!, container, 'top');

    setSvgPaths([
      drawHorizontalPath(p0, p1),
      drawHorizontalPath(p2, p3),
      drawVerticalPath(p4, p5),
      drawHorizontalPath(p6, p7),
      drawVerticalPath(p8, p9)
    ]);
  };

  useEffect(() => {
    // Initial calculation
    // Small delay to ensure layout is settled
    const timer = setTimeout(updatePaths, 100);
    window.addEventListener('resize', updatePaths);
    return () => {
      window.removeEventListener('resize', updatePaths);
      clearTimeout(timer);
    };
  }, []);

  // Animation Loop
  useEffect(() => {
    let stepTimeout: NodeJS.Timeout;
    let pathTimeout: NodeJS.Timeout;

    const runSequence = () => {
      // 1. Step is active (controlled by activeStep state)

      // 2. After 1.5s, show path if not the last step
      if (activeStep < 5) {
        stepTimeout = setTimeout(() => {
          setShowPath(true);

          // 3. After path animation (1s), move to next step
          pathTimeout = setTimeout(() => {
            setShowPath(false);
            setActiveStep(prev => prev + 1);
          }, 2000); // Increased to 2s for slower animation
        }, 1500);
      } else {
        // Last step, reset after delay
        stepTimeout = setTimeout(() => {
          setActiveStep(0);
        }, 2000);
      }
    };

    runSequence();

    return () => {
      clearTimeout(stepTimeout);
      clearTimeout(pathTimeout);
    };
  }, [activeStep]);

  return (
    <section id="process" className="py-24 bg-zinc-950 relative overflow-hidden">
      <style>{`
        @keyframes drawPath {
          from { stroke-dashoffset: 3000; }
          to { stroke-dashoffset: 0; }
        }
        .animate-draw {
          stroke-dasharray: 3000;
          stroke-dashoffset: 3000;
          animation: drawPath 2s linear forwards;
        }
      `}</style>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
          {/* Header Section */}
          <div className="lg:col-span-4 mb-16 lg:mb-0 lg:sticky lg:top-24">
            <div className="text-primary-500 font-bold tracking-widest text-sm mb-4 uppercase">Our Process</div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
              How we transform <br />
              your engineering
            </h2>
            <p className="text-lg text-zinc-400 mb-8">
              Specifically curated process through years of experience in delivering high-performing software
            </p>
            <a href="/engineering-transformation" className="bg-primary-600 text-white px-6 py-3 rounded-full font-medium hover:bg-primary-500 transition-colors inline-flex items-center gap-2">
              Learn More <ArrowRight size={16} />
            </a>
          </div>

          {/* Flowchart Container */}
          <div ref={containerRef} className="lg:col-span-8 relative pt-4">
            {/* SVG Overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <defs>
                {showPath && activeStep < svgPaths.length && (
                  <mask id="path-mask">
                    <path
                      d={svgPaths[activeStep]}
                      fill="none"
                      stroke="white"
                      strokeWidth="5"
                      strokeLinecap="round"
                      className="animate-draw"
                    />
                  </mask>
                )}
              </defs>

              {/* Base Paths (Gray Dotted) */}
              {svgPaths.map((path, i) => (
                <path
                  key={`base-${i}`}
                  d={path}
                  fill="none"
                  stroke="#52525b"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  strokeLinecap="round"
                  className="opacity-30"
                />
              ))}

              {/* Active Path (Blue Dotted - Revealed by Mask) */}
              {showPath && activeStep < svgPaths.length && (
                <path
                  d={svgPaths[activeStep]}
                  fill="none"
                  stroke="#0ea5e9"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  strokeLinecap="round"
                  mask="url(#path-mask)"
                />
              )}
            </svg>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-24 gap-x-8 relative z-10">
              {/* Row 1 */}
              <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <ProcessStep
                  ref={(el) => { if (el) stepRefs.current[0] = el; }}
                  icon={<Search size={24} />}
                  title="Discovery Call"
                  subtitle="Problem Identification"
                  isActive={activeStep === 0}
                />
                <ProcessStep
                  ref={(el) => { if (el) stepRefs.current[1] = el; }}
                  icon={<Users size={24} />}
                  title="Pod Assignment"
                  subtitle="Team Match"
                  isActive={activeStep === 1}
                />
                <ProcessStep
                  ref={(el) => { if (el) stepRefs.current[2] = el; }}
                  icon={<Play size={24} />}
                  title="Kick-off Sprint"
                  subtitle="Development"
                  isActive={activeStep === 2}
                />
              </div>

              {/* Row 2 - Centered items visually in the flow */}
              <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:px-20">
                <div className="lg:order-2">
                  <ProcessStep
                    ref={(el) => { if (el) stepRefs.current[3] = el; }}
                    icon={<Box size={24} />}
                    title="Weekly Delivery"
                    subtitle="Development"
                    isActive={activeStep === 3}
                  />
                </div>
                <div className="lg:order-1">
                  <ProcessStep
                    ref={(el) => { if (el) stepRefs.current[4] = el; }}
                    icon={<Settings size={24} />}
                    title="Continuous Optimization"
                    subtitle="Customer Success"
                    isActive={activeStep === 4}
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="lg:col-span-3 flex justify-center">
                <ProcessStep
                  ref={(el) => { if (el) stepRefs.current[5] = el; }}
                  icon={<CheckCircle size={24} />}
                  title="Final Delivery & Hand-off"
                  subtitle="Knowledge Transfer"
                  isActive={activeStep === 5}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};