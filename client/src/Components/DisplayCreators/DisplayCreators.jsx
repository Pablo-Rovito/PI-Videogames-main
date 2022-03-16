import React from 'react';
import asset from '../../Assets/forms.module.css';
import styles from "./DisplayCreators.module.css"

export function DisplayCreators({ state, setState }) {
	return (
		<div className={styles.general}>
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