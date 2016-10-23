/* @flow */
"use strict";

import React, { Component } from "react";
import { fabric } from "fabric";

class Board extends Component {
    constructor(props) {
        super(props);
        this._bind("_selectPencil", "_selectEraser", "_onClear");
    }

    _bind(...methods) {
        methods.forEach(
            method => this[method] = this[method].bind(this));
    }

    _selectPencil() {
        this.canvas.freeDrawingBrush.width = 3;
        this.canvas.freeDrawingBrush.color = "#FFF";
    }

    _selectEraser() {
        this.canvas.freeDrawingBrush.width = 20;
        this.canvas.freeDrawingBrush.color = "#1B1C1D";
    }

    _onClear() {
        this.canvas.clear();
    }

    componentDidMount() {
        this.canvas = new fabric.Canvas("board");
        this.canvas.isDrawingMode = this.props.allowDraw;
        this.canvas.freeDrawingBrush.width = 3;
        this.canvas.freeDrawingBrush.color = "#FFF";
    }

    render() {
        return (
            <div className="ui center aligned grid">
                <div className="column" style={{width: "fit-content"}}>
                    <div className="ui segments">
                        <div className="ui inverted compact segment">
                            <canvas id="board" width={this.props.width}
                                height={this.props.height}/>
                        </div>
                        <div className="ui compact segment">
                            <button
                                className="ui compact inverted circular green icon mini button"
                                onClick={this._selectPencil}>
                                <i className="icon write"/>
                            </button>
                            <button
                                className="ui compact inverted circular orange icon mini button"
                                onClick={this._selectEraser}>
                                <i className="icon erase"/>
                            </button>
                            <button
                                className="ui compact inverted circular red icon mini button"
                                onClick={this._onClear}>
                                <i className="icon remove"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Board.propTypes = {
    height: React.PropTypes.number.isRequired,
    width : React.PropTypes.number.isRequired,
    allowDraw: React.PropTypes.bool.isRequired
};

Board.defaultProps = {};

export default Board;
