import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from '@/components/BrandIcons';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        {/* Col 1: About the Publication */}
        <div className="footer-col-about">
          <Link href="/" className="footer-logo">
            Nepal Decodes<span className="logo-dot">.</span>
          </Link>
          <p className="footer-tagline">
            An independent digital media platform dedicated to high-quality journalism, explainers, politics, economy, technology, society, and culture in Nepal.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
              <Twitter size={18} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <Youtube size={18} />
            </a>
          </div>
        </div>

        {/* Col 2: Sections */}
        <div className="footer-col-links">
          <h3 className="footer-heading">Sections</h3>
          <ul className="footer-list">
            <li><Link href="/category/politics">Politics</Link></li>
            <li><Link href="/category/society">Society</Link></li>
            <li><Link href="/category/economy">Economy</Link></li>
            <li><Link href="/category/technology">Technology</Link></li>
            <li><Link href="/category/culture">Culture</Link></li>
            <li><Link href="/category/opinion">Opinion</Link></li>
            <li><Link href="/category/explainers">Explainers</Link></li>
          </ul>
        </div>

        {/* Col 3: Publication Info */}
        <div className="footer-col-links">
          <h3 className="footer-heading">Nepal Decodes</h3>
          <ul className="footer-list">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/team">Meet the Team</Link></li>
            <li><Link href="/about#editorial-policy">Editorial Policy</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} Nepal Decodes. All rights reserved. Crafted for intellectual depth.</p>
      </div>
    </footer>
  );
}
