export default function Demo() {
  return (
    <section className="bg-neutral-950 py-24 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          Live AI Demo
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Chat */}
          <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800">
            <p className="text-purple-400 mb-2">AI Chat</p>
            <div className="space-y-3 text-sm text-gray-300">
              <p><b>You:</b> Make headings bold and 18pt</p>
              <p><b>AI:</b> Applied changes to all headings.</p>
              <p><b>You:</b> Add spacing after paragraphs</p>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800">
            <p className="text-purple-400 mb-2">Document Preview</p>
            <div className="h-48 bg-neutral-800 rounded-md flex items-center justify-center text-gray-500">
              Live Document Preview
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
