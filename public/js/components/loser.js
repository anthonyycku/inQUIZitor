const Loser = props => {
	return (
		<div>
			<div
				id='container'
				style={{
					padding: '10px',
					width: '800px',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					border: '2px grey solid'
				}}>
				<h1 className='loser' style={{ color: 'green' }}>
					YOU SUCK!!!
				</h1>

				<h2 className='loser' style={{ color: 'red' }}>
					Go take a walk!
				</h2>

				<img
					src='https://media1.tenor.com/images/695c6369b1862d228448a48c395a0d50/tenor.gif?itemid=16147647'
					alt=''
				/>

				<button onClick={props.playAgain} className='btn btn-outline-primary'>
					Try Again?
				</button>
			</div>
		</div>
	);
};
