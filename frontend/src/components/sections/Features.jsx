import React from 'react'

const Features = () => {
  const features = [
    { title: "Projects", desc: "Create and manage multiple projects effortlessly." },
    { title: "Stages", desc: "Organize projects into structured stages like SOW." },
    { title: "Tasks", desc: "Assign, update, and track tasks within each stage." },
    { title: "Analytics", desc: "View progress % and task statistics instantly." },
  ];

  return (
    <section id="features" className="py-20 px-6 bg-white">
      <h2 className="text-4xl font-heading text-center text-landing-primary mb-12">
        Features
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <div key={i} className="bg-gray-50 p-6 rounded-xl shadow-sm text-center">
            <h3 className="text-xl font-heading text-landing-secondary mb-2">
              {f.title}
            </h3>
            <p className="text-landing-text-muted">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features