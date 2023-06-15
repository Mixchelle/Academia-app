import React, { useState, useEffect } from "react";
import michelleTreino from "../michelle.json";
import Header from "./Header";
import { Button } from "react-bootstrap";
import gif from '../gif.gif';

function PageHome() {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [exerciseCompleted, setExerciseCompleted] = useState(false);
  const [exerciseStatus, setExerciseStatus] = useState([]);
  const [contador, setContador] = useState(0);

  useEffect(() => {
    const savedDayIndex = localStorage.getItem("currentDayIndex");
    const savedContador = localStorage.getItem("contador");

    if (savedDayIndex !== null && !isNaN(savedDayIndex)) {
      setCurrentDayIndex(parseInt(savedDayIndex));
    }

    if (savedContador !== null && !isNaN(savedContador)) {
      setContador(parseInt(savedContador));
    }
  }, []);

  useEffect(() => {
    setExerciseCompleted(false);
    setExerciseStatus(new Array(michelleTreino[currentDayIndex].exercicios.length).fill(false));
    localStorage.setItem("currentDayIndex", currentDayIndex.toString());
  }, [currentDayIndex]);

  useEffect(() => {
    localStorage.setItem("contador", contador.toString());
  }, [contador]);

  const handleNextDay = () => {
    if (currentDayIndex === michelleTreino.length - 1) {
      // Se for o último dia de treino, reinicia do primeiro dia
      setCurrentDayIndex(0);
    } else {
      // Caso contrário, avança para o próximo dia de treino
      setCurrentDayIndex(currentDayIndex + 1);
    }
    setExerciseCompleted(false);
    setExerciseStatus(new Array(michelleTreino[currentDayIndex].exercicios.length).fill(false));
  };

  const currentDay = michelleTreino[currentDayIndex];
  const allExercises = currentDay ? currentDay.exercicios : [];

  const handleCheckboxChange = (index) => {
    const updatedExerciseStatus = [...exerciseStatus];
    updatedExerciseStatus[index] = !updatedExerciseStatus[index];

    const allCompleted = updatedExerciseStatus.every((status) => status);

    setExerciseStatus(updatedExerciseStatus);

    if (allCompleted) {
      setExerciseCompleted(true);
      setContador(contador + 1);
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
              <p className="serie">{exercicio.series}</p>
            </li>
          ))}
        </ul>
          <Button onClick={handleNextDay} variant="primary" className="mt" >
            Concluir Treino
          </Button>
      </div>
    </div>
  );
}

export default PageHome;
