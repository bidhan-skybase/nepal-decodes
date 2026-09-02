import {cache} from 'react'
import {getPayload, Where} from 'payload'
import config from '@payload-config'
import {Article} from "../../payload-types";

export const getArticles = cache(
    async (opts: { limit?: number; categorySlug?: string } = {}) => {
        const payload = await getPayload({config})
        const {docs} = await payload.find({
            collection: 'articles',
            depth: 2,
            limit: opts.limit ?? 12,
            sort: '-publishedAt',
            where: opts.categorySlug
                ? {'category.slug': {equals: opts.categorySlug}}
                : {},
        })
        return docs as Article[]
    },
)

export const getArticleBySlug = cache(async (slug: string) => {
    const payload = await getPayload({config})
    const {docs} = await payload.find({
        collection: 'articles',
        depth: 2,
        limit: 1,
        where: {slug: {equals: slug}},
    })
    return (docs[0] as Article) ?? null
})

export const getTrending = cache(async (limit = 5) => {
    const payload = await getPayload({config})
    const {docs} = await payload.find({
        collection: 'articles',
        depth: 1,
        limit,
        sort: '-views',
        where: {trending: {equals: true}},
    })
    return docs as Article[]
})

const PUBLISHED = {_status: {equals: 'published'}}

export const getLatestArticles = cache(async (limit = 20) => {
    const payload = await getPayload({config})
    const {docs} = await payload.find({
        collection: 'articles',
        depth: 2,
        limit,
        sort: '-publishedAt',
        where: PUBLISHED,
    })
    return docs
})

export const getMostViewed = cache(async (limit = 4) => {
    const payload = await getPayload({config})
    const {docs} = await payload.find({
        collection: 'articles',
        depth: 1,
        limit,
        sort: '-views',
        where: PUBLISHED,
    })
    return docs
})

export const getEditorsPicks = cache(async (limit = 3) => {
    const payload = await getPayload({config})
    const {docs} = await payload.find({
        collection: 'articles',
        depth: 1,
        limit,
        sort: '-publishedAt',
        where: {and: [PUBLISHED, {editorsPick: {equals: true}}]},
    })
    return docs
})

export const getCategoryFeatured = cache(async (categoryId: string) => {
    const payload = await getPayload({config})
    const {docs} = await payload.find({
        collection: 'articles',
        depth: 2,
        limit: 1,
        sort: '-publishedAt',
        where: {and: [PUBLISHED, {category: {equals: categoryId}}]},
    })
    return docs[0] ?? null
})

export const getCategoryArticles = cache(
    async (opts: {
        categoryId: string
        page?: number
        limit?: number
        sort?: 'latest' | 'popular'
        q?: string
        excludeId?: string | number
    }) => {
        const payload = await getPayload({config})

        const where: Where = {
            and: [
                PUBLISHED,
                {category: {equals: opts.categoryId}},
                ...(opts.excludeId ? [{id: {not_equals: opts.excludeId}}] : []),
                ...(opts.q
                    ? [{or: [{title: {like: opts.q}}, {deck: {like: opts.q}}]}]
                    : []),
            ],
        }

        return payload.find({
            collection: 'articles',
            depth: 2,
            page: opts.page ?? 1,
            limit: opts.limit ?? 6,
            sort: opts.sort === 'popular' ? '-views' : '-publishedAt',
            where,
        })
    },
)

export const getAdjacentArticles = cache(async (publishedAt: string) => {
    const payload = await getPayload({config})

    const [older, newer] = await Promise.all([
        payload.find({
            collection: 'articles',
            depth: 0,
            limit: 1,
            sort: '-publishedAt',
            where: {and: [PUBLISHED, {publishedAt: {less_than: publishedAt}}]},
        }),
        payload.find({
            collection: 'articles',
            depth: 0,
            limit: 1,
            sort: 'publishedAt',
            where: {and: [PUBLISHED, {publishedAt: {greater_than: publishedAt}}]},
        }),
    ])

    return {older: older.docs[0] ?? null, newer: newer.docs[0] ?? null}
})

export const getRelatedArticles = cache(
    async (articleId: string | number, categoryId: string | number, limit = 3) => {
        const payload = await getPayload({config})

        const sameCategory = await payload.find({
            collection: 'articles',
            depth: 2,
            limit,
            sort: '-publishedAt',
            where: {
                and: [PUBLISHED, {category: {equals: categoryId}}, {id: {not_equals: articleId}}],
            },
        })

        if (sameCategory.docs.length >= limit) return sameCategory.docs

        const excluded = [articleId, ...sameCategory.docs.map((d) => d.id)]
        const fill = await payload.find({
            collection: 'articles',
            depth: 2,
            limit: limit - sameCategory.docs.length,
            sort: '-publishedAt',
            where: {and: [PUBLISHED, {id: {not_in: excluded}}]},
        })

        return [...sameCategory.docs, ...fill.docs]
    },
)

export const getAllArticleSlugs = async () => {
    const payload = await getPayload({config})
    const {docs} = await payload.find({
        collection: 'articles',
        depth: 0,
        pagination: false,
        select: {slug: true},
        where: PUBLISHED,
    })
    return docs.map((d) => d.slug)
}
