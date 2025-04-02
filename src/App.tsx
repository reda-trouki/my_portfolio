import { ApolloProvider } from '@apollo/client';
import { client } from './lib/apollo-client';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SparklesCore } from "@/components/ui/sparkles";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Header from "./components/Header";
import { Hero } from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import CustomCursor from "./components/CustomCursor";
import Footer from './components/Footer';
import Contact from './components/Contact';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen bg-black text-white overflow-hidden">
        {/* Custom Cursor */}
        <CustomCursor />

        <div>
          {/* Enhanced Background */}
          <div className="fixed inset-0 w-full h-full">
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={100}
              className="w-full h-full parallax-bg"
              particleColor="#FFFFFF"
              data-speed={0.5}
            />
            <BackgroundBeams className="opacity-40" />
          </div>

          {/* Main Content */}
          <div data-speed={0.9}>
            <Header />
            <Hero />
            <About />
            <Projects />
            <Contact />
            <Footer />
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;


