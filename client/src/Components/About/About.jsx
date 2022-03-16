import React from 'react';
import styles from './About.module.css';
import { AiFillGithub, AiFillLinkedin, AiOutlineMail } from 'react-icons/ai';

export default function About() {
	return (
		<div className={styles.container}>
			<h2>ABOUT ME...</h2>
			<div className={styles.intro}>
				<span>
					{
						'I am an aspiring FullStack developer, currently finishing my studies remotely at '
					}
					<a
						href='https://www.soyhenry.com/'
						target='_blank'
						rel='noreferrer noopener'>
						SoyHenry
					</a>
				</span>
				<span>
					{
						'This app has been made using JS, React, Redux, Node.JS, Express, PostgreSQL, Sequelize, and no CSS frameworks'
					}
				</span>
			</div>
			<div className={styles.cv}>
				<span>
					{
						'I have some studies in Machine Learning and previous programming experience in engineering environments, mainly with MatLAB and some Python'
					}
				</span>
				<span>
					{
						'Also, I have an interesting set of transferrable skills from previous experience as:'
					}
				</span>
				<div className={styles.list}>
					<p>
						{
							'Lead operations officer founder in GSX Electroacústica'
						}
					</p>
					<p>
						{
							"Teaching assistant at SoyHenry, Physics and Production Planning at UNMDP's engineering school"
						}
					</p>
					<p>
						{
							'Bachelor studies in architecture and engineering, postgrad studies in renewables and efficiency'
						}
					</p>
				</div>
			</div>
			<div className={styles.contact}>
				<h3>CONTACT</h3>
				<div className={styles.link}>
					<AiFillGithub style={{ fontSize: '1.5em' }} />
					<a
						style={{ margin: '0 0.5em' }}
						href='https://github.com/Pablo-Rovito'
						target='_blank'
						rel='noreferrer noopener'>
						https://github.com/Pablo-Rovito
					</a>
				</div>
				<div className={styles.link}>
					<AiFillLinkedin style={{ fontSize: '1.5em' }} />
					<a
						style={{ margin: '0 0.5em' }}
						href='https://www.linkedin.com/in/pablo-rovito-239b2283/'
						target='_blank'
						rel='noreferrer noopener'>
						https://www.linkedin.com/in/pablo-rovito-239b2283/
					</a>
				</div>
				<div className={styles.link}>
					<AiOutlineMail style={{ fontSize: '1.5em' }} />
					<span style={{ margin: '0 0.5em' }}>
						pablo.rovito@outlook.com
					</span>
				</div>
			</div>
		</div>
	);
}
