This is a demo of AI generated summaries of customer reviews for an e-commerce storefront.

The demo takes a set of customer reviews, and uses an LLM to create summaries of those reviews.
It then displays the summary and the reviews in a demo UI.

The benefit of such an AI summary is that the user can get a quick overview of the sentiment
of reviewers of the product without reading them all.

[A deployed version can be found here.](https://review-summary.vercel.app/)

[Install the template on Vercel](https://vercel.com/templates/next.js/customer-reviews-ai-summary-nextjs-vercel)

## Getting Started

First, run the development server:

```bash
pnpm dev
```

## AI key

This demo requires an API key for Perplexity's inference API. This can be installed via
[Vercel's AI Marketplace](https://vercel.com/docs/integrations/ai).

Any other LLM model can be connected via minimal changes to `lib/ai-summary.ts` through [Vercel's AI SDK](https://sdk.vercel.ai/docs).
