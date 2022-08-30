import './Question.css';

export default function Question({question, checkMode, clickAnswer}) {
    const answerElements = question.answers.map((answer) => {
        return (
            <input
                type="button"
                key={answer.id}
                value={answer.answer}
                className={
                    `
                        answer
                        ${checkMode && 'check-mode-answer'}
                        ${(checkMode && answer.correct) && 'correct-answer'} 
                        ${(!checkMode && answer.clicked) && 'clicked-answer'} 
                        ${(checkMode && answer.clicked && !answer.correct) && 'clicked-incorrect-answer'}
                    `
                }
                onClick={() => clickAnswer(question.id, answer.id)}
            />
        );
    });

    return (
        <li className="question-item">
            <p className="question">
                {question.question}
            </p>

            <form className="answers-list">
                {answerElements}
            </form>
        </li>
    );
};