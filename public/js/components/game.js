class Game extends React.Component {
	constructor() {
		super();
		this.timer = 0;
	}
	state = {
		quizBox: [],
		quiz: {
			displayAnswer: 'none',
			selection: []
		},
		page: 'game',
		addPoint: 0,
		gameStart: false,
		seconds: 20,
		actions: 0
	};
	randomSelect = () => {
		const { selection } = this.state.quiz;
		for (let i = selection.length - 1; i >= 0; i--) {
			let randomIndex = Math.floor(Math.random() * selection.length);
			let temp = selection[i];
			selection[i] = selection[randomIndex];
			selection[randomIndex] = temp;
		}
		this.setState({
			selection: selection
		});
	};
	setPage = goto => {
		clearInterval(this.timer);
		this.setState({
			page: goto
		});
		if (goto === 'game') {
			this.setState({
				quizBox: [],
				quiz: {
					displayAnswer: 'none',
					selection: []
				},
				page: 'game',
				addPoint: 0,
				gameStart: false,
				seconds: 20,
				actions: 0
			});
		}
		this.props.playAgain();
	};
	addPointAnimation = point => {
		this.setState({
			addPoint: point
		});
		setTimeout(() => {
			this.setState({
				addPoint: 0
			});
		}, 1000);
	};

	startTimer = () => {
		if (this.state.seconds > 0) {
			this.timer = setInterval(this.countDown, 1000);
		}
	};

	countDown = () => {
		let seconds = this.state.seconds - 1;
		this.setState({
			seconds: seconds
		});

		if (seconds < 0) {
			clearInterval(this.timer);
			this.props.gameOver();
		}
	};

	findQuestion = () => {
		if (this.state.actions === 0) {
			this.startTimer();
			$('.seconds').toggleClass('timer');
		}
		this.setState({
			gameStart: true,
			actions: this.state.actions + 1
		});

		axios.get('/quiz').then(res => {
			const randQuiz = Math.floor(Math.random() * res.data.length);
			const { quizBox } = this.state;
			if (quizBox.length) {
				if (quizBox.indexOf(res.data[randQuiz]._id) === -1) {
					this.setState({
						quiz: res.data[randQuiz]
					});
					quizBox.push(res.data[randQuiz]._id);
					this.randomSelect();
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
			this.addPointAnimation(1);
			this.setState({
				seconds: this.state.seconds + 5
			});
			this.findQuestion();
		} else {
			if (this.props.points > 0) {
				this.props.decrementPoints();
				this.addPointAnimation(-1);
				this.findQuestion();
			} else {
				this.addPointAnimation(-1);
				this.findQuestion();
			}
			this.setState({
				seconds: this.state.seconds - 2
			});
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
		const { page, addPoint, gameStart, quiz, seconds } = this.state;
		if (page === 'game') {
			return (
				<div>
					<div className='d-flex row justify-content-center playboard m-0 p-5'>
						<h1 className='title text-center p-0 m-0'>
							<strong>Welcome to the inQUIZitor</strong>{' '}
						</h1>
						<div className='text-center px-0 py-2 text-danger mb-3'>
							<h5>*Rules*</h5>
							<p className='text-muted border border-2 border-dark rounded p-2 bg-dark'>
								<strong className='text-success fs-5'>+1</strong> point,{' '}
								<strong className='text-success fs-5'>+5</strong> seconds, for
								correct answer
							</p>
							<p className='text-muted border border-2 border-dark rounded p-2 bg-dark'>
								<strong className='text-danger fs-5'>-1 </strong> point,{' '}
								<strong className='text-danger fs-5'>-2 </strong> seconds, for
								wrong answer
							</p>
							<h6 className='text-warning border border-2 border-dark rounded p-2 bg-dark'>
								<strong>Reach 10 points before timer runs out!</strong>
							</h6>
						</div>
						<br />
						<div className='pointDiv text-center'>
							<h2 className='currentPoints'>
								<span>Points: </span>
								{this.props.points}
							</h2>
							{addPoint > 0 ? AddPoint('green', '+1') : null}
							{addPoint < 0 ? AddPoint('red', '-1') : null}
						</div>
						<h2 className='text-center'>
							{this.state.quiz.question ? (
								<div>{this.state.quiz.question}</div>
							) : (
								<p>Are you ready to be inQUIZitive?</p>
							)}
						</h2>
						<div className='options'>
							{this.state.quiz.selection.map((el, id) => (
								<button
									className='btn btn-dark'
									key={id}
									onClick={this.handleCheckAnswer}>
									{el}
								</button>
							))}
						</div>
						{gameStart ? null : (
							<button
								onClick={this.findQuestion}
								className='btn btn-outline-danger'>
								<h2>Get inQUIZitive</h2>
							</button>
						)}
						<div
							id='time'
							className='row'
							style={{ width: '100%', height: '60px' }}>
							<div
								className='col-sm-7'
								style={{ display: 'flex', justifyContent: 'flex-end' }}>
								<span className='seconds'>{seconds}</span> seconds left!
							</div>
							<div className='col-sm-5'>
								{addPoint > 0 ? AddPoint('green', '+5 seconds', 2) : null}
								{addPoint < 0 ? AddPoint('red', '-2 seconds', 2) : null}
							</div>
						</div>
						<div className='p-0'>
							<button
								onClick={() => this.setPage('create')}
								className='btn btn-success m-0'>
								Create
							</button>
							<button
								onClick={() => this.setPage('edit')}
								className='btn btn-warning'>
								Edit
							</button>
						</div>
					</div>
				</div>
			);
		} else if (page === 'create') {
			return <Create setPage={this.setPage} />;
		} else if (page === 'edit') {
			return <Edit entry={quiz} setPage={this.setPage} />;
		}
	};
}

function AddPoint(color, point, version) {
	if (version === 2) {
		return (
			<h2 style={{ color: color }} className='points'>
				{point}
			</h2>
		);
	}
	return (
		<h1 style={{ color: color }} className='points'>
			{point}
		</h1>
	);
}
