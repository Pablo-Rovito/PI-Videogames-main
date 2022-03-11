import React from 'react';
import { ByCreation, ByGenre, Sort } from '../Filters/Filters';
import styles from './SidePanel.module.css';

function SidePanel() {
	return (
		<div className={styles.sidePanel}>
			<div className={styles.creation}>
				<ByCreation />
			</div>
			<div className={styles.genre}>
				<ByGenre />
			</div>
			<div className={styles.sort}>
				<Sort />
			</div>
		</div>
	);
}

export default SidePanel;
