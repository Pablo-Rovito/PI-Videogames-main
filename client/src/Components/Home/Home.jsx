import React from 'react';
import Card from '../Card/Card';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGames } from '../../Actions';

export default function Home() {
	const dispatch = useDispatch();

	const allVideogames = useSelector((state) => state.videogames);

	useEffect(() => {
		dispatch(getGames());
	}, [dispatch]);

	function handleReset() {
		dispatch(getGames());
	}
	console.log(allVideogames);
	return (
		<div>
			<h1>HOME</h1>
			<button onClick={handleReset}>Reset</button>
			<select>
				Order
				<option value='asc'>Ascending</option>
				<option value='des'>Descending</option>
			</select>
			<select>
				Creation
				<option value='all'>All</option>
				<option value='created'>User-created</option>
				<option value='not-created'>Company-created</option>
			</select>
			<select>
				Genres
				<option value='asc'>All</option>
				<option value='des'>Genre1</option>
				<option value='des'>Genre2</option>
			</select>
			<div>
				{allVideogames?.map((e) => {
					return (
						<div key={e.id}>
							<Card name={e.name} />
						</div>
					);
				})}
			</div>
		</div>
	);
}
