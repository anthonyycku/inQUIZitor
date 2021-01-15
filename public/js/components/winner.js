const Winner = props => {
    return (
        <div>
            <div id="container" style={{ padding: "10px", width: "800px", display: "flex", flexDirection: "column", alignItems: "center", border: "2px grey solid" }}>
                <h1 style={{ color: "green" }}>CONGRATULATIONS</h1>

                <h2 style={{ color: "red" }}>You reached 5 points!</h2>

                <button onClick={props.playAgain} className="btn btn-outline-primary">Play Again?</button>
            </div>
        </div>
    )
}
