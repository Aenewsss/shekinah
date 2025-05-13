export function getImageFromCdn(url: string) {
    if (!url || process.env.NEXT_PUBLIC_IMAGE_KIT_ACTIVE == 'true') return url

    const urlTransformed = 'https://ik.imagekit.io/shekinah/' + url.split('https://firebasestorage.googleapis.com/v0/b/shekinah-locadora.firebasestorage.app/o/')[1].replaceAll("%2F", "/")
    return urlTransformed
}