import Link from 'next/link';
import Image from 'next/image';
import { articles } from '@/data/mockData';
import ArticleCard from '@/components/ArticleCard';
import Newsletter from '@/components/Newsletter';

export default function Home() {
  // 1. Hero Story (Marked as featured)
  const heroStory = articles.find((a) => a.featured) || articles[0];

  // 2. Featured Stories (Excluding the hero story, take next 3 for the featured row)
  const featuredStories = articles
    .filter((a) => a.id !== heroStory.id)
    .slice(0, 3);

  // 3. Latest Feed (Excluding hero and featured)
  const featuredIds = featuredStories.map((f) => f.id);
  const latestArticles = articles.filter(
    (a) => a.id !== heroStory.id && !featuredIds.includes(a.id)
  );

  // 4. Trending Stories (Sort by views, top 4)
  const trendingStories = [...articles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 4);

  // 5. Editors' Picks
  const editorsPicks = articles.filter((a) => a.editorsPick).slice(0, 3);

  return (
    <div className="home-layout">
      <div className="container">
        {/* ================= HERO STORY ================= */}
        <section className="hero-section">
          <div className="hover-zoom-container hero-image-container">
            <Link href={`/article/${heroStory.id}`}>
              <Image
                src={heroStory.image}
                alt={heroStory.title}
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
              <Link href={`/category/${heroStory.category.toLowerCase()}`} className="category-label">
                {heroStory.category}
              </Link>
              <span className="hero-read-time">{heroStory.readTime}</span>
            </div>
            
            <h1 className="hero-title">
              <Link href={`/article/${heroStory.id}`} className="editorial-link">
                {heroStory.title}
              </Link>
            </h1>
            
            <p className="hero-deck">{heroStory.deck}</p>

            <div className="hero-author-meta">
              <div className="author-avatar-medium">
                {heroStory.author.avatar}
              </div>
              <div className="author-info-medium">
                <span className="author-name-medium">{heroStory.author.name}</span>
                <span className="author-date-medium">{heroStory.publishedAt}</span>
              </div>
            </div>
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
                    <span className="trending-number">0{index + 1}</span>
                    <div className="trending-item-content">
                      <Link href={`/category/${story.category.toLowerCase()}`} className="trending-item-category">
                        {story.category}
                      </Link>
                      <h4 className="trending-item-title">
                        <Link href={`/article/${story.id}`}>
                          {story.title}
                        </Link>
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
                    <Link href={`/category/${story.category.toLowerCase()}`} className="pick-item-category">
                      {story.category}
                    </Link>
                    <h4 className="pick-item-title">
                      <Link href={`/article/${story.id}`}>
                        {story.title}
                      </Link>
                    </h4>
                    <div className="pick-item-meta">
                      <span>By {story.author.name}</span>
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
