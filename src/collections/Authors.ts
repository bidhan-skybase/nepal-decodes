import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Authors: CollectionConfig = {
    slug: 'authors',
    admin: { useAsTitle: 'name', defaultColumns: ['name', 'role'] },
    access: { read: () => true },
    fields: [
        { name: 'name', type: 'text', required: true },
        slugField('name'),
        { name: 'role', type: 'text', required: true },
        {
            name: 'avatar',
            type: 'text',
            maxLength: 3,
            admin: { description: 'Initials. Auto-filled from the name if left blank.' },
            hooks: {
                beforeValidate: [
                    ({ value, data }) => {
                        if (value) return value
                        const name = data?.name
                        if (typeof name !== 'string') return value
                        return name
                            .split(' ')
                            .filter(Boolean)
                            .slice(0, 2)
                            .map((part) => part[0].toUpperCase())
                            .join('')
                    },
                ],
            },
        },
        { name: 'photo', type: 'upload', relationTo: 'media' },
        { name: 'bio', type: 'textarea', required: true },
        {
            type: 'row',
            fields: [
                { name: 'twitter', type: 'text' },
                { name: 'linkedin', type: 'text' },
            ],
        },
    ],
}
