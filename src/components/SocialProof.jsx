const LOGOS = ['Northwind', 'Verbena Labs', 'Outset', 'Cascade Health', 'Ferro Systems'];

export default function SocialProof() {
  return (
    <section id="proof" className="social-proof" aria-labelledby="proof-heading">
      <p className="section-eyebrow">// SOCIAL PROOF</p>
      <h2 id="proof-heading" className="social-proof__heading">
        Trusted by automation-first teams
      </h2>
      <ul className="social-proof__logos" aria-label="Customer companies">
        {LOGOS.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </section>
  );
}
