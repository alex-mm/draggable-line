/**
 * DraggableLine Component for uxcore
 * @author alex-mm
 *
 * Copyright 2014-2015, Uxcore Team, Alinw.
 * All rights reserved.
 */

 import React, { Component } from 'react';
 import classnames from 'classnames';

 class DraggableLine extends Component {
   static displayName = 'DraggableLine';

   static propTypes = {
     onStartDrag: React.PropTypes.func,
     className: React.PropTypes.string,
     defaultWidth: React.PropTypes.number,
     maxWidth: React.PropTypes.number,
     minWidth: React.PropTypes.number,
   };

   static defaultProps = {
     defaultWidth: 0,
     minWidth: 0,
     maxWidth: 9999,
     onStartDrag() {},
   };

   constructor(props) {
     super(props);
     this.startDrag = false;
     this.canDrag = false;
     this.startOffset = 0;
     this.endOffset = props.defaultWidth; // 每一次开始拖拽时的宽度
     this.currentWidth = props.defaultWidth;
   }

   componentDidMount() {
     this.offEvent = this.initEvent();
   }

   componentWillUnmount() {
     if (this.offEvent) {
       this.offEvent();
     }
   }

   onSelectStart(e) {
     if (this.startDrag) {
       e.preventDefault();
     }
   }

   onStartMove(e) {
     this.startDrag = true;
     this.canDrag = true;
     this.offDragEvent = this.initDragEvent();
     this.startOffset = e.clientX;
   }

   onEndMove(e) {
     if (this.startDrag) {
       this.endOffset = this.canDrag ? e.clientX : this.currentWidth;
       if (this.offDragEvent) {
         this.offDragEvent();
       }
       this.startDrag = false;
     }
   }

   onStartDrag(e) {
     if (this.startDrag) {
       this.currentWidth = this.endOffset + (e.clientX - this.startOffset);
       if (this.currentWidth < this.props.minWidth) {
         this.canDrag = false;
         this.currentWidth = this.props.minWidth;
       } else if (this.currentWidth > this.props.maxWidth) {
         this.canDrag = false;
         this.currentWidth = this.props.maxWidth;
       } else {
         this.canDrag = true;
       }
       this.props.onStartDrag(this.currentWidth, e);
     }
   }

   initEvent() {
     const selectStart = this.onSelectStart.bind(this);
     document.addEventListener('selectstart', selectStart);
     return () => document.removeEventListener('selectstart', selectStart);
   }

   initDragEvent() {
     const onStartDrag = this.onStartDrag.bind(this);
     const onEndMove = this.onEndMove.bind(this);
     document.addEventListener('mousemove', onStartDrag);
     document.addEventListener('mouseup', onEndMove);
     return () => {
       document.removeEventListener('mousemove', onStartDrag);
       document.removeEventListener('mouseup', onEndMove);
     };
   }

   render() {
     return (
       <div
         className={classnames('uxcore-draggable-line', {
           [this.props.className]: !!this.props.className,
         })}
         onMouseDown={this.onStartMove.bind(this)}
       />
     );
   }
 }

 export default DraggableLine;
