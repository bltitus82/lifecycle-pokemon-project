import React, { Component } from 'react'
import './PokeFetch.css';

class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '', 
      seconds: 10,
    }
  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .catch((err) => console.log(err))
  }

  render() {
    const { seconds } = this.state;
    console.log(seconds);
    if (seconds === 0) {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => {this.fetchPokemon(); this.timer();}}>Start!</button>
        <h1 className={'timer'}> Time Remaining: {seconds} </h1>
        <div className={'pokeWrap'}>
          <img className={'pokeImg'} id={"reveal"} alt={"pokemon"} src={this.state.pokeSprite} />
          <h1 className={'pokeName'}>{this.state.pokeName}</h1>
        </div>
      </div>
    )
  } else {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => {this.fetchPokemon(); this.timer()}}> Start! </button>
        <h1 className={'timer'} >Time Remaining: {seconds}</h1>
        <div className={'pokeWrap'}>
          <img className={'pokeImg'} id={'hide'} alt={"pokemon"} src={this.state.pokeSprite} />
        </div>
      </div>
    )
  }
}

timer() {
  this.myInterval = setInterval(() => {
    this.setState(prevState => ({
      seconds: prevState.seconds - 1
    }))
    if (this.state.count === 0) {
      clearInterval(this.myInterval)
    } if (this.state.count < 0) {
      this.setState({ count: 10 })
    }
  }, 1000)
}

}

export default PokeFetch;