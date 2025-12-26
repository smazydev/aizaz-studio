import React, { useState, useRef } from 'react';
import { Quote, Play, Pause } from 'lucide-react';

const formatTime = (time: number) => {
  if (!time) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const AudioPlayer: React.FC<{ src: string }> = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const waveformRef = useRef<HTMLDivElement>(null);

  // Generate random waveform bars once
  const bars = React.useMemo(() => Array.from({ length: 40 }, () => Math.random() * 0.8 + 0.2), []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (waveformRef.current && audioRef.current) {
      const rect = waveformRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      const newTime = percentage * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div className="mt-6 pt-6 border-t border-white/5">
      <audio
        ref={audioRef}
        src={src}
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        className="hidden"
      />

      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${isPlaying ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'}`}
        >
          {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
        </button>

        <div className="flex-1 min-w-0">
          <div
            ref={waveformRef}
            onClick={handleSeek}
            className="h-8 flex items-end gap-[2px] cursor-pointer group mb-1"
          >
            {bars.map((height, index) => {
              const progress = currentTime / (duration || 1);
              const isPlayed = index / bars.length < progress;

              return (
                <div
                  key={index}
                  className={`w-1 rounded-full transition-all duration-200 ${isPlayed ? 'bg-primary-500' : 'bg-zinc-700 group-hover:bg-zinc-600'}`}
                  style={{ height: `${height * 100}%` }}
                />
              );
            })}
          </div>
          <div className="flex justify-between text-xs font-medium text-zinc-500 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialCard: React.FC<{
  quote: string;
  author: string;
  role: string;
  company: string;
  audioSrc?: string;
}> = ({ quote, author, role, company, audioSrc }) => (
  <div className="p-8 rounded-2xl bg-zinc-900/40 border border-white/5 relative flex flex-col h-full">
    <Quote className="absolute top-8 left-8 text-zinc-700 w-8 h-8 opacity-50" />
    <p className="text-zinc-300 mb-8 relative z-10 pl-4 border-l-2 border-primary-500/50 italic flex-grow">
      "{quote}"
    </p>
    <div className="flex items-center gap-4 mt-auto">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-600" /> {/* Placeholder avatar */}
      <div>
        <h4 className="font-bold text-white text-sm">{author}</h4>
        <p className="text-xs text-zinc-500">{role}, {company}</p>
      </div>
    </div>
    {/* {audioSrc && <AudioPlayer src={audioSrc} />} */}
  </div>
);

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-zinc-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-display font-bold text-white mb-12 text-center">
          What Founders Say
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <TestimonialCard
            quote="Aizaz Studio felt less like an agency and more like our own team. The engineer we hired onboarded in 2 days and pushed code to production on day 4."
            author="Mo"
            role="Founder"
            company="1Archiver - Middleast"
            audioSrc="/public/1archiver-testimonial.m4a"
          />
          <TestimonialCard
            quote="This was a short engagement focused on getting some backend routes wired up for a travel app MVP. Ali from Aizaz Studios helped get a few key pieces in place during the early setup phase."
            author="Adam C."
            role="Founder"
            company="MVP Travel App - United States"
            audioSrc="/audio/testimonial-david.m4a"
          />
          <TestimonialCard
            quote="Aizaz Studio was a game-changer for our startup. The team was responsive, professional, and delivered high-quality work on time."
            author="Ayaz K."
            role="Founder"
            company="TradingDojo - Pakistan"
            audioSrc="/audio/testimonial-elena.mp3"
          />
        </div>
      </div>
    </section>
  );
};