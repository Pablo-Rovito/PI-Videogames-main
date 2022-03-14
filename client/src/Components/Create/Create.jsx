import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postToDb, getGenres } from '../../Actions';
import styles from './Create.module.css';
import asset from '../../Assets/forms.module.css';
import { DisplayCreators } from '../DisplayCreators/DisplayCreators';
import { IoAddOutline, IoCheckboxOutline } from 'react-icons/io5';

export default function Create() {
	const urlRegEx = useMemo(() => new RegExp('https?://.*.(?:png|jpg)'), []);

	const dateRegEx = useMemo(
		() =>
			new RegExp(
				/(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])/
			),
		[]
	);

	const ratingRegEx = useMemo(
		() => new RegExp(/([0-4][.]\d\d)|([5][.][0][0])/),
		[]
	);

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
			rat: ratingRegEx.test(newGame.rating),
			b: urlRegEx.test(newGame.background_image),
			rel: dateRegEx.test(newGame.released),
			p: platforms.length ? true : false,
			g: genres.length ? true : false,
		});
	}, [newGame, genres, platforms, urlRegEx, dateRegEx, ratingRegEx]);

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
			<div className={styles.form_container}>
				<div className={styles.name}>
					<input
						className={asset.input}
						placeholder='Name'
						name={'name'}
						value={newGame.name}
						onChange={(e) => handleOnChange(e)}></input>
					<span
						style={{ marginLeft: '1em' }}
						className={validate.n ? styles.validInput : undefined}>
						{validate.n ? <IoCheckboxOutline /> : 'Write a name'}
					</span>
				</div>
				<div className={styles.description}>
					<input
						className={asset.input}
						placeholder='Description'
						name={'description'}
						value={newGame.description}
						onChange={(e) => handleOnChange(e)}></input>
					<span
						style={{ marginLeft: '1em' }}
						className={validate.d ? styles.validInput : undefined}>
						{validate.d ? (
							<IoCheckboxOutline />
						) : (
							'Write a description'
						)}
					</span>
				</div>
				<div className={styles.rating}>
					<input
						className={asset.input}
						placeholder='Rating'
						name={'rating'}
						value={newGame.rating}
						onChange={(e) => handleOnChange(e)}></input>
					<span
						style={{ marginLeft: '1em' }}
						className={
							validate.rat ? styles.validInput : undefined
						}>
						{validate.rat ? (
							<IoCheckboxOutline />
						) : (
							'Write a number between 0.00 and 5.00 with the format #.##'
						)}
					</span>
				</div>
				<div className={styles.background_image}>
					<input
						className={asset.input}
						placeholder='Poster'
						name={'background_image'}
						value={newGame.background_image}
						onChange={(e) => handleOnChange(e)}></input>
					<span
						style={{ marginLeft: '1em' }}
						className={validate.b ? styles.validInput : undefined}>
						{validate.b ? (
							<IoCheckboxOutline />
						) : (
							`Write a URL "https://address.jpg"`
						)}
					</span>
				</div>
				<div className={styles.released}>
					<input
						className={asset.input}
						placeholder='Release date'
						name={'released'}
						value={newGame.released}
						onChange={(e) => handleOnChange(e)}></input>
					<span
						style={{ marginLeft: '1em' }}
						className={
							validate.rel ? styles.validInput : undefined
						}>
						{validate.rel ? (
							<IoCheckboxOutline />
						) : (
							'Write a release date with the format YYYY-MM-DD'
						)}
					</span>
				</div>
				<div className={styles.dropdown}>
					<form>
						<div className={styles.field}>
							<div className={asset.dropdown}>
								<button
									className={asset.dropdown_button}
									onClick={(e) => {
										e.preventDefault();
									}}>
									Add genres
								</button>
								<div className={asset.dropdown_content}>
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
								style={{ marginLeft: '1em' }}
								className={
									validate.g ? styles.validInput : undefined
								}>
								{validate.g ? (
									<IoCheckboxOutline />
								) : (
									'Select genres from the dropdown menu'
								)}
							</span>
						</div>
						<div className={styles.displayCreators}>
							{genres.map((g) => {
								return (
									<button
										key={g}
										className={asset.button_select}
										onClick={() =>
											setGenres(
												genres.filter(
													(genre) => genre !== g
												)
											)
										}>
										{g}
									</button>
								);
							})}
						</div>
					</form>
				</div>
				<div className={styles.platform}>
					<form>
						<div className={styles.field}>
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
								<IoAddOutline />
							</button>
							<span
								style={{ marginLeft: '1em' }}
								className={
									validate.p ? styles.validInput : undefined
								}>
								{validate.p ? (
									<IoCheckboxOutline />
								) : (
									'Write a platform, then click +'
								)}
							</span>
						</div>
						<div className={styles.displayCreators}>
							<DisplayCreators
								state={platforms}
								setState={setPlatforms}
							/>
						</div>
					</form>
				</div>
				<div className={styles.screenshots}>
					<form>
						<div className={styles.field}>
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
								<IoAddOutline />
							</button>
							<span
								style={{ marginLeft: '1em' }}
								className={
									urlRegEx.test(screenshot)
										? styles.validInput
										: undefined
								}>
								{urlRegEx.test(screenshot) ? (
									<IoCheckboxOutline />
								) : (
									'(optional) Write a URL "https://address.jpg", then click +'
								)}
							</span>
						</div>
						<div className={styles.displayCreators}>
							<DisplayCreators
								state={short_screenshots}
								setState={setShort_Screenshots}
							/>
						</div>
					</form>
				</div>
				<div className={styles.submit}>
					<button
						className={asset.superButton}
						onClick={(e) => handleSubmit(e)}>
						Create
					</button>
				</div>
			</div>
		</div>
	);
}
