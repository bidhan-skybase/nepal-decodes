import {withPayload} from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    serverExternalPackages: ['sharp'],
};

export default withPayload(nextConfig, { devBundleServerPackages: false })
