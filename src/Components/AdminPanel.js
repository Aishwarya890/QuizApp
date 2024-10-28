
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Admin.css';

// const AdminPanel = () => {
//     const [subject, setSubject] = useState('');
//     const [deadline, setDeadline] = useState('');
//     const [accessCode, setAccessCode] = useState(''); // State for access code
//     const [questions, setQuestions] = useState(['']);
//     const [options, setOptions] = useState([['']]);
//     const [correctAnswers, setCorrectAnswers] = useState(['']);
//     const [quizzes, setQuizzes] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [selectedQuizId, setSelectedQuizId] = useState(null); // State for selected quiz for update

//     useEffect(() => {
//         const fetchQuizzes = async () => {
//             setLoading(true);
//             try {
//                 const response = await axios.get('http://localhost:8080/api/admin/quizzes');
//                 setQuizzes(response.data);
//             } catch (error) {
//                 alert('Error fetching quizzes: ' + error.message);
//             }
//             setLoading(false);
//         };
//         fetchQuizzes();
//     }, []);

//     const handleAddQuestion = () => {
//         setQuestions([...questions, '']);
//         setOptions([...options, ['']]);
//         setCorrectAnswers([...correctAnswers, '']);
//     };

//     const handleDeleteQuestion = (index) => {
//         setQuestions(questions.filter((_, qIndex) => qIndex !== index));
//         setOptions(options.filter((_, oIndex) => oIndex !== index));
//         setCorrectAnswers(correctAnswers.filter((_, cIndex) => cIndex !== index));
//     };

//     const handleQuestionChange = (index, value) => {
//         const newQuestions = [...questions];
//         newQuestions[index] = value;
//         setQuestions(newQuestions);
//     };

//     const handleOptionChange = (questionIndex, optionIndex, value) => {
//         const newOptions = [...options];
//         newOptions[questionIndex][optionIndex] = value;
//         setOptions(newOptions);
//     };

//     const handleCorrectAnswerChange = (index, value) => {
//         const newCorrectAnswers = [...correctAnswers];
//         newCorrectAnswers[index] = value;
//         setCorrectAnswers(newCorrectAnswers);
//     };

//     const handleAddOption = (questionIndex) => {
//         const newOptions = [...options];
//         newOptions[questionIndex].push('');
//         setOptions(newOptions);
//     };

//     const handleDeleteQuiz = async (quizId) => {
//         if (window.confirm('Are you sure you want to delete this quiz?')) {
//             try {
//                 await axios.delete(`http://localhost:8080/api/admin/quizzes/${quizId}`);
//                 setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
//                 alert('Quiz deleted successfully!');
//             } catch (error) {
//                 alert('Error deleting quiz: ' + error.message);
//             }
//         }
//     };

//     const resetForm = () => {
//         setSubject('');
//         setDeadline('');
//         setAccessCode(''); // Reset access code
//         setQuestions(['']);
//         setOptions([['']]);
//         setCorrectAnswers(['']);
//         setSelectedQuizId(null); // Reset selected quiz ID
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const deadlineDate = new Date(deadline);
//         const currentDate = new Date();

//         if (deadlineDate <= currentDate) {
//             alert('The deadline must be in the future.');
//             return;
//         }

//         // Validate that each question has at least 2 options
//         for (let i = 0; i < questions.length; i++) {
//             if (options[i].length < 2) {
//                 alert(`Question ${i + 1} must have at least 2 options.`);
//                 return;
//             }
//             if (!options[i].includes(correctAnswers[i])) {
//                 alert(`Correct answer for Question ${i + 1} must be one of the options.`);
//                 return;
//             }
//         }

//         setLoading(true);
//         try {
//             const quiz = {
//                 subject,
//                 deadline,
//                 accessCode, // Include access code in the quiz object
//                 questions,
//                 options,
//                 correctAnswers,
//             };

//             if (selectedQuizId) {
//                 // Update the quiz if a quiz is selected
//                 await axios.put(`http://localhost:8080/api/admin/quizzes/${selectedQuizId}`, quiz, {
//                     withCredentials: true // Include credentials in the request
//                 });
//                 alert('Quiz updated successfully!');
//             } else {
//                 // Create new quiz if no quiz is selected
//                 await axios.post('http://localhost:8080/api/admin/quizzes', quiz, {
//                     withCredentials: true // Include credentials in the request
//                 });
//                 alert('Quiz created successfully!');
//             }

//             resetForm();
//         } catch (error) {
//             alert('Error creating/updating quiz: ' + error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleEditQuiz = (quiz) => {
//         setSelectedQuizId(quiz.id);
//         setSubject(quiz.subject);
//         setDeadline(quiz.deadline);
//         setAccessCode(quiz.accessCode);
//         setQuestions(quiz.questions);
//         setOptions(quiz.options);
//         setCorrectAnswers(quiz.correctAnswers);
//     };

//     return (
//         <div className="admin-panel container mt-5">
//             <h2 className="text-center mb-4">Admin Panel</h2>
//             {loading ? (
//                 <div className="text-center">Loading...</div>
//             ) : (
//                 <>
//                     <form onSubmit={handleSubmit} className="admin-form shadow-lg p-4 rounded">
//                         <div className="form-group mb-3">
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Quiz Subject"
//                                 value={subject}
//                                 onChange={(e) => setSubject(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div className="form-group mb-3">
//                             <input
//                                 type="datetime-local"
//                                 className="form-control"
//                                 value={deadline}
//                                 onChange={(e) => setDeadline(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div className="form-group mb-3">
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Access Code"
//                                 value={accessCode}
//                                 onChange={(e) => setAccessCode(e.target.value)}
//                                 required
//                             />
//                         </div>

//                         {questions.map((question, qIndex) => (
//                             <div key={qIndex} className="question-section mb-4 p-3 rounded shadow-sm">
//                                 <input
//                                     type="text"
//                                     className="form-control mb-2"
//                                     placeholder={`Question ${qIndex + 1}`}
//                                     value={question}
//                                     onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
//                                     required
//                                 />
//                                 {options[qIndex].map((option, oIndex) => (
//                                     <input
//                                         key={oIndex}
//                                         type="text"
//                                         className="form-control mb-2"
//                                         placeholder={`Option ${oIndex + 1}`}
//                                         value={option}
//                                         onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
//                                         required
//                                     />
//                                 ))}

//                                 <input
//                                     type="text"
//                                     className="form-control mb-2"
//                                     placeholder="Correct Answer"
//                                     value={correctAnswers[qIndex]}
//                                     onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
//                                     required
//                                 />
//                                 <div className="d-flex justify-content-between">
//                                     <button type="button" className="btn btn-info" onClick={() => handleAddOption(qIndex)}>
//                                         Add Option
//                                     </button>
//                                     <button type="button" className="btn btn-danger" onClick={() => handleDeleteQuestion(qIndex)}>
//                                         Delete Question
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}

//                         <div className="d-flex justify-content-between">
//                             <button type="button" className="btn btn-primary" onClick={handleAddQuestion}>
//                                 Add Question
//                             </button>
//                             <button type="submit" className="btn btn-success">
//                                 {selectedQuizId ? 'Update Quiz' : 'Create Quiz'}
//                             </button>
//                         </div>
//                     </form>

//                     <h3 className="text-center mt-5">Manage Quizzes</h3>
//                     <ul className="list-group mt-3 shadow-sm">
//                         {quizzes.map((quiz) => (
//                             <li key={quiz.id} className="list-group-item d-flex justify-content-between align-items-center">
//                                 {quiz.subject}
//                                 <div>
//                                     <button className="btn btn-warning mx-1" onClick={() => handleEditQuiz(quiz)}>
//                                         Edit
//                                     </button>
//                                     <button className="btn btn-danger" onClick={() => handleDeleteQuiz(quiz.id)}>
//                                         Delete
//                                     </button>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                 </>
//             )}
//         </div>
//     );
// };

// export default AdminPanel;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Admin.css';

