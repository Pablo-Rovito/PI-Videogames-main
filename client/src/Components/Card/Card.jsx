import React from 'react';

export default function Card({ name, background_image }) {
	return (
		<div>
			<h5>{name}</h5>
			<img
				src={background_image}
				alt='no image'
				width={'240px'}
				height={'auto'}
			/>
		</div>
	);
}
