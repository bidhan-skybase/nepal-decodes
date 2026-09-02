export default function TermsPage() {
  return (
    <div className="about-page animate-fade-in" style={{ padding: '60px 0' }}>
      <div className="container reading-layout">
        <header style={{ marginBottom: '40px' }}>
          <span className="category-label">Legal Disclosure</span>
          <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>Terms & Conditions</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '15px' }}>Last updated: July 15, 2026</p>
        </header>

        <div className="about-body-text" style={{ fontSize: '16px', lineHeight: 1.7 }}>
          <p>
            Welcome to Nepal Decodes. By accessing our dispatches, explainers, and commentary, you agree to comply with the terms and conditions outlined below.
          </p>
          <h2 style={{ fontSize: '20px', margin: '30px 0 10px', fontWeight: 600 }}>1. Copyright & Intellectual Property</h2>
          <p>
            All content published on Nepal Decodes—including investigative text, essays, photographs, custom graphics, logo identifiers, and digital code—is the property of Nepal Decodes or its contributing authors. You may not reproduce, copy, or redistribute any of our materials for commercial purposes without explicit prior written authorization.
          </p>
          <h2 style={{ fontSize: '20px', margin: '30px 0 10px', fontWeight: 600 }}>2. Academic and Non-Profit Use</h2>
          <p>
            We support educational research and civic discussions. You may quote short passages from our articles with appropriate attribution and links pointing back to the original story on Nepal Decodes.
          </p>
          <h2 style={{ fontSize: '20px', margin: '30px 0 10px', fontWeight: 600 }}>3. Community Contributions</h2>
          <p>
            When posting comments on our website, you agree to participate constructively. We reserve the right to moderate, hide, or remove comments that contain offensive language, spam links, or personal attacks against our writers or other readers.
          </p>
        </div>
      </div>
    </div>
  );
}
