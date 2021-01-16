class Game extends React.Component {
    state = {
        quizBox: [],
        quiz: {
            displayAnswer: 'none',
            selection: []
        },
        page: "game"
    };
    setPage = (goto) => {
        this.setState({
            page: goto
        })
    }



	findQuestion = () => {
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

	handleCheckAnswer = event => {
		const { answer } = this.state.quiz;
		if (answer === event.target.innerText) {
			this.props.incrementPoints();
			this.findQuestion();
		} else {
			this.props.decrementPoints();
			this.findQuestion();
		}
	};

	displayAnswer = () => {
		if (this.state.quiz.answer) {
			this.setState({
				displayAnswer: 'block'
			});

			setTimeout(() => {
				this.props.gameOver();
			}, 2000);
		}
	};

	hideAnswer = () => {
		this.setState({
			displayAnswer: 'none'
		});
	};

	render = () => {
		return (
			<div>
				<h1> Welcome to the inQUIZitor</h1>
				<h3>
					<span>Points: </span>
					{this.props.points}
				</h3>
				<h3>
					<span>Question: </span>
					{this.state.quiz.question ? (
						<div>{this.state.quiz.question}</div>
					) : (
						<p>Are you ready to be inQUIZitive?</p>
					)}
				</h3>
				<div>
					{this.state.quiz.selection.map((el, id) => (
						<button key={id} onClick={this.handleCheckAnswer}>
							{el}
						</button>
					))}
				</div>
				<button onClick={this.findQuestion}>Get inQUIZitive</button>

				<div>
					<button onClick={this.displayAnswer}>Reveal Answer</button>
					<div style={{ display: this.state.displayAnswer }}>
						{this.state.displayAnswer ? (
							<h5>{this.state.quiz.answer}</h5>
						) : null}
					</div>
				</div>
			</div>
		);
	};

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
        const { page } = this.state;

        if (page === "game") {
            return (
                <div>
                    <h1> Welcome to inQUIZitor</h1>

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
                    <br />
                    <button onClick={() => this.setPage("create")} className="btn btn-success">Create</button>
                </div>
            );
        } else if (page === "create") {
            return <Create setPage={this.setPage} />
        }
    };

}
