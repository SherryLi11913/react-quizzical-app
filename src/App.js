import React from 'react';
import './App.css';
import Cover from './components/Cover/Cover';
import Questions from './components/Questions/Questions';

export default function App() {
  const [start, setStart] = React.useState(false);
  const [questionSetting, setQuestionSetting] = React.useState({
    num: 5,
    category: -1,
    difficulty: '',
    type: '',
  });

  function startQuiz(setting) {
    setStart(true);
    setQuestionSetting(setting);
  }

  return (
    <div>
      {start ? 
        <Questions questionSetting={questionSetting} /> 
        : 
        <Cover startQuiz={startQuiz}/>
      }
    </div>
  );
}
