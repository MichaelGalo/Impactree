"use client"

import AboutFooter from "@/components/about/AboutFooter";
import AboutHow from "@/components/about/AboutHow";
import AboutWhy from "@/components/about/AboutWhy";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleExploreClick = () => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      router.push('/charities');
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero content */}
      <section className="py-40">
        <div className="max-w-5xl container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left column: Text content */}
            <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0">
              <h2 className="text-4xl font-bold mb-4">Supporting a Great Cause Should Be Easy</h2>
              <p className="text-lg mb-8">
                With <strong>Impactree</strong>, you can easily discover charities doing amazing work and see the real-world impact of your giving at a glance at no cost.
                <br /><br />
                Set giving goals based on your income, visualize your long-term impact, and watch your seeds of change grow. Impactree makes philanthropy approachable for anyone, with clarity, helping you see how even small donations can make a big difference over time.
              </p>
              <hr className="border-black dark:border-white my-4" />
              <div className="flex justify-center mt-8">
              <button 
              className="primaryButtonClasses"
              onClick={handleExploreClick}
              >
              Explore Charities & Causes
            </button>
              </div>
            </div>
            {/* Right column: Logo */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <img src="/hero-image.webp" alt="Hero Logo" className="max-w-full max-h-96" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <AboutWhy/>

      {/* How Section */}
      <AboutHow/>

      {/* Footer Content */}
      <AboutFooter/>
    </div>
  );
}

export default Home;