import React, { Component, MouseEvent } from 'react';
import './App.css';

interface Point {
  clientX: number
  clientY: number
}

class App extends Component {
  state = {
    points: []
  }

  handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (this.state.points.length <3) {
      const { clientX, clientY } = event
      const point = { clientX, clientY }
      this.setState({ points: [...this.state.points, point] })
    }
  }

  handleDragEnd = (event: MouseEvent<HTMLDivElement>, dragIndex: number) => {
    const points = this.state.points.map((point: Point, index: number) => {
      if (index === dragIndex) {
        const { clientX, clientY } = event
        return { ...point, ...{ clientX, clientY } }
      }
      return point
    })
    this.setState({ points })
  }

  handleButtonClick = () => {
    this.setState({ points: [] })
  }

  render() {
    return (
      <>
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }} onClick={this.handleClick}>
          {this.state.points.map((point: Point, index: number) => (
            <div
              key={index}
              draggable
              onDragEnd={(event) => this.handleDragEnd(event, index)}
              style={{
                position: 'absolute',
                left: point.clientX,
                top: point.clientY,
                border: '1px solid red',
                borderRadius: 100,
                width: 11,
                height: 11,
                boxSizing: 'border-box',
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
        </div>
        <button style={{ position: 'absolute', width: 50, bottom: 10, left: 'calc(50% - 50px)' }} onClick={this.handleButtonClick}>Reset</button>
      </>
    );
  }
}

export default App;
