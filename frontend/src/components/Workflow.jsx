const steps = [
  {
    step: "01",
    title: "Upload Document",
    desc: "Upload your Word document securely."
  },
  {
    step: "02",
    title: "AI Analysis",
    desc: "AI analyzes structure, styles, and formatting issues."
  },
  {
    step: "03",
    title: "Chat & Refine",
    desc: "Chat with AI to adjust formatting decisions."
  },
  {
    step: "04",
    title: "Preview & Export",
    desc: "Preview changes and export final document."
  }
];

export default function Workflow() {
  return (
    <section className="bg-black py-24 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          How It Works
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="relative">
              <div className="text-purple-500 text-5xl font-bold mb-4">
                {s.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
