import { useRef, useCallback } from 'react';
import { getPrice, getAnnualTotal } from '../data/pricingMatrix';


export function usePriceRegistry() {
  // Map of tierId -> { priceNode, annualNode }
  const registryRef = useRef(new Map());
  
  const selectionRef = useRef({ cycle: 'monthly', currency: 'USD' });

  const paintOne = useCallback((tierId, priceNode, annualNode) => {
    const { cycle, currency } = selectionRef.current;
    const { formatted } = getPrice(tierId, cycle, currency);
    if (priceNode) {
      priceNode.textContent = formatted;
    }
    if (annualNode) {
      annualNode.textContent =
        cycle === 'annual'
          ? `Billed annually at ${getAnnualTotal(tierId, currency)}`
          : 'Billed monthly';
    }
  }, []);

  const register = useCallback(
    (tierId, priceNode, annualNode) => {
      registryRef.current.set(tierId, { priceNode, annualNode });
      
      paintOne(tierId, priceNode, annualNode);
      return () => registryRef.current.delete(tierId);
    },
    [paintOne]
  );

  const paintAll = useCallback(() => {
    registryRef.current.forEach(({ priceNode, annualNode }, tierId) => {
      paintOne(tierId, priceNode, annualNode);
    });
  }, [paintOne]);

  const setCycle = useCallback(
    (cycle) => {
      selectionRef.current.cycle = cycle;
      paintAll();
    },
    [paintAll]
  );

  const setCurrency = useCallback(
    (currency) => {
      selectionRef.current.currency = currency;
      paintAll();
    },
    [paintAll]
  );

  return {
    register,
    setCycle,
    setCurrency,
    getSelection: () => ({ ...selectionRef.current }),
  };
}
