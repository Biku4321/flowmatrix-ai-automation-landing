import { useBentoAccordionState } from '../hooks/useBentoAccordionState';
import Icon from './icons/Icon';



const FEATURES = [
  {
    icon: 'arrow-path',
    title: 'Adaptive Pipelines',
    summary: 'Workflows that re-route around failures without a human in the loop.',
    detail:
      'Every pipeline run is graphed in real time. If a step fails or a dependency times out, the engine reroutes through a pre-validated fallback path and logs the deviation for review — no manual intervention required.',
  },
  {
    icon: 'cube-16-solid',
    title: 'Live Data Mesh',
    summary: 'One schema-aware layer across every connected source.',
    detail:
      'Connect databases, APIs, and event streams once. The mesh normalizes schemas on the fly, so downstream automations never break when an upstream field changes shape.',
  },
  {
    icon: 'arrow-trending-up',
    title: 'Predictive Throttling',
    summary: 'Forecasts load spikes before they happen, not after.',
    detail:
      'A lightweight forecasting model watches historical and live traffic patterns to pre-scale execution capacity minutes ahead of a spike, instead of reacting once latency has already degraded.',
  },
  {
    icon: 'chart-pie',
    title: 'Audit-Grade Logging',
    summary: 'Every automated decision is traceable, end to end.',
    detail:
      'Each action taken by an automation is recorded with the exact inputs, model version, and decision path that produced it — exportable for compliance review in one click.',
  },
];

function BentoNode({ feature, index, isActive, onActivate, onDeactivate }) {
  return (
    <div
      className={`bento-node ${isActive ? 'bento-node--active' : ''}`}
      tabIndex={0}
      role="button"
      aria-expanded={isActive}
      onMouseEnter={() => onActivate(index)}
      onFocus={() => onActivate(index)}
      onMouseLeave={onDeactivate}
      onBlur={onDeactivate}
    >
      <Icon name={feature.icon} size={28} className="bento-node__icon" />
      <h3 className="bento-node__title">{feature.title}</h3>
      <p className="bento-node__summary">{feature.summary}</p>
      <div className="bento-node__detail-wrapper">
        <p className="bento-node__detail">{feature.detail}</p>
      </div>
    </div>
  );
}

function AccordionPanel({ feature, index, isOpen, onToggle }) {
  return (
    <div className={`accordion-panel ${isOpen ? 'accordion-panel--open' : ''}`}>
      <button
        type="button"
        className="accordion-panel__trigger"
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${index}`}
        onClick={() => onToggle(index)}
      >
        <span className="accordion-panel__trigger-label">
          <Icon name={feature.icon} size={18} className="accordion-panel__icon" />
          <span>{feature.title}</span>
        </span>
        <Icon name="chevron-down" size={18} className="accordion-panel__chevron" />
      </button>
      <div
        id={`accordion-content-${index}`}
        className="accordion-panel__content"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="accordion-panel__content-inner">
          <p>{feature.summary}</p>
          <p>{feature.detail}</p>
        </div>
      </div>
    </div>
  );
}

export default function FeatureShowcase() {
  const { isMobile, activeIndex, setActive } = useBentoAccordionState(FEATURES.length);

  return (
    <section id="features" className="feature-showcase" aria-labelledby="features-heading">
      <div className="feature-showcase__header">
        <p className="section-eyebrow">// CAPABILITIES</p>
        <h2 id="features-heading">Built for how automation actually breaks</h2>
        <p>Four systems that work together so your pipelines don't need babysitting.</p>
      </div>

      <div className="bento-grid" data-layout="bento" aria-hidden={isMobile}>
        {FEATURES.map((feature, index) => (
          <BentoNode
            key={feature.title}
            feature={feature}
            index={index}
            isActive={activeIndex === index}
            onActivate={setActive}
            onDeactivate={() => {}}
          />
        ))}
      </div>

      <div className="accordion-list" data-layout="accordion" aria-hidden={!isMobile}>
        {FEATURES.map((feature, index) => (
          <AccordionPanel
            key={feature.title}
            feature={feature}
            index={index}
            isOpen={activeIndex === index}
            onToggle={setActive}
          />
        ))}
      </div>
    </section>
  );
}
