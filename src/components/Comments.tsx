'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, Send } from 'lucide-react';

interface Comment {
  id: string;
  authorName: string;
  timestamp: string;
  text: string;
}

const DEFAULT_COMMENTS: Record<string, Comment[]> = {
  'the-reshaping-of-nepals-federalism': [
    {
      id: 'c1',
      authorName: 'Ramesh Adhikari',
      timestamp: '2 days ago',
      text: 'An excellent analysis. The issue with federalism in Nepal is not the concept, but the resistance from the central bureaucracy in Kathmandu. Easing financial transfers is key.'
    },
    {
      id: 'c2',
      authorName: 'Sunita Shakya',
      timestamp: '1 day ago',
      text: 'Municipalities have definitely proven their value during crises, like landslide management and local health setup. We need to trust them more with policing and civil laws.'
    }
  ],
  'the-last-weavers-of-kirtipur': [
    {
      id: 'c3',
      authorName: 'Bipul Shrestha',
      timestamp: '3 days ago',
      text: 'Beautifully written. I visited Kirtipur last month and purchased a shawl from the local weavers. The difference in quality compared to powerloom imports is staggering. We must support them!'
    }
  ]
};

export default function Comments({ articleId }: { articleId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  // Load comments
  useEffect(() => {
    try {
      const storageKey = `comments_${articleId}`;
      const saved = sessionStorage.getItem(storageKey);
      if (saved) {
        setComments(JSON.parse(saved));
      } else {
        const defaults = DEFAULT_COMMENTS[articleId] || [];
        setComments(defaults);
        sessionStorage.setItem(storageKey, JSON.stringify(defaults));
      }
    } catch (e) {
      console.error(e);
    }
  }, [articleId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) {
      setError('Please fill in both fields.');
      return;
    }

    const newComment: Comment = {
      id: `c_${Date.now()}`,
      authorName: name.trim(),
      timestamp: 'Just now',
      text: text.trim()
    };

    const updated = [...comments, newComment];
    setComments(updated);
    
    try {
      sessionStorage.setItem(`comments_${articleId}`, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    setName('');
    setText('');
    setError('');
  };

  return (
    <div className="comments-section">
      <div className="comments-header">
        <MessageSquare size={20} className="comments-icon" />
        <h3 className="comments-title">Discussion ({comments.length})</h3>
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="comment-form">
        <h4 className="comment-form-heading">Join the conversation</h4>
        
        {error && <p className="comment-error">{error}</p>}
        
        <div className="comment-form-grid">
          <div className="comment-input-wrapper">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="comment-name-input"
              required
            />
          </div>
          <div className="comment-input-wrapper">
            <textarea
              placeholder="Share your thoughts..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              className="comment-text-input"
              required
            />
          </div>
        </div>
        
        <button type="submit" className="btn-secondary comment-submit-btn">
          Post Comment <Send size={14} style={{ marginLeft: '6px', display: 'inline-block', verticalAlign: 'middle' }} />
        </button>
      </form>

      {/* List Comments */}
      {comments.length > 0 ? (
        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-item animate-fade-in">
              <div className="comment-meta">
                <div className="comment-author-avatar">
                  {comment.authorName.charAt(0).toUpperCase()}
                </div>
                <div className="comment-author-info">
                  <span className="comment-author-name">{comment.authorName}</span>
                  <span className="comment-author-time">{comment.timestamp}</span>
                </div>
              </div>
              <p className="comment-text-body">{comment.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="comments-empty-text">No comments yet. Share your thoughts on this story.</p>
      )}
    </div>
  );
}
