import React, {Component} from "react";
import axios from "axios";
import './create-player-modal.css';


class CreatePlayerModal extends Component {

  constructor(props){
		super();
		this.state = {
			name: '',
      nik: '',
      bank: '',
      face: '',
		}
	}

  onInputChange(e){
		this.setState({
      [e.target.name] : e.target.value
		})
	}

  cancelCreate = () => {
    this.props.onCancelPlayerSave();
  }


  onPlayerSave = () => {
    let face = document.getElementById('face');
    let formData = new FormData();
		formData.append("image", face.files[0])
    
    axios.post('./api/uploadImage.php', formData, {
      headers:{
        "Content-Type": "multipart/form-data"
      }
    }).then((res) => {
      axios.post("./api/createPlayer.php", {
        data: {
          'id': Math.floor(Math.random() * (1000 - 10)) + 10,
          'name': this.state.name,
          'nik': this.state.nik,
          'bank': this.state.bank,
          'face': res.data.src
        }
      }).then((res) => {
          this.props.onPlayerSave(false);
        }).catch((err) => {
          console.log(err)
        });
    })
  }

  componentWillUnmount() {
    axios.get('./api/players.json')
    .then((response) => {
      this.props.onCreatePlayerData(response.data)
    })
  }

  render(){
    return(
      <>
        <div className="createPlayer">
          <h2>Создание игрока</h2>
            <form method="post" enctype="multipart/form-data" >
              <label htmlFor="name">Имя</label>
              <input id="name" onChange={(e) => this.onInputChange(e)} name="name" type="text" className="form-control" />
              <label htmlFor="nik">Ник</label>
              <input id="nik" onChange={(e) => this.onInputChange(e)} name="nik" type="text" className="form-control" />
              <label htmlFor="bank">Банк</label>
              <input id="bank" onChange={(e) => this.onInputChange(e)} name="bank" type="text" className="form-control" />
              <label htmlFor="face">Фотография</label>
              <input id="face" name="face" type="file" className="form-control"/>

              <button type="button" className="btn btn-success" 
                      onClick={this.onPlayerSave}>
                      Добавить игрока
              </button>
              <button type="button" className="btn btn-danger" 
                      onClick={this.cancelCreate}>
                      Отмена
              </button>
            </form>
        </div>
      </>
    )
  }
  
};

export default CreatePlayerModal;