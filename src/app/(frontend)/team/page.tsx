import { authors } from '@/data/mockData';
import { Twitter, Linkedin } from '@/components/BrandIcons';

export default function TeamPage() {
  return (
    <div className="team-page animate-fade-in">
      <div className="container">
        {/* ================= INTRO ================= */}
        <header className="team-masthead-intro">
          <span className="category-label" style={{ marginBottom: '8px' }}>The Masthead</span>
          <h1 className="team-page-title">Our Editorial Board</h1>
          <p className="team-page-deck">
            Nepal Decodes is guided by a team of veteran journalists, editors, and writers who believe in independent reporting, deep public-interest investigations, and ethical journalism.
          </p>
        </header>

        {/* ================= COMMITMENT STATEMENT ================= */}
        <section style={{ maxWidth: '800px', margin: '0 auto var(--spacing-xxl)', borderLeft: '2px solid var(--color-primary)', paddingLeft: 'var(--spacing-lg)' }}>
          <p style={{ fontStyle: 'italic', fontSize: '16px', lineHeight: 1.6, color: 'var(--color-text-muted)' }}>
            &ldquo;We pledge to investigate with transparency, write with objectivity, and layout with clarity. We do not take dictations from commercial entities or political offices. Our obligation is to verify facts and serve our readers.&rdquo;
          </p>
        </section>

        {/* ================= TEAM MEMBERS GRID ================= */}
        <h2 className="masthead-section-divider">Editorial & Research</h2>
        <div className="team-grid">
          {authors.map((member) => (
            <div key={member.id} className="team-member-card">
              <div className="team-member-avatar-wrapper">
                <div className="team-member-avatar-fallback">
                  {member.avatar}
                </div>
              </div>
              <h3 className="team-member-name">{member.name}</h3>
              <div className="team-member-role">{member.role}</div>
              <p className="team-member-bio">{member.bio}</p>
              
              <div className="team-member-socials">
                {member.twitter && (
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="team-member-social-link"
                    aria-label={`${member.name} Twitter`}
                  >
                    <Twitter size={16} />
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="team-member-social-link"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <Linkedin size={16} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
