class Game extends React.Component {
	state = {
		quizBox: [],
		quiz: {
			displayAnswer: 'none',
			selection: []
		}
	};

	findQuestion = event => {
		event.preventDefault();
		axios.get('/quiz').then(res => {
			const randQuiz = Math.floor(Math.random() * res.data.length);
			const { quizBox } = this.state;
			if (quizBox.length) {
				if (quizBox.indexOf(res.data[randQuiz]._id) === -1) {
					this.setState({
						quiz: res.data[randQuiz]
					});
					quizBox.push(res.data[randQuiz]._id);
				} else {
					this.findQuestion(event);
				}
			} else {
				this.setState({
					quiz: res.data[randQuiz]
				});
				quizBox.push(res.data[randQuiz]._id);
			}
		});

		this.hideAnswer();
	};

	displayAnswer = event => {
		event.preventDefault();
		this.setState({
			displayAnswer: 'block'
		});
	};

	hideAnswer = event => {
		this.setState({
			displayAnswer: 'none'
		});
	};

	render = () => {
		return (
			<div>
				<h1> Welcome to inQUIZitor</h1>
function Game() {
    return (
        <div>
            <Create />

        </div>
    )
}

				<form onSubmit={this.findQuestion}>
					<button>Get inQUIZited</button>
				</form>

				<div>{this.state.quiz.question}</div>
				<div>
					{this.state.quiz.selection.map((el, id) => (
						<div key={id}>
							<button>{el}</button>
						</div>
					))}
				</div>

				<div>
					<button onClick={this.displayAnswer}>Reveal Answer</button>
					<div style={{ display: this.state.displayAnswer }}>
						{this.state.displayAnswer ? (
							<div>{this.state.quiz.answer}</div>
						) : null}
					</div>
				</div>
			</div>
		);
	};
}
