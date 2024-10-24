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
            <Image 
              src="/placeholder.png" 
              alt="Placeholder" 
              width={400} 
              height={300}
              className="max-w-md max-h-96 object-contain" 
            />
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

    {/* How Section Continued */}
    <section className="py-16">
      <div className="max-w-5xl container mx-auto px-4">
        <div className="flex flex-col md:flex-row-reverse items-center">
          {/* Right column: Logo */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-8 md:mb-0">
            <Image 
              src="/placeholder.png" 
              alt="Placeholder" 
              width={400} 
              height={300}
              className="max-w-md max-h-96 object-contain" 
            />
          </div>
          {/* Left column: Text content */}
          <div className="w-full md:w-1/2 pr-0 md:pr-8">
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
    </>
    )
}

export default AboutHow;