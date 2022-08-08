import React from 'react';

class CountDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {}
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.props.seconds());
    this.setState({ time: timeLeftVar });
  }

  startTimer() {
    if (this.timer == 0 && this.props.seconds() > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    this.setState({
      time: this.secondsToTime(this.props.seconds())
    });

    // Check if we're at zero.
    if (this.props.seconds() == 0) {
      this.props.onEnd();
      clearInterval(this.timer);
    }
  }
  componentDidMount() {
    this.startTimer();
  }

  render() {
    return (
      <>
        {this.state.time.s || this.state.time.m || this.state.time.h ? (
          <div>
            {`${('0' + this.state.time.s).slice(-2)} : 
        ${('0' + this.state.time.m).slice(-2)}  :
         ${('0' + this.state.time.h).slice(-2)} `}
          </div>
        ) : (
          <div>{`00:00:00`}</div>
        )}
      </>
    );
  }
}

export default CountDown;
