import React, { useState } from "react";
import styled from "styled-components";
import Timer from "./timer";

const soundfile1 = require("./assets/click1.mp3");
const soundfile2 = require("./assets/click2.mp3");
const click1 = new Audio(soundfile1);
const click2 = new Audio(soundfile2);

const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Metronome = styled.section`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 250px;
  justify-content: space-between;
`;
const BPMDisplay = styled.div`
  width: 100%;
  text-align: center;
  color: #fa545c;
  font-weight: bold;
  .tempo {
    font-size: 4em;
  }
`;
const TempoSettings = styled.div`
  display: flex;
  justify-content: space-between;
  .adjust-tempo-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    font-size: 20px;
    border-radius: 15px;
    border: 1px solid #ddd;
    cursor: pointer;
    &:hover {
      background: #fa545c;
      color: #fff;
    }
  }
`;
const BPMSlider = styled.input`
  -webkit-appearance: none;
  background-color: transparent;
  width: 70%;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
  }
  &:focus {
    outline: none;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fa545c;
    cursor: pointer;
    margin-top: -8px;
  }
  &::-moz-range-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fa545c;
    cursor: pointer;
    border: none;
  }
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 1px;
    background: #ddd;
  }
  &::-moz-range-track {
    width: 100%;
    height: 1px;
    background: #ddd;
  }
`;
const StartStop = styled.div`
  width: 50px;
  height: 50px;
  font-size: 0.7em;
  text-align: center;
  background: #fa545c;
  border-radius: 50%;
  color: #fff;
  line-height: 50px;
  margin: 0 auto;
  cursor: pointer;
  &:hover {
    background: #ff656c;
  }
`;
const Measures = styled.div`
  display: flex;
  justify-content: center;
  .stepper {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #ddd;
    text-align: center;
    margin: 0 5px;
    cursor: pointer;
    &:hover {
      background: #ff656c;
      color: #fff;
    }
  }
  .add-beats {
    line-height: 20px;
  }
`;
const MeasureText = styled.span`
  text-align: center;
  font-size: 0.5em;
  text-transform: uppercase;
`;

function App() {
  const [bpm, setBpm] = useState(140);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const onDecreaseClick = () => {
    if (bpm <= 20) return;
    setBpm((prev) => prev + 1);
    updateMetronome();
  };
  const onIncreaseClick = () => {
    if (bpm >= 280) return;
    setBpm((prev) => prev + 1);
    updateMetronome();
  };
  const onSliderChange = (event: React.FormEvent<HTMLInputElement>) => {
    setBpm(Number(event.currentTarget.value));
    updateMetronome();
  };
  const onBeatsSubtract = () => {
    if (beatsPerMeasure <= 2) return;
    setBeatsPerMeasure((prev) => prev - 1);
    setCount(0);
  };
  const onBeatsAdd = () => {
    if (beatsPerMeasure >= 12) return;
    setBeatsPerMeasure((prev) => prev + 1);
    setCount(0);
  };
  const onStartStopClick = () => {
    setCount(0);
    if (!isRunning) {
      metronome.start();
      setIsRunning(true);
    } else {
      metronome.stop();
      setIsRunning(false);
    }
  };

  const updateMetronome = () => {
    metronome.timeInterval = 60000 / bpm;
  };

  const playClick = () => {
    console.log(count);
    if (count === beatsPerMeasure) {
      setCount(0);
    }
    if (count === 0) {
      click1.play();
      click1.currentTime = 0;
    } else {
      click2.play();
      click2.currentTime = 0;
    }
    setCount((prev) => prev + 1);
  };

  const metronome = new Timer(playClick, 60000 / bpm, { immediate: true });

  return (
    <Container>
      <Metronome>
        <BPMDisplay>
          <span className="tempo">{bpm}</span>
          <span className="bpm">BPM</span>
        </BPMDisplay>
        <TempoSettings>
          <div
            className="adjust-tempo-btn decrease-tempo"
            onClick={onDecreaseClick}
          >
            -
          </div>
          <BPMSlider
            type="range"
            min="20"
            max="280"
            step="1"
            value={bpm}
            className="slider"
            onChange={onSliderChange}
          />
          <div
            className="adjust-tempo-btn increase-tempo"
            onClick={onIncreaseClick}
          >
            +
          </div>
        </TempoSettings>
        <StartStop onClick={onStartStopClick}>
          {isRunning ? "STOP" : "START"}
        </StartStop>
        <Measures>
          <div className="subtract-beats stepper" onClick={onBeatsSubtract}>
            -
          </div>
          <div className="measure-count">{beatsPerMeasure}</div>
          <div className="add-beats stepper" onClick={onBeatsAdd}>
            +
          </div>
        </Measures>
        <MeasureText>Beats per measure</MeasureText>
      </Metronome>
    </Container>
  );
}

export default App;
