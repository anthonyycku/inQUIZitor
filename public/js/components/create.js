class Create extends React.Component {
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
		}, 1000);
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
			<div className='d-flex row justify-content-center playboard m-0 p-4 color-light'>
				<h2 className='ylw-text-color'>Create New Question</h2>
				<div style={{ width: '100%' }}>
					<form id='createForm' onSubmit={this.handleSubmit}>
						<div>
							<div>
								<label htmlFor='question' className='form-label ylw-text-color'>
									<strong>Question</strong>{' '}
								</label>
								<input
									required
									id='question'
									className='form-control bg-color-dark'
									type='text'
									onChange={this.handleChange}
								/>
							</div>
							<div>
								<label htmlFor='answer' className='form-label ylw-text-color'>
									<strong>Answer</strong>{' '}
								</label>
								<input
									required
									id='answer'
									className='form-control bg-color-dark'
									type='text'
									onChange={this.handleChange}
								/>
							</div>
						</div>
						<br />
						<div>
							<label className='form-label ylw-text-color' htmlFor='selection1'>
								Option 1
							</label>
							<input
								required
								id='selection1'
								className='form-control bg-color-dark'
								type='text'
								onChange={this.handleChange}
							/>
							<label className='form-label ylw-text-color' htmlFor='selection2'>
								Option 2
							</label>
							<input
								required
								id='selection2'
								className='form-control bg-color-dark'
								type='text'
								onChange={this.handleChange}
							/>
							<label className='form-label ylw-text-color' htmlFor='selection3'>
								Option 3
							</label>
							<input
								required
								id='selection3'
								className='form-control bg-color-dark'
								type='text'
								onChange={this.handleChange}
							/>
							<label className='form-label ylw-text-color' htmlFor='selection4'>
								Option 4
							</label>
							<input
								required
								id='selection4'
								className='form-control bg-color-dark'
								type='text'
								onChange={this.handleChange}
							/>
						</div>
						<br />
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<button
								onClick={() => this.props.setPage('game')}
								className='bg-btn-color ylw-text-color px-4 m-2 py-3'>
								Back
							</button>
							<input
								onClick={this.showAlert}
								className='bg-btn-color ylw-text-color px-4 m-2 py-3'
								type='submit'
								value='Create'
							/>
						</div>
						<br />
						{this.state.alert ? (
							<div className='row grow growOut text-success'>
								<p>Successfully added!</p>
							</div>
						) : null}
					</form>
				</div>
			</div>
		);
	}
}
