import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postToDb, getGenres } from '../../Actions';
import styles from './Create.module.css';

export default function Create() {
	const dispatch = useDispatch();

	const allGenres = useSelector((state) => state.genres);
	if (allGenres.length === 0) {
		dispatch(getGenres());
	}

	const [newGame, setNewGame] = useState({
		name: '',
		description: '',
		rating: 0,
		background_image: '',
		released: '',
	});

	const [e, setE] = useState({
		name: `Cannot save an empty name`,
		description: `Cannot save an empty description`,
		rating: `Cannot save an empty rating`,
		background_image: '',
		released: `Cannot save an empty date`,
	});

	const [disableSend, setDisableSend] = useState(true);
	
	useEffect(() => {
		console.log('e');
	}, [e]);

	const [platform, setPlatform] = useState([]);
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

	function handleAddGenre(e) {
		e.preventDefault();
		setGenres([...genres, e.target.value]);
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
					{e.name && `Cannot save an empty name`}
					{}
				</div>
				<div>
					<label>Description</label>
					<input
						name={'description'}
						value={newGame.description}
						onChange={(e) => handleOnChange(e)}></input>
					{!newGame.description && `Cannot save an empty description`}
				</div>
				<div>
					<label>Rating</label>
					<input
						name={'rating'}
						value={newGame.rating}
						onChange={(e) => handleOnChange(e)}></input>
					{!newGame.rating && `Cannot save an empty rating`}
				</div>
				<div>
					<label>Image</label>
					<input
						name={'background_image'}
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
					{!newGame.released && `Cannot save an empty date`}
				</div>
				<button type='submit' disabled={disableSend}>
					Submit
				</button>
			</form>
			<div>
				<form>
					<label>Add genre</label>
					<select
						value={'Add genre'}
						className={styles.filter}
						onChange={(e) => handleAddGenre(e)}>
						<option hidden disabled value='Add genre'>
							Add genre
						</option>
						{allGenres.map(({ name }) => {
							return (
								<option key={name} value={name}>
									{name}
								</option>
							);
						})}
					</select>
				</form>
				{genres.length === 0 && `Cannot save empty genres`}
				{genres.map((g) => {
					return ` ${g} `;
				})}
			</div>
			<div>
				<form>
					<label>Add platform</label>
					<input
						name={'platform'}
						value={platform}
						onChange={(e) => handlePlatformChange(e)}></input>
					<button onClick={(e) => handleAddPlatform(e)}>+</button>
				</form>

				{platforms.length === 0 && `Cannot save empty platforms`}
				{platforms.map((p) => {
					return ` ${p} `;
				})}
			</div>
			<div>
				<form>
					<label>Add screenshots</label>
					<input
						name={'add_screenshots'}
						value={screenshot}
						onChange={(e) => handleScreenshotChange(e)}></input>
					<button onClick={(e) => handleAddScreenshot(e)}>+</button>
				</form>
				{short_screenshots.length === 0 &&
					`Cannot save empty screenshots`}
				{short_screenshots.map((s) => {
					return ` ${s} `;
				})}
			</div>
		</div>
	);
}
