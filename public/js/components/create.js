class Create extends React.Component {
    state = {
        question: '',
        answer: '',
        selection: [],
        completed: false
    };
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };
    handleSubmit = event => {
        event.preventDefault();
        let newSelection = this.state.selection;
        for (let i = 1; i <= 4; i++) {
            newSelection.push(this.state['selection' + i]);
        }
        this.setState({
            selection: newSelection
        });
        axios.post('/quiz', this.state).then(response =>
            this.setState({
                question: '',
                answer: '',
                selection: [],
                completed: false
            })
        );
        document.getElementById('question').value = '';
        document.getElementById('answer').value = '';
        document.getElementById('selection1').value = '';
        document.getElementById('selection2').value = '';
        document.getElementById('selection3').value = '';
        document.getElementById('selection4').value = '';
    };
    render() {
        return (
            <div id='create-container'>
                <h2>Create New Question</h2>
                <form onSubmit={this.handleSubmit}>
                    <h4 htmlFor='question'>Question</h4>
                    <input id='question' type='text' onChange={this.handleChange} />

                    <h4 htmlFor='answer'>Answer</h4>
                    <input id='answer' type='text' onChange={this.handleChange} />

                    <h4 htmlFor='selection1'>Option 1</h4>
                    <input id='selection1' type='text' onChange={this.handleChange} />
                    <h4 htmlFor='selection2'>Option 2</h4>
                    <input id='selection2' type='text' onChange={this.handleChange} />
                    <h4 htmlFor='selection3'>Option 3</h4>
                    <input id='selection3' type='text' onChange={this.handleChange} />
                    <h4 htmlFor='selection4'>Option 4</h4>
                    <input id='selection4' type='text' onChange={this.handleChange} />

                    <input type='submit' value='Create' />
                </form>
            </div>
        );
    }

<<<<<<< HEAD
					<input type='submit' value='Create' />
				</form>
			</div>
		);
	}
	state = {
		question: '',
		answer: '',
		selection: [],
		completed: false,
		alert: false
	};
	showAlert = () => {
		this.setState({ alert: true });
		setTimeout(() => {
			this.setState({ alert: false });
		}, 4000);
	};
	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};
	handleSubmit = event => {
		event.preventDefault();
		let newSelection = this.state.selection;
		for (let i = 1; i <= 4; i++) {
			newSelection.push(this.state['selection' + i]);
		}
		this.setState({
			selection: newSelection
		});
		axios.post('/quiz', this.state).then(response =>
			this.setState({
				question: '',
				answer: '',
				selection: [],
				completed: false
			})
		);
		document.getElementById('question').value = '';
		document.getElementById('answer').value = '';
		document.getElementById('selection1').value = '';
		document.getElementById('selection2').value = '';
		document.getElementById('selection3').value = '';
		document.getElementById('selection4').value = '';
	};
	render() {
		return (
			<div
				style={{ border: 'grey 2px solid', width: '800px', padding: '20px' }}
				id='container'>
				<h2>Create New Question</h2>

				<form onSubmit={this.handleSubmit}>
					<div className='row'>
						<div className='col-sm-7'>
							<label htmlFor='question' className='form-label'>
								<strong>Question</strong>{' '}
							</label>
							<input
								required
								id='question'
								className='form-control'
								type='text'
								onChange={this.handleChange}
							/>
						</div>
						<div className='col-sm-3'>
							<label htmlFor='answer' className='form-label'>
								<strong>Answer</strong>{' '}
							</label>
							<input
								required
								id='answer'
								className='form-control'
								type='text'
								onChange={this.handleChange}
							/>
						</div>
					</div>
					<br />
					<div className='col-sm-5'>
						<label className='form-label' htmlFor='selection1'>
							Option 1
						</label>
						<input
							required
							id='selection1'
							className='form-control'
							type='text'
							onChange={this.handleChange}
						/>
						<label className='form-label' htmlFor='selection2'>
							Option 2
						</label>
						<input
							required
							id='selection2'
							className='form-control'
							type='text'
							onChange={this.handleChange}
						/>
						<label className='form-label' htmlFor='selection3'>
							Option 3
						</label>
						<input
							required
							id='selection3'
							className='form-control'
							type='text'
							onChange={this.handleChange}
						/>
						<label className='form-label' htmlFor='selection4'>
							Option 4
						</label>
						<input
							required
							id='selection4'
							className='form-control'
							type='text'
							onChange={this.handleChange}
						/>
					</div>
					<br />
					<div
						className='col-sm-5'
						style={{ display: 'flex', justifyContent: 'space-between' }}>
						<button className='btn btn-secondary'>Back</button>
						<input
							onClick={this.showAlert}
							className='btn btn-success'
							type='submit'
							value='Create'
						/>
					</div>
					<br />
					{this.state.alert ? (
						<div className='row grow growOut' style={{ color: 'green' }}>
							<p>Successfully added!</p>
						</div>
					) : null}
				</form>
			</div>
		);
	}
