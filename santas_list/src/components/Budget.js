import React from 'react';
import { formatPrice } from '../helpers';

class Budget extends React.Component {
	constructor(){
		super();
		this.budgetTotal = this.budgetTotal.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
        this.props.updateBudget(e.target.value);
    }

	budgetTotal() {
		if(!this.props.budget.main) {
			return ''
		} else {
			return this.props.budget.main
		}
	}

	render () {
		const total = this.props.budget.main;
		const spent = this.props.budget.spent;
		return (
			<div>
				<label>Budget: </label><input type="text" name="name" value={this.budgetTotal()} placeholder="Enter your Budget" onChange={(e) => this.handleChange(e)} />
				<br/>
				<label>Left Over: </label><span>{formatPrice(total-spent)}</span>
				<hr/>
			</div>
		)
	}
}

export default Budget