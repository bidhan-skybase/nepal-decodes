import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ProgressBar from '@/components/ProgressBar';
import Comments from '@/components/Comments';
import ShareButtons from '@/components/ShareButtons';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  getAdjacentArticles,
  getAllArticleSlugs,
  getArticleBySlug,
  getRelatedArticles,
} from '@/lib/articles';
import { formatDate, resolve } from '@/lib/utils';
import {Author, Category, Media} from "../../../../../payload-types";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: 'Story not found' };

  const image = resolve<Media>(article.image);

  return {
    title: article.title,
    description: article.deck,
    openGraph: {
      title: article.title,
      description: article.deck,
      type: 'article',
      publishedTime: article.publishedAt,
      images: image?.url ? [{ url: image.url }] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const category = resolve<Category>(article.category);
  const author = resolve<Author>(article.author);
  const heroImage = resolve<Media>(article.image);

  // Only surface an "Updated" stamp for real post-publication edits
  const revisedAt =
      article.updatedAt &&
      new Date(article.updatedAt).getTime() - new Date(article.publishedAt).getTime() >
      60 * 60 * 1000
          ? article.updatedAt
          : null;

  // Neighbouring stories by publication date
  const { older: prevArticle, newer: nextArticle } = await getAdjacentArticles(
      article.publishedAt,
  );

  // Compile Related Articles (same category first, limit to 3)
  const relatedArticles = category
      ? await getRelatedArticles(article.id, category.id, 3)
      : [];

  return (
      <div className="article-page animate-fade-in">
        {/* Top Reading Progress Bar */}
        <ProgressBar />

        <div className="container">
          {/* ================= HEADER META ================= */}
          <header className="article-header">
            {category && (
                <Link href={`/category/${category.slug}`} className="article-category">
                  {category.name}
                </Link>
            )}

            <h1 className="article-title-main">{article.title}</h1>
            <p className="article-subtitle-main">{article.deck}</p>

            <div className="article-header-meta">
              <span>By <strong>{author?.name}</strong></span>
              <span className="article-meta-divider">|</span>
              <span>{formatDate(article.publishedAt)}</span>
              {revisedAt && (
                  <>
                    <span className="article-meta-divider">|</span>
                    <span>Updated {formatDate(revisedAt)}</span>
                  </>
              )}
              <span className="article-meta-divider">|</span>
              <span>{article.readTime}</span>
            </div>
          </header>

          {/* ================= HERO IMAGE ================= */}
          <div className="article-hero-wrapper">
            {heroImage?.url && (
                <Image
                    src={heroImage.url}
                    alt={heroImage.alt || article.title}
                    fill
                    priority
                    sizes="100vw"
                    style={{ objectFit: 'cover' }}
                />
            )}
          </div>

          {/* ================= BODY LAYOUT ================= */}
          <div className="reading-layout article-body-wrapper">
            {/* Floating Share Buttons Sidebar */}
            <ShareButtons />

            {/* Core Article Body Content */}
            <div className="article-reading-body">
              {article.content?.map((block, idx) => {
                switch (block.blockType) {
                  case 'paragraph':
                    return <p key={block.id ?? idx}>{block.value}</p>;
                  case 'subheading':
                    return <h2 key={block.id ?? idx}>{block.value}</h2>;
                  case 'pullquote':
                    return (
                        <blockquote key={block.id ?? idx}>
                          {block.value}
                          {block.attribution && (
                              <cite className="pullquote-attribution">{block.attribution}</cite>
                          )}
                        </blockquote>
                    );
                  case 'image': {
                    const inline = resolve<Media>(block.image);
                    if (!inline?.url) return null;
                    return (
                        <div key={block.id ?? idx} className="article-inline-image-wrapper">
                          <div className="article-inline-image">
                            <Image
                                src={inline.url}
                                alt={inline.alt || block.caption || 'Article image'}
                                fill
                                sizes="(max-width: 768px) 100vw, 700px"
                                style={{ objectFit: 'cover' }}
                            />
                          </div>
                          {block.caption && (
                              <p className="article-inline-caption">{block.caption}</p>
                          )}
                        </div>
                    );
                  }
                  case 'embed':
                    return (
                        <div key={block.id ?? idx} className="article-embed-wrapper">
                          <iframe
                              src={block.value}
                              title={block.caption || 'Embedded media'}
                              loading="lazy"
                              allowFullScreen
                              className="article-embed-frame"
                          />
                          {block.caption && (
                              <p className="article-inline-caption">{block.caption}</p>
                          )}
                        </div>
                    );
                  default:
                    return null;
                }
              })}
            </div>

            {/* ================= AUTHOR BIO BLOCK ================= */}
            {author && (
                <section className="author-bio-footer">
                  <div className="author-bio-avatar">{author.avatar}</div>
                  <div className="author-bio-content">
                    <div className="author-bio-role">{author.role}</div>
                    <h3 className="author-bio-name">{author.name}</h3>
                    <p className="author-bio-text">{author.bio}</p>
                  </div>
                </section>
            )}

            {/* ================= NAVIGATIONAL ROW ================= */}
            <nav className="article-navigation-row" aria-label="Article navigation">
              {prevArticle ? (
                  <Link href={`/article/${prevArticle.slug}`} className="article-nav-block">
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
                  <Link
                      href={`/article/${nextArticle.slug}`}
                      className="article-nav-block"
                      style={{ textAlign: 'right', alignItems: 'flex-end' }}
                  >
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
            <Comments articleId={String(article.id)} />
          </div>

          {/* ================= RELATED ARTICLES FOOTER ================= */}
          {relatedArticles.length > 0 && (
              <section className="related-articles-section container">
                <h3 className="related-articles-title">Related Stories</h3>
                <div className="related-grid">
                  {relatedArticles.map((relStory) => {
                    const relImage = resolve<Media>(relStory.image);
                    const relCategory = resolve<Category>(relStory.category);

                    return (
                        <article key={relStory.id} className="article-card">
                          <Link href={`/article/${relStory.slug}`} className="card-image-link">
                            <div className="hover-zoom-container card-image-wrapper">
                              {relImage?.url && (
                                  <Image
                                      src={relImage.url}
                                      alt={relImage.alt || relStory.title}
                                      fill
                                      sizes="(max-width: 768px) 100vw, 33vw"
                                      className="hover-zoom-image card-img"
                                  />
                              )}
                            </div>
                          </Link>
                          <div className="card-content">
                            {relCategory && (
                                <Link href={`/category/${relCategory.slug}`} className="category-label">
                                  {relCategory.name}
                                </Link>
                            )}
                            <h4 className="card-title" style={{ fontSize: '18px' }}>
                              <Link href={`/article/${relStory.slug}`} className="editorial-link">
                                {relStory.title}
                              </Link>
                            </h4>
                          </div>
                        </article>
                    );
                  })}
                </div>
              </section>
          )}
        </div>
      </div>
  );
}

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}
