export const apiKey = 'AIzaSyBh2Zv8kiAbPGigBsaPtxLWaPL5TIFvMYg'
export const baseUrl = `https://www.googleapis.com/books/v1/volumes?q=all&maxResults=12&orderBy=newest&key=${apiKey}`
// export const curBookUrl = `https://www.googleapis.com/books/v1/volumes/:bookId?key=${apiKey}`

export const noImage = 'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg'

// export async function getData(url) {
//     const req = await fetch(url)
//     return await req.json()
// }

export function removeHTMLTags(input) {
    return input.replace(/<[^>]*>/g, ' ');
}