=======
    state = {
        question: "",
        answer: "",
        selection: [],
        completed: false,
        alert: false
    }
    showAlert = () => {
        this.setState({ alert: true });
        setTimeout(() => {
            this.setState({ alert: false });
        }, 4000);
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }
    handleSubmit = event => {
        event.preventDefault();
        let newSelection = this.state.selection;
        for (let i = 1; i <= 4; i++) {
            newSelection.push(this.state["selection" + i])
        }
        this.setState({
            selection: newSelection
        })
        axios.post("/quiz", this.state).then(response => this.setState({
            question: "",
            answer: "",
            selection: [],
            completed: false,
        }))
        document.getElementById('question').value = ""
        document.getElementById("answer").value = ""
        document.getElementById("selection1").value = ""
        document.getElementById("selection2").value = ""
        document.getElementById("selection3").value = ""
        document.getElementById("selection4").value = ""
    }
    render() {
        return (
            <div style={{ border: "grey 2px solid", width: "800px", padding: "20px" }} id="container">
                <h2>Create New Question</h2>

                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-sm-7">
                            <label htmlFor="question" className="form-label"><strong>Question</strong> </label>
                            <input required id="question" className="form-control" type="text" onChange={this.handleChange} />
                        </div>
                        <div className="col-sm-3">
                            <label htmlFor="answer" className="form-label"><strong>Answer</strong> </label>
                            <input required id="answer" className="form-control" type="text" onChange={this.handleChange} />
                        </div>
                    </div>
                    <br />
                    <div className="col-sm-5">
                        <label className="form-label" htmlFor="selection1">Option 1</label>
                        <input required id="selection1" className="form-control" type="text" onChange={this.handleChange} />
                        <label className="form-label" htmlFor="selection2">Option 2</label>
                        <input required id="selection2" className="form-control" type="text" onChange={this.handleChange} />
                        <label className="form-label" htmlFor="selection3">Option 3</label>
                        <input required id="selection3" className="form-control" type="text" onChange={this.handleChange} />
                        <label className="form-label" htmlFor="selection4">Option 4</label>
                        <input required id="selection4" className="form-control" type="text" onChange={this.handleChange} />
                    </div>
                    <br />
                    <div className="col-sm-5" style={{ display: "flex", justifyContent: "space-between" }}>
                        <button onClick={() => this.props.setPage("game")} className="btn btn-secondary">Back</button>
                        <input onClick={this.showAlert} className="btn btn-success" type="submit" value="Create" />
                    </div>
                    <br />
                    {this.state.alert ?
                        (<div className="row grow growOut" style={{ color: "green" }}>
                            <p>Successfully added!</p>
                        </div>)
                        :
                        null
                    }
                </form>
            </div>
        )
    }
>>>>>>> 51d0d3a19f662cfbe6a618065bb24c74cbe97bc4
}
