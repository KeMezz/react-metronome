import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useInterval from "./utils/useInterval";
import useEventListener from "./utils/useEventListener";
import { FaPlay, FaPause } from "react-icons/fa";
import { motion } from "framer-motion";

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

const BPMText = styled(motion.h1)`
  font-size: 160px;
  font-weight: 900;
  color: #222;
  cursor: ns-resize;
`;

const Buttons = styled(motion.section)`
  cursor: pointer;
  font-size: 50px;
`;

function App() {
  const [bpm, setBpm] = useState(80);
  const [timeInterval, setTimeInterval] = useState(60000 / bpm);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [accentMode, setAccentMode] = useState(true);
  const [measureArr, setMeasureArr] = useState([1, 2, 3, 4]);

  useEffect(() => {
    setMeasureArr(() => {
      let resultArr = [1];
      for (let i = 2; i <= beatsPerMeasure; i++) {
        resultArr.push(i);
      }
      return resultArr;
    });
  }, [beatsPerMeasure]);

  useEffect(() => {
    setTimeInterval(60000 / bpm);
    if (bpm <= 20) {
      setBpm(20);
    } else if (bpm >= 300) {
      setBpm(300);
    }
  }, [bpm]);

  const changeBPM = (value: number) => {
    setBpm((prev) => prev + value);
  };
  const onSliderChange = (event: React.FormEvent<HTMLInputElement>) => {
    setBpm(Number(event.currentTarget.value));
  };
  const changeMeasure = (value: number) => {
    if (beatsPerMeasure <= 2 || beatsPerMeasure >= 12) return;
    setBeatsPerMeasure((prev) => prev + value);
    setCount(1);
  };
  const onStartStopClick = () => {
    setCount(0);
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
      if (count === 0 || count === beatsPerMeasure) {
        accentMode ? click1.play() : click2.play();
      } else {
        click2.play();
      }
      setCount((prev) => prev + 1);
    }
  };

  useInterval(playClick, timeInterval);

  useEventListener("keydown", (event) => {
    if (event.key === " ") {
      setIsRunning((prev) => !prev);
      setCount(0);
    }
    if (event.key === "3") {
      setCount(0);
      setBeatsPerMeasure(3);
    }
    if (event.key === "4") {
      setCount(0);
      setBeatsPerMeasure(4);
    }
    if (event.key === "5") {
      setCount(0);
      setBeatsPerMeasure(5);
    }
    if (event.key === "6") {
      setCount(0);
      setBeatsPerMeasure(6);
    }
    if (event.key === "7") {
      setCount(0);
      setBeatsPerMeasure(7);
    }
    if (event.key === "8") {
      setCount(0);
      setBeatsPerMeasure(8);
    }
    if (bpm < 20 || bpm > 300) return;
    else if (event.key === "ArrowUp") changeBPM(1);
    else if (event.key === "ArrowDown") changeBPM(-1);
    else if (event.key === "ArrowRight") changeBPM(+10);
    else if (event.key === "ArrowLeft") changeBPM(-10);

    if (event.key === "Enter") setAccentMode((prev) => !prev);
  });

  return (
    <Container>
      <Indicator>
        {measureArr.map((item) => (
          <Circle
            key={item}
            style={{
              backgroundColor: isRunning && item === count ? "#333" : "#ccc",
            }}
          />
        ))}
      </Indicator>
      <BPMText initial={{ scale: 1 }} whileHover={{ scale: 1.1 }}>
        {bpm}
      </BPMText>
      <Buttons
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        onClick={onStartStopClick}
      >
        {isRunning ? <FaPause /> : <FaPlay />}
      </Buttons>
    </Container>
  );
}

export default App;
