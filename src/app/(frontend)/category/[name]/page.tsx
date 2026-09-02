import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import {
  getCategoryArticles,
  getCategoryFeatured,
} from '@/lib/articles';
import { formatDate, resolve } from '@/lib/utils';
import {Author, Media} from "../../../../../payload-types";
import CategoryControls from "@/components/CategoryControls";
import {getCategoryBySlug} from "@/lib/categories";

const ITEMS_PER_PAGE = 6;

interface PageProps {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ sort?: string; q?: string; page?: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { name } = await params;
  const category = await getCategoryBySlug(name.toLowerCase());
  if (!category) return { title: 'Section not found' };

  return {
    title: `${category.name} | Nepal Decodes`,
    description: category.description,
  };
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { name } = await params;
  const { sort = 'latest', q = '', page = '1' } = await searchParams;

  const category = await getCategoryBySlug(name.toLowerCase());
  if (!category) notFound();

  const currentPage = Math.max(1, Number(page) || 1);
  const searchTerm = q.trim();
  const sortBy = sort === 'popular' ? 'popular' : 'latest';

  // Find the top featured article for this category
  const categoryFeatured = await getCategoryFeatured(category.id);

  const result = await getCategoryArticles({
    categoryId: category.id,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    sort: sortBy,
    q: searchTerm,
    excludeId: categoryFeatured?.id,
  });

  const paginatedArticles = result.docs;
  const totalPages = result.totalPages || 1;
  const showFeatured = currentPage === 1 && searchTerm === '' && Boolean(categoryFeatured);

  const featuredImage = resolve<Media>(categoryFeatured?.image);
  const featuredAuthor = resolve<Author>(categoryFeatured?.author);

  const buildHref = (nextPage: number) => {
    const sp = new URLSearchParams();
    if (sortBy !== 'latest') sp.set('sort', sortBy);
    if (searchTerm) sp.set('q', searchTerm);
    if (nextPage > 1) sp.set('page', String(nextPage));
    const qs = sp.toString();
    return qs ? `/category/${name}?${qs}` : `/category/${name}`;
  };

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
          {showFeatured && categoryFeatured && (
              <section className="hero-section" style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--spacing-xxl)' }}>
                <div className="hover-zoom-container hero-image-container">
                  <Link href={`/article/${categoryFeatured.slug}`}>
                    {featuredImage?.url && (
                        <Image
                            src={featuredImage.url}
                            alt={featuredImage.alt || categoryFeatured.title}
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 60vw"
                            style={{ objectFit: 'cover' }}
                            className="hover-zoom-image"
                        />
                    )}
                  </Link>
                </div>

                <div className="hero-content">
                  <div className="hero-meta">
                    <span className="category-label">{category.name}</span>
                    <span className="hero-read-time">{categoryFeatured.readTime}</span>
                  </div>
                  <h2 className="hero-title" style={{ fontSize: '32px' }}>
                    <Link href={`/article/${categoryFeatured.slug}`} className="editorial-link">
                      {categoryFeatured.title}
                    </Link>
                  </h2>
                  <p className="hero-deck" style={{ fontSize: '16px' }}>{categoryFeatured.deck}</p>
                  {featuredAuthor && (
                      <div className="hero-author-meta">
                        <div className="author-avatar-medium">{featuredAuthor.avatar}</div>
                        <div className="author-info-medium">
                          <span className="author-name-medium">{featuredAuthor.name}</span>
                          <span className="author-date-medium">
                      {formatDate(categoryFeatured.publishedAt)}
                    </span>
                        </div>
                      </div>
                  )}
                </div>
              </section>
          )}

          {/* ================= CONTROLS BAR ================= */}
          <CategoryControls sort={sortBy} q={searchTerm} />

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
                      {result.hasPrevPage ? (
                          <Link
                              href={buildHref(currentPage - 1)}
                              className="btn-secondary"
                              style={{ padding: '8px 16px' }}
                          >
                            Previous
                          </Link>
                      ) : (
                          <span className="btn-secondary" style={{ padding: '8px 16px', opacity: 0.5 }}>
                    Previous
                  </span>
                      )}

                      <span className="page-info">
                  Page {currentPage} of {totalPages}
                </span>

                      {result.hasNextPage ? (
                          <Link
                              href={buildHref(currentPage + 1)}
                              className="btn-secondary"
                              style={{ padding: '8px 16px' }}
                          >
                            Next
                          </Link>
                      ) : (
                          <span className="btn-secondary" style={{ padding: '8px 16px', opacity: 0.5 }}>
                    Next
                  </span>
                      )}
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
