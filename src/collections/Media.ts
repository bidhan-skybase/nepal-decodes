import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
    slug: 'media',
    access: { read: () => true },
    upload: {
        staticDir: 'public/media',
        mimeTypes: ['image/*'],
        focalPoint: true,
        imageSizes: [
            { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
            { name: 'card', width: 768, height: 512, position: 'centre' },
            { name: 'hero', width: 1600, height: 900, position: 'centre' },
        ],
    },
    fields: [
        { name: 'alt', type: 'text', required: true },
        { name: 'credit', type: 'text' },
    ],
}
