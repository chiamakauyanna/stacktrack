import React from 'react'

const HowItWorks = () => {
  const steps = [
    { step: "1", title: "Create a Project", desc: "Start with a simple project setup." },
    { step: "2", title: "Add Stages & Tasks", desc: "Break work into manageable pieces." },
    { step: "3", title: "Track Progress", desc: "Monitor completion rates automatically." },
  ];

  return (
    <section className="py-20 px-6 bg-gray-50 text-center">
      <h2 className="text-4xl font-heading text-landing-primary mb-12">
        How It Works
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {steps.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-3xl font-heading text-landing-accent mb-4">
              {s.step}
            </h3>
            <h4 className="text-xl font-heading mb-2">{s.title}</h4>
            <p className="text-landing-text-muted">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HowItWorks