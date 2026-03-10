import { useEffect } from 'react';

export const useUtm = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utms = ['utm_source', 'utm_medium', 'utm_campaign'];

    utms.forEach(utm => {
      const value = params.get(utm);
      if (value) {
        sessionStorage.setItem(utm, value);
      }
    });
  }, []);
};