import balanceText from 'balance-text';
import { useEffect } from 'react';

const TextBalancer = () => {
  useEffect(() => {
    balanceText();
  });
  return null;
}

export default TextBalancer;
