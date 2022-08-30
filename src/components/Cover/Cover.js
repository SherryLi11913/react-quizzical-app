import React from 'react';
import './Cover.css';

export default function Cover({startQuiz}) {
    const [questionSetting, setQuestionSetting] = React.useState({
        num: 5,
        category: -1,
        difficulty: '',
        type: '',
    });
    const [questionCategories, setQuestionCategories] = React.useState([
        {
            name: 'Any Cagetory',
            id: -1,
        },
    ]);
    const [questionDifficulties] = React.useState([
        {
            name: 'Any Difficulty',
            id: '',
        },
        {
            name: 'Easy',
            id: 'easy',
        },
        {
            name: 'Medium',
            id: 'medium',
        },
        {
            name: 'Hard',
            id: 'hard'
        },
    ]);
    const [questionTypes] = React.useState([
        {
            name: 'Any Type',
            id: '',
        },
        {
            name: 'Multiple',
            id: 'multiple',
        },
        {
            name: 'True / False',
            id: 'boolean',
        }
    ]);

    React.useEffect(() => {
        fetch('https://opentdb.com/api_category.php')
            .then(response => response.json())
            .then(data => {
                data.trivia_categories.unshift({
                    id: -1,
                    name: 'Any Category',
                });
                setQuestionCategories(data.trivia_categories);
            });
    }, []);

    const categoryOptions = questionCategories.map(category => {
        return (
            <option key={category.id} value={category.id}>
                {category.name}
            </option>
        );
    });

    const difficultyOptions = questionDifficulties.map(difficulty => {
        return (
            <option key={difficulty.id} value={difficulty.id}>
                {difficulty.name}
            </option>
        );
    });

    const typeOptions = questionTypes.map(type => {
        return (
            <option key={type.id} value={type.id}>
                {type.name}
            </option>
        );
    });

    function questionSettingChange(event) {
        setQuestionSetting(prevQuestionSetting => {
            return {
                ...prevQuestionSetting,
                [event.target.name]: event.target.value,
            }
        });
    }

    return (
        <div className="cover">
            <h1 className="cover-title">Quizzical</h1>
            <h3 className="cover-description">Welcome to Quizzical App!</h3>
            
            <form 
                className="question-setting" 
                onSubmit={() => startQuiz(questionSetting)}
            >
                <div className="question-setting-option">
                    <label 
                        htmlFor="num-questions" 
                        className="question-setting-tip"
                    >
                        Number of Questions:
                    </label>
                    <input 
                        type="number" 
                        id="num-questions"
                        className="question-setting-input"
                        min="1" 
                        max="50" 
                        value={questionSetting.num} 
                        name="num" 
                        onChange={questionSettingChange}
                    />
                </div>

                <div className="question-setting-option">
                    <label 
                        htmlFor="question-category"
                        className="question-setting-tip"
                    >
                        Select Category:
                    </label>
                    <select 
                        name="category" 
                        id="question-category"
                        className="question-setting-input"
                        onChange={questionSettingChange}
                    >
                        {categoryOptions}
                    </select>
                </div>

                <div className="question-setting-option">
                    <label 
                        htmlFor="question-difficulty"
                        className="question-setting-tip"
                    >
                        Select Difficulty:
                    </label>
                    <select 
                        name="difficulty" 
                        id="question-difficulty" 
                        className="question-setting-input"
                        onChange={questionSettingChange}
                    >
                        {difficultyOptions}
                    </select>
                </div>

                <div className="question-setting-option">
                    <label 
                        htmlFor="question-type"
                        className="question-setting-tip"
                    >
                        Select Type:
                    </label>
                    <select 
                        name="type" 
                        id="question-type" 
                        className="question-setting-input"
                        onChange={questionSettingChange}
                    >
                        {typeOptions}
                    </select>
                </div>

                <button 
                    type="submit"
                    className="question-setting-submit-button"
                >
                    Start quiz
                </button>
            </form>
        </div>
    );
};