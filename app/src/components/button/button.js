import React, { Component } from 'react';

class Button extends Component {
  constructor(props){
    super(props)
   }

   render(){
    return( <button type="button" className="btn btn-secondary" onClick={this.props.onDeletePlayersTr}>Запустить процедуру банкротства</button>)
   }
    
  }

export default Button;
