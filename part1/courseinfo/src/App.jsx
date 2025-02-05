/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

const Header = (props) => {
  console.log(props.title);
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <p>This part is called {props.partdata}</p>
    </div>
  );
};

const Content = (props) => {
  const part1 = props.parts[0];
  const part2 = props.parts[1];
  const part3 = props.parts[2];

  return (
    <div>
      <Part
        partdata={
          part1.name + " with a number of " + part1.exercises + " exercises."
        }
      />
      <Part
        partdata={
          part2.name + " with a total of " + part2.exercises + " exercises."
        }
      />
      <Part
        partdata={
          part3.name + " and contains " + part3.exercises + " exercises."
        }
      />
    </div>
  );
};

const Total = (props) => {
  return <div>The total of exercises is {props.total}</div>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  const sum =
    course.parts[0].exercises +
    course.parts[1].exercises +
    course.parts[2].exercises;

  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total total={sum} />
    </div>
  );
};

export default App;
