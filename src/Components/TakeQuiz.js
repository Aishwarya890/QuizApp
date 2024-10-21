// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './TakeQuiz.css'
// const TakeQuiz = () => {
//     const { quizId } = useParams(); // Expecting quizId from URL
//     const [quiz, setQuiz] = useState(null);
//     const [answers, setAnswers] = useState([]);
//     const [quizStarted, setQuizStarted] = useState(false); // State to track if the quiz has started
//     const [submissionMessage, setSubmissionMessage] = useState(''); // State for submission message
//     const [score, setScore] = useState(null); // State for score
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchQuiz = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8080/api/admin/quizzes/${quizId}`, {
//                     withCredentials: true // Include credentials for session management
//                 });
//                 setQuiz(response.data);
//                 setAnswers(new Array(response.data.questions.length).fill(''));
//             } catch (error) {
//                 console.error('Error fetching quiz:', error);
//                 // Handle unauthorized access
//                 if (error.response && error.response.status === 401) {
//                     alert('You are not authorized to access this quiz.');
//                     navigate('/register'); 
//                 }
//             }
//         };

//         fetchQuiz();
//     }, [quizId]);

//     const handleAnswerChange = (value) => {
//         const newAnswers = [...answers];
//         newAnswers[currentQuestionIndex] = value;
//         setAnswers(newAnswers);
        
//     };

//     const handleNext = () => {
//         if (currentQuestionIndex < quiz.questions.length - 1) {
//             setCurrentQuestionIndex(currentQuestionIndex + 1);
            
//         } else {
//             handleSubmit(); // Submit if it's the last question
//         }
//     };

//     const handleBack = () => {
//         if (currentQuestionIndex > 0) {
//             setCurrentQuestionIndex(currentQuestionIndex - 1);
//         }
//     };

//     const handleSubmit = async () => {
//         try {
//             const currentUserId = localStorage.getItem('userId');; // Replace with actual user ID logic
//             console.log("UserID from localStorage:",currentUserId)
//             if (!currentUserId) {
//                 throw new Error('User not logged in. Please log in to submit the quiz.'); // Error if user not logged in
                
//             }
//             // Send answers to your backend API to save
//             await axios.post(`http://localhost:8080/quizzes/submit`, {
//                 quizId,
//                 userId:currentUserId,
//                 answers,
//             });
//             console.log('Quiz submitted successfully!');
//             calculateScore();
//         } catch (error) {
//             console.error('Error submitting quiz:', error);
//             // Optionally handle error messages here
//         }
//     };


//     const calculateScore = () => {
//         if (!quiz || !quiz.correctAnswers) return;
    
//         const correctAnswers = quiz.correctAnswers; // Assuming this is an array of correct answers
//         let score = 0;
    
//         console.log("User Answers: ", answers);
//         console.log("Correct Answers: ", correctAnswers);
    
//         answers.forEach((answer, index) => {
//             console.log(`Comparing: User Answer: ${answer}, Correct Answer: ${correctAnswers[index]}`);
//             if (answer === correctAnswers[index]) {
//                 score += 1; // Increment score for each correct answer
//             }
//         });
    
//         console.log("Final Score: ", score); // Log the final score
//         setScore(score); // Set the calculated score
//         setSubmissionMessage(`Quiz submitted successfully! Your score: ${score}/${answers.length}`);
//     };
    

//     const startQuiz = () => {
//         setQuizStarted(true); // Set state to indicate quiz has started
//         console.log("Starting the quiz...");
//     };

//     if (!quiz) return <div className="text-center">Loading...</div>;

//     return (
//         <div className="container4 mt-5">
//             <h2 className="text-center">{quiz.subject}</h2>
//             {submissionMessage && <div className="alert alert-success">{submissionMessage}</div>} {/* Success message */}
//             {!quizStarted ? (
//                 <div className="text-center">
//                     <button className="btn btn-primary" onClick={startQuiz}>
//                         Take Quiz
//                     </button>
//                 </div>
//             ) : (
//                 <div className="mt-4">
//                     <h4>{quiz.questions[currentQuestionIndex]}</h4>
//                     {quiz.options[currentQuestionIndex].map((option, oIndex) => (
//                         <div key={oIndex} className="form-check">
//                             <input
//                                 type="radio"
//                                 className="form-check-input"
//                                 name={`question-${currentQuestionIndex}`}
//                                 value={option}
                               
//                                 onChange={(e) => handleAnswerChange(e.target.value)}
//                                 id={`option-${currentQuestionIndex}-${oIndex}`}
//                             />
//                             <label className="form-check-label" htmlFor={`option-${currentQuestionIndex}-${oIndex}`}>
//                                 {option}
//                             </label>
//                         </div>
//                     ))}
                   
