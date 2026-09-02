import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import {Article} from "../../payload-types";

export const getArticles = cache(
    async (opts: { limit?: number; categorySlug?: string } = {}) => {
        const payload = await getPayload({ config })
        const { docs } = await payload.find({
            collection: 'articles',
            depth: 2,
            limit: opts.limit ?? 12,
            sort: '-publishedAt',
            where: opts.categorySlug
                ? { 'category.slug': { equals: opts.categorySlug } }
                : {},
        })
        return docs as Article[]
    },
)

export const getArticleBySlug = cache(async (slug: string) => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
        collection: 'articles',
        depth: 2,
        limit: 1,
        where: { slug: { equals: slug } },
    })
    return (docs[0] as Article) ?? null
})

export const getTrending = cache(async (limit = 5) => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
        collection: 'articles',
        depth: 1,
        limit,
        sort: '-views',
        where: { trending: { equals: true } },
    })
    return docs as Article[]
})
