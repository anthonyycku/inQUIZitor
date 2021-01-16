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
}
