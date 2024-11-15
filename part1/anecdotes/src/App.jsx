import { useState } from 'react'

const Header = ({ text }) => {
  return <h1>{text}</h1>
}

const Button = ({ text, onClick }) => {
  return (
  <button onClick={onClick}>{text}</button>
  )
}

const Anecdote = ({ anecdote }) => {
  return <p>{anecdote}</p>
}

const AnecdoteMostVotes = ({ anecdotes, allVotes }) => {
  if (Math.max(...allVotes) == 0) return <p>No votes yet</p>;

  const indexOfMaxVote = allVotes.reduce(
    (
      (indexMax, item, index, array) => 
        item > array[indexMax] ? index : indexMax
    ), 
    0
  );

  return (
    <div>
      <Anecdote anecdote={anecdotes[indexOfMaxVote]}/>
      <p>has {allVotes[indexOfMaxVote]} votes</p>      
    </div>
  );
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0);
  const [allVotes, setAllVotes] = useState(Array(anecdotes.length).fill(0));

  const handleClick = () => {
    const nextSelected = Math.floor(Math.random() * anecdotes.length);
    setSelected(nextSelected);
  }

  const handleVote = () => {
    const nextAllVotes = [...allVotes];
    nextAllVotes[selected] += 1;
    setAllVotes(nextAllVotes);
  }

  return (
    <div>
      <Header text='Anecdote of the day'/>
      <Anecdote anecdote={anecdotes[selected]} />
      <Button text='vote' onClick={handleVote} />
      <Button text='next anecdote' onClick={handleClick} />
      <Header text='Anecdote with most votes'/>
      <AnecdoteMostVotes anecdotes={anecdotes} allVotes={allVotes} />
    </div>
  )
}

export default App
