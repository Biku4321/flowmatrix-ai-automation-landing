export default function Hero() {
  return (
    <section id="top" className="hero" aria-label="Introduction">
      <p className="hero__eyebrow section-eyebrow" data-entrance="1">// AI-DRIVEN AUTOMATION, END TO END</p>
      <h1 className="hero__heading" data-entrance="2">
        Automation that adapts<br />while you sleep
      </h1>
      <p className="hero__subheading" data-entrance="3">
        Flowmatrix watches your pipelines, predicts failures before they happen,
        and reroutes around them automatically — so your team stops firefighting
        and starts shipping.
      </p>
      <div className="hero__actions" data-entrance="3">
        <a href="#pricing" className="hero__cta-primary">Start free trial</a>
        <a href="#features" className="hero__cta-secondary">See how it works</a>
      </div>
    </section>
  );
}
