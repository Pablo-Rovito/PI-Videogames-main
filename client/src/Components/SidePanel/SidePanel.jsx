import React from 'react';
import { ByCreation, Sort, DropDownGenre } from '../Filters/Filters';
import styles from './SidePanel.module.css';

function SidePanel() {
	return (
		<div className={styles.sidePanel}>
			<div className={styles.sort}>
				<Sort />
			</div>
			<div className={styles.creation}>
				<ByCreation />
			</div>
			<div className={styles.genre}>
				<DropDownGenre
					page={'SidePanel'}
					placeHolder={'Filter by genre'}
				/>
			</div>
		</div>
	);
}

export default SidePanel;
