import React, {Component} from 'react';

import './node.scss';

export default class Node extends Component {
  render() {
    const {
      row,
      col,
      isEnd,
      isStart,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      heuristicDistance = null
    } = this.props;
    const extraClassName = isEnd
      ? 'node-end'
      : isStart
      ? 'node-start'
      : isWall
      ? 'node-wall'
      : '';

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
        heuristicDistance={heuristicDistance}>
      </div>
    );
  }
}