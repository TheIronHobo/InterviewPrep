function availableNeighbors(nest) {
    let requests = nest.connections.map(neighbor => {
            return request(nest, neighbor, "ping")
            .then(() => true, () => false);
    });
    return Promise.all(requests).then(result => {
            return nest.connections.filter((_, i) => result[i]);
    });
}
