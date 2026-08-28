import React from 'react';
import { BOOKING_URL } from '../data/siteConfig';

export const CTA: React.FC = () => {
  return (
    <section className="page-hero" style={{ paddingTop: 0 }}>
      <div className="c-wrap">
        <p className="c-micro c-red">Start here</p>
        <h2 className="page-h2">Turn one workflow into a working system.</h2>
        <p className="c-lede page-hero__lede">
          Book a call to map the highest-impact automation, or start with a 14-day sprint and ship something your team can use.
        </p>
        <div className="page-hero__actions">
          <a className="c-btn" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Book a Free Call
          </a>
          <a className="c-btn c-btn--ghost" href="/ai-systems-sprint">
            See the Sprint Offer
          </a>
        </div>
      </div>
    </section>
  );
};
