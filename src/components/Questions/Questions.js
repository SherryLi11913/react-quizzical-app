import React from 'react';
import { decode } from 'he';
import { nanoid } from 'nanoid';
import './Questions.css';
import Question from './Question/Question';
import Confetti from 'react-confetti';

export default function Questions({questionSetting}) {
    const [questions, setQuestions] = React.useState([]);
    const [checkMode, setCheckMode] = React.useState(false);
    const [numCorrectAnswers, setNumCorrectAnswers] = React.useState(0);

    React.useEffect(() => {
        getQuestions();
    }, []);

    function getQuestions() {
        setNumCorrectAnswers(0);
        setCheckMode(false);

        fetch(
            `https://opentdb.com/api.php?amount=${questionSetting.num}` +
            `${questionSetting.category !== -1 ? `&category=${questionSetting.category}` : ''}` +
            `${questionSetting.difficulty ? `&difficulty=${questionSetting.difficulty}` : ''}` +
            `${questionSetting.type ? `&type=${questionSetting.type}` : ''}`
        )
            .then(response => response.json())
            .then(data => {
                setQuestions(data.results.map((question) => {
                    const answers = question.incorrect_answers.map((answer) => {
                        return {
                            id: nanoid(),
                            answer: decode(answer),
                            correct: false,
                            clicked: false,
                        }
                    });
                    answers.splice(
                        Math.floor(Math.random() * answers.length), 
                        0, 
                        {
                            id: nanoid(),
                            answer: decode(question.correct_answer),
                            correct: true,
                            clicked: false,
                        }
                    );

                    return {
                        ...question,
                        id: nanoid(),
                        answers,
                        question: decode(question.question),
                    }
                }));
            });
    }

    function clickAnswer(questionId, answerId) {
        setQuestions(prevQuestions => {
            const newQuestions = [];

            prevQuestions.forEach(question => {
                if (question.id === questionId) {
                    newQuestions.push({
                        ...question,
                        answers: question.answers.map(answer => {
                            return {
                                ...answer,
                                clicked: answer.id === answerId,
                            };
                        }),
                    });
                } else {
                    newQuestions.push(question);
                }
            });

            return newQuestions;
        });
    }

    function checkAnswer() {
        questions.forEach(question => {
            question.answers.forEach(answer => {
                if (answer.clicked && answer.correct) {
                    setNumCorrectAnswers(prevNumCorrectAnswers => prevNumCorrectAnswers + 1);
                }
            });
        });

        setCheckMode(true);
    }

    const questionElements = questions.map((question) => {
        return (
            <Question
                key={question.id}
                question={question}
                checkMode={checkMode}
                clickAnswer={clickAnswer}
            />
        );
    });

    return (
        <div className="questions-container">
            <ol className="questions-list">
                {questionElements}
            </ol>

            <div className="questions-result">
                {checkMode ? 
                    <>
                        <p className="questions-result-check">
                            You scored {numCorrectAnswers}/{questions.length} correct answers
                        </p>
                        <button 
                            className="questions-result-button"
                            onClick={getQuestions}
                        >
                            Play again
                        </button>
                    </> 
                    : 
                    <button 
                        className="questions-result-button"
                        onClick={checkAnswer}
                    >
                        Check answers
                    </button>
                }
            </div>

            {
                checkMode && numCorrectAnswers === questions.length && 
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                />
            }
        </div>
    )
};