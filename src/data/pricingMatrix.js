

export const CURRENCIES = {
  USD: { symbol: '$', code: 'USD', locale: 'en-US' },
  INR: { symbol: '₹', code: 'INR', locale: 'en-IN' },
  EUR: { symbol: '€', code: 'EUR', locale: 'de-DE' },
};

export const BILLING_CYCLES = {
  monthly: { id: 'monthly', label: 'Monthly', periodSuffix: '/mo' },
  annual: { id: 'annual', label: 'Annual', periodSuffix: '/mo' },
};


export const ANNUAL_DISCOUNT_MULTIPLIER = 0.8;


export const regionalTariffs = {
  USD: 1.0,
  INR: 82.4, 
  EUR: 0.93, 
};


export const tiers = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'For solo builders automating their first workflows.',
    baseTierRate: 29,
    features: [
      'Up to 3 automated pipelines',
      '10k task executions / month',
      'Community support',
      'Core integrations',
    ],
    highlighted: false,
  },
  {
    id: 'scale',
    name: 'Scale',
    tagline: 'For growing teams running automation at volume.',
    baseTierRate: 99,
    features: [
      'Unlimited automated pipelines',
      '250k task executions / month',
      'Priority support (24h SLA)',
      'Advanced integrations + webhooks',
      'Role-based access control',
    ],
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'For orgs that need governance, scale, and uptime.',
    baseTierRate: 299,
    features: [
      'Unlimited everything',
      'Dedicated infrastructure',
      'Custom SLAs + audit logs',
      'SSO / SCIM provisioning',
      'Dedicated solutions engineer',
    ],
    highlighted: false,
  },
];

/**
 * Compute the final displayable price for a tier/cycle/currency combination.
 *
 * @param {string} tierId - one of tiers[].id
 * @param {'monthly'|'annual'} cycle
 * @param {'USD'|'INR'|'EUR'} currency
 * @returns {{ amount: number, formatted: string, periodSuffix: string }}
 */
export function getPrice(tierId, cycle, currency) {
  const tier = tiers.find((t) => t.id === tierId);
  if (!tier) throw new Error(`Unknown tier: ${tierId}`);

  const tariff = regionalTariffs[currency];
  if (tariff === undefined) throw new Error(`Unknown currency: ${currency}`);

  const cycleMeta = BILLING_CYCLES[cycle];
  if (!cycleMeta) throw new Error(`Unknown cycle: ${cycle}`);

  
  const tariffedMonthly = tier.baseTierRate * tariff;

  
  const effectiveMonthly =
    cycle === 'annual'
      ? tariffedMonthly * ANNUAL_DISCOUNT_MULTIPLIER
      : tariffedMonthly;

  
  const rounded = Math.round(effectiveMonthly);

  const { symbol, locale } = CURRENCIES[currency];
  const formatted = `${symbol}${rounded.toLocaleString(locale)}`;

  return {
    amount: rounded,
    formatted,
    periodSuffix: cycleMeta.periodSuffix,
  };
}


export function getAnnualTotal(tierId, currency) {
  const { amount } = getPrice(tierId, 'annual', currency);
  const total = amount * 12;
  const { symbol, locale } = CURRENCIES[currency];
  return `${symbol}${total.toLocaleString(locale)}`;
}
