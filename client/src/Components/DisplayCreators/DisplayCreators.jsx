import React from 'react';
import asset from '../../Assets/forms.module.css';

export function DisplayCreators({ state, setState }) {
	return (
		<div>
			{state.map((s) => {
				return (
					<button
						key={s}
						className={asset.button_select}
						onClick={() => {
							setState(state.filter((st) => st !== s));
						}}>
						{s}
					</button>
				);
			})}
		</div>
	);
}
