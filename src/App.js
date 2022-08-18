import React from "react";
import "./styles.css";

export default function App() {
  const [time, setTime] = React.useState(0);
  const [minute, setMinute] = React.useState(0);
  const [second, setSecond] = React.useState(0);
  const [inter, setIn] = React.useState(null);
  const start = () => {
    const interval = setInterval(() => {
      setTime((time) => time - 1);
      setSecond((second) => {
        if (second === 0) {
          if (minute * 60 >= 1) {
            setSecond(60);
            setMinute((minute) => minute - 1);
          } else {
            setSecond(0);
            clearInterval(interval);
          }
        } else {
          setSecond(second - 1);
        }
      });
      setIn(interval);
      if (time === 0) {
        return () => {
          clearInterval(interval);
          setTime(0);
        };
      }
    }, 1000);
  };

  const calcTime = () => {
    if (!minute || !second) {
      alert('Please set the timer first')
      return;
    }
    const time = minute * 60 + second;
    setTime(time);
    start();
  };

  return (
    <div className="App">
      <div className="input-container">
        <div className="input">
          <label>
            Minutes
          </label>
          <Input
            type="number"
            value={minute}
            onChange={(e) => setMinute(Number(e.target.value))}
          />
        </div>
        <div className="input">
          <label>
            Seconds
          </label>
          <Input
            type="number"
            value={second}
            onChange={(e) => setSecond(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="timer">
        <h1 data-testid="running-clock">
          {(minute || '').toString().length > 1 ? minute : `0${minute}`}
          :
          {(second || '').toString().length > 1 ? second : `0${second}`}
        </h1>
      </div>
      <div className="button-container">
        <Button onClick={calcTime}>START</Button>
        <Button
          onClick={() => {
            if (!minute || !second) {
              alert('Please set the timer first')
              return;
            }
            if (!inter) {
              start();
            } else {
              clearInterval(inter);
              setIn(null);
            }
          }}
        >
          {" "}
          PAUSE / RESUME
        </Button>
        <Button
          onClick={() => {
            setTime(0);
            setMinute(0);
            setSecond(0);
            clearInterval(inter);
          }}
        >
          RESET
        </Button>
      </div>
    </div>
  );
}


const Input = (props) => <input className="ant-input" {...props} />

const Button = (props) => <button className="ant-btn ant-btn-primary" {...props}>{props.children}</button>