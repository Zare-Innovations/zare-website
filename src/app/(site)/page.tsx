import type { Metadata } from 'next';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { siteUrl } from '@/constants';
import { homepageJsonLd } from '@/lib/seo';
// Möbius hero variant. To go back to the Z-mark hero, swap this single
// import for `import { Hero } from './_sections/hero'` and render <Hero />.
import { HeroMobius } from './_sections/hero-mobius';
import { TrustStrip } from './_sections/trust-strip';
import { TwoPaths } from './_sections/two-paths';
import { FeaturedWork } from './_sections/featured-work';
import { HowWeDeliver } from './_sections/how-we-deliver';
import { WorkingModel } from './_sections/working-model';
import { Security } from './_sections/security';
import { People } from './_sections/people';
import { ContactCta } from './_sections/contact-cta';

/**
 * The homepage.
 *
 * Cut over from /home-preview in M7.2. `(marketing)` no longer owns `/`.
 *
 * Section order follows the approved eight-part architecture:
 *
 *   Act I   orientation   Hero, Trust
 *   Act II  evidence      Two paths, Work and results, How we deliver,
 *                         Working model, Security and IP
 *   Act III people        The people, Contact
 */
export const metadata: Metadata = {
  alternates: { canonical: siteUrl },
};

export default function HomePage() {
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
        <HeroMobius />
        <TrustStrip />
        <TwoPaths />
        <FeaturedWork />
        <HowWeDeliver />
        <WorkingModel />
        <Security />
        <People />
        <ContactCta />
      </main>

      <Footer />
    </>
  );
}
