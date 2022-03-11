import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postToDb, getGenres } from '../../Actions';
import styles from './Create.module.css';
import asset from '../../Assets/forms.module.css';
import { DisplayCreators } from '../DisplayCreators/DisplayCreators';

export default function Create() {
	const dispatch = useDispatch();

	const allGenres = useSelector((state) => state.genres);
	if (allGenres.length === 0) {
		dispatch(getGenres());
	}

	const [newGame, setNewGame] = useState({
		name: '',
		description: '',
		rating: '',
		background_image: '',
		released: '',
	});

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

	function handleStateChange(e, setState) {
		e.preventDefault();
		setState(e.target.value);
	}

	function handleAddState(e, element, setElement, state, setState) {
		e.preventDefault();
		if (!state.includes(element)) {
			setState([...state, element]);
			setElement('');
		}
	}

	function handleAddGenre(e) {
		e.preventDefault();
		if (!genres.includes(e.target.value)) {
			setGenres([...genres, e.target.value]);
		}
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
		<div className={asset.global}>
			<h3>CREATE NEW GAME</h3>

			<form
				className={styles.form_container}
				onSubmit={(e) => handleSubmit(e)}>
				<div>
					<input
						className={asset.input}
						placeholder='Name'
						name={'name'}
						value={newGame.name}
						onChange={(e) => handleOnChange(e)}></input>
					<span className={newGame.name && styles.validInput}>
						{!newGame.name ? `Cannot save an empty name` : 'ok'}
					</span>
				</div>
				<div>
					<input
						className={asset.input}
						placeholder='Description'
						name={'description'}
						value={newGame.description}
						onChange={(e) => handleOnChange(e)}></input>
					<span className={newGame.description && styles.validInput}>
						{!newGame.description
							? `Cannot save an empty description`
							: 'ok'}
					</span>
				</div>
				<div>
					<input
						className={asset.input}
						placeholder='Rating'
						name={'rating'}
						value={newGame.rating}
						onChange={(e) => handleOnChange(e)}></input>
					<span className={newGame.rating && styles.validInput}>
						{!newGame.rating ? `Cannot save an empty rating` : 'ok'}
						{/* VALIDATE AS NUMBER BETWEEN 0 AND 10 */}
					</span>
				</div>
				<div>
					<input
						className={asset.input}
						placeholder='Poster'
						name={'background_image'}
						value={newGame.background_image}
						onChange={(e) => handleOnChange(e)}></input>
					<span
						className={
							newGame.background_image && styles.validInput
						}>
						{!newGame.background_image ? `Only URL allowed` : 'ok'}
						{/* VALIDATE AS URL */}
					</span>
				</div>

				<div>
					{/* validate as DateOnly!!! YYYY/MM/DD */}
					<input
						className={asset.input}
						placeholder='Release date'
						name={'released'}
						value={newGame.released}
						onChange={(e) => handleOnChange(e)}></input>
					<span className={newGame.released && styles.validInput}>
						{!newGame.released ? `Cannot save an empty date` : 'ok'}
					</span>
				</div>
				<div>
					<form>
						<input
							className={asset.input}
							placeholder='Add platform'
							name={'platform'}
							value={platform}
							onChange={(e) =>
								handleStateChange(e, setPlatform)
							}></input>
						<button
							className={asset.button_select}
							onClick={(e) =>
								handleAddState(
									e,
									platform,
									setPlatform,
									platforms,
									setPlatforms
								)
							}>
							+
						</button>
						<DisplayCreators
							state={platforms}
							setState={setPlatforms}
						/>
					</form>
				</div>
				<div>
					<form>
						<input
							className={asset.input}
							placeholder='Add screenshots'
							name={'add_screenshots'}
							value={screenshot}
							onChange={(e) =>
								handleStateChange(e, setScreenshot)
							}></input>
						<button
							className={asset.button_select}
							onClick={(e) =>
								handleAddState(
									e,
									screenshot,
									setScreenshot,
									short_screenshots,
									setShort_Screenshots
								)
							}>
							+
						</button>
					</form>
					<DisplayCreators
						state={short_screenshots}
						setState={setShort_Screenshots}
					/>
				</div>
				<div>
					<form>
						<div>
							<div className={asset.dropdown}>
								<button class={asset.dropdown_button}>
									Add genres
								</button>
								<div class={asset.dropdown_content}>
									{allGenres.map(({ name }) => {
										return (
											<button
												key={name}
												value={name}
												onClick={(e) =>
													handleAddGenre(e)
												}>
												{name}
											</button>
										);
									})}
								</div>
							</div>
							<span
								className={
									genres.length !== 0 && styles.validInput
								}>
								{genres.length === 0
									? `Cannot save empty genres`
									: genres.map((g) => {
											{
												return (
													<button
														key={g}
														className={
															asset.button_select
														}
														onClick={() =>
															setGenres(
																genres.filter(
																	(genre) =>
																		genre !==
																		g
																)
															)
														}>
														{g}
													</button>
												);
											}
									  })}
							</span>
						</div>
					</form>
				</div>
				<button
					style={{ justifySelf: 'center', marginLeft: '-2em' }}
					className={asset.superButton}
					type='submit'>
					Create
				</button>
			</form>
		</div>
	);
}
