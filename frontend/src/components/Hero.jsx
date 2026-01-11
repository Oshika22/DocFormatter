import FloatingShape from "./FloatingShape";
import { bgdark } from "../assets";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center bg-black">

      {/* Floating Objects */}
      <FloatingShape
        className="w-40 h-40 bg-gradient-to-br from-purple-500 to-pink-500 top-20 left-24"
        delay={0}
      />
      <FloatingShape
        className="w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-600 top-32 right-80"
        delay={1}
      />
      <FloatingShape
        className="w-48 h-48 bg-gradient-to-br from-fuchsia-500 to-purple-700 bottom-20 left-60"
        delay={2}
      />
      <FloatingShape
        className="w-36 h-36 bg-gradient-to-br from-violet-400 to-indigo-600 bottom-28 right-24"
        delay={1.5}
      />

      {/* Text Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-white text-5xl md:text-6xl font-bold tracking-wide">
          AI Word Doc Formatter
        </h1>
        <p className="mt-4 text-gray-400 uppercase tracking-widest text-sm">
          Automation • Continuous Chat • Live Preview
        </p>
      </div>
    </section>
  );
}
