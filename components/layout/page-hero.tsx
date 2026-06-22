interface PageHeroProps {
  title: string
  subtitle?: string
  compact?: boolean
}

export function PageHero({ title, subtitle, compact = false }: PageHeroProps) {
  return (
    <section className="relative border-b border-red-500/20 bg-black overflow-hidden" aria-labelledby="page-title">
      <div className="absolute inset-0 bg-gradient-to-b from-red-500/[0.08] via-red-500/[0.02] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 max-w-xl h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

      <div
        className={`container mx-auto max-w-7xl relative z-10 text-center px-4 sm:px-6 lg:px-8 pb-10 md:pb-12 ${
          compact ? "pt-4 md:pt-6" : "pt-[5.5rem] md:pt-28"
        }`}
      >
        <h1 id="page-title" className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-orbitron mb-3 md:mb-4 fade-in">
          {title}
        </h1>
        {subtitle && (
          <p
            className="text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto font-geist leading-relaxed fade-in-subtitle px-2"
            style={{ animationDelay: "0.15s" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
