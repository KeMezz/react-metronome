import { useEffect, useState } from "react";
import styled from "styled-components";
import useInterval from "./utils/useInterval";
import useEventListener from "./utils/useEventListener";
import { FaPlay, FaPause } from "react-icons/fa";
import { GoCheck } from "react-icons/go";
import { motion } from "framer-motion";

const soundfile1 = require("./assets/sounds/click1.mp3");
const soundfile2 = require("./assets/sounds/click2.mp3");
const click1 = new Audio(soundfile1);
const click2 = new Audio(soundfile2);

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
        accentMode ? (click1.currentTime = 0) : (click2.currentTime = 0);
      } else {
        click2.play();
        click2.currentTime = 0;
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

  const toggleAccent = () => {
    setCount(0);
    setAccentMode((prev) => !prev);
  };

  return (
    <Container isRunning={isRunning}>
      <Draggable />
      <Indicator>
        {measureArr.map((item, index) => (
          <Circle
            key={index}
            style={{
              backgroundColor: isRunning && item === count ? "#333" : "#ddd",
            }}
            onClick={toggleAccent}
          >
            {index === 0 && accentMode ? <GoCheck /> : null}
          </Circle>
        ))}
      </Indicator>
      <BPMText>{bpm}</BPMText>
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

const Container = styled.main<{ isRunning: boolean }>`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 18vh;
  align-items: center;
`;

const Draggable = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 36px;
  background-color: #f1f1f1;
  position: fixed;
  -webkit-app-region: drag;
`;

const Indicator = styled.section`
  display: flex;
  gap: 20px;
`;

const Circle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:first-child {
    cursor: pointer;
  }
  svg {
    font-size: 26px;
    color: #999;
  }
`;

const BPMText = styled(motion.h1)`
  font-size: 140px;
  font-weight: 900;
  font-family: "Montserrat";
  color: #222;
  cursor: ns-resize;
`;

const Buttons = styled(motion.section)`
  cursor: pointer;
  font-size: 40px;
`;

export default App;
