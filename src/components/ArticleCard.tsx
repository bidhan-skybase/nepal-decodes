import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/data/mockData';

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="article-card">
      <Link href={`/src/app/(frontend)/article/${article.id}`} className="card-image-link">
        <div className="hover-zoom-container card-image-wrapper">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="hover-zoom-image card-img"
            priority={false}
          />
        </div>
      </Link>

      <div className="card-content">
        <div className="card-meta-top">
          <Link href={`/src/app/(frontend)/category/${article.category.toLowerCase()}`} className="category-label">
            {article.category}
          </Link>
          <span className="card-read-time">{article.readTime}</span>
        </div>

        <h3 className="card-title">
          <Link href={`/src/app/(frontend)/article/${article.id}`} className="editorial-link">
            {article.title}
          </Link>
        </h3>

        <p className="card-deck">{article.deck}</p>

        <div className="card-author-meta">
          <div className="author-avatar-small">
            {article.author.avatar}
          </div>
          <div className="author-info-small">
            <span className="author-name-small">{article.author.name}</span>
            <span className="author-date-small">{article.publishedAt}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
