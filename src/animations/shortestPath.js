export default function animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        //decided to get node by class instead of Ref for simplisity
        document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-shortest-path';
        }, 50 * i);
    }
}