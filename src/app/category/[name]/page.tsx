'use client';

import { useState, useMemo, use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { articles, categories, Article } from '@/data/mockData';
import ArticleCard from '@/components/ArticleCard';

interface PageProps {
  params: Promise<{ name: string }>;
}

export default function CategoryPage({ params }: PageProps) {
  const { name } = use(params);
  
  // Find current category
  const category = categories.find((c) => c.id === name.toLowerCase());

  if (!category) {
    notFound();
  }

  // State controls
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter articles for this category
  const categoryArticles = useMemo(() => {
    return articles.filter((a) => a.category.toLowerCase() === category.id);
  }, [category.id]);

  // Find the top featured article for this category
  const categoryFeatured = categoryArticles[0];

  // Filtered and Sorted list (excluding the category featured article if it exists)
  const processedArticles = useMemo(() => {
    const listToProcess = categoryFeatured
      ? categoryArticles.filter((a) => a.id !== categoryFeatured.id)
      : categoryArticles;

    // Filter by search term
    let filtered = listToProcess;
    if (searchTerm.trim() !== '') {
      const query = searchTerm.toLowerCase();
      filtered = listToProcess.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.deck.toLowerCase().includes(query)
      );
    }

    // Sort by selection
    return [...filtered].sort((a, b) => {
      if (sortBy === 'popular') {
        return b.views - a.views;
      } else {
        // Date sort (since they are mock string dates, convert or fallback to index)
        const dateA = new Date(a.publishedAt).getTime();
        const dateB = new Date(b.publishedAt).getTime();
        return dateB - dateA;
      }
    });
  }, [categoryArticles, categoryFeatured, sortBy, searchTerm]);

  // Paginated articles
  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedArticles.slice(startIndex, startIndex + itemsPerPage);
  }, [processedArticles, currentPage]);

  const totalPages = Math.ceil(processedArticles.length / itemsPerPage) || 1;

  return (
    <div className="category-page animate-fade-in">
      <div className="container">
        {/* ================= CATEGORY BANNER ================= */}
        <header className="category-banner">
          <span className="category-label" style={{ marginBottom: '4px' }}>Section</span>
          <h1 className="category-page-title">{category.name}</h1>
          <p className="category-page-description">{category.description}</p>
        </header>

        {/* ================= CATEGORY FEATURED STORY ================= */}
        {categoryFeatured && currentPage === 1 && searchTerm === '' && (
          <section className="hero-section" style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--spacing-xxl)' }}>
            <div className="hover-zoom-container hero-image-container">
              <Link href={`/article/${categoryFeatured.id}`}>
                <Image
                  src={categoryFeatured.image}
                  alt={categoryFeatured.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  style={{ objectFit: 'cover' }}
                  className="hover-zoom-image"
                />
              </Link>
            </div>

            <div className="hero-content">
              <div className="hero-meta">
                <span className="category-label">{categoryFeatured.category}</span>
                <span className="hero-read-time">{categoryFeatured.readTime}</span>
              </div>
              <h2 className="hero-title" style={{ fontSize: '32px' }}>
                <Link href={`/article/${categoryFeatured.id}`} className="editorial-link">
                  {categoryFeatured.title}
                </Link>
              </h2>
              <p className="hero-deck" style={{ fontSize: '16px' }}>{categoryFeatured.deck}</p>
              <div className="hero-author-meta">
                <div className="author-avatar-medium">
                  {categoryFeatured.author.avatar}
                </div>
                <div className="author-info-medium">
                  <span className="author-name-medium">{categoryFeatured.author.name}</span>
                  <span className="author-date-medium">{categoryFeatured.publishedAt}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================= CONTROLS BAR ================= */}
        <div className="category-controls-bar" style={{ marginTop: 'var(--spacing-xl)' }}>
          <div className="sort-container">
            <label htmlFor="sort-select" style={{ marginRight: '8px', color: 'var(--color-text-muted)', fontWeight: 500 }}>Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as 'latest' | 'popular');
                setCurrentPage(1);
              }}
              className="sort-select"
            >
              <option value="latest">Latest Stories</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Search in category..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="category-search-input"
          />
        </div>

        {/* ================= ARTICLE GRID ================= */}
        {paginatedArticles.length > 0 ? (
          <section>
            <div className="category-grid">
              {paginatedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="btn-secondary"
                  style={{ padding: '8px 16px', opacity: currentPage === 1 ? 0.5 : 1 }}
                >
                  Previous
                </button>
                <span className="page-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="btn-secondary"
                  style={{ padding: '8px 16px', opacity: currentPage === totalPages ? 0.5 : 1 }}
                >
                  Next
                </button>
              </div>
            )}
          </section>
        ) : (
          <div className="search-no-results" style={{ padding: '80px 0' }}>
            <p>No stories found matching your filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
