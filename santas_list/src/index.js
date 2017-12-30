import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import './css/style.css';
import App from './components/App';
import NotFound from './components/NotFound';

class Root extends React.Component {
	constructor() {
		super();
		this.state = {
			uid: null
		};
	}

	render() {
	    return (
	        <BrowserRouter>
	            <div>
	                <Match exactly pattern="/" component={App} />
	                <Match exactly pattern="/store/:storeId" component={App} />
	                <Miss component={NotFound} />
	            </div>
	        </BrowserRouter>
	    )
	}
}

render(<Root/>, document.querySelector('#main'))