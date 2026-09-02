import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="about-page animate-fade-in">
      <div className="container">
        {/* ================= INTRO ================= */}
        <header className="editorial-intro">
          <span className="category-label" style={{ marginBottom: '8px' }}>Who We Are</span>
          <h1 className="editorial-intro-heading">Independent Journalism, Decoded for Depth.</h1>
          <p className="editorial-intro-deck">
            Nepal Decodes is an independent digital media platform dedicated to investigative reporting, deep explainers, and narrative essays. We help readers understand Nepal and the world with clarity, context, and nuance.
          </p>
        </header>

        {/* ================= EDITORIAL CONTENT GRID ================= */}
        <div className="about-editorial-grid">
          <div className="about-body-text">
            <p>
              In an era dominated by rapid news cycles, sensational headlines, and algorithmic feeds, we choose a different path. We believe that public understanding is built on slow dispatches, meticulous fact-checking, and narrative storytelling. Our journalism aims to disappear behind the stories, prioritizing facts and comfortable reading above all else.
            </p>
            <p>
              Founded in 2026, Nepal Decodes was created by a small collective of journalists, technologists, and researchers who saw a growing need for deep-dive journalism. We are not interested in being the first to report a story; we aim to be the ones who explain what it means, why it happened, and what comes next.
            </p>
            <h2 id="editorial-policy" style={{ margin: '32px 0 16px', fontSize: '24px', fontWeight: 600, fontFamily: 'var(--font-sans)' }}>Our Editorial Policy</h2>
            <p>
              Our editorial independence is absolute. We do not accept corporate sponsorships that influence our coverage, nor do we run distracting advertising banners. Every investigation is funded by our readers and independent grants, ensuring that our only loyalty is to the truth. We adhere strictly to the highest codes of journalistic ethics, verifying every claim from multiple independent sources.
            </p>
          </div>

          <aside className="about-sidebar">
            <div className="about-sidebar-widget">
              <h4>Our Mission</h4>
              <p>To foster an informed and thoughtful citizenry by decoding complex socio-political, economic, and cultural developments in Nepal with intellectual depth.</p>
            </div>
            
            <div className="about-sidebar-widget">
              <h4>Our Vision</h4>
              <p>To establish a trusted model for sustainable, independent digital journalism in South Asia, where design and typography elevate the written word.</p>
            </div>
          </aside>
        </div>

        {/* ================= VALUES GRID ================= */}
        <section style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--spacing-xxl)', marginBottom: 'var(--spacing-xxl)' }}>
          <h2 className="section-title" style={{ marginBottom: 'var(--spacing-xl)' }}>Our Editorial Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>01 / Credibility</h3>
              <p>We believe trust is earned through exhaustive verification. If we make a mistake, we correct it transparently and immediately.</p>
            </div>
            <div className="value-card">
              <h3>02 / Intellectual Calm</h3>
              <p>We avoid alarmism. Our tone is measured, analytic, and objective, helping readers digest complex events calmly.</p>
            </div>
            <div className="value-card">
              <h3>03 / Aesthetic Respect</h3>
              <p>We believe that high-quality writing deserves beautiful presentation. Clean layouts and spacious interfaces show respect for our readers&apos; attention.</p>
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="about-cta-box">
          <h2 className="about-cta-title">Meet the Masthead</h2>
          <p className="about-cta-text">
            Our stories are reported and edited by a dedicated team of journalists committed to transparency and editorial excellence.
          </p>
          <Link href="/team" className="btn-primary" style={{ display: 'inline-block' }}>
            Meet the Team
          </Link>
        </section>
      </div>
    </div>
  );
}
