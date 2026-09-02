import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'

import { Media } from './src/collections/Media'
import { Categories } from './src/collections/Categories'
import { Authors } from './src/collections/Authors'
import { Articles } from './src/collections/Articles'
import { Users } from './src/collections/Users'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: { baseDir: path.resolve(dirname) },
    },
    collections: [Users, Media, Categories, Authors, Articles],
    editor: lexicalEditor(),
    db: mongooseAdapter({ url: process.env.MONGODB_URI || '' }),
    plugins: [
        vercelBlobStorage({
            enabled: true,
            collections: {
                media: true,
            },
            token: process.env.BLOB_READ_WRITE_TOKEN,
        }),
    ],
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
    sharp,
})
