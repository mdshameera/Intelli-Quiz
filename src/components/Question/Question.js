import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Question.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Button } from "@mui/material";

const Question = ({
	currQues,
	setCurrQues,
	questions,
	options,
	correct, // this is now { key, text, isCorrect }
	setScore,
	score,
	setQuestions,
}) => {
	const [selected, setSelected] = useState(null); // store selected option object
	const [error, setError] = useState(false);

	const navigate = useNavigate();

	const handleSelectClass = (opt) => {
		if (!selected) return "";
		if (selected.key === opt.key) {
			return opt.isCorrect ? "select" : "wrong"; // highlight based on correctness
		}
		if (opt.isCorrect) return "select"; // highlight correct one after selection
		return "";
	};

	const handleCheck = (opt) => {
		setSelected(opt);
		if (opt.isCorrect) setScore(score + 1);
		setError(false);
	};

	const handleNext = () => {
		if (currQues >= questions.length - 1) {
			navigate("/result");
		} else if (selected) {
			setCurrQues(currQues + 1);
			setSelected(null);
		} else {
			setError("Please select an option first");
		}
	};

	const handleQuit = () => {
		setCurrQues(0);
		setQuestions();
	};

	return (
		<div className='question'>
			<h1>Question {currQues + 1} :</h1>

			<div className='singleQuestion'>
				<h2>{questions[currQues]?.question}</h2>
				<div className='options'>
					{error && <ErrorMessage>{error}</ErrorMessage>}
					{options &&
						options.map((opt) => (
							<button
								key={opt.key}
								onClick={() => handleCheck(opt)}
								className={`singleOption ${handleSelectClass(opt)}`}
								disabled={!!selected} // disable after one selection
							>
								{opt.text}
							</button>
						))}
				</div>
				<div className='controls'>
					<Button
						variant='contained'
						color='secondary'
						size='large'
						style={{ width: 185 }}
						href='/'
						onClick={handleQuit}
					>
						Quit
					</Button>
					<Button
						variant='contained'
						color='primary'
						size='large'
						style={{ width: 185 }}
						onClick={handleNext}
					>
						{currQues >= questions.length - 1 ? "Submit" : "Next Question"}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Question;