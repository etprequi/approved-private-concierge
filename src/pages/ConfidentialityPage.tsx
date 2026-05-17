import React from 'react';

export default function ConfidentialityPage() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="font-serif text-4xl mb-6">Confidentiality Agreement</h1>
      <p className="text-silver leading-relaxed mb-6">Approved Private Concierge and its partners treat client information with the highest confidentiality. By engaging with us you agree to keep operational details, provider identities, and sensitive logistics private.</p>
      <h2 className="font-semibold mt-6">Scope</h2>
      <p className="text-silver leading-relaxed">Confidential information includes but is not limited to personal data, travel plans, provider identities, pricing and special requests shared in the context of delivering services.</p>
      <h2 className="font-semibold mt-6">Exceptions</h2>
      <p className="text-silver leading-relaxed">We may disclose information when required by law or to provide services with the necessary providers, always minimising disclosure and protecting client interests.</p>
    </div>
  );
}
