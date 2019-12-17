/***********************
 * UNDER MAINTAINENCE
 ***********************/

// import getAllNodes from './functions/getAllNodes';

// export function astar(grid, startNode, endNode, heuristic) {
//     if(!startNode || !endNode || startNode === endNode) {
//         return false;
//     }

//     startNode.distance = 0;
//     const visitedNodesInOrder = [];
//     console.log(visitedNodesInOrder);//CLS THIS

//     const unvisitedNodes = getAllNodes(grid);
//     console.log(unvisitedNodes);//CLS THIS

//     while(unvisitedNodes.length) {
//         sortNodesByDistance(unvisitedNodes);

//         console.log(unvisitedNodes);//CLS THIS

//         const closestNode = unvisitedNodes.shift();

//         console.log(closestNode); //CLS THIS

//         // If we encounter a wall, we skip it.
//         if (closestNode.isWall) continue;
//         // If the closest node is at a distance of infinity,
//         // we must be trapped and should therefore stop.
//         if (closestNode.distance === Infinity) return visitedNodesInOrder;
//         closestNode.isVisited = true;
//         visitedNodesInOrder.push(closestNode);
//         console.log(closestNode);
//         if (closestNode === endNode) {
//             console.log(closestNode);
//             return visitedNodesInOrder;
//         }
//         console.log(closestNode);
//         updateUnvisitedNeighbours(closestNode, grid);
//         console.log(closestNode);
//     }
// }

// //calc nearest nodes by A - B
// function sortNodesByDistance(unvisitedNodes) {
//     let current, index;
//     for(let i=0; i < unvisitedNodes.length; i++) {
//         if(!current || unvisitedNodes[i].distance > unvisitedNodes[i].distance) {
//             current = unvisitedNodes[i];
//             console.log(current);//CLS THIS
//         } else if (current.distance === unvisitedNodes[i].distance) {
//             if(current.heuristicDistance > unvisitedNodes[i].heuristicDistance) {
//                 current = unvisitedNodes[i];
//             }
//             index = i;
//         }
//     }
//     unvisitedNodes.splice(index, 1);
//     console.log(index);
//     console.log(unvisitedNodes);//CLS THIS
//     return current;
// }

// //update unvisited array after nodes have been itterated over
// function updateUnvisitedNeighbours(node, grid, endNode, heuristic) {
//     const unvisitedNeighbours = getUnvisitedNeighbours(node, grid);
//     for(const neighbour of unvisitedNeighbours) {
//         neighbour.distance = node.distance + 1;
//         neighbour.previousNode = node;
//         if(!neighbour.heuristicDistance) {
//             neighbour.heuristicDistance = manhattanDistance(neighbour, endNode);
//         }
//     }
// }

// //get unvisited array and itterate through
// function getUnvisitedNeighbours(node, grid) {
//     const neighbours = [];
//     const {row, col} = node;
//     if(row > 0) neighbours.push(grid[row - 1][col]);
//     if(row < grid.length - 1) neighbours.push(grid[row + 1][col]);
//     if(col > 0) neighbours.push(grid[row][col - 1]);
//     if(row < grid.length - 1) neighbours.push(grid[row][col + 1]);
//     console.log(neighbours);
//     return neighbours.filter(neighbours => !neighbours.isVisited);
//   }

// function manhattanDistance(nodeA, nodeB) {
//     //get coordinated of each node using id
//     let nodeACoordinates = nodeA.id.split('-').map(val => parseInt(val));
//     let nodeBCoordinates = nodeB.id.split('-').map(val => parseInt(val));

//     let x1 = nodeACoordinates[0];
//     let y1 = nodeACoordinates[1];
//     let x2 = nodeBCoordinates[0];
//     let y2 = nodeBCoordinates[1];

//     let difference = Math.abs((x1 - x2)+(y1 - y2));
//     return difference;
// }