import React, { Component } from 'react';

class CreateSuccess extends Component {

  constructor(props){
    super(props)
   }

   render(){
    return(
      <div className='createdPlayer'>
         <p>Игрок успешно создан! И готов плотить нолог</p>
         <div>
            <button className='btn btn-success' onClick={this.props.onCloseModal}>Ok</button>
         </div>
      </div>  
    )
   }
    
  }


export default CreateSuccess;
