import Link from 'next/link';
import Image from 'next/image';
import ArticleCard from '@/components/ArticleCard';
import Newsletter from '@/components/Newsletter';
import { getEditorsPicks, getLatestArticles, getMostViewed } from '@/lib/articles';
import { formatDate, resolve } from '@/lib/utils';
import {Author, Category, Media} from "../../../payload-types";

export const revalidate = 60;

export default async function Home() {
  const [articles, mostViewed, picks] = await Promise.all([
    getLatestArticles(20),
    getMostViewed(4),
    getEditorsPicks(3),
  ]);

  if (articles.length === 0) {
    return (
        <div className="container">
          <p className="empty-state">No stories published yet.</p>
        </div>
    );
  }

  // 1. Hero Story (Marked as featured)
  const heroStory = articles.find((a) => a.featured) ?? articles[0];

  // 2. Featured Stories (Excluding the hero story, take next 3 for the featured row)
  const featuredStories = articles
      .filter((a) => a.id !== heroStory.id)
      .slice(0, 3);

  // 3. Latest Feed (Excluding hero and featured)
  const featuredIds = featuredStories.map((f) => f.id);
  const latestArticles = articles.filter(
      (a) => a.id !== heroStory.id && !featuredIds.includes(a.id)
  );

  const heroImage = resolve<Media>(heroStory.image);
  const heroCategory = resolve<Category>(heroStory.category);
  const heroAuthor = resolve<Author>(heroStory.author);

  // 4. Trending Stories (Sort by views, top 4)
  const trendingStories = mostViewed.map((story) => ({
    id: story.id,
    slug: story.slug,
    title: story.title,
    category: resolve<Category>(story.category),
  }));

  // 5. Editors' Picks
  const editorsPicks = picks.map((story) => ({
    id: story.id,
    slug: story.slug,
    title: story.title,
    category: resolve<Category>(story.category),
    author: resolve<Author>(story.author),
  }));

  return (
      <div className="home-layout">
        <div className="container">
          {/* ================= HERO STORY ================= */}
          <section className="hero-section">
            <div className="hover-zoom-container hero-image-container">
              <Link href={`/article/${heroStory.slug}`}>
                {heroImage?.url && (
                    <Image
                        src={heroImage.url}
                        alt={heroImage.alt || heroStory.title}
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
                {heroCategory && (
                    <Link href={`/category/${heroCategory.slug}`} className="category-label">
                      {heroCategory.name}
                    </Link>
                )}
                <span className="hero-read-time">{heroStory.readTime}</span>
              </div>

              <h1 className="hero-title">
                <Link href={`/article/${heroStory.slug}`} className="editorial-link">
                  {heroStory.title}
                </Link>
              </h1>

              <p className="hero-deck">{heroStory.deck}</p>

              {heroAuthor && (
                  <div className="hero-author-meta">
                    <div className="author-avatar-medium">{heroAuthor.avatar}</div>
                    <div className="author-info-medium">
                      <span className="author-name-medium">{heroAuthor.name}</span>
                      <span className="author-date-medium">
                    {formatDate(heroStory.publishedAt)}
                  </span>
                    </div>
                  </div>
              )}
            </div>
          </section>

          {/* ================= FEATURED STORIES GRID ================= */}
          {featuredStories.length > 0 && (
              <section className="featured-section animate-fade-in">
                <h2 className="featured-section-title">Featured Reporting</h2>
                <div className="featured-grid">
                  {featuredStories.map((article) => (
                      <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </section>
          )}

          {/* ================= MAIN SPLIT LAYOUT ================= */}
          <div className="home-split-layout">
            {/* Left Column: Latest Articles */}
            <section className="latest-feed-section">
              <div className="section-header">
                <h2 className="section-title">Latest Dispatches</h2>
              </div>
              <div className="latest-feed">
                {latestArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </section>

            {/* Right Column: Sidebar (Trending, Editors' Picks, Newsletter) */}
            <aside className="sidebar">
              {/* Trending Section */}
              <div className="trending-section">
                <h3 className="sidebar-widget-title">Trending</h3>
                <ul className="trending-list">
                  {trendingStories.map((story, index) => (
                      <li key={story.id} className="trending-item">
                    <span className="trending-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                        <div className="trending-item-content">
                          {story.category && (
                              <Link
                                  href={`/category/${story.category.slug}`}
                                  className="trending-item-category"
                              >
                                {story.category.name}
                              </Link>
                          )}
                          <h4 className="trending-item-title">
                            <Link href={`/article/${story.slug}`}>{story.title}</Link>
                          </h4>
                        </div>
                      </li>
                  ))}
                </ul>
              </div>

              {/* Editors' Picks Section */}
              <div className="picks-section">
                <h3 className="sidebar-widget-title">Editors&apos; Picks</h3>
                <div className="picks-list">
                  {editorsPicks.map((story) => (
                      <div key={story.id} className="pick-item">
                        {story.category && (
                            <Link
                                href={`/category/${story.category.slug}`}
                                className="pick-item-category"
                            >
                              {story.category.name}
                            </Link>
                        )}
                        <h4 className="pick-item-title">
                          <Link href={`/article/${story.slug}`}>{story.title}</Link>
                        </h4>
                        <div className="pick-item-meta">
                          <span>By {story.author?.name}</span>
                        </div>
                      </div>
                  ))}
                </div>
              </div>

              {/* Newsletter CTA Widget */}
              <Newsletter />
            </aside>
          </div>
        </div>
      </div>
  );
}
