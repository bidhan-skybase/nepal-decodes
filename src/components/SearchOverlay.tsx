'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, Search, Clock, ArrowRight, TrendingUp } from 'lucide-react';
import { articles, Article } from '@/data/mockData';

const POPULAR_TOPICS = [
  'Federalism',
  'IT Export',
  'Weaving',
  'Hydropower',
  'Chiya',
  'Boudhanath',
  'Water System'
];

export default function SearchOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Load recent searches on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('recent_searches');
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Listen for custom trigger event
  useEffect(() => {
    const handleToggle = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsOpen(customEvent.detail ?? !isOpen);
    };

    window.addEventListener('toggle-search-overlay', handleToggle);
    return () => window.removeEventListener('toggle-search-overlay', handleToggle);
  }, [isOpen]);

  // Handle focus and body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Short timeout to let the transition animate
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Real-time filtering
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = articles.filter((article) => {
      const matchTitle = article.title.toLowerCase().includes(lowerQuery);
      const matchDeck = article.deck.toLowerCase().includes(lowerQuery);
      const matchCategory = article.category.toLowerCase().includes(lowerQuery);
      const matchContent = article.content.some((block) => 
        block.value.toLowerCase().includes(lowerQuery)
      );
      return matchTitle || matchDeck || matchCategory || matchContent;
    });

    setResults(filtered);
  }, [query]);

  const closeOverlay = () => {
    setIsOpen(false);
  };

  const handleSearchSubmit = (searchVal: string) => {
    if (!searchVal.trim()) return;

    // Add to recent searches
    const cleanVal = searchVal.trim();
    let updated = [cleanVal, ...recentSearches.filter(s => s !== cleanVal)];
    updated = updated.slice(0, 5); // Keep top 5
    setRecentSearches(updated);
    localStorage.setItem('recent_searches', JSON.stringify(updated));
  };

  const handleResultClick = (articleId: string) => {
    handleSearchSubmit(query);
    closeOverlay();
    router.push(`/article/${articleId}`);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recent_searches');
  };

  if (!isOpen) return null;

  return (
    <div className="search-overlay animate-fade-in" ref={overlayRef}>
      <div className="search-header container">
        <div className="search-input-wrapper">
          <Search size={24} className="search-icon-inside" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type to search articles, analysis, opinions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearchSubmit(query);
              }
            }}
            className="search-input-field"
          />
        </div>
        <button onClick={closeOverlay} className="search-close-btn" aria-label="Close search">
          <X size={24} />
        </button>
      </div>

      <div className="search-body container">
        {query.trim() === '' ? (
          <div className="search-suggestions-grid">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="search-section">
                <div className="search-section-header">
                  <h3 className="search-section-title">
                    <Clock size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                    Recent Searches
                  </h3>
                  <button onClick={clearRecentSearches} className="search-clear-link">
                    Clear All
                  </button>
                </div>
                <div className="recent-list">
                  {recentSearches.map((term, index) => (
                    <button
                      key={index}
                      onClick={() => setQuery(term)}
                      className="recent-term-btn"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Topics */}
            <div className="search-section">
              <h3 className="search-section-title">
                <TrendingUp size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                Popular Topics
              </h3>
              <div className="popular-topics-list">
                {POPULAR_TOPICS.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => setQuery(topic)}
                    className="topic-tag-btn"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="search-results-section">
            <h3 className="search-results-count">
              Found {results.length} {results.length === 1 ? 'article' : 'articles'} matching &ldquo;{query}&rdquo;
            </h3>
            
            {results.length > 0 ? (
              <div className="search-results-list">
                {results.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => handleResultClick(article.id)}
                    className="search-result-item"
                  >
                    <div className="search-result-meta">
                      <span className="search-result-category">{article.category}</span>
                      <span className="search-result-dot">&bull;</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h4 className="search-result-title">{article.title}</h4>
                    <p className="search-result-deck">{article.deck}</p>
                    <div className="search-result-action">
                      Read Article <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="search-no-results">
                <p>No stories found. Try searching for &ldquo;federalism&rdquo; or &ldquo;chiya&rdquo;.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
