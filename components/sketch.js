import React, { Component, Fragment } from "react";

export default class Sketch extends Component {
  minPressure = 75
  maxPressure = 100
  pressureFreq = 12
  pointer = null
  mouseDownTicker = null
  ctx = null
  points = []
  _json = []
  lastHandledPoint = null


  componentDidMount(){
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight / 1.5;
    this.initContext()
    this.frame()
  }

  initContext = () => {
    this.ctx = this.canvas.getContext("2d")
    this.ctx.fillStyle = "transparent"
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)
  }

  valueInRange = (x, a, b) => {
    return Math.min(b, Math.max(a, x));
  }

  Point = (x, y, pressure = 30) => {
    return {x, y, pressure};
  }

  PointFromEvent = (ev, prs) => {
    const {left, top} = ev.target.getBoundingClientRect();
    return this.Point(ev.clientX - left, ev.clientY - top, prs);
  }

  PointFromPoint = point => {
    return this.Point(point.x, point.y, point.pressure);
  }

  PointDistance = (pointA, pointB) => {
    return Math.hypot(pointA.x - pointB.x, pointA.y - pointB.y);
  }

  onMouseMove = e => {
    if (this.pointer) {
      clearInterval(this.mouseDownTicker)
      const oldPointer = this.pointer
      const newPointer = this.PointFromEvent(e)
      newPointer.pressure = this.decreasePressure(oldPointer, newPointer)
      this.pointer = newPointer 
      this.points.push(this.pointer)
      this.mouseDownTick()
    }
  }

  onMouseDown = e => {
    if (e.button === 0) {
      this.pointer = this.PointFromEvent(e, this.minPressure)
      this.points.push(this.pointer)
      this.mouseDownTick()
    }
  }

  onMouseUp = e => {
    this.pointer = null
    this.points.push(this.pointer)
    clearInterval(this.mouseDownTicker)
  }

  mouseDownTick = () => {
    let oldPointer = this.pointer
    this.mouseDownTicker = setInterval(() => {
      const newPointer = this.PointFromPoint(this.pointer)
      newPointer.pressure = this.increasePressure(oldPointer, newPointer)
      oldPointer = newPointer
      this.pointer = newPointer
      this.points.push(this.pointer)
    }, this.pressureFreq)
  }

  increasePressure = (oldPointer, newPointer) => {
    const distance = this.PointDistance(oldPointer, newPointer);
    if (distance > 1) 
      return oldPointer.pressure;
    return this.valueInRange(oldPointer.pressure + 1, this.minPressure, this.maxPressure);
  }

  decreasePressure = (oldPointer, newPointer) => {
    const distance = this.PointDistance(oldPointer, newPointer);
    return this.valueInRange(oldPointer.pressure - distance/4, this.minPressure, this.maxPressure);
  }

  mapPressure = (pressure, from, to) => {
    const norm = (pressure-this.minPressure) / (this.maxPressure-this.minPressure);
    return from + (to-from) * norm;
  }

  interpolate = (pointA, pointB, value) => {
    const x = pointA.x + (pointB.x - pointA.x) * value;
    const y = pointA.y + (pointB.y - pointA.y) * value;
    const pressure = pointA.pressure + (pointB.pressure - pointA.pressure) * value;
    return this.Point(x, y, pressure);
  }

  brush = point => {
    const nSeed = 10;
    const nStep = 3;
    const pressure = this.mapPressure(point.pressure,3,100);
    for (let i=0; i<nSeed; i++) {
      this.ctx.strokeStyle = "rgba(0,0,0,0.1)";
      this.ctx.beginPath();
      this.ctx.moveTo(point.x, point.y)
      for (let j=0; j<nStep; j++) {
        const a = Math.random() * Math.PI*2;
        const x = point.x + Math.cos(a) * pressure/nStep
        const y = point.y + Math.sin(a) * pressure/nStep
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
      }
    }
  }

  frame = () => {
    for(const [i, point] of this.points.entries()) {
      if (point === null) {
        this.lastHandledPoint = point;
        continue;
      }
    
      if (this.lastHandledPoint === null) {
        this.brush(point);
        this.lastHandledPoint = point;
        continue;
      }
      
      const pointA = this.lastHandledPoint;
      const pointB = point;
      const distance = this.PointDistance(pointA, pointB);
      if (distance <= 1) {
        this.brush(point)
        this.lastHandledPoint = point;
        continue;
      }
      
      const maxDistance = Math.ceil(distance); 
      for (let j=0; j<maxDistance; j++)
        this.brush(this.interpolate(pointA, pointB, j/(maxDistance-1)));
        this.lastHandledPoint = point;
    }
    
    this._json.push(...this.points);
    this.points.length = 0;
    setTimeout(this.frame, 1000/10);
  }

  render() {
    return (
      <Fragment>
        <canvas
          className="sketch"
          ref={el => (this.canvas = el)}
          onMouseMove={this.onMouseMove}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onMouseLeave={this.onMouseUp}
        />
      </Fragment>
    )
  }
}





