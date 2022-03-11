import React from 'react';
import { ByCreation, ByGenre, Sort } from '../Filters/Filters';

function SidePanel() {
	return (
		<div>
			<ByCreation />
			<ByGenre />
			<Sort />
		</div>
	);
}

export default SidePanel;
