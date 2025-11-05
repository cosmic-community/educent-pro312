export default function Hero() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-white -z-10"></div>
      
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Column - 7 cols */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Educent Pro — <span className="text-gradient">Run your institute like a CEO</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Complete institute management platform with attendance tracking, reward systems, and real-time insights for modern educational excellence.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
              <button className="px-8 py-3 gradient-primary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all">
                Get Started (Create Institute)
              </button>
              <button className="px-8 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-blue-50 transition">
                See Demo
              </button>
            </div>
            
            {/* Trust Row */}
            <div className="flex items-center gap-6 text-sm text-gray-500 justify-center lg:justify-start">
              <span>Trusted by:</span>
              <div className="flex gap-4">
                <span className="font-semibold">DPS</span>
                <span className="font-semibold">KV</span>
                <span className="font-semibold">DAV</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}