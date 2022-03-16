const { Videogame, Genre, conn } = require('../../src/db.js');
const { expect } = require('chai');

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

describe('Videogame model', () => {
	before(() =>
		conn.authenticate().catch((err) => {
			console.error('Unable to connect to the database:', err);
		})
	);
	describe('Validators', () => {
		beforeEach(() => Videogame.sync({ force: true }));
		describe('name', () => {
			it('should throw an error if name is null', (done) => {
				Videogame.create({})
					.then(() => done(new Error('It requires a valid name')))
					.catch(() => done());
			});
      it('should throw an error if rating is not a number', (done) => {
				Videogame.create({rating:"rating"})
					.then(() => done(new Error('It requires a valid rating')))
					.catch(() => done());
			});
			it('should work when its a valid name', () => {
				Videogame.create({ name: 'Super Mario Bros' }).then(() =>
					done()
				);
			});
			it('should work when its a valid game', (done) => {
				Videogame.create(game).then(() => done());
			});
		});
	});
	describe('Validators', () => {
		beforeEach(() => Genre.sync({ force: true }));
		describe('genre', () => {
			it('should throw an error if name is null', (done) => {
				Genre.create({})
					.then(() => done(new Error('It requires a valid name')))
					.catch(() => done());
			});
			it('should work when its a valid name', () => {
				Genre.create({ name: 'Action' }).then(() => done());
			});
		});
	});
});
