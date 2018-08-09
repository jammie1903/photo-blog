import React from "react";
import Img from 'gatsby-image';
import "./imageCollection3d.css";

export default class ImageCollection3d extends React.Component {

    constructor(props) {
        super(props);
        this.startDrag = this.startDrag.bind(this);
        this.stopDrag = this.stopDrag.bind(this);
        this.onDrag = this.onDrag.bind(this);
        this.state = { offset: 0 };
    }

    startDrag(e) {
        this.dragging = true;
        this.dragLastX = e.pageX || e.touches[0].pageX;
        console.log("drag start", this.dragLastX);
    }

    stopDrag(e) {
        this.dragging = false;
        if(Date.now() - this.lastDragTime < 100) {
            this.setState({offset: this.state.offset + this.lastMovement ^ 2.5});
        }
        console.log("drag end", this.lastMovement);
    }

    onDrag(e) {
        if(this.dragging) {
            const x = e.pageX || e.touches[0].pageX;
            const movement = this.dragLastX - x;
            this.lastDragTime = Date.now();
            this.dragLastX = x;
            this.lastMovement = movement;
            this.setState({offset: this.state.offset + movement});
            console.log("drag", this.dragLastX);
        }
    }
    
    render() {
        const offset = this.state.offset / 5;
        return (
            <div className="ImageCollection3d" onMouseDown={this.startDrag} onTouchStart={this.startDrag}
                onMouseLeave={this.stopDrag} onMouseUp={this.stopDrag} onTouchEnd={this.stopDrag}
                onMouseMove={this.onDrag} onTouchMove={this.onDrag}>
                <div className="image-collection image-collection-3d" style={{ transform: `translateZ(-690px) rotateY(${-offset}deg)` }} >
                    {this.props.images && this.props.images.map((image, index) => {
                        const rotate = ((index) * 30 - offset);
                        const hidden = rotate > 90 || rotate < -90;
                        return (
                            <div className="image-container" style={{ "transform": `rotateY(${index * 30}deg) translateZ(690px)`, "opacity": hidden ? "0" : "1" }} key={image.id} data-image-id={image.id}>
                                <Img sizes={image.sizes} alt={image.title} />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
