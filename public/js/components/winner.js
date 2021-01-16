const Winner = props => {
    return (
        <div>
            <div id="container" style={{ padding: "10px", width: "800px", display: "flex", flexDirection: "column", alignItems: "center", border: "2px grey solid" }}>
                <h1 className="winner" style={{ color: "green" }}>CONGRATULATIONS</h1>

                <h2 className="winner" style={{ color: "red" }}>You reached 5 points!</h2>

                <img src="https://media1.tenor.com/images/695c6369b1862d228448a48c395a0d50/tenor.gif?itemid=16147647" alt="" />

                <button onClick={props.playAgain} className="btn btn-outline-primary">Play Again?</button>
            </div>
        </div>
    )
}
