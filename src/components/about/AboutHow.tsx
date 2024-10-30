import Image from 'next/image';
import React from 'react';

export const AboutHow: React.FC = () => {
    return (
    <>
    {/* How Section */}
      <section className="py-16">
      <div className="max-w-5xl container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left column: Logo */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start mb-8 md:mb-0">
            <div className="relative shadow-[0_0_15px_rgba(0,0,0,0.4)] dark:shadow-[0_0_15px_rgba(255,255,255,0.4)] rounded-lg p-2 bg-white dark:bg-gray-800">
              <Image 
                src="/explore.png" 
                alt="Explore Charities Screenshot" 
                width={400} 
                height={300}
                className="max-w-md max-h-96 object-contain rounded-lg" 
              />
            </div>
          </div>
          {/* Right column: Text content */}
          <div className="w-full md:w-1/2 pl-0 md:pl-8">
            <h2 className="text-4xl font-bold mb-4">Explore Curated Charities</h2>
            <p className="text-lg mb-8">
              We know that finding a charity you can trust to steward your impact is tough.
              <br /><br />
              Our goal is not to give you endless options for giving, but to simplify the search process by offering a curated list of organizations that we belive are doing amazing work in the world. More are being added every year, but we believe in supporting these selected charities year over year.   
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* How Section Continued */}
    <section className="py-16">
      <div className="max-w-5xl container mx-auto px-4">
        <div className="flex flex-col md:flex-row-reverse items-center">
          {/* Right column: Logo */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-8 md:mb-0">
            <div className="relative shadow-[0_0_15px_rgba(0,0,0,0.4)] dark:shadow-[0_0_15px_rgba(255,255,255,0.4)] rounded-lg p-2 bg-white dark:bg-gray-800">
              <Image 
                src="/dashboard.png" 
                alt="Impact Dashboard Screenshot" 
                width={400} 
                height={300}
                className="max-w-md max-h-96 object-contain rounded-lg" 
              />
            </div>
          </div>
          {/* Left column: Text content */}
          <div className="w-full md:w-1/2 pr-0 md:pr-8">
            <h2 className="text-4xl font-bold mb-4">Visualize Your Impact Potential</h2>
            <p className="text-lg mb-8">
              Regardless how much you choose to steward, gain insights on your planned impact instantly.
              <br /><br />
              Organizations will often report annually or quarterly on impact that you support, but with our impact dashboard you can instantly project your annual impact potential with reporting metrics provided by the organizations. Each charity added provides their own metric & ratio of dollar to impact.
            </p>
          </div>
        </div>
      </div>
    </section>
    </>
    )
}

export default AboutHow;