export function ensureAbsoluteUrl(url) {
    if (!url) return url;

    // If it's already an absolute URL, return it
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }

    // If it's a protocol-relative URL, prepend the current protocol
    if (url.startsWith('//')) {
        return `${window.location.protocol}${url}`;
    }

    // If it's a relative URL, make it absolute
    const baseUrl = import.meta.env.VITE_API_URL || `${window.location.protocol}//${window.location.hostname}:5000`;
    return new URL(url, baseUrl).href;
}

export function getFileNameFromUrl(url) {
    if (!url) return '';
    const parts = url.split('/');
    return parts[parts.length - 1];
}
