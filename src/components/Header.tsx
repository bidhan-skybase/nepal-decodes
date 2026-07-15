'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Sun, Moon, Menu, X } from 'lucide-react';

const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/category/politics', label: 'Politics' },
  { href: '/category/society', label: 'Society' },
  { href: '/category/economy', label: 'Economy' },
  { href: '/category/technology', label: 'Technology' },
  { href: '/category/culture', label: 'Culture' },
  { href: '/category/opinion', label: 'Opinion' },
  { href: '/category/explainers', label: 'Explainers' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const pathname = usePathname();

  // On mount, read dark mode status
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark-theme');
    setIsDarkTheme(isDark);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains('dark-theme')) {
      root.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
      setIsDarkTheme(false);
    } else {
      root.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
      setIsDarkTheme(true);
    }
  };

  const triggerSearch = () => {
    window.dispatchEvent(new CustomEvent('toggle-search-overlay', { detail: true }));
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky-nav">
      <div className="container header-container">
        {/* Left: Brand Logo */}
        <Link href="/" className="logo-brand">
          Nepal Decodes<span className="logo-dot">.</span>
        </Link>

        {/* Center: Desktop Navigation */}
        <nav className="desktop-nav">
          {navigationLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="header-actions">
          <button
            onClick={triggerSearch}
            className="action-btn"
            aria-label="Search articles"
            title="Search"
          >
            <Search size={18} />
          </button>
          
          <button
            onClick={toggleTheme}
            className="action-btn theme-toggle-btn"
            aria-label="Toggle dark mode"
            title="Toggle Theme"
          >
            {isDarkTheme ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="action-btn mobile-menu-toggle"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer animate-fade-in">
          <nav className="mobile-nav-links">
            {navigationLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`mobile-nav-link ${isActive ? 'mobile-nav-link-active' : ''}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
