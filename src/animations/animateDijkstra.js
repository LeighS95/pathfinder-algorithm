import animateShortestPath from './shortestPath';

//creates animation for Dijkstra algorithm
export default function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    //itterate throguh Nodes in order array to animate each nodes
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
                animateShortestPath(nodesInShortestPathOrder);
            }, 10 * i);
            return;
        }
        setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
                'node node-visited';
        }, 10 * i);
    }
}