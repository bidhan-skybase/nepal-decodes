'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface Props {
    sort: 'latest' | 'popular';
    q: string;
}

export default function CategoryControls({ sort, q }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [term, setTerm] = useState(q);
    const [isPending, startTransition] = useTransition();
    const isFirstRun = useRef(true);

    const push = (updates: Record<string, string | null>) => {
        const sp = new URLSearchParams(searchParams.toString());
        Object.entries(updates).forEach(([key, value]) => {
            if (value) sp.set(key, value);
            else sp.delete(key);
        });
        sp.delete('page'); // any filter change resets to page 1
        const qs = sp.toString();
        startTransition(() => router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false }));
    };

    // Debounce the in-category search
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        const timer = setTimeout(() => push({ q: term.trim() || null }), 350);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [term]);

    return (
        <div
            className="category-controls-bar"
            style={{ marginTop: 'var(--spacing-xl)', opacity: isPending ? 0.6 : 1 }}
        >
            <div className="sort-container">
                <label
                    htmlFor="sort-select"
                    style={{ marginRight: '8px', color: 'var(--color-text-muted)', fontWeight: 500 }}
                >
                    Sort by:
                </label>
                <select
                    id="sort-select"
                    value={sort}
                    onChange={(e) => push({ sort: e.target.value === 'popular' ? 'popular' : null })}
                    className="sort-select"
                >
                    <option value="latest">Latest Stories</option>
                    <option value="popular">Most Popular</option>
                </select>
            </div>

            <input
                type="text"
                placeholder="Search in category..."
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="category-search-input"
            />
        </div>
    );
}
