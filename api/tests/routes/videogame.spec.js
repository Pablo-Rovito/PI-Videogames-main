/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const game = {
	name: 'Super Mario Bros',
	description: 'This is a test object',
	rating: 5.0,
	background_image: 'https://address.jpg',
	released: '2022-01-01',
	genres: ['RPG', 'Action', 'Adventure', 'Indie'],
	platforms: ['PC', 'PS1', 'PS2'],
	short_screenshots: ['https://address.jpg'],
};

describe('Videogame routes', () => {
	before(() =>
		conn.authenticate().catch((err) => {
			console.error('Unable to connect to the database:', err);
		})
	);
	beforeEach(() =>
		Videogame.sync({ force: true }).then(() => Videogame.create(game))
	);

	describe('GET /genres', () => {
		it('GET gets genres from API as an Array', function () {
			agent
				.get('/genres')
				.expect(200)
				.expect(function (res) {
					expect(Array.isArray(res.body)).toEqual(true);
				});
		});
	});

	describe('GET /videogames', () => {
		it('GET gets videogames from API as an Array', function () {
			agent
				.get('/videogames')
				.expect(200)
				.expect(function (res) {
					expect(Array.isArray(res.body)).toEqual(true);
				});
		});

		it('GET gets results from API if searching name by query', function () {
			agent
				.get('/videogames/?name=tetris')
				.expect(200)
				.expect(function (res) {
					expect(Array.isArray(res.body)).toEqual(true);
				});
		});
	});

	describe('GET /videogame', () => {
		it('GET gets results from API if searching Id by params', function () {
			agent
				.get('/videogame/3468')
				.expect(200)
				.expect(function (res) {
					expect(Array.isArray(res.body)).toEqual(true);
				});
		});
	});

	describe('POST /videogame', () => {
		it('POST adds a new videogame', function () {
			agent
				.post('/videogame')
				.send(game)
				.expect(200)
				.expect(function (res) {
					expect(res.body).toEqual({ msg: 'game created' });
				});
		});
	});
});
