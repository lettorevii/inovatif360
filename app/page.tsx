import dynamic from 'next/dynamic';

// Dynamic import ile client-side components
const Hero = dynamic(() => import('@/components/main/Hero'), {
  ssr: false,
  loading: () => <div className="h-screen flex items-center justify-center">
    <div className="animate-pulse text-purple-400">Loading Hero...</div>
  </div>
});

const Skills = dynamic(() => import('@/components/main/Skills'), {
  ssr: false,
  loading: () => <div className="h-96 flex items-center justify-center">
    <div className="animate-pulse text-purple-400">Loading Skills...</div>
  </div>
});

const Encryption = dynamic(() => import('@/components/main/Encryption'), {
  ssr: false,
  loading: () => <div className="h-96 flex items-center justify-center">
    <div className="animate-pulse text-purple-400">Loading Encryption...</div>
  </div>
});

const Projects = dynamic(() => import('@/components/main/Projects'), {
  ssr: false,
  loading: () => <div className="h-96 flex items-center justify-center">
    <div className="animate-pulse text-purple-400">Loading Projects...</div>
  </div>
});

const TestimonialsSphere = dynamic(() => import('@/components/main/TestimonialsSphere'), {
  ssr: false,
  loading: () => <div className="h-96 flex items-center justify-center">
    <div className="animate-pulse text-purple-400">Loading Testimonials...</div>
  </div>
});

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <Skills />
        <Encryption />
        <Projects />
        <TestimonialsSphere />
      </div>
    </main>
  );
}
