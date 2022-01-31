import server from "./server.mjs";

server.listen(3000, '0.0.0.0', (err, address) => {
    if (err) {
        console.log(err);
        process.exit(1)
    }
    console.log(`server listening on ${address}`);
});