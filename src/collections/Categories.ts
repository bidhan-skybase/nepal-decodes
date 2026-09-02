import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Categories: CollectionConfig = {
    slug: 'categories',
    admin: { useAsTitle: 'name', defaultColumns: ['name', 'slug'] },
    access: { read: () => true },
    fields: [
        { name: 'name', type: 'text', required: true },
        slugField('name'),
        { name: 'description', type: 'textarea', required: true },
    ],
}