//                     <div className="text-center mt-4">
//     <div className="d-flex justify-content-between">
//         <button 
//             className="btn btn-secondary" 
//             onClick={handleBack} 
//             disabled={currentQuestionIndex === 0}
//         >
//             Back
//         </button>
//         <button 
//             className="btn btn-primary" 
//             onClick={handleNext}
//         >
//             {currentQuestionIndex < quiz.questions.length - 1 ? 'Next' : 'Submit'}
//         </button>
//     </div>
// </div>

//                 </div>
//             )}
//             {score !== null && <div className="mt-4 text-center"><h4>Your Score: {score}/{quiz.questions.length}</h4></div>}
//         </div>
//     );
// };

// export default TakeQuiz;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TakeQuiz.css';

const TakeQuiz = () => {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [quizStarted, setQuizStarted] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [score, setScore] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(''); // New state to track the selected option
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/admin/quizzes/${quizId}`, {
                    withCredentials: true
                });
                setQuiz(response.data);
                setAnswers(new Array(response.data.questions.length).fill(''));
            } catch (error) {
                console.error('Error fetching quiz:', error);
                if (error.response && error.response.status === 401) {
                    alert('You are not authorized to access this quiz.');
                    navigate('/register');
                }
            }
        };

        fetchQuiz();
    }, [quizId]);

    const handleAnswerChange = (value) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = value;
        setAnswers(newAnswers);
        setSelectedOption(value); // Update selected option when an answer is chosen
    };

    const handleNext = () => {
        // Save the current selected option before proceeding to the next question
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(answers[currentQuestionIndex + 1]); // Keep the answer for the next question
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedOption(answers[currentQuestionIndex - 1]); // Set the selected option for the previous question
        }
    };

    const handleSubmit = async () => {
        try {
            const currentUserId= localStorage.getItem('user');
            
            let parsedUserId;
            try {
                parsedUserId = JSON.parse(currentUserId); // In case it's stored as a JSON object
            } catch (e) {
                parsedUserId = currentUserId; // If it's just a regular string
            }
    
            // Ensure the userId is a valid number (parse it if necessary)
            const userId1 = typeof parsedUserId === 'object' ? parsedUserId.userId : +parsedUserId;
    
            if (!userId1) {
                throw new Error('User not logged in. Please log in to submit the quiz.');
            }
            const response=await axios.post(`http://localhost:8080/quizzes/submit`, {
                quizId,
                userId: userId1,
                answers,
            });
            console.log("respomse",response.data)
            console.log('Submitting quiz:', quizId, 'for user:', currentUserId, 'with answers:', answers);

            console.log('Quiz submitted successfully!');
            calculateScore();
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    const calculateScore = () => {
        if (!quiz || !quiz.correctAnswers) return;

        const correctAnswers = quiz.correctAnswers;
        let score = 0;

        answers.forEach((answer, index) => {
            if (answer === correctAnswers[index]) {
                score += 1;
            }
        });

        setScore(score);
        setSubmissionMessage(`Quiz submitted successfully! Your score: ${score}/${answers.length}`);
    };

    const startQuiz = () => {
        setQuizStarted(true);
    };

    if (!quiz) return <div className="text-center">Loading...</div>;

    return (
        <div className="container4 mt-5">
            <h2 className="text-center">{quiz.subject}</h2>
            {submissionMessage && <div className="alert alert-success">{submissionMessage}</div>}
            {!quizStarted ? (
                <div className="text-center">
                    <button className="btn btn-primary" onClick={startQuiz}>
                        Take Quiz
                    </button>
                </div>
            ) : (
                <div className="mt-4">
                    <h4>{quiz.questions[currentQuestionIndex]}</h4>
                    {quiz.options[currentQuestionIndex].map((option, oIndex) => (
                        <div key={oIndex} className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                name={`question-${currentQuestionIndex}`}
                                value={option}
                                checked={selectedOption === option} // Check if this option is selected
                                onChange={(e) => handleAnswerChange(e.target.value)}
                                id={`option-${currentQuestionIndex}-${oIndex}`}
                            />
                            <label className="form-check-label" htmlFor={`option-${currentQuestionIndex}-${oIndex}`}>
                                {option}
                            </label>
                        </div>
                    ))}
                    <div className="text-center mt-4">
                        <div className="d-flex justify-content-between">
                            <button 
                                className="btn btn-secondary" 
                                onClick={handleBack} 
                                disabled={currentQuestionIndex === 0}
                            >
                                Back
                            </button>
                            <button 
                                className="btn btn-primary" 
                                onClick={handleNext}
                                disabled={!answers[currentQuestionIndex]} // Disable if no answer is selected
                            >
                                {currentQuestionIndex < quiz.questions.length - 1 ? 'Next' : 'Submit'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {score !== null && <div className="mt-4 text-center"><h4>Your Score: {score}/{quiz.questions.length}</h4></div>}
        </div>
    );
};

export default TakeQuiz;