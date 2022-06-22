import React, {Component} from 'react';
import Button from '../button';

class CardListItem extends Component {
  constructor(props){
    super(props)
    this.state = {
      from: '',
      to: '',
      value: '',
    }
  }
     
  onTransaction(e){
    this.props.transaction(this.state.from, this.state.to, this.state.value)
  }

  onSelectSumm(e){
    let idFrom = e.target.name;
    let cash = e.target.value;
    this.setState({from: idFrom, value: cash});
  }

  onSelectPlayer(e){
    this.setState({to: e.target.value});
  }

  render(){
       const error = this.props.playerData.data.error? 'error' : 'ok';
       const button = this.props.playerData.data.name!=='Bank'? <Button  onDeletePlayersTr={this.props.onDeletePlayersTr}/> : null
      
        return(
          <div className="card-list-item">
              <div className="top">
                <div className="profile-img"style={{backgroundImage:`url(../img/${this.props.playerData.data.face})`}}></div>
                <div className="profile-data">
                  <ul>
                    <li className={error}>Имя: {this.props.playerData.data.name}</li>
                    <li className={error}>Ник: {this.props.playerData.data.nik}</li>
                    <li className={error}>Банк: {this.props.playerData.data.bank}</li>
                  </ul>
                </div>
              </div>
              <div className='bottom'>
                <div className='bottom-item'>
                  <select className="custom-select" onChange={(e) => this.onSelectPlayer(e)}>
                    <option>Кому:</option>
                    {this.props.options}
                  </select>  
                </div>
                <div className='bottom-item ' >
                  <input type="text" value={this.state.value} name={this.props.playerData.data.name} id={this.props.playerData.data.id} className="form-control summ" onChange={(e) => this.onSelectSumm(e)} placeholder='Сколько :'/>
                </div>
                <div className='bottom-item'>
                  <button type="button" className="btn btn-success" onClick={(e) => this.onTransaction(e)}>Перевести</button>
                </div>
              </div>
              <div className='deletePlayer'>
                {button}
              </div>
          </div>  
        )
      }
     
};

export default CardListItem;
