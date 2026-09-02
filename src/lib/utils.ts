export const resolve = <T>(value: string | number | T | null | undefined): T | null =>
    value && typeof value === 'object' ? (value as T) : null

export const formatDate = (value?: string | null) =>
    value ? new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(value)) : ''
