import type { Metadata } from 'next';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { siteUrl } from '@/constants';
import { homepageJsonLd } from '@/lib/seo';
import { Hero } from './_sections/hero';
import { TrustStrip } from './_sections/trust-strip';
import { TwoPaths } from './_sections/two-paths';
import { FeaturedWork } from './_sections/featured-work';
import { HowWeDeliver } from './_sections/how-we-deliver';
import { WorkingModel } from './_sections/working-model';

/**
 * The homepage, complete.
 *
 * Cut over from /home-preview in M7.2. `(marketing)` no longer owns `/`.
 * resolves to /, and two pages cannot claim the same path. At cutover this
 * file becomes `(site)/page.tsx`, the marketing group is retired, and the
 * noindex comes off.
 */
export const metadata: Metadata = {
  alternates: { canonical: siteUrl },
};

export default function HomePreviewPage() {
  return (
    <>
      {/* Restored in M7.4. Deleting the old marketing homepage in M7.2 removed
          the Organization, WebSite, LocalBusiness and navigation records with
          it. Rebuilt in lib/seo.ts against the current positioning. */}
      {homepageJsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <Header />

      <main id="main">
        <Hero />
        <TrustStrip />
        <TwoPaths />
        <FeaturedWork />
        <HowWeDeliver />
        <WorkingModel />
      </main>

      <Footer />
    </>
  );
}
