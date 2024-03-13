function findRoute(from, to, connections) {
    let work = [{at: from, via: null}];
    for (let i = 0; i < work.length; i++) {
      let {at, via} = work[i];
      for (let next of connections.get(at) || []) {
        if (next == to) return via;
        if (!work.some(w => w.at == next)) {
          work.push({at: next, via: via || next});
        }
      }
    }
    return null;
  }

  module.exports = {findRoute};
