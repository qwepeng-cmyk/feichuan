export function createHandle(value: string | undefined, fallback = 'item') {
    return (value || fallback)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
