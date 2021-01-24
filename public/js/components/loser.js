const Loser = props => {
	return (
		<div className='d-flex row justify-content-center playboard m-0 p-4 text-center'>
			<img
				src='https://media.giphy.com/media/3ohhwH6yMO7ED5xc7S/giphy.gif'
				alt='lose image'
				className='p-0'
			/>
			<h1 className='loser text-danger mt-5'>GO TAKE A WALK!</h1>

			<button
				onClick={props.playAgain}
				className='bg-btn-color ylw-text-color px-4 m-2 py-0'>
				<h1>Try Again?</h1>
			</button>
		</div>
	);
};
