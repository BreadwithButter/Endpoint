export type response = {
    id: Number,
    name: String,
    author: String[],
    genre: String[],
    publish_year: Number,
    publisher: String,
    publish_country: String,
    num_of_pages: Number
}

export type response_short = {
    id: Number,
    name: String,
    author: String[],
    genre: String[],
}