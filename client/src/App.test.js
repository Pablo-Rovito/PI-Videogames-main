import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './Store';
import { BrowserRouter } from 'react-router-dom';

import Landing from './Components/Landing/Landing';
import Nav from './Components/Nav/Nav';
import About from './Components/About/About';
import SearchBar from './Components/SearchBar/SearchBar';

describe('<Landing />', () => {
	it('has a title and a button for entering', () => {
		const wrapper = render(
			<Provider store={store}>
				<BrowserRouter>
					<Landing />
				</BrowserRouter>
			</Provider>
		);
		const title = wrapper.getByText('VIDEOGAMES APP');
		expect(title).toBeInTheDocument();
		const button = wrapper.getByText('Enter');
		expect(button).toBeInTheDocument();
	});
});

describe('<Nav />', () => {
	it('has three links: <a>home<a>, <a>create<a>, <a>about<a>', () => {
		const wrapper = render(
			<Provider store={store}>
				<BrowserRouter>
					<Nav />
				</BrowserRouter>
			</Provider>
		);
		const home = wrapper.getByText('HOME');
		expect(home).toBeInTheDocument();
		const create = wrapper.getByText('CREATE');
		expect(create).toBeInTheDocument();
		const about = wrapper.getByText('ABOUT');
		expect(about).toBeInTheDocument();
	});
});

describe('<About />', () => {
	it('Has contact info', () => {
		const wrapper = render(
			<Provider store={store}>
				<BrowserRouter>
					<About />
				</BrowserRouter>
			</Provider>
		);
		const info = wrapper.getByText('CONTACT');
		expect(info).toBeInTheDocument();
	});
});

describe('<SearchBar />', () => {
	it('Has a Search button', () => {
		const wrapper = render(
			<Provider store={store}>
				<BrowserRouter>
					<SearchBar />
				</BrowserRouter>
			</Provider>
		);
		const info = wrapper.getByText('Search by...');
		expect(info).toBeInTheDocument();
	});
});
