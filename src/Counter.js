import React, {Component} from 'react';

export default class Counter extends Component{
  state = {
    count: 0,
    isRunning: false
  }

  handleIncrement = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }))
    // this.timer = setInterval(
    //   console.log(this.timer), 1000
    //   // console.log(this.timer)
    // )
  }

  handleDecrement = () => {
    this.setState(prevState => ({
      count: prevState.count - 1
    }))
  }

  startTimer = () => {
    if (!this.state.isRunning){
      this.timer = setInterval(() => {
        this.setState(prevState => ({
          count: prevState.count + 1
        }))
      }
        , 1000
      )
      this.setState({
        isRunning: true
      })
    }
  }

  stopTimer = () => {
    if (this.state.isRunning){
      clearInterval(this.timer)
      this.setState({
        isRunning: false
      })
    }
    else {
      this.setState({
        count: 0
      })
    }
  }

  componentDidMount = () => {
    this.startTimer()
  }
  

  componentWillUnmount = () => {
    clearInterval(this.timer)
    this.setState({
      isRunning: false
    })
  }

  render(){
    return(
      <div className="counter">{this.state.count}
      <br/>
      <button onClick={this.handleDecrement}>decrement</button>
      <button onClick={this.handleIncrement}>increment</button>
      <button onClick={this.startTimer}>start timer</button>
      <button onClick={this.stopTimer}>{ this.state.isRunning ? "stop timer" : "reset count"}</button>
      </div>
    )
  }
}