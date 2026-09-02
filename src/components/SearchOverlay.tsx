'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { X, Search, Clock, ArrowRight, TrendingUp, Loader2 } from 'lucide-react';
import { stringify } from 'qs-esm';
import type { Where } from 'payload';
import { resolve } from '@/lib/utils';
import {Article, Category} from "../../payload-types";

const POPULAR_TOPICS = [
  'Federalism',
  'IT Export',
  'Weaving',
  'Hydropower',
  'Chiya',
  'Boudhanath',
  'Water System'
];

const RESULT_LIMIT = 8;
const DEBOUNCE_MS = 300;

const buildSearchUrl = (term: string) => {
  const where: Where = {
    and: [
      { _status: { equals: 'published' } },
      {
        or: [
          { title: { like: term } },
          { deck: { like: term } },
          { 'category.name': { like: term } },
          { 'content.value': { like: term } },
        ],
      },
    ],
  };

  const query = stringify(
      { where, depth: 1, limit: RESULT_LIMIT, sort: '-publishedAt' },
      { addQueryPrefix: true },
  );

  return `/api/articles${query}`;
};

export default function SearchOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
      setTotalResults(0);
      setError(null);
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

  // Debounced search against the Payload REST API
  useEffect(() => {
    const term = query.trim();

    if (term === '') {
      setResults([]);
      setTotalResults(0);
      setIsLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(buildSearchUrl(term), {
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) throw new Error(`Search failed with status ${res.status}`);

        const data = await res.json();
        if (controller.signal.aborted) return;

        setResults(data.docs ?? []);
        setTotalResults(data.totalDocs ?? 0);
        setError(null);
        setIsLoading(false);
      } catch (err) {
        if (controller.signal.aborted) return;
        console.error(err);
        setError('Search is unavailable right now. Please try again.');
        setResults([]);
        setTotalResults(0);
        setIsLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  const closeOverlay = () => {
    setIsOpen(false);
  };

  const handleSearchSubmit = useCallback(
      (searchVal: string) => {
        if (!searchVal.trim()) return;

        // Add to recent searches
        const cleanVal = searchVal.trim();
        let updated = [cleanVal, ...recentSearches.filter((s) => s !== cleanVal)];
        updated = updated.slice(0, 5); // Keep top 5
        setRecentSearches(updated);
        localStorage.setItem('recent_searches', JSON.stringify(updated));
      },
      [recentSearches],
  );

  const handleResultClick = (slug: string) => {
    handleSearchSubmit(query);
    closeOverlay();
    router.push(`/article/${slug}`);
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
            {isLoading && <Loader2 size={20} className="search-spinner" />}
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
                {error ? (
                    <div className="search-no-results">
                      <p>{error}</p>
                    </div>
                ) : (
                    <>
                      <h3 className="search-results-count">
                        {isLoading
                            ? `Searching for \u201C${query}\u201D...`
                            : `Found ${totalResults} ${totalResults === 1 ? 'article' : 'articles'} matching \u201C${query}\u201D`}
                      </h3>

                      {!isLoading && results.length > 0 && (
                          <div className="search-results-list">
                            {results.map((article) => {
                              const category = resolve<Category>(article.category);

                              return (
                                  <div
                                      key={article.id}
                                      role="button"
                                      tabIndex={0}
                                      onClick={() => handleResultClick(article.slug)}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleResultClick(article.slug);
                                      }}
                                      className="search-result-item"
                                  >
                                    <div className="search-result-meta">
                                      <span className="search-result-category">{category?.name}</span>
                                      <span className="search-result-dot">&bull;</span>
                                      <span>{article.readTime}</span>
                                    </div>
                                    <h4 className="search-result-title">{article.title}</h4>
                                    <p className="search-result-deck">{article.deck}</p>
                                    <div className="search-result-action">
                                      Read Article <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                                    </div>
                                  </div>
                              );
                            })}
                          </div>
                      )}

                      {!isLoading && results.length === 0 && (
                          <div className="search-no-results">
                            <p>No stories found. Try searching for &ldquo;federalism&rdquo; or &ldquo;chiya&rdquo;.</p>
                          </div>
                      )}
                    </>
                )}
              </div>
          )}
        </div>
      </div>
  );
}
