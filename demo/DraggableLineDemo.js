/**
 * DraggableLine Component Demo for uxcore
 * @author alex-mm
 *
 * Copyright 2014-2015, Uxcore Team, Alinw.
 * All rights reserved.
 */

import React, { Component } from 'react';
import DraggableLine from './../src';

const maxWidth = 1000;
const defaultWidth = 200;

class Demo extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        width: defaultWidth,
      };
    }

    onStartDrag(width) {
      this.setState({
        width,
      });
    }

    render() {
      return (
        <div className="uxcore-draggable-line-test" style={{ width: this.state.width }}>
          <DraggableLine defaultWidth={this.state.width}
            className="draggable-line"
            onStartDrag={this.onStartDrag.bind(this)}
            defaultWidth={defaultWidth}
            minWidth={defaultWidth}
            maxWidth={maxWidth}
          />
        </div>
      );
    }
};

module.exports = Demo;
