import React from 'react';
import CardListItem from '../card-list-item';

const CardList = ({data, onDeletePlayers, options, transaction, clazz}) => {
  if(data){
    const elements = data.map((item) => {
      return(
        <CardListItem key={item.data.id} 
                      transaction={(a,b,c) => transaction(a,b,c)} 
                      playerData={item} 
                      options={options} 
                      onDeletePlayersTr={() => onDeletePlayers(item.data.id, item.data.name)} 
        />
      )
    })

    return(
      <div className={"card-list " + clazz} >
          {elements}
      </div>  
    )
  }
};

export default CardList;
