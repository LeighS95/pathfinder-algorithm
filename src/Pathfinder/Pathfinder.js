import React, {Component} from 'react';
import throttle from 'lodash/throttle';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';
// import {astar} from '../algorithms/astar';
import animateDijkstra from '../animations';

import './pathfinder.css';

const START_ROW = Math.floor(Math.random()*10);
const START_COL = Math.floor(Math.random()*10);
const END_ROW = Math.floor(Math.random()*10);
const END_COL = Math.floor(Math.random()*10);

export default class Pathfinder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: [],
      mouseIsPressed: false,
      maxRowNodes: Math.floor((window.innerHeight/25)- 8),
      maxColNodes: Math.floor((window.innerWidth/25))
    }

    //ReRender grid on resize and sizes grid based on device
    this.throttleWindow = throttle(() => {
        let state = this.state;
        let rowNodes = Math.floor((window.innerHeight/25)-8);
        let colNodes = Math.floor(window.innerWidth/25);
        this.setState({
          ...state,
          maxRowNodes: rowNodes,
          maxColNodes: colNodes
        });
        let grid = initialise(rowNodes, colNodes);
        this.setState({grid});
    });
}

  componentDidMount() {
    //render grid and Nodes
    const state = this.state;
    const { maxRowNodes, maxColNodes } = this.state;
    let grid = initialise(maxRowNodes, maxColNodes);
    this.setState({
        ...state,
        grid
    });
    window.addEventListener('resize', this.throttleWindow);
  }

  //remove event listener on component unmount
  componentWillUnmount() {
    window.removeEventListener('resize', this.throttleWindow.bind(this));
  }

  //handle mouse down (for wall feature)
  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  //handle mouse enter (for wall feature)
  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  //handle mouse up (for wall feature)
  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }

  //Run algotrithm and animation (used parameters so any alg and animation could be passed in)
visualiser(alg, animateAlg) {
    const { grid } = this.state;
    const startNode = grid[START_ROW][START_COL];
    const endNode = grid[END_ROW ][END_COL];
    const visitedNodesInOrder = alg(grid, startNode, endNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
    animateAlg(visitedNodesInOrder, nodesInShortestPathOrder);
}



render() {
    const { grid, mouseIsPressed } = this.state;

    console.log(grid);
    return (
        <div className="view">
            <button onClick={() => this.visualiser(dijkstra, animateDijkstra)}>Run Dijkstra<div className="icon play"></div></button>

            <div className="grid">
                {grid.map((row, rowIndex) => {
                return ( 
                <div key={rowIndex}>
                    {row.map((node, nodeIndex) => {
                        const { row, col, isStart, isEnd, isWall } = node;
                        return (
                        <Node
                            key={nodeIndex}
                            row={row}
                            col={col}
                            isStart={isStart}
                            isEnd={isEnd}
                            isWall={isWall}
                            mouseIsPressed={mouseIsPressed}
                            onMouseDown = {(row, col)=> {this.handleMouseDown(row, col)}}
                            onMouseEnter={(row, col)=> {this.handleMouseEnter(row, col)}}
                            onMouseUp={() => this.handleMouseUp()}>
                        </Node>)})}
                </div> )
            })}
            </div>
        </div>
    )
}
}
//END PATHFINDER FUNCTION



//Initialise Grid - maxRow & maxCol set by screen height and width (handled by throttleWindow function)
const initialise = (maxRowNodes, maxColNodes) => {
    const grid = [];

    for(let row = 0; row < maxRowNodes; row++) {
        const currentRow = [];
        for(let col = 0; col < maxColNodes; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
};

//Create Nodes
const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === START_ROW && col === START_COL,
        isEnd: row === END_ROW && col === END_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null
    }
};

//Create wall nodes
const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall
    };
    newGrid[row][col] = newNode;
    return newGrid;
};