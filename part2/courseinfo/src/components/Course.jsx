/* eslint-disable react/prop-types */
const Header = ({ courseName }) => {
  return <h2>{courseName}</h2>;
};

const Content = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      {parts.map((part) => (
        <p key={part.id}>
          {part.name} - {part.exercises} exercises
        </p>
      ))}
      <p>Total of exercises: {totalExercises}</p>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

export default Course;
