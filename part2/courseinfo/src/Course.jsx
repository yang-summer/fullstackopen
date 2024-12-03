const Part = (props) => {
  const {part} = props;
  return(
    <>
      <p>{part.name} {part.exercises}</p>
    </>
  )
}

const Header = (props) => {
  const {courseName} = props;
  return(
    <>
      <h1>{courseName}</h1>
    </>
  )
}

const Content = (props) => {
  const {parts} = props;
  return(
    <>
      {parts.map(part => 
        <Part key={part.id} part={part} />
      )}
    </>
  )
}

const Total = (props) => {
  const {parts} = props;
  const total = parts.reduce((sum, current) => 
    sum + current.exercises,
    0
  )

  return <p>total of {total} exercises</p>
}

const Course = (props) => {
  const {course} = props;
  return(
    <div>
      <Header courseName={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default Course