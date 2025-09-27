import React from 'react'

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 px-6 text-center bg-white">
      <h2 className="text-4xl font-heading text-landing-primary mb-6">
        Pricing
      </h2>
      <p className="text-lg text-landing-text-muted mb-12">
        Free while in beta. Flexible plans coming soon.
      </p>
      <div className="bg-gray-50 p-8 rounded-2xl shadow-md max-w-md mx-auto">
        <h3 className="text-2xl font-heading text-landing-secondary mb-4">
          Beta Access
        </h3>
        <p className="text-lg mb-6">Full access to all features. No credit card required.</p>
        <button className="bg-landing-primary text-white px-6 py-3 rounded-lg font-heading">
          Get Started Free
        </button>
      </div>
    </section>
  )
}

export default Pricing