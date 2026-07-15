export default function PrivacyPage() {
  return (
    <div className="about-page animate-fade-in" style={{ padding: '60px 0' }}>
      <div className="container reading-layout">
        <header style={{ marginBottom: '40px' }}>
          <span className="category-label">Legal Disclosure</span>
          <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>Privacy Policy</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '15px' }}>Last updated: July 15, 2026</p>
        </header>

        <div className="about-body-text" style={{ fontSize: '16px', lineHeight: 1.7 }}>
          <p>
            At Nepal Decodes, we believe in complete reader privacy. As an independent digital media platform, our relationship with our readers is built on trust, and we do not participate in commercial data-trading systems.
          </p>
          <h2 style={{ fontSize: '20px', margin: '30px 0 10px', fontWeight: 600 }}>Information Collection</h2>
          <p>
            We collect only the information necessary to deliver our services. This includes email addresses provided voluntarily for newsletter subscriptions and names submitted for article comments. We do not use third-party tracking pixels or display-ad networks that collect your browsing history.
          </p>
          <h2 style={{ fontSize: '20px', margin: '30px 0 10px', fontWeight: 600 }}>Data Retention & Security</h2>
          <p>
            Your email details are kept securely with our newsletter service provider and will never be shared, sold, or rented. Comments submitted on our articles are public but can be removed at any time upon request by emailing our privacy team.
          </p>
          <h2 style={{ fontSize: '20px', margin: '30px 0 10px', fontWeight: 600 }}>Cookies</h2>
          <p>
            We use essential local cookies only to maintain user settings, such as your selected dark/light mode preference. These cookies do not track your activity across other sites on the web.
          </p>
        </div>
      </div>
    </div>
  );
}
