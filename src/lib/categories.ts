import {cache} from "react";
import {getPayload} from "payload";
import config from "@payload-config";
import {Article, Category} from "../../payload-types";

export const getCategories = cache(async () => {
    const payload = await getPayload({config})
    const {docs} = await payload.find({
        collection: 'categories',
        depth: 0,
        pagination: false,
        sort: 'name',
    })
    return docs
})

export const getCategoryBySlug = cache(async (slug: string) => {
    const payload = await getPayload({config})
    const {docs} = await payload.find({
        collection: 'categories',
        depth: 0,
        limit: 1,
        where: {slug: {equals: slug}},
    })
    return docs[0] ?? null
})
