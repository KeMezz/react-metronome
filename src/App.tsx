import styled from "styled-components";

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
const TempoText = styled.div`
  font-size: 0.8em;
  text-transform: uppercase;
  text-align: center;
`;
const TempoSettings = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .adjust-tempo-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    font-size: 20px;
    border-radius: 50%;
    border: 1px solid #ddd;
    text-align: center;
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
const BPMText = styled.span`
  text-align: center;
  font-size: 0.5em;
  text-transform: uppercase;
`;

function App() {
  return (
    <Container>
      <Metronome>
        <BPMDisplay>
          <span className="tempo">140</span>
          <span className="bpm">BPM</span>
        </BPMDisplay>
        <TempoText>Nice and steady</TempoText>
        <TempoSettings>
          <div className="adjust-tempo-btn decrease-tempo">-</div>
          <BPMSlider
            type="range"
            min="20"
            max="280"
            step="1"
            className="slider"
          />
          <div className="adjust-tempo-btn increase-tempo">+</div>
        </TempoSettings>
        <StartStop>START</StartStop>
        <Measures>
          <div className="subtract-beats stepper">-</div>
          <div className="measure-count">4</div>
          <div className="add-beats stepper">+</div>
        </Measures>
        <BPMText>Beats per measure</BPMText>
      </Metronome>
    </Container>
  );
}

export default App;
