import React, {Component} from 'react';
import CreatePlayerModal from '../create-player';
import axios from "axios";
import CardList from '../card-list';
import CreateSuccess from '../createSuccess';
import DeleteSuccess from '../deleteSuccess';
import TransactionSuccess from '../transactionSuccess';

class General extends Component{

  constructor(){
    super();
    this.state = {
      modal: false,
      dataPlayers: [],
      created: false,
      modalClose: false,
      checkDelete: false,
      forDelId: '',
      nameDel: '',
      transaction:'',
      transactionFrom: '',
      transactionTo: '',
      transactionValue: ''
    }
  }

  componentDidMount(){
    this.resetData()
  }

  resetData = () => {
    axios.get('./api/players.json')
    .then((response) =>{
      this.setState({dataPlayers: response.data})
    })
  }

  createPlayerOn = () => {
    this.setState({
      modal: true
    })
  }

  onCancelPlayerSave = () => {
    this.setState({
      modal: false,
      modalClose: false
    })
  }

  onPlayerSave = (value) => {
    this.setState({
      modal: value,
      created: true,
      modalClose: true
    })
  }

  onCloseModal = () =>{
    this.setState({
      created: false,
      modalClose: false
    })
  }

  onCloseModalDelete = () => {
    this.setState({
      checkDelete: false
    })
  }

  onCloseModaltransaction = () => {
    this.setState({
      transaction: false
    })
  }

  onCreatePlayerData = (value) => {
    this.setState({
      dataPlayers: value
    })
  }

  transaction = (from, to, value) => {
    let formData = new FormData();
		formData.append("from", from)
    formData.append("to", to)
    formData.append("value", value)

    axios.post("./api/transaction.php", formData, {
      data: {
        'from': from,
        'to': to,
        'value': value
      }
    }).then((res) => {
      this.resetData();
      this.setState({
        transaction: true,
        transactionFrom: from,
        transactionTo: to,
        transactionValue: value
      })
    }) 
  }

  FinalDelete = (id) => {
    let formData = new FormData();
		formData.append("id", id)

    axios.post("./api/delete.php", formData, {
      data: {
        'id': id
      }
    }).then((res) => {
        this.resetData();
        this.setState({
          checkDelete: false,
        })
      })
  }


  deletePlayers = (id, name) => {
    this.setState({
      checkDelete: true,
      forDelId: id,
      nameDel: name
    })
  }

  render(){
    const options = this.state.dataPlayers.map((item) => {
      return(
        <option key={item.data.name.id} value={item.data.name}> {item.data.name} </option>
      )
    })

    const clazz = (this.state.modal || this.state.modalClose || this.state.checkDelete || this.state.transaction) ? 'opa': '';
    const createPlayer = this.state.modal ? <CreatePlayerModal onCancelPlayerSave={this.onCancelPlayerSave} onPlayerSave={this.onPlayerSave} onCreatePlayerData={this.onCreatePlayerData}/> : null;
    const cards = this.state.dataPlayers ?  <CardList clazz={clazz} transaction={this.transaction} data ={this.state.dataPlayers} options={options} onDeletePlayers={this.deletePlayers}/> : null;
    const modalCreateSucces = this.state.created ?  <CreateSuccess onCloseModal={this.onCloseModal}/> : null;
    const modalDeleteSucces = this.state.checkDelete ?  <DeleteSuccess onCloseModalDelete={this.onCloseModalDelete} FinalDelete={this.FinalDelete} delId={this.state.forDelId} delName={this.state.nameDel} onCloseModal={this.onCloseModal}/> : null;
    const transactionSuccess = this.state.transaction ? <TransactionSuccess from={this.state.transactionFrom} to={this.state.transactionTo} value={this.state.transactionValue} onCloseModaltransaction={this.onCloseModaltransaction}/>:null;
    
    return(
      <>
        {createPlayer}
        {modalCreateSucces}
        {modalDeleteSucces}
        {transactionSuccess}

        <div className={"general "+ clazz} >
            <div className='general-img'></div>
            <div className='general-right'>
                <div className='general-data'>
                    <ul>
                        <li>Количество игроков: {this.state.dataPlayers.length - 1}</li>
                    </ul>
                </div>
                <div className='general-button'>
                    <button type='button' className="btn btn-success" onClick={this.createPlayerOn}>Создать игрока</button>
                </div>
            </div>
        </div>
        
        {cards}
     </>
    )
  }
    
};

export default General;
