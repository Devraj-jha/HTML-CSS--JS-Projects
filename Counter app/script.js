        // Wait for the DOM to be fully loaded before executing JavaScript
        document.addEventListener('DOMContentLoaded', function() {
            // DOM element references
            const questionElement = document.getElementById('question');
            const optionsElement = document.getElementById('options');
            const prevButton = document.getElementById('prev-btn');
            const nextButton = document.getElementById('next-btn');
            const submitButton = document.getElementById('submit-btn');
            const resultsElement = document.getElementById('results');
            const progressBar = document.getElementById('progress');
            const timerElement = document.getElementById('timer');

            // Quiz configuration
            const quizTime = 300; // 5 minutes in seconds
            let timeLeft = quizTime;
            let timerInterval;

            // Quiz state variables
            let currentQuestionIndex = 0;
            let score = 0;
            let userAnswers = [];
            let quizCompleted = false;

            // Quiz questions array - each question is an object with question text, options, and correct answer
            const questions = [
                {
                    question: "What is the correct syntax for referring to an external script called 'script.js'?",
                    options: [
                        "<script href='script.js'>",
                        "<script name='script.js'>",
                        "<script src='script.js'>",
                        "<script file='script.js'>"
                    ],
                    correctAnswer: 2 // Index of correct answer (0-based)
                },
                {
                    question: "How do you write 'Hello World' in an alert box?",
                    options: [
                        "msgBox('Hello World');",
                        "alertBox('Hello World');",
                        "msg('Hello World');",
                        "alert('Hello World');"
                    ],
                    correctAnswer: 3
                },
                {
                    question: "Which operator is used to assign a value to a variable?",
                    options: [
                        "*",
                        "-",
                        "=",
                        "x"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "What will the following code return: Boolean(10 > 9)?",
                    options: [
                        "NaN",
                        "false",
                        "true",
                        "undefined"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "How do you create a function in JavaScript?",
                    options: [
                        "function = myFunction()",
                        "function:myFunction()",
                        "function myFunction()",
                        "create myFunction()"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "How do you call a function named 'myFunction'?",
                    options: [
                        "call myFunction()",
                        "myFunction()",
                        "call function myFunction",
                        "execute myFunction"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "How to write an IF statement in JavaScript?",
                    options: [
                        "if i = 5 then",
                        "if (i == 5)",
                        "if i == 5 then",
                        "if i = 5"
                    ],
                    correctAnswer: 1
                },
                {
                    question: "How does a WHILE loop start?",
                    options: [
                        "while (i <= 10; i++)",
                        "while i = 1 to 10",
                        "while (i <= 10)",
                        "while (i <= 10) then"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "How can you add a comment in JavaScript?",
                    options: [
                        "'This is a comment",
                        "<!--This is a comment-->",
                        "//This is a comment",
                        "*This is a comment*"
                    ],
                    correctAnswer: 2
                },
                {
                    question: "What is the correct way to write a JavaScript array?",
                    options: [
                        "var colors = (1:'red', 2:'green', 3:'blue')",
                        "var colors = ['red', 'green', 'blue']",
                        "var colors = 'red', 'green', 'blue'",
                        "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')"
                    ],
                    correctAnswer: 1
                }
            ];

            // Initialize the quiz
            initQuiz();

            /**
             * Initializes the quiz by:
             * 1. Starting the timer
             * 2. Setting up event listeners
             * 3. Loading the first question
             */
            function initQuiz() {
                // Start the countdown timer
                startTimer();
                
                // Initialize userAnswers array with null values
                userAnswers = new Array(questions.length).fill(null);
                
                // Set up event listeners for navigation buttons
                prevButton.addEventListener('click', showPreviousQuestion);
                nextButton.addEventListener('click', showNextQuestion);
                submitButton.addEventListener('click', submitQuiz);
                
                // Load the first question
                showQuestion();
                
                // Update navigation buttons state
                updateNavigationButtons();
            }

            /**
             * Starts the quiz timer and updates the display every second
             */
            function startTimer() {
                // Update timer display immediately
                updateTimerDisplay();
                
                // Set interval to update timer every second
                timerInterval = setInterval(function() {
                    timeLeft--;
                    updateTimerDisplay();
                    
                    // Check if time has run out
                    if (timeLeft <= 0) {
                        clearInterval(timerInterval);
                        timeUp();
                    }
                }, 1000);
            }

            /**
             * Updates the timer display in minutes:seconds format
             */
            function updateTimerDisplay() {
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                
                // Format seconds to always show two digits
                const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
                
                // Update the timer element
                timerElement.textContent = `Time: ${minutes}:${formattedSeconds}`;
                
                // Change color when time is running low
                if (timeLeft <= 30) {
                    timerElement.style.color = '#f44336';
                }
            }

            /**
             * Handles what happens when time runs out
             */
            function timeUp() {
                // Disable all options to prevent further answers
                const options = document.querySelectorAll('.option');
                options.forEach(option => {
                    option.style.cursor = 'not-allowed';
                    option.removeEventListener('click', selectOption);
                });
                
                // Show message and submit the quiz
                alert('Time is up! Your quiz will be submitted automatically.');
                submitQuiz();
            }

            /**
             * Displays the current question and its options
             */
            function showQuestion() {
                // Get the current question object
                const currentQuestion = questions[currentQuestionIndex];
                
                // Update the question text
                questionElement.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
                
                // Clear previous options
                optionsElement.innerHTML = '';
                
                // Create and append new option elements
                currentQuestion.options.forEach((option, index) => {
                    const li = document.createElement('li');
                    li.textContent = option;
                    li.className = 'option';
                    
                    // Highlight if this option was previously selected
                    if (userAnswers[currentQuestionIndex] === index) {
                        li.classList.add('selected');
                    }
                    
                    // Add click event to select option
                    li.addEventListener('click', () => selectOption(index));
                    
                    // Append option to the options list
                    optionsElement.appendChild(li);
                });
                
                // Update progress bar
                updateProgressBar();
            }

            /**
             * Handles selecting an answer option
             * @param {number} optionIndex - The index of the selected option
             */
            function selectOption(optionIndex) {
                // Only allow selection if quiz isn't completed
                if (quizCompleted) return;
                
                // Store the user's answer
                userAnswers[currentQuestionIndex] = optionIndex;
                
                // Update UI to show selected option
                const options = document.querySelectorAll('.option');
                options.forEach((option, index) => {
                    if (index === optionIndex) {
                        option.classList.add('selected');
                    } else {
                        option.classList.remove('selected');
                    }
                });
                
                // Enable next button when an option is selected
                updateNavigationButtons();
            }

            /**
             * Shows the next question in the quiz
             */
            function showNextQuestion() {
                // Only proceed if not on the last question
                if (currentQuestionIndex < questions.length - 1) {
                    currentQuestionIndex++;
                    showQuestion();
                    updateNavigationButtons();
                }
            }

            /**
             * Shows the previous question in the quiz
             */
            function showPreviousQuestion() {
                // Only proceed if not on the first question
                if (currentQuestionIndex > 0) {
                    currentQuestionIndex--;
                    showQuestion();
                    updateNavigationButtons();
                }
            }

            /**
             * Updates the state of navigation buttons (previous, next)
             */
            function updateNavigationButtons() {
                // Disable previous button on first question
                prevButton.disabled = currentQuestionIndex === 0;
                
                // Disable next button on last question or if no answer selected
                nextButton.disabled = currentQuestionIndex === questions.length - 1 || 
                                    userAnswers[currentQuestionIndex] === null;
                
                // Show submit button only on last question when answer is selected
                submitButton.style.display = 
                    (currentQuestionIndex === questions.length - 1 && userAnswers[currentQuestionIndex] !== null) ? 
                    'block' : 'none';
            }

            /**
             * Updates the progress bar based on current question
             */
            function updateProgressBar() {
                const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
                progressBar.style.width = `${progress}%`;
            }

            /**
             * Submits the quiz and calculates the final score
             */
            function submitQuiz() {
                // Stop the timer
                clearInterval(timerInterval);
                
                // Mark quiz as completed
                quizCompleted = true;
                
                // Calculate score by comparing user answers with correct answers
                score = 0;
                questions.forEach((question, index) => {
                    if (userAnswers[index] === question.correctAnswer) {
                        score++;
                    }
                });
                
                // Hide navigation buttons
                prevButton.style.display = 'none';
                nextButton.style.display = 'none';
                submitButton.style.display = 'none';
                
                // Show results
                showResults();
            }

            /**
             * Displays the quiz results with detailed feedback
             */
            function showResults() {
                // Calculate percentage score
                const percentage = (score / questions.length) * 100;
                
                // Create results HTML
                let resultsHTML = `
                    <h2>Quiz Results</h2>
                    <p>You scored ${score} out of ${questions.length} (${percentage.toFixed(1)}%)</p>
                    <h3>Question Review:</h3>
                `;
                
                // Add review for each question
                questions.forEach((question, index) => {
                    const userAnswerIndex = userAnswers[index];
                    const isCorrect = userAnswerIndex === question.correctAnswer;
                    
                    resultsHTML += `
                        <div class="question-review ${isCorrect ? 'correct' : 'incorrect'}">
                            <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
                            <p>Your answer: ${userAnswerIndex !== null ? question.options[userAnswerIndex] : 'Not answered'}</p>
                            ${!isCorrect ? `<p>Correct answer: ${question.options[question.correctAnswer]}</p>` : ''}
                        </div>
                    `;
                });
                
                // Add retry button
                resultsHTML += `<button id="retry-btn" onclick="location.reload()">Try Again</button>`;
                
                // Display results
                resultsElement.innerHTML = resultsHTML;
                resultsElement.style.display = 'block';
                
                // Scroll to results
                resultsElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
 