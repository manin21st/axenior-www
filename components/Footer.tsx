export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-bebas text-xl tracking-widest">
          <span className="gradient-text">AX</span>
          <span className="text-silver">ENIOR</span>
        </span>
        <p className="font-jetbrains text-xs text-silver/50">
          © {new Date().getFullYear()} AXENIOR. AI Transformation, Senior Expertise.
        </p>
      </div>
    </footer>
  )
}
