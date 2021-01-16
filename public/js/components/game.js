class Game extends React.Component {
    state = {
        quizBox: [],
        quiz: {
            displayAnswer: 'none',
            selection: []
        },
        page: 'game',
        addPoint: 0,
        gameStart: false
    };
    setPage = goto => {
        this.setState({
            page: goto
        });
    };
    addPointAnimation = (point) => {
        this.setState({
            addPoint: point
        })
        setTimeout(() => {
            this.setState({
                addPoint: 0
            })
        }, 1000)
    }

    findQuestion = () => {
        this.setState({ gameStart: true })
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
            this.addPointAnimation(1);
            this.findQuestion();
        } else {
            this.props.decrementPoints();
            this.addPointAnimation(-1);
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
        const { page, addPoint, gameStart } = this.state;
        if (page === "game") {
            return (
                <div id="megaContainer">
                    <div id="container">
                        <h1 style={{ color: "red" }}> Welcome to the inQUIZitor</h1>
                        <p style={{ color: "red" }}>Reach 5 points to win!</p>
                        <br />
                        <br />
                        <div className="pointDiv">
                            <h3 className="currentPoints">
                                <span >Points: </span>
                                {this.props.points}
                            </h3>
                            {addPoint > 0 ?
                                AddPoint("green", "+1")
                                :
                                null
                            }
                            {addPoint < 0 ?
                                AddPoint("red", "-1")
                                :
                                null
                            }
                        </div>

                        <h2 style={{ textAlign: "center" }}>
                            {this.state.quiz.question ? (
                                <div>{this.state.quiz.question}</div>
                            ) : (
                                    <p>Are you ready to be inQUIZitive?</p>
                                )}
                        </h2>
                        <div className="options">
                            {this.state.quiz.selection.map((el, id) => (
                                <button className="btn btn-dark" key={id} onClick={this.handleCheckAnswer}>
                                    {el}
                                </button>
                            ))}
                        </div>
                        {gameStart ?
                            null
                            :
                            <button onClick={this.findQuestion} className="btn btn-outline-danger"><h2>Get inQUIZitive</h2></button>
                        }
                        {/* <button onClick={this.displayAnswer}>Reveal Answer</button>
                        <div style={{ display: this.state.displayAnswer }}>
                            {this.state.displayAnswer ? (
                                <h5>{this.state.quiz.answer}</h5>
                            ) : null}
                        </div> */}
                        <br />
                        <br />
                        <div style={{ width: "100%" }}>
                            <button onClick={() => this.setPage("create")} className="btn btn-success">Create</button>
                        </div>
                    </div >
                    <div className="sidePanel"></div>
                </div>
            );
        } else if (page === "create") {
            return <Create setPage={this.setPage} />
        }
    };
}

function AddPoint(color, point) {
    return (
        <h3 style={{ color: color }} className="points">
            {point}
        </h3>
    )
}
