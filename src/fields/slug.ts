import type { Field } from 'payload'

const slugify = (input: string) =>
    input
        .toLowerCase()
        .replace(/['’]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

export const slugField = (from = 'title'): Field => ({
    name: 'slug',
    type: 'text',
    required: true,
    unique: true,
    index: true,
    admin: {
        position: 'sidebar',
        description: 'Used in the URL. Leave blank to generate from the title.',
    },
    hooks: {
        beforeValidate: [
            ({ value, data }) => {
                if (value) return slugify(value)
                const source = data?.[from]
                return typeof source === 'string' ? slugify(source) : value
            },
        ],
    },
})
