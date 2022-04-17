import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useInterval from "./utils/useInterval";
import { FaPlay, FaPause } from "react-icons/fa";

const soundfile1 = require("./assets/click1.mp3");
const soundfile2 = require("./assets/click2.mp3");
const click1 = new Audio(soundfile1);
const click2 = new Audio(soundfile2);

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16vh;
  align-items: center;
`;

const Indicator = styled.section`
  display: flex;
  gap: 30px;
`;

const Circle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;

const BPMText = styled.h1`
  font-size: 160px;
  font-weight: 900;
  color: #222;
`;

const Buttons = styled.section`
  cursor: pointer;
  font-size: 50px;
`;

function App() {
  const [bpm, setBpm] = useState(140);
  const [timeInterval, setTimeInterval] = useState(60000 / bpm);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => setTimeInterval(60000 / bpm), [bpm]);

  const onDecreaseClick = () => {
    if (bpm <= 20) return;
    setBpm((prev) => prev + 1);
  };
  const onIncreaseClick = () => {
    if (bpm >= 280) return;
    setBpm((prev) => prev + 1);
  };
  const onSliderChange = (event: React.FormEvent<HTMLInputElement>) => {
    setBpm(Number(event.currentTarget.value));
  };
  const onBeatsSubtract = () => {
    if (beatsPerMeasure <= 2) return;
    setBeatsPerMeasure((prev) => prev - 1);
    setCount(1);
  };
  const onBeatsAdd = () => {
    if (beatsPerMeasure >= 12) return;
    setBeatsPerMeasure((prev) => prev + 1);
    setCount(1);
  };
  const onStartStopClick = () => {
    setCount(1);
    if (!isRunning) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  };
  const playClick = () => {
    if (!isRunning) return;
    else {
      if (count === beatsPerMeasure) {
        setCount(0);
      }
      if (count === 0) {
        click1.play();
      } else {
        click2.play();
      }
      setCount((prev) => prev + 1);
    }
  };

  console.log(count);

  useInterval(playClick, timeInterval);

  return (
    <Container>
      <Indicator>
        {[1, 2, 3, 4].map((item) => (
          <Circle
            key={item}
            style={{
              backgroundColor: isRunning && item === count ? "#333" : "#ccc",
            }}
          />
        ))}
      </Indicator>
      <BPMText>{bpm}</BPMText>
      <Buttons onClick={onStartStopClick}>
        {isRunning ? <FaPause /> : <FaPlay />}
      </Buttons>
    </Container>
  );
}

export default App;
