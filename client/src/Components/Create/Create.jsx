import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postToDb, getGenres } from '../../Actions';
import styles from './Create.module.css';
import asset from '../../Assets/forms.module.css';
import { DisplayCreators } from '../DisplayCreators/DisplayCreators';

export default function Create() {
	let urlRegEx = new RegExp('https?://.*.(?:png|jpg)');
	let dateRegEx = new RegExp(
		/(19|20)\d\d[/](0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])/
	);
	let ratingRegEx = new RegExp(/([0-4][.]\d\d)|([5][.][0][0])/);

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

	const [validate, setValidate] = useState({
		n: false,
		d: false,
		rat: false,
		b: false,
		rel: false,
		p: false,
		g: false,
	});

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

	useEffect(() => {
		setValidate({
			n: newGame.name ? true : false,
			d: newGame.description ? true : false,
			rat: ratingRegEx.test(newGame.rating) ? true : false,
			b: urlRegEx.test(newGame.background_image) ? true : false,
			rel: dateRegEx.test(newGame.released) ? true : false,
			p: platforms.length ? true : false,
			g: genres.length ? true : false,
		});
	}, [newGame, genres, platforms]);

	function handleOnChange(e) {
		e.preventDefault();
		setNewGame((previous) => ({
			...previous,
			[e.target.name]: e.target.value,
		}));
	}

	function handleSubmit(e) {
		e.preventDefault();
		let { n, d, rat, b, rel, p, g } = validate;
		if (n && d && rat && b && rel && p && g) {
			setNewGame((newGame.rating = parseFloat(newGame.rating)));
			dispatch(
				postToDb({
					...newGame,
					platforms,
					genres,
					short_screenshots,
				})
			);

			setNewGame({
				name: '',
				description: '',
				rating: '',
				background_image: '',
				released: '',
			});
			setPlatforms([]);
			setGenres([]);
			setShort_Screenshots([]);
			alert('Congrats, game created!');
		} else {
			alert('There are errors in the inputs');
		}
	}

	return (
		<div className={asset.global}>
			<h3>CREATE NEW GAME</h3>
			<form
				className={styles.form_container}
				onSubmit={(e) => handleSubmit(e)}>
				<div className={styles.name}>
					<input
						className={asset.input}
						placeholder='Name'
						name={'name'}
						value={newGame.name}
						onChange={(e) => handleOnChange(e)}></input>
					<span className={newGame.n && styles.validInput}>
						{validate.n ? 'Correct' : 'Write a name'}
					</span>
				</div>
				<div className={styles.description}>
					<input
						className={asset.input}
						placeholder='Description'
						name={'description'}
						value={newGame.description}
						onChange={(e) => handleOnChange(e)}></input>
					<span className={newGame.d && styles.validInput}>
						{validate.d ? 'Correct' : 'Write a description'}
					</span>
				</div>
				<div className={styles.rating}>
					<input
						className={asset.input}
						placeholder='Rating'
						name={'rating'}
						value={newGame.rating}
						onChange={(e) => handleOnChange(e)}></input>
					<span className={newGame.rat && styles.validInput}>
						{validate.rat
							? 'Correct'
							: 'Write a number between 0.00 and 5.00 with the format #.##'}
					</span>
				</div>
				<div className={styles.input}>
					<input
						className={asset.background_image}
						placeholder='Poster'
						name={'background_image'}
						value={newGame.background_image}
						onChange={(e) => handleOnChange(e)}></input>
					<span className={newGame.b && styles.validInput}>
						{validate.b
							? 'Correct'
							: 'Write a URL with the format https://address.jpg'}
					</span>
				</div>
				<div className={styles.released}>
					<input
						className={asset.input}
						placeholder='Release date'
						name={'released'}
						value={newGame.released}
						onChange={(e) => handleOnChange(e)}></input>
					<span className={newGame.rel && styles.validInput}>
						{validate.rel
							? 'Correct'
							: 'Write a release date with the format YYYY/MM/DD'}
					</span>
				</div>
				<div className={styles.platform}>
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
						{validate.p
							? 'Correct'
							: 'Write a platform, then click +'}
					</form>
				</div>
				<div className={styles.screenshots}>
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
							disabled={!urlRegEx.test(screenshot)}
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
					{urlRegEx.test(screenshot)
						? 'Correct'
						: '(optional) Write a URL with the format https://address.jpg, then click +'}
				</div>
				<div className={styles.dropdown}>
					<form>
						<div>
							<div className={asset.dropdown}>
								<button
									class={asset.dropdown_button}
									onClick={(e) => {
										e.preventDefault();
									}}>
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
							<span>
								{genres.map((g) => {
									{
										return (
											<button
												key={g}
												className={asset.button_select}
												onClick={() =>
													setGenres(
														genres.filter(
															(genre) =>
																genre !== g
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
						{validate.g
							? 'Correct'
							: 'Select genres from the dropdown menu'}
					</form>
				</div>
				<div className={styles.submit}>
					<button
						style={{ justifySelf: 'center', marginLeft: '-2em' }}
						className={asset.superButton}
						type='submit'>
						Create
					</button>
				</div>
			</form>
		</div>
	);
}