const AdminPanel = () => {
    const [subject, setSubject] = useState('');
    const [startDateTime, setStartDateTime] = useState(''); // State for start date
    const [endDateTime, setEndDateTime] = useState(''); // State for end date
    const [accessCode, setAccessCode] = useState(''); // State for access code
    const [questions, setQuestions] = useState(['']);
    const [options, setOptions] = useState([['']]);
    const [correctAnswers, setCorrectAnswers] = useState(['']);
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedQuizId, setSelectedQuizId] = useState(null); // State for selected quiz for update

    useEffect(() => {
        const fetchQuizzes = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8080/api/admin/quizzes');
                setQuizzes(response.data);
            } catch (error) {
                alert('Error fetching quizzes: ' + error.message);
            }
            setLoading(false);
        };
        fetchQuizzes();
    }, []);

    const handleAddQuestion = () => {
        setQuestions([...questions, '']);
        setOptions([...options, ['']]);
        setCorrectAnswers([...correctAnswers, '']);
    };

    const handleDeleteQuestion = (index) => {
        setQuestions(questions.filter((_, qIndex) => qIndex !== index));
        setOptions(options.filter((_, oIndex) => oIndex !== index));
        setCorrectAnswers(correctAnswers.filter((_, cIndex) => cIndex !== index));
    };

    const handleQuestionChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index] = value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const newOptions = [...options];
        newOptions[questionIndex][optionIndex] = value;
        setOptions(newOptions);
    };

    const handleCorrectAnswerChange = (index, value) => {
        const newCorrectAnswers = [...correctAnswers];
        newCorrectAnswers[index] = value;
        setCorrectAnswers(newCorrectAnswers);
    };

    const handleAddOption = (questionIndex) => {
        const newOptions = [...options];
        newOptions[questionIndex].push('');
        setOptions(newOptions);
    };

    const handleDeleteQuiz = async (quizId) => {
        if (window.confirm('Are you sure you want to delete this quiz?')) {
            try {
                await axios.delete(`http://localhost:8080/api/admin/quizzes/${quizId}`);
                setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
                alert('Quiz deleted successfully!');
            } catch (error) {
                alert('Error deleting quiz: ' + error.message);
            }
        }
    };

    const resetForm = () => {
        setSubject('');
        setStartDateTime(''); // Reset start date
        setEndDateTime(''); // Reset end date
        setAccessCode(''); // Reset access code
        setQuestions(['']);
        setOptions([['']]);
        setCorrectAnswers(['']);
        setSelectedQuizId(null); // Reset selected quiz ID
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date();
        const startDateObj = new Date(startDateTime);
        const endDateObj = new Date(endDateTime);

        if (startDateObj < currentDate) {
            alert('The start date must be in the future.');
            return;
        }

        if (endDateObj <= startDateObj) {
            alert('The end date must be after the start date.');
            return;
        }

        // Validate that each question has at least 2 options
        for (let i = 0; i < questions.length; i++) {
            if (options[i].length < 2) {
                alert(`Question ${i + 1} must have at least 2 options.`);
                return;
            }
            if (!options[i].includes(correctAnswers[i])) {
                alert(`Correct answer for Question ${i + 1} must be one of the options.`);
                return;
            }
        }

        setLoading(true);
        try {
            const quiz = {
                subject,
                startDateTime, // Include start date in the quiz object
                endDateTime, // Include end date in the quiz object
                accessCode, // Include access code in the quiz object
                questions,
                options,
                correctAnswers,
            };

            if (selectedQuizId) {
                // Update the quiz if a quiz is selected
                await axios.put(`http://localhost:8080/api/admin/quizzes/${selectedQuizId}`, quiz, {
                    withCredentials: true // Include credentials in the request
                });
                alert('Quiz updated successfully!');
            } else {
                // Create new quiz if no quiz is selected
                await axios.post('http://localhost:8080/api/admin/quizzes', quiz, {
                    withCredentials: true // Include credentials in the request
                });
                alert('Quiz created successfully!');
            }

            resetForm();
        } catch (error) {
            alert('Error creating/updating quiz: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEditQuiz = (quiz) => {
        setSelectedQuizId(quiz.id);
        setSubject(quiz.subject);
        setStartDateTime(quiz.startDateTime); // Set start date for editing
        setEndDateTime(quiz.endDateTime); // Set end date for editing
        setAccessCode(quiz.accessCode);
        setQuestions(quiz.questions);
        setOptions(quiz.options);
        setCorrectAnswers(quiz.correctAnswers);
    };

    return (
        <div className="admin-panel container mt-5">
            <h2 className="text-center mb-4">Admin Panel</h2>
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <>
                    <form onSubmit={handleSubmit} className="admin-form shadow-lg p-4 rounded">
                        <div className="form-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Quiz Subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">Start Date Time
                            <input
                                type="datetime-local"
                                className="form-control"
                                
                                value={startDateTime}
                                onChange={(e) => setStartDateTime(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">End Date Time
                            <input
                                type="datetime-local"
                                className="form-control"
                                 
                                value={endDateTime}
                                onChange={(e) => setEndDateTime(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Access Code"
                                value={accessCode}
                                onChange={(e) => setAccessCode(e.target.value)}
                                required
                            />
                        </div>

                        {questions.map((question, qIndex) => (
                            <div key={qIndex} className="question-section mb-4 p-3 rounded shadow-sm">
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder={`Question ${qIndex + 1}`}
                                    value={question}
                                    onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                                    required
                                />
                                {options[qIndex].map((option, oIndex) => (
                                    <input
                                        key={oIndex}
                                        type="text"
                                        className="form-control mb-2"
                                        placeholder={`Option ${oIndex + 1}`}
                                        value={option}
                                        onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                        required
                                    />
                                ))}

                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Correct Answer"
                                    value={correctAnswers[qIndex]}
                                    onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
                                    required
                                />
                                <div className="d-flex justify-content-between">
                                    <button type="button" className="btn btn-info" onClick={() => handleAddOption(qIndex)}>
                                        Add Option
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={() => handleDeleteQuestion(qIndex)}>
                                        Delete Question
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="d-flex justify-content-between">
                            <button type="button" className="btn btn-secondary" onClick={handleAddQuestion}>
                                Add Question
                            </button>
                            <button type="submit" className="btn btn-primary">
                                {selectedQuizId ? 'Update Quiz' : 'Create Quiz'}
                            </button>
                        </div>
                    </form>

                    <h3 className="mt-5">Existing Quizzes</h3>
                    <div className="quiz-list mt-3">
                        {quizzes.length > 0 ? (
                            quizzes.map((quiz) => (
                                <div key={quiz.id} className="quiz-item mb-3 p-3 border rounded">
                                    <h4>{quiz.subject}</h4>
                                    <p>Start Date: {new Date(quiz.startDateTime).toLocaleString()}</p>
                                    <p>End Date: {new Date(quiz.endDateTime).toLocaleString()}</p>
                                    <p>Access Code: {quiz.accessCode}</p>
                                    <button className="btn btn-warning me-2" onClick={() => handleEditQuiz(quiz)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleDeleteQuiz(quiz.id)}>
                                        Delete
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div>No quizzes found.</div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminPanel;
