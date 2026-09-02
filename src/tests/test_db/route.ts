// app/api/test-db/route.ts
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
    try {
        const payload = await getPayload({
            config,
        })

        // Try to access the database
        const result = await payload.find({
            collection: 'users',
            limit: 1,
        })

        return Response.json({
            success: true,
            message: 'Connected to MongoDB Atlas successfully!',
            users: result.docs.length
        })
    } catch (error: any) {
        console.error('Database connection error:', error)
        return Response.json({
            success: false,
            error: error.message || 'Failed to connect to database'
        }, { status: 500 })
    }
}
