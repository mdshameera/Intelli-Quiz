import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Home from "./Pages/Home/Home";
import Quiz from "./Pages/Quiz/Quiz";
import Result from "./Pages/Result/Result";
import { useState } from "react";
import axios from "axios";

function App() {
	const [name, setName] = useState("");
	const [questions, setQuestions] = useState();
	const [score, setScore] = useState(0);

	const fetchQuestions = async (limit=10,difficulty = "") => {
		const { data } = await axios.get(
			`https://quizapi.io/api/v1/questions/?apiKey=CpVQo0vA4VdLJkOBu05gTMbWSs4hTPyNNcAXFDYt&limit=${limit}&${
				difficulty && `&difficulty=${difficulty}`
			}`
		);
		setQuestions(data);
	};

	return (
		<BrowserRouter>
			<div className='App' style={{ backgroundImage: "url(./ques1.png)" }}>
				<Header />
				<Routes>
					<Route
						path='/'
						element={
							<Home
								name={name}
								setName={setName}
								fetchQuestions={fetchQuestions}
							/>
						}
					/>
					<Route
						path='/quiz'
						element={
							<Quiz
								name={name}
								questions={questions}
								score={score}
								setQuestions={setQuestions}
								setScore={setScore}
							/>
						}
					/>
					<Route
						path='/result'
						element={<Result name={name} score={score} />}
					/>
				</Routes>
			</div>
			<Footer />
		</BrowserRouter>
	);
}

export default App;