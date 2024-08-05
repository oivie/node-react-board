import React from 'react';
import promoImage from '../../assets/img/mir.jpg'

const LandingSection = () => {
  return (
    <section className="bg-light-gray py-12">
      <div className="container mx-auto flex flex-wrap items-center">
        <div className="w-full md:w-1/2 px-4">
          <p className="text-lg md:text-xl mb-63">Join events, learn new skills, and network with tech enthusiasts.</p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-3">Discover Your Next Tech Adventure</h1>
          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-100 text-dark-blue-800 rounded-full px-4 py-2">AI & Robotics</button>
            <button className="bg-blue-100 text-dark-blue-800 rounded-full px-4 py-2">Data Analytics</button>
            <button className="bg-blue-100 text-dark-blue-800 rounded-full px-4 py-2">Machine Learning</button>
            <button className="bg-blue-100 text-dark-blue-800 rounded-full px-4 py-2">Blockchain Technology</button>
            <button className="bg-blue-100 text-dark-blue-800 rounded-full px-4 py-2">UI/UX Design</button>
          </div>
          {/* <div className="mt-6 flex gap-4">
            <button className="bg-dark-blue-800 text-white rounded-full px-6 py-2">Contact us</button>
            <a href="mailto:contact@example.com" className="text-blue-500">contact@example.com</a>
          </div> */}
        </div>
        <div className="w-full md:w-1/2 px-4 mt-8 md:mt-0">
          <img src={promoImage} alt="Promo" className="rounded-xl shadow-lg w-full h-auto" />
          {/* <div className="bg-white rounded-xl shadow-lg p-4 mt-4">
            <p className="text-xs uppercase text-gray-500 mb-1">Promotion</p>
            <h2 className="text-lg font-bold mb-2">Full health checkup</h2>
            <p className="text-sm text-gray-700">Get 50% off from November 15 to 20, 2023.</p>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default LandingSection;
