import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postToDb } from '../../Actions';
import styles from './Create.module.css';

export default function Create() {
	const dispatch = useDispatch();

	const [newGame, setNewGame] = useState({
		name: '',
		description: '',
		rating: 0,
		background_image: '',
		released: '',
	});

	const [platform, setPlatform] = useState([]);
	const [genre, setGenre] = useState([]);
	const [screenshot, setScreenshot] = useState([]);

	const [platforms, setPlatforms] = useState([]);
	const [genres, setGenres] = useState([]);
	const [short_screenshots, setShort_Screenshots] = useState([]);

	function handleOnChange(e) {
		e.preventDefault();
		setNewGame((previous) => ({
			...previous,
			[e.target.name]: e.target.value,
		}));
	}

	function handlePlatformChange(e) {
		e.preventDefault();
		setPlatform(e.target.value);
	}

	function handleAddPlatform(e) {
		e.preventDefault();
		setPlatforms([...platforms, platform]);
		setPlatform('');
	}

	function handleGenreChange(e) {
		e.preventDefault();
		setGenre(e.target.value);
	}

	function handleAddGenre(e) {
		e.preventDefault();
		setGenres([...genres, genre]);
		setGenre('');
	}

	function handleScreenshotChange(e) {
		e.preventDefault();
		setScreenshot(e.target.value);
	}

	function handleAddScreenshot(e) {
		e.preventDefault();
		setShort_Screenshots([...short_screenshots, screenshot]);
		setScreenshot('');
	}

	function handleSubmit(e) {
		e.preventDefault();
		const game = {
			...newGame,
			platforms: platforms,
			genres: genres,
			short_screenshots: short_screenshots,
		};
		setNewGame({
			name: '',
			description: '',
			rating: 0,
			background_image: '',
			released: '',
		});
		setPlatforms([]);
		setGenres([]);
		setShort_Screenshots([]);
		dispatch(postToDb(game));
	}

	return (
		<div className={styles.global}>
			<h3>CREATE NEW GAME</h3>
			<form onSubmit={(e) => handleSubmit(e)}>
				<div>
					<label>Name</label>
					<input
						name={'name'}
						value={newGame.name}
						onChange={(e) => handleOnChange(e)}></input>
				</div>
				<div>
					<label>Description</label>
					<input
						name={'description'}
						value={newGame.description}
						onChange={(e) => handleOnChange(e)}></input>
				</div>
				<div>
					<label>Rating</label>
					<input
						name={'rating'}
						value={newGame.rating}
						onChange={(e) => handleOnChange(e)}></input>
				</div>
				<div>
					<label>Image</label>
					<input
						name={'image_background'}
						value={newGame.background_image}
						onChange={(e) => handleOnChange(e)}></input>
				</div>
				<div>
					<label>Released</label>
					{/* validate as DateOnly!!! YYYY/MM/DD */}
					<input
						name={'released'}
						value={newGame.released}
						onChange={(e) => handleOnChange(e)}></input>
				</div>
				<button type='submit'>Submit</button>
			</form>
			<div>
				<form>
					<label>Add genre</label>
					<input
						name={'genre'}
						value={genre}
						onChange={(e) => handleGenreChange(e)}></input>
					<button onClick={(e) => handleAddGenre(e)}>+</button>
					{genres.map((g) => {
						return ` ${g} `;
					})}
				</form>
			</div>
			<div>
				<form>
					<label>Add platform</label>
					<input
						name={'platform'}
						value={platform}
						onChange={(e) => handlePlatformChange(e)}></input>
					<button onClick={(e) => handleAddPlatform(e)}>+</button>
					{platforms.map((g) => {
						return ` ${g} `;
					})}
				</form>
			</div>
			<div>
				<form>
					<label>Add screenshots</label>
					<input
						name={'add_screenshots'}
						value={screenshot}
						onChange={(e) => handleScreenshotChange(e)}></input>
					<button onClick={(e) => handleAddScreenshot(e)}>+</button>
					{short_screenshots.map((g) => {
						return ` ${g} `;
					})}
				</form>
			</div>
		</div>
	);
}
