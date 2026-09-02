import type { Block, CollectionConfig, CollectionBeforeChangeHook } from 'payload'
import { slugField } from '../fields/slug'

const Paragraph: Block = {
    slug: 'paragraph',
    fields: [{ name: 'value', type: 'textarea', required: true }],
}

const Subheading: Block = {
    slug: 'subheading',
    fields: [{ name: 'value', type: 'text', required: true }],
}

const Pullquote: Block = {
    slug: 'pullquote',
    fields: [
        { name: 'value', type: 'textarea', required: true },
        { name: 'attribution', type: 'text' },
    ],
}

const ImageBlock: Block = {
    slug: 'image',
    fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
    ],
}

const Embed: Block = {
    slug: 'embed',
    fields: [
        { name: 'value', type: 'text', required: true, label: 'Embed URL' },
        { name: 'caption', type: 'text' },
    ],
}

const WORDS_PER_MINUTE = 200

const setReadTime: CollectionBeforeChangeHook = ({ data }) => {
    const blocks = Array.isArray(data?.content) ? data.content : []
    const words = blocks.reduce((total: number, block: Record<string, unknown>) => {
        const text = typeof block?.value === 'string' ? block.value : ''
        return total + (text.trim() ? text.trim().split(/\s+/).length : 0)
    }, 0)
    return {
        ...data,
        readTime: `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min read`,
    }
}

export const Articles: CollectionConfig = {
    slug: 'articles',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'category', 'author', 'publishedAt', '_status'],
    },
    versions: { drafts: true },
    access: {
        read: ({ req: { user } }) => {
            if (user) return true
            return {
                or: [{ _status: { equals: 'published' } }, { _status: { exists: false } }],
            }
        },
    },
    hooks: { beforeChange: [setReadTime] },
    fields: [
        { name: 'title', type: 'text', required: true },
        slugField('title'),
        { name: 'deck', type: 'textarea', required: true, label: 'Deck (standfirst)' },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
            label: 'Hero image',
        },
        {
            name: 'content',
            type: 'blocks',
            required: true,
            blocks: [Paragraph, Subheading, Pullquote, ImageBlock, Embed],
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'categories',
            required: true,
            admin: { position: 'sidebar' },
        },
        {
            name: 'author',
            type: 'relationship',
            relationTo: 'authors',
            required: true,
            admin: { position: 'sidebar' },
        },
        {
            name: 'publishedAt',
            type: 'date',
            required: true,
            defaultValue: () => new Date(),
            admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
        },
        {
            name: 'readTime',
            type: 'text',
            admin: { position: 'sidebar', readOnly: true },
        },
        {
            name: 'views',
            type: 'number',
            defaultValue: 0,
            admin: { position: 'sidebar', readOnly: true },
        },
        {
            type: 'collapsible',
            label: 'Placement',
            admin: { position: 'sidebar' },
            fields: [
                { name: 'featured', type: 'checkbox' },
                { name: 'trending', type: 'checkbox' },
                { name: 'editorsPick', type: 'checkbox', label: "Editor's pick" },
            ],
        },
    ],
}
