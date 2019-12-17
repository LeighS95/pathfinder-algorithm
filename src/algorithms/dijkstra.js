import getAllNodes from './functions/getAllNodes';

export function dijkstra(grid, startNode, endNode) {
    //if empty or same coordinate exi function
    if(!startNode || !endNode || startNode === endNode ) {
        return false;
    }
    //init array for nodes after visited
    const visitedNodesInOrder = [];
    //start distance is set to 0
    startNode.distance = 0;
    //get all nodes in grid
    const openSet = getAllNodes(grid);

    //while there are openSet nodes in grid, itterate through (ignor wall nodes) and all to visited array
    while(openSet.length) {
        sortNodesByDistance(openSet);
        const closestNode = openSet.shift();
        // If we encounter a wall, we skip it.
        if (closestNode.isWall) continue;
        // If the closest node is at a distance of infinity,
        // we must be trapped and should therefore stop.
        if (closestNode.distance === Infinity) return visitedNodesInOrder;
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === endNode) return visitedNodesInOrder;
        updateOpenSetNeighbours(closestNode, grid);
    }
  }
  
//calc nearest nodes by A - B
function sortNodesByDistance(openSet) {
  openSet.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}
  
//update openSet array after nodes have been itterated over
function updateOpenSetNeighbours(node, grid) {
  const openSetNeighbours = getOpenSetNeighbours(node, grid);
  for(const neighbour of openSetNeighbours) {
    neighbour.distance = node.distance + 1;
    neighbour.previousNode = node;
  }
}
  
//get openSet array and itterate through
function getOpenSetNeighbours(node, grid) {
  const neighbours = [];
  const {row, col} = node;
  if(row > 0) neighbours.push(grid[row - 1][col]);
  if(row < grid.length - 1) neighbours.push(grid[row + 1][col]);
  if(col > 0) neighbours.push(grid[row][col - 1]);
  if(row < grid.length - 1) neighbours.push(grid[row][col + 1]);
  return neighbours.filter(neighbours => !neighbours.isVisited);
}
  
// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(endNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = endNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}