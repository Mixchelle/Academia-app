import React, { useState, useEffect } from "react";
import michelleTreino from "../michelle.json";
import Header from "./Header";
import { Button } from "react-bootstrap";
import gif from '../gif.gif';

function PageHome() {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [exerciseCompleted, setExerciseCompleted] = useState(false);
  const [allExercisesCompleted, setAllExercisesCompleted] = useState(false);
  const [exerciseStatus, setExerciseStatus] = useState([]);

  useEffect(() => {
    setExerciseCompleted(false);
    setAllExercisesCompleted(false);
    setExerciseStatus(new Array(michelleTreino[currentDayIndex].exercicios.length).fill(false));
  }, [currentDayIndex]);

  // const handleExerciseComplete = () => {
  //   setExerciseCompleted(true);
  // };

  const handleNextDay = () => {
    if (currentDayIndex === michelleTreino.length - 1) {
      // Se for o último dia de treino, reinicia do primeiro dia
      setCurrentDayIndex(0);
    } else {
      // Caso contrário, avança para o próximo dia de treino
      setCurrentDayIndex(currentDayIndex + 1);
    }
    setExerciseCompleted(false);
    setAllExercisesCompleted(false);
    setExerciseStatus(new Array(michelleTreino[currentDayIndex].exercicios.length).fill(false));
  };

  const currentDay = michelleTreino[currentDayIndex];
  const allExercises = currentDay ? currentDay.exercicios : [];

  const handleCheckboxChange = (index) => {
    const updatedExerciseStatus = [...exerciseStatus];
    updatedExerciseStatus[index] = !updatedExerciseStatus[index];

    const allCompleted = updatedExerciseStatus.every((status) => status);
    setAllExercisesCompleted(allCompleted);

    setExerciseStatus(updatedExerciseStatus);

    if (allCompleted) {
      setExerciseCompleted(true);
    }
  };

  return (
    <div>
      <Header userName="Michelle Marquez" currentExercise={currentDay.dia} />
      <div className="container">
       
        <h3 className="dia">{currentDay.dia}</h3>
        <img src={gif} alt='gif' className="gif"/>
        <ul className="list-group">
          {allExercises.map((exercicio, index) => (
            <li
              key={index}
              className={`list-group-item ${exerciseStatus[index] ? "completed" : ""}`}
            >
              <label>
                <input
                  type="checkbox"
                  checked={exerciseStatus[index]}
                  onChange={() => handleCheckboxChange(index)}
                  disabled={exerciseCompleted || exerciseStatus[index]}
                />
                {exercicio.nome}
              </label>
            </li>
          ))}
        </ul>
        {allExercisesCompleted && (
          <Button onClick={handleNextDay} variant="primary" className="mt">
            Concluir Treino
          </Button>
        )}
        <footer className="footer mt-3">Contador de treinos concluídos: {currentDayIndex}</footer>
      </div>
    </div>
  );
}

export default PageHome;

