import { TextField, MenuItem, Button } from "@mui/material";
import React, { useState } from "react";
import "./Home.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Categories from "../../Data/Categories";
import { useNavigate } from "react-router";

const Home = ({ name, setName, fetchQuestions }) => {
	const [limit, setLimit] = useState("");
	const [difficulty, setDifficulty] = useState("");
	const [error, setError] = useState(false);

	const navigate = useNavigate();

	const handleSubmit = () => {
		if (!difficulty || !name) {
			setError(true);
			return;
		} else {
			setError(false);
			fetchQuestions(limit, difficulty);
			navigate("/quiz");
		}
	};

	return (
		<div className='content'>
			<div className='settings'>
				<span style={{ fontSize: 30 }}>Quiz Settings</span>
				<div className='settings__select'>
					{error && <ErrorMessage>Please fill all the fields</ErrorMessage>}

					<h3>This would be a random quiz. Be ready!</h3>
					<TextField
						style={{ marginBottom: 25 }}
						label='Enter Your Name'
						variant='outlined'
						onChange={(e) => setName(e.target.value)}
					/>
					<TextField
						select
						label='No. of questions'
						variant='outlined'
						value={limit}
						onChange={(e) => setLimit(e.target.value)}
						style={{ marginBottom: 30 }}
					>
						<MenuItem key='10' value='10'>
							10
						</MenuItem>
						<MenuItem key='20' value='20'>
							20
						</MenuItem>
						<MenuItem key='30' value='30'>
							30
						</MenuItem>
					</TextField>
					<TextField
						select
						label='Select Difficulty'
						variant='outlined'
						value={difficulty}
						onChange={(e) => setDifficulty(e.target.value)}
						style={{ marginBottom: 30 }}
					>
						<MenuItem key='Easy' value='easy'>
							Easy
						</MenuItem>
						<MenuItem key='Medium' value='medium'>
							Medium
						</MenuItem>
						<MenuItem key='Hard' value='hard'>
							Hard
						</MenuItem>
					</TextField>
					<Button
						onClick={handleSubmit}
						variant='contained'
						color='primary'
						size='large'
					>
						Start Quiz
					</Button>
				</div>
			</div>
			<img src='/quizz.jpeg' alt='quiz-img' className='banner' />
		</div>
	);
};

export default Home;