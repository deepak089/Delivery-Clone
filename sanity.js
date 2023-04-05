import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url';

const client= createClient({
    projectId:'rhpi5tky',
    dataset:'production',
    useCdn:true,
    apiVersion:'2023-02-03'
})

const builder= imageUrlBuilder(client);
export const urlFor=(source) => builder.image(source)

export default client;