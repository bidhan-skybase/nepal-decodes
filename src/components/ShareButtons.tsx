'use client';

import { useState } from 'react';
import { Facebook, Twitter, Linkedin } from '@/components/BrandIcons';
import { Link as LinkIcon, Check } from 'lucide-react';

export default function ShareButtons() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window === 'undefined') return;
    
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy link', e);
    }
  };

  return (
    <aside className="share-sidebar">
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="share-btn"
        title="Share on Facebook"
      >
        <Facebook size={16} />
      </a>
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="share-btn"
        title="Share on X"
      >
        <Twitter size={16} />
      </a>
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="share-btn"
        title="Share on LinkedIn"
      >
        <Linkedin size={16} />
      </a>
      <button
        type="button"
        className="share-btn"
        onClick={handleCopyLink}
        title={copied ? "Link Copied!" : "Copy Link"}
        aria-label="Copy article link"
      >
        {copied ? <Check size={16} style={{ color: '#10B981' }} /> : <LinkIcon size={16} />}
      </button>
    </aside>
  );
}
