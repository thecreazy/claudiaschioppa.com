
import React, {Component, Fragment} from 'react'
import { string } from 'prop-types'

export default class Sketch extends Component{
    paint = false
    clickX = []
    clickY = []
    clickDrag = []
    componentDidMount(){
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight / 1.5;
        this.getCanvas()
    }
    getCanvas(){
        this.context = this.canvas.getContext("2d");
    }
    addClick(x,y,dragging){
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
    }
    redraw(){ 
        if(!this.context.canvas){
            this.getCanvas()
            return
        } 
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
        this.context.strokeStyle = "#df4b26";
        this.context.lineJoin = "round";
        this.context.lineWidth = 5;
        for(var i=0; i < this.clickX.length; i++) {		
          this.context.beginPath();
          if(this.clickDrag[i] && i){
            this.context.moveTo(this.clickX[i-1], this.clickY[i-1]);
           }else{
             this.context.moveTo(this.clickX[i]-1, this.clickY[i]);
           }
           this.context.lineTo(this.clickX[i], this.clickY[i]);
           this.context.closePath();
           this.context.stroke();
        }
        this.context.globalAlpha = 0.8
        // this.context.drawImage(crayonTextureImage, 0, 0, canvasWidth, canvasHeight)
    }
    onMouseMove = e => {
        if(!this.paint) return;
        const mouseX = e.pageX - this.canvas.offsetLeft
        const mouseY = e.pageY - this.canvas.offsetTop
        this.addClick(mouseX, mouseY, true)
        this.redraw()
    }
    onMouseDown = e =>{
        const mouseX = e.pageX - this.canvas.offsetLeft
        const mouseY = e.pageY - this.canvas.offsetTop
        this.paint = true
        this.addClick(mouseX, mouseY)
        this.redraw()
    }
    onMouseUp = e =>{
        this.paint = false
    }
    onMouseLeave = e =>{
        this.paint = false
    }
    render(){
        return <Fragment>
            <canvas 
                className="sketch" 
                ref={el => this.canvas = el}
                onMouseMove={this.onMouseMove}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                onMouseLeave={this.onMouseLeave}
            />
            <style jsx>{`
            .sketch{
                position:absolute;
                left:0;
                cursor: pointer;
            }`}
            </style>
        </Fragment>
    }
}