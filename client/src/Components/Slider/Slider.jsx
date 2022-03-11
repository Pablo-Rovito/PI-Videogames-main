import React, { useState } from 'react';
import styles from './Slider.module.css';
import asset from '../../Assets/forms.module.css';

export default function Slider({ images }) {
	const [stateIndex, setStateIndex] = useState(0);

	function nextSlide(e) {
		e.preventDefault();
		setStateIndex(stateIndex + 1);
	}
	function prevSlide(e) {
		e.preventDefault();
		setStateIndex(stateIndex - 1);
	}
	return (
		<div className={styles.container}>
			<div className={styles.prev}>
				<button
					className={asset.button_slider}
					onClick={(e) => prevSlide(e)}
					disabled={stateIndex === 0 ? true : false}>
					{'<'}
				</button>
			</div>

			<div className={styles.imageContainer}>
				{images?.map((image, index) => {
					return (
						<div
							className={
								stateIndex === index
									? styles.slide_active
									: styles.slide
							}>
							<img key={image.id} src={image.image} alt='' />
						</div>
					);
				})}
			</div>
			<div className={styles.next}>
				<button
					className={asset.button_slider}
					onClick={(e) => nextSlide(e)}
					disabled={stateIndex === images?.length - 1 ? true : false}>
					{'>'}
				</button>
			</div>
		</div>
	);
}
