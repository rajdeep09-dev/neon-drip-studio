const TICKER_TEXT =
  "SINGLE ORIGIN \u2727 SPECIALTY GRADE \u2727 SMALL BATCH ROASTED \u2727 OPEN DAILY \u2727 NOT CORPORATE \u2727 ACTUALLY GOOD COFFEE \u2727 DRIP COFFEE STUDIO \u2727 ";

const MarqueeTicker = () => (
  <section className="relative z-10 w-full border-y border-foreground/[0.06] glass-dark py-4 overflow-hidden">
    <div className="marquee-track whitespace-nowrap">
      {[0, 1].map((i) => (
        <span
          key={i}
          className="font-heading font-bold text-sm md:text-base uppercase tracking-[0.1em] text-foreground/40 shrink-0"
        >
          {TICKER_TEXT.split("\u2727").map((segment, j) => (
            <span key={j}>
              {segment}
              {j < TICKER_TEXT.split("\u2727").length - 1 && (
                <span className="text-primary mx-1">✦</span>
              )}
            </span>
          ))}
        </span>
      ))}
    </div>
  </section>
);

export default MarqueeTicker;
