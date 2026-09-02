import { Twitter, Linkedin } from '@/components/BrandIcons';

export default function TeamPage() {
  // Static team members data
  const teamMembers = [
    {
      id: 1,
      name: 'Kiran Adhikari',
      role: 'Editor-in-Chief',
      bio: 'Veteran journalist with 15+ years of experience in political reporting and investigative journalism. Former bureau chief at The Himalayan Times.',
      avatar: 'KA',
      twitter: 'https://twitter.com/kiranadhikari',
      linkedin: 'https://linkedin.com/in/kiranadhikari',
    },
    {
      id: 2,
      name: 'Sarita Thapa',
      role: 'Managing Editor',
      bio: 'Former bureau chief with expertise in human rights, social justice, and conflict reporting. Has covered Nepal\'s peace process extensively.',
      avatar: 'ST',
      twitter: 'https://twitter.com/saritathapa',
      linkedin: 'https://linkedin.com/in/saritathapa',
    },
    {
      id: 3,
      name: 'Bikram Shah',
      role: 'Senior Political Correspondent',
      bio: 'Specializes in federalism, constitutional affairs, and parliamentary proceedings. Has reported from every provincial capital.',
      avatar: 'BS',
      twitter: 'https://twitter.com/bikramshah',
      linkedin: 'https://linkedin.com/in/bikramshah',
    },
    {
      id: 4,
      name: 'Anita Gurung',
      role: 'Economics Editor',
      bio: 'Economist turned journalist covering fiscal policy, development, and trade. Former economic analyst at the World Bank.',
      avatar: 'AG',
      twitter: 'https://twitter.com/anitagurung',
      linkedin: 'https://linkedin.com/in/anitagurung',
    },
    {
      id: 5,
      name: 'Prakash Neupane',
      role: 'Senior Investigative Reporter',
      bio: 'Award-winning investigative journalist focusing on corruption, governance, and accountability. Recipient of the Nepal Press Freedom Award.',
      avatar: 'PN',
      twitter: 'https://twitter.com/prakashneupane',
      linkedin: 'https://linkedin.com/in/prakashneupane',
    },
    {
      id: 6,
      name: 'Sunita Pandey',
      role: 'Environment & Science Editor',
      bio: 'Climate change and environmental policy specialist with a background in ecological sciences. Covers the Himalayas, biodiversity, and climate action.',
      avatar: 'SP',
      twitter: 'https://twitter.com/sunitapandey',
      linkedin: 'https://linkedin.com/in/sunitapandey',
    },
    {
      id: 7,
      name: 'Deepak Bhattarai',
      role: 'Digital Editor',
      bio: 'Digital strategy expert ensuring Nepal Decodes\' content reaches the right audience across all platforms. Former social media lead at Kantipur Media Group.',
      avatar: 'DB',
      twitter: 'https://twitter.com/deepakbhattarai',
      linkedin: 'https://linkedin.com/in/deepakbhattarai',
    },
    {
      id: 8,
      name: 'Rajesh Sharma',
      role: 'Senior Photojournalist',
      bio: 'Visual storyteller capturing the soul of Nepal through powerful images and documentaries. Work featured in National Geographic and Al Jazeera.',
      avatar: 'RS',
      twitter: 'https://twitter.com/rajeshsharma',
      linkedin: 'https://linkedin.com/in/rajeshsharma',
    },
  ];

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
            {teamMembers.map((member) => (
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
