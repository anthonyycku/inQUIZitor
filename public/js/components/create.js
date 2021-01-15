

class Create extends React.Component {
    state = {
        question: "",
        answer: "",
        selection: [],
        completed: false
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
                    <div className="col-sm-2">
                        <input className="btn btn-success" type="submit" value="Create" />
                    </div>
                </form>
            </div>
        )
    }
}
