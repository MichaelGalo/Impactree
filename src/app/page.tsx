"use client"

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

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
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
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
      <section className="py-16">
        <div className="max-w-5xl container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Why Impactree?</h2>
          <p className="text-lg mb-8">
            After spending around a decade working with non-profit organizations and B-Corp brands, I've noticed several patterns that Impactree aims to address:
          </p>
          <ul className="list-disc pl-6 space-y-6 mb-8">
            <li className="text-lg">
              <strong>Easier access to meaningful impact:</strong> Fighting for causes you believe in and finding organizations that implement impactful solutions shouldn't require you to be a detective or internet sleuth.
            </li>
            <li className="text-lg">
              <strong>Willingness to contribute:</strong> Unless someone is looking for in-person volunteer opportunities, people are often eager to give financial or other resources to impact causes they believe in.
            </li>
            <li className="text-lg">
              <strong>Time-efficient decision making:</strong> With limited time and energy for research, people often rely on word-of-mouth or trusted recommendations to direct their philanthropy funds.
            </li>
            <li className="text-lg">
              <strong>Inclusive impact:</strong> Individuals from all socioeconomic backgrounds desire to help others, but some may feel their donations aren't making a significant impact based on the limited ability of organizations to communicate with some of their smaller figure donors. 
            </li>
          </ul>
          <p className="text-lg">
            With Impactree, no matter how big or small your donation intentions are, you will discover charities easily & track your impact with clarity. We believe that sowing seeds of change will grow into many branches of impact, and it's our desire to empower you to watch your tree grow. 
          </p>
        </div>
      </section>

      {/* How Section */}
      <section className="py-16">
        <div className="max-w-5xl container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left column: Logo */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-start mb-8 md:mb-0">
              <img src="/placeholder.png" alt="Placeholder" className="max-w-md max-h-96" />
            </div>
            {/* Right column: Text content */}
            <div className="w-full md:w-1/2 pl-0 md:pl-8">
              <h2 className="text-4xl font-bold mb-4">This Title Covers the How To Section</h2>
              <p className="text-lg mb-8">
                This will be a section with more information on how to use the dashboard.
                <br /><br />
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, recusandae quos a maiores blanditiis temporibus hic ad commodi est saepe deserunt ducimus magni vel tempore error corrupti iste nisi delectus. 
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Content */}
      <footer className="py-4 flex justify-center mt-auto">
        <p>© 2024 Impactree. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;