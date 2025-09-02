import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import Question from "../../components/Question/Question";
import "./Quiz.css";

const Quiz = ({ name, score, questions, setQuestions, setScore }) => {
	const [options, setOptions] = useState([]);
	const [currQues, setCurrQues] = useState(0);

	useEffect(() => {
		if (questions && questions[currQues]) {
			// Extract all available answers (ignore null ones)
			const allAnswers = Object.entries(questions[currQues].answers)
				.filter(([_, value]) => value !== null) // remove null options
				.map(([key, value]) => ({
					key,
					text: value,
					isCorrect:
						questions[currQues].correct_answers[`${key}_correct`] === "true",
				}));

			// Shuffle options
			setOptions(handleShuffle(allAnswers));
		}
	}, [currQues, questions]);

	const handleShuffle = (givenOptions) => {
		return [...givenOptions].sort(() => Math.random() - 0.5);
	};

	return (
		<div className='quiz'>
			<span className='subtitle'>Welcome, {name}</span>
			{questions && questions.length > 0 ? (
				<>
					<div className='quizInfo'>
						<span>Category: {questions[currQues].category}</span>
						<span>Score: {score}</span>
					</div>

					<Question
						currQues={currQues}
						setCurrQues={setCurrQues}
						questions={questions}
						options={options} // pass full objects
						correct={options.find((opt) => opt.isCorrect)} // correct object
						score={score}
						setScore={setScore}
						setQuestions={setQuestions}
					/>
				</>
			) : (
				<CircularProgress
					style={{ margin: 100 }}
					color='inherit'
					size={150}
					thickness={1}
				/>
			)}
		</div>
	);
};

export default Quiz;