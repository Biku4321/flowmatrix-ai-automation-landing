import { useRef, useEffect, useState } from 'react';
import { tiers } from '../data/pricingMatrix';
import { usePriceRegistry } from '../hooks/usePriceRegistry';
import Icon from './icons/Icon';

const CURRENCY_LIST = ['USD', 'INR', 'EUR'];

function PriceCard({ tier, register }) {
  const priceNodeRef = useRef(null);
  const annualNodeRef = useRef(null);

  useEffect(() => {
    const unregister = register(tier.id, priceNodeRef.current, annualNodeRef.current);
    return unregister;
  }, [register, tier.id]);

  return (
    <article
      className={`price-card ${tier.highlighted ? 'price-card--highlighted' : ''}`}
      aria-labelledby={`tier-${tier.id}-name`}
    >
      {tier.highlighted && <span className="price-card__badge">Most popular</span>}

      <Icon name="cog-8-tooth" size={22} className="price-card__icon" />
      <h3 id={`tier-${tier.id}-name`} className="price-card__name">
        {tier.name}
      </h3>
      <p className="price-card__tagline">{tier.tagline}</p>

      <div className="price-card__price-row">
        <span className="price-card__amount" ref={priceNodeRef} />
        <span className="price-card__period">/mo</span>
      </div>

      <p className="price-card__billing-note" ref={annualNodeRef} />

      <ul className="price-card__features">
        {tier.features.map((f) => (
          <li key={f}>
            <Icon name="chevron-right" size={14} className="price-card__feature-icon" />
            {f}
          </li>
        ))}
      </ul>

      <button type="button" className="price-card__cta">
        Choose {tier.name}
      </button>
    </article>
  );
}

function CycleToggle({ onChange }) {
  const [activeCycle, setActiveCycle] = useState('monthly');

  const handleClick = (cycle) => {
    setActiveCycle(cycle);
    onChange(cycle);
  };

  return (
    <div className="billing-toggle" role="group" aria-label="Billing cycle">
      <button
        type="button"
        aria-pressed={activeCycle === 'monthly'}
        className="billing-toggle__btn"
        onClick={() => handleClick('monthly')}
      >
        Monthly
      </button>
      <button
        type="button"
        aria-pressed={activeCycle === 'annual'}
        className="billing-toggle__btn"
        onClick={() => handleClick('annual')}
      >
        Annual
        <span className="billing-toggle__discount-pill">Save 20%</span>
      </button>
    </div>
  );
}

function CurrencySwitcher({ onChange }) {
  const [activeCurrency, setActiveCurrency] = useState('USD');

  const handleClick = (currency) => {
    setActiveCurrency(currency);
    onChange(currency);
  };

  return (
    <div className="currency-switcher" role="group" aria-label="Currency">
      {CURRENCY_LIST.map((currency) => (
        <button
          key={currency}
          type="button"
          aria-pressed={activeCurrency === currency}
          className="currency-switcher__btn"
          onClick={() => handleClick(currency)}
        >
          {currency}
        </button>
      ))}
    </div>
  );
}

export default function PricingSection() {
  const { register, setCycle, setCurrency } = usePriceRegistry();

  return (
    <section id="pricing" className="pricing-section" aria-labelledby="pricing-heading">
      <div className="pricing-section__header">
        <p className="section-eyebrow">// PRICING</p>
        <h2 id="pricing-heading">Simple, transparent pricing</h2>
        <p>Pick a plan. Switch currency or billing cycle anytime — no surprises.</p>
      </div>

      <div className="pricing-section__controls">
        <CycleToggle onChange={setCycle} />
        <CurrencySwitcher onChange={setCurrency} />
      </div>

      <div className="pricing-section__grid">
        {tiers.map((tier) => (
          <PriceCard key={tier.id} tier={tier} register={register} />
        ))}
      </div>
    </section>
  );
}
