import faker from "faker";
import fp from "fastify-plugin";

const genres = [...Array(10)].map((v, i) => ({
    id: i,
    genre: faker.music.genre()
}))

const plugin = fp(async function plugin(fastify, opts, done) {
    fastify.decorate("music", val => {
        if (val) genres.push(({ id: genres.length, genre: val }));
        return genres;
    })
})

export default plugin;