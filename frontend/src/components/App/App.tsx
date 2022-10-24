import React from 'react';
import './App.scss';
import {TaskState} from 'types';

function App() {
  //test working shared types
  const tmp: TaskState = TaskState.BACKLOG;

  return (
    <div className="App">
      <h1>Test - cra app</h1>
    </div>
  );
}

export default App;
