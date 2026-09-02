import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import config from '@payload-config'
import {articles, authors, categories} from "@/data/mockdata";
import type { Article as ArticleDoc } from '../payload-types'
type ContentBlock = NonNullable<ArticleDoc['content']>[number]
type MockBlock = (typeof articles)[number]['content'][number]

const reset = process.argv.includes('--reset')

const seed = async () => {
    const payload = await getPayload({ config })

    // ---- Optional wipe ----
    if (reset) {
        payload.logger.info('Clearing existing content...')
        for (const collection of ['articles', 'authors', 'categories', 'media'] as const) {
            await payload.delete({ collection, where: { id: { exists: true } } })
        }
    }

    // ---- Admin user (skipped if one already exists) ----
    const existingUsers = await payload.find({ collection: 'users', limit: 1 })
    if (existingUsers.totalDocs === 0) {
        const email = process.env.SEED_ADMIN_EMAIL || 'admin@nepaldecodes.com'
        await payload.create({
            collection: 'users',
            data: {
                email,
                password: process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!',
            },
        })
        payload.logger.info(`Created admin user: ${email}`)
    }

    // ---- Categories ----
    const categoryIds: Record<string, string> = {}
    for (const c of categories) {
        const doc = await payload.create({
            collection: 'categories',
            data: { name: c.name, slug: c.id, description: c.description },
        })
        categoryIds[c.name.toLowerCase()] = doc.id
    }
    payload.logger.info(`Created ${categories.length} categories.`)

    // ---- Authors ----
    const authorIds: Record<string, string> = {}
    for (const a of authors) {
        const doc = await payload.create({
            collection: 'authors',
            data: {
                name: a.name,
                slug: a.id,
                role: a.role,
                avatar: a.avatar,
                bio: a.bio,
                twitter: a.twitter,
                linkedin: a.linkedin,
            },
        })
        authorIds[a.id] = doc.id
    }
    payload.logger.info(`Created ${authors.length} authors.`)

    // ---- Media (deduplicated by public path) ----
    const mediaIds: Record<string, string> = {}

    const uploadImage = async (publicPath: string, alt: string) => {
        if (mediaIds[publicPath]) return mediaIds[publicPath]

        const filePath = path.resolve(process.cwd(), 'public', publicPath.replace(/^\//, ''))
        if (!fs.existsSync(filePath)) {
            payload.logger.warn(`Missing image, skipping: ${filePath}`)
            return null
        }

        const doc = await payload.create({
            collection: 'media',
            data: { alt },
            filePath,
        })
        mediaIds[publicPath] = doc.id
        return doc.id
    }

    // ---- Content blocks ----
    const buildContent = async (
        blocks: MockBlock[],
        fallbackAlt: string,
    ): Promise<ContentBlock[]> => {
        const out: ContentBlock[] = []

        for (const block of blocks) {
            switch (block.type) {
                case 'paragraph':
                    out.push({ blockType: 'paragraph', value: block.value })
                    break
                case 'subheading':
                    out.push({ blockType: 'subheading', value: block.value })
                    break
                case 'pullquote':
                    out.push({ blockType: 'pullquote', value: block.value })
                    break
                case 'image': {
                    const inlineId = await uploadImage(block.value, block.caption || fallbackAlt)
                    if (inlineId) {
                        out.push({ blockType: 'image', image: inlineId, caption: block.caption })
                    }
                    break
                }
                case 'embed':
                    out.push({ blockType: 'embed', value: block.value, caption: block.caption })
                    break
            }
        }

        return out
    }

    // ---- Articles ----
    let created = 0
    for (const article of articles) {
        const imageId = await uploadImage(article.image, article.title)
        if (!imageId) {
            payload.logger.warn(`Skipping "${article.title}" — hero image missing.`)
            continue
        }

        const categoryId = categoryIds[article.category.toLowerCase()]
        if (!categoryId) {
            payload.logger.warn(
                `Skipping "${article.title}" — no category matching "${article.category}".`,
            )
            continue
        }

        const authorId = authorIds[article.author.id]
        if (!authorId) {
            payload.logger.warn(
                `Skipping "${article.title}" — no author matching "${article.author.id}".`,
            )
            continue
        }

        await payload.create({
            collection: 'articles',
            data: {
                title: article.title,
                slug: article.id,
                deck: article.deck,
                image: imageId,
                category: categoryId,
                author: authorId,
                publishedAt: new Date(article.publishedAt).toISOString(),
                views: article.views,
                featured: article.featured ?? false,
                trending: article.trending ?? false,
                editorsPick: article.editorsPick ?? false,
                content: await buildContent(article.content, article.title),
                _status: 'published',
            },
        })
        created += 1
    }

    payload.logger.info(
        `Created ${created} articles and ${Object.keys(mediaIds).length} media items. Done.`,
    )
    process.exit(0)
}

await seed()
