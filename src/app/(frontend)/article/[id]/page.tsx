import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { articles } from '@/data/mockData';
import ProgressBar from '@/components/ProgressBar';
import Comments from '@/components/Comments';
import ShareButtons from '@/components/ShareButtons';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;
  const article = articles.find((a) => a.id === id);

  if (!article) {
    notFound();
  }

  // Find index of current article to establish prev/next navigation
  const currentIndex = articles.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  // Compile Related Articles (same category first, limit to 3)
  const relatedArticles = articles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .concat(articles.filter((a) => a.category !== article.category && a.id !== article.id))
    .slice(0, 3);

  return (
    <div className="article-page animate-fade-in">
      {/* Top Reading Progress Bar */}
      <ProgressBar />

      <div className="container">
        {/* ================= HEADER META ================= */}
        <header className="article-header">
          <Link href={`/src/app/(frontend)/category/${article.category.toLowerCase()}`} className="article-category">
            {article.category}
          </Link>

          <h1 className="article-title-main">{article.title}</h1>
          <p className="article-subtitle-main">{article.deck}</p>

          <div className="article-header-meta">
            <span>By <strong>{article.author.name}</strong></span>
            <span className="article-meta-divider">|</span>
            <span>{article.publishedAt}</span>
            {article.updatedAt && (
              <>
                <span className="article-meta-divider">|</span>
                <span>Updated {article.updatedAt}</span>
              </>
            )}
            <span className="article-meta-divider">|</span>
            <span>{article.readTime}</span>
          </div>
        </header>

        {/* ================= HERO IMAGE ================= */}
        <div className="article-hero-wrapper">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* ================= BODY LAYOUT ================= */}
        <div className="reading-layout article-body-wrapper">
          {/* Floating Share Buttons Sidebar */}
          <ShareButtons />

          {/* Core Article Body Content */}
          <div className="article-reading-body">
            {article.content.map((block, idx) => {
              switch (block.type) {
                case 'paragraph':
                  return <p key={idx}>{block.value}</p>;
                case 'subheading':
                  return <h2 key={idx}>{block.value}</h2>;
                case 'pullquote':
                  return <blockquote key={idx}>{block.value}</blockquote>;
                case 'image':
                  return (
                    <div key={idx} className="article-inline-image-wrapper">
                      <div className="article-inline-image">
                        <Image
                          src={block.value}
                          alt={block.caption || 'Article image'}
                          fill
                          sizes="(max-width: 768px) 100vw, 700px"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      {block.caption && <p className="article-inline-caption">{block.caption}</p>}
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>

          {/* ================= AUTHOR BIO BLOCK ================= */}
          <section className="author-bio-footer">
            <div className="author-bio-avatar">
              {article.author.avatar}
            </div>
            <div className="author-bio-content">
              <div className="author-bio-role">{article.author.role}</div>
              <h3 className="author-bio-name">{article.author.name}</h3>
              <p className="author-bio-text">{article.author.bio}</p>
            </div>
          </section>

          {/* ================= NAVIGATIONAL ROW ================= */}
          <nav className="article-navigation-row" aria-label="Article navigation">
            {prevArticle ? (
              <Link href={`/src/app/(frontend)/article/${prevArticle.id}`} className="article-nav-block">
                <span className="article-nav-label">
                  <ChevronLeft size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                  Previous
                </span>
                <span className="article-nav-title">{prevArticle.title}</span>
              </Link>
            ) : (
              <div />
            )}

            {nextArticle ? (
              <Link href={`/src/app/(frontend)/article/${nextArticle.id}`} className="article-nav-block" style={{ textAlign: 'right', alignItems: 'flex-end' }}>
                <span className="article-nav-label">
                  Next
                  <ChevronRight size={12} style={{ verticalAlign: 'middle', marginLeft: '4px' }} />
                </span>
                <span className="article-nav-title">{nextArticle.title}</span>
              </Link>
            ) : (
              <div />
            )}
          </nav>

          {/* ================= COMMENTS SECTION ================= */}
          <Comments articleId={article.id} />
        </div>

        {/* ================= RELATED ARTICLES FOOTER ================= */}
        {relatedArticles.length > 0 && (
          <section className="related-articles-section container">
            <h3 className="related-articles-title">Related Stories</h3>
            <div className="related-grid">
              {relatedArticles.map((relStory) => (
                <article key={relStory.id} className="article-card">
                  <Link href={`/src/app/(frontend)/article/${relStory.id}`} className="card-image-link">
                    <div className="hover-zoom-container card-image-wrapper">
                      <Image
                        src={relStory.image}
                        alt={relStory.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="hover-zoom-image card-img"
                      />
                    </div>
                  </Link>
                  <div className="card-content">
                    <Link href={`/src/app/(frontend)/category/${relStory.category.toLowerCase()}`} className="category-label">
                      {relStory.category}
                    </Link>
                    <h4 className="card-title" style={{ fontSize: '18px' }}>
                      <Link href={`/src/app/(frontend)/article/${relStory.id}`} className="editorial-link">
                        {relStory.title}
                      </Link>
                    </h4>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    id: article.id,
  }));
}
