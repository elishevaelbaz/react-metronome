import React, {Component} from 'react';
import './Metronome.css'
import click1 from './click1.wav';
import click2 from './click2.wav';

export default class Mentronome extends Component{
  state = {
    playing: false,
    count: 0,
    bpm: 100,
    beatsPerMeasure: 4
  }

  handleBpmChange = e => {
    const bpm = e.target.value

    if (this.state.playing){
      // stop the old timer
      clearInterval(this.timer)
      // start a new one
      this.timer = setInterval(
        this.playClick,
        (60 / bpm) * 1000
      )
      
      // set the new BPm and reset the beat counter
      this.setState({
        count: 0,
        bpm
        // play a click immediately after setState finished
      })
    }

    else{
      // otherwise just update the pbm
      this.setState({ bpm })
    }
  }

  click1 = new Audio(click1);
  click2 = new Audio(click2);

  playClick = () => {
    const { count, beatsPerMeasure} = this.state;

    // this first beat (of the 4, or # beats per measure,) will have a different sound than the others
    if (count % beatsPerMeasure === 0) {
      this.click2.play();
    }
    else{
      this.click1.play();
    }

    // keep track of which beat we are on
    this.setState(prevState => ({
      count: (prevState.count + 1) % prevState.beatsPerMeasure
    }))
  }

  startStop = () => {
    if (this.state.playing){
      // stop the timer
      clearInterval(this.timer)
      this.setState({
        playing: false
      })
    }
    else{
      // start a timer with the current bpm
      this.timer = setInterval(
        this.playClick,
        (60 / this.state.bpm) * 1000
      )
      
      this.setState({
        count: 0,
        playing: true
        // play a click immediately after setState finished
      },
        this.playClick
      )
    }
  }

  render(){
    const {playing, bpm} = this.state

    return(
      <div className="metronome">
        <div className="bpm-slider">
          <div>{bpm} BPM</div>
          <input type="range" min="60" max="240" onChange={this.handleBpmChange} value={bpm}/>
        </div>
        <button onClick={this.startStop}>{playing ? 'Stop' : 'Start'}</button>
      </div>
    )
  }
}