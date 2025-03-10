import React from 'react';

const CTASection = () => {
  return (
    <section className="py-24 px-6 bg-neutral-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1579008781559-5c05f95b6d0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Madrid Skyline"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-light mb-6">
          Start Your Madrid Luxury Journey
        </h2>
        <p className="font-montserrat text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          Whether you're relocating to Madrid or seeking the perfect investment property,
          our team is ready to guide you through every step of the process.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="btn-luxury">Schedule a Consultation</button>
          <button className="btn-luxury-dark">View Properties</button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
