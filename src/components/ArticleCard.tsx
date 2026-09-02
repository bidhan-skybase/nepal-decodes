import Link from 'next/link';
import Image from 'next/image';
import { formatDate, resolve } from '@/lib/utils';
import {Article, Author, Category, Media} from "../../payload-types";

export default function ArticleCard({ article }: { article: Article }) {
  const image = resolve<Media>(article.image);
  const category = resolve<Category>(article.category);
  const author = resolve<Author>(article.author);

  return (
      <article className="article-card">
        <Link href={`/article/${article.slug}`} className="card-image-link">
          <div className="hover-zoom-container card-image-wrapper">
            {image?.url && (
                <Image
                    src={image.url}
                    alt={image.alt || article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="hover-zoom-image card-img"
                    priority={false}
                />
            )}
          </div>
        </Link>

        <div className="card-content">
          <div className="card-meta-top">
            {category && (
                <Link href={`/category/${category.slug}`} className="category-label">
                  {category.name}
                </Link>
            )}
            <span className="card-read-time">{article.readTime}</span>
          </div>

          <h3 className="card-title">
            <Link href={`/article/${article.slug}`} className="editorial-link">
              {article.title}
            </Link>
          </h3>

          <p className="card-deck">{article.deck}</p>

          <div className="card-author-meta">
            <div className="author-avatar-small">{author?.avatar}</div>
            <div className="author-info-small">
              <span className="author-name-small">{author?.name}</span>
              <span className="author-date-small">{formatDate(article.publishedAt)}</span>
            </div>
          </div>
        </div>
      </article>
  );
}
