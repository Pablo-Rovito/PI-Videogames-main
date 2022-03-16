/* import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from "./Store"
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import Landing from './Components/Landing/Landing';
import Home from './Components/Home/Home';
import Nav from './Components/Nav/Nav';
import Create from './Components/Create/Create';
import Detail from './Components/Detail/Detail';
import About from './Components/About/About';

test('renders Landing in "/" route... ', () => {
	render(
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	);


});

/* 




	describe('El componente Nav debe renderizar en todas las rutas, excepto en "/"', () => {
		it('No debería renderizarse en la ruta "/"', () => {
			const wrapper = mount(
				<Provider store={store}>
					<MemoryRouter initialEntries={['/']}>
						<App />
					</MemoryRouter>
				</Provider>
			);
			expect(wrapper.find(Nav)).toHaveLength(0);
		});
		it('Debería renderizarse en la ruta "/home"', () => {
			const wrapper = mount(
				<Provider store={store}>
					<MemoryRouter initialEntries={['/home']}>
						<App />
					</MemoryRouter>
				</Provider>
			);
			expect(wrapper.find(Nav)).toHaveLength(1);
		});
		it('Debería renderizarse en la ruta "/create"', () => {
			const wrapper = mount(
				<Provider store={store}>
					<MemoryRouter initialEntries={['/create']}>
						<App />
					</MemoryRouter>
				</Provider>
			);
			expect(wrapper.find(Nav)).toHaveLength(1);
		});
		it('Debería renderizarse en la ruta "/detail"', () => {
			const wrapper = mount(
				<Provider store={store}>
					<MemoryRouter initialEntries={['/detail']}>
						<App />
					</MemoryRouter>
				</Provider>
			);
			expect(wrapper.find(Nav)).toHaveLength(1);
		});
		it('Debería renderizarse en la ruta "/about"', () => {
			const wrapper = mount(
				<Provider store={store}>
					<MemoryRouter initialEntries={['/about']}>
						<App />
					</MemoryRouter>
				</Provider>
			);
			expect(wrapper.find(Nav)).toHaveLength(1);
		});
	});

	it('Sólo el componente Landing debe renderizar en la ruta "/"', () => {
		const wrapper = mount(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/']}>
					<App />
				</MemoryRouter>
			</Provider>
		);

		expect(wrapper.find(Landing)).toHaveLength(1);
		expect(wrapper.find(Nav)).toHaveLength(0);
	});

    it('Nav y Create deben renderizar en la ruta "/create"', () => {
		const wrapper = mount(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/create']}>
					<App />
				</MemoryRouter>
			</Provider>
		);

		expect(wrapper.find(Create)).toHaveLength(1);
		expect(wrapper.find(Nav)).toHaveLength(1);
	});

    it('Nav y Detail deben renderizar en la ruta "/detail"', () => {
		const wrapper = mount(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/detail']}>
					<App />
				</MemoryRouter>
			</Provider>
		);

		expect(wrapper.find(Detail)).toHaveLength(1);
		expect(wrapper.find(Nav)).toHaveLength(1);
	});

    it('Nav y About deben renderizar en la ruta "/about"', () => {
		const wrapper = mount(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/about']}>
					<App />
				</MemoryRouter>
			</Provider>
		);

		expect(wrapper.find(About)).toHaveLength(1);
		expect(wrapper.find(Nav)).toHaveLength(1);
	});

    it('Nav y Home deben renderizar en la ruta "/home"', () => {
		const wrapper = mount(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/home']}>
					<App />
				</MemoryRouter>
			</Provider>
		);

		expect(wrapper.find(Home)).toHaveLength(1);
		expect(wrapper.find(Nav)).toHaveLength(1);
	});


	
});
 */
