import React from 'react';

class AddGiftForm extends React.Component {
	createGift(event, giftee) {
		event.preventDefault();
		const gift = {
			name: this.name.value,
			price: this.price.value,
			status: this.status.value,
			desc: this.desc.value
		}
		this.props.addGift(gift, giftee);
		this.giftForm.reset();
	}
    render() {
        return(
            <form ref={(input) => this.giftForm = input} className="fish-edit" onSubmit={(e) => this.createGift(e, this.props.giftee)}>
            	<input ref={(input)=>this.name=input} type="text" placeholder="Gift Name" />
            	<input ref={(input)=>this.price=input} type="text" placeholder="Gift Price" />
            	<select ref={(input)=>this.status=input}>
            		<option value="available">In Stock!</option>
            		<option value="unavailable">Sold Out!</option>
            	</select>
            	<textarea ref={(input)=>this.desc=input} type="text" placeholder="Gift URL"></textarea>
            	<button type="submit">+ Add Item</button>
            </form>
        )
    }
}

AddGiftForm.propTypes = {
    addGift: React.PropTypes.func.isRequired
}

export default AddGiftForm;