import React from 'react';
import AddGiftForm from './AddGiftForm';
import { formatPrice } from '../helpers';

class Lists extends React.Component {
	constructor() {
		super();
        this.renderGifts = this.renderGifts.bind(this);
        this.renderLists = this.renderLists.bind(this);
        this.handleChange = this.handleChange.bind(this);

	}

    componentWillMount(){
        this.props.updateRemaining();
    }

	handleChange(e, key, giftee) {
		if(!key){
			const gift = this.props.gifts[giftee];
	        const updatedGift = {
	            ...gift,
	            giftee: e.target.value
	        };
        	this.props.updateGift(giftee, key, updatedGift);
		} else {
	        const gift = this.props.gifts[giftee].gifts[key];
	        const updatedGift = {
	            ...gift,
	            [e.target.name]: e.target.value
	        };
        	this.props.updateGift(giftee, key, updatedGift);
        	this.props.updateRemaining();
	    }
    }

    renderLists(key) {
    	const self = this;
    	const giftList = this.props.gifts[key];
    	const giftKeys = Object.keys(giftList.gifts);
    	function callback(element) {
    		return self.renderGifts(element, this.key);
    	};
    	return (
			<div key={key}>
	            <h3>Santa's List for: <input type="text" name="giftee" value={giftList.giftee} placeholder="Name" onChange={(e) => this.handleChange(e, null, key)}/></h3>
	            <h4>Total Spent: {formatPrice(giftList.remaining)}</h4>
	            {giftKeys.map(callback, {
	            	key: key
	            })}
	            <AddGiftForm addGift={this.props.addGift} giftee={key} />
	            <hr/>
	        </div>
    	)
    }

	renderGifts(key, giftee) {
        const gift = this.props.gifts[giftee].gifts[key];
        return (
            <div className="gift-edit" key={key}>
                <input type="text" name="name" value={gift.name} placeholder="Gift Name" onChange={(e) => this.handleChange(e, key, giftee)} />
                <input type="text" name="price" value={gift.price} placeholder="Gift Price" onChange={(e) => this.handleChange(e, key, giftee)} />
                <select type="text" name="status" value={gift.status} placeholder="Gift Status" onChange={(e) => this.handleChange(e, key, giftee)}>
                    <option value="available">In Stock!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <input type="text" name="desc" value={gift.desc} placeholder="Gift URL" onChange={(e) => this.handleChange(e, key, giftee)} />
                <button onClick={() => this.props.removeGift(key, giftee)}>Remove Gift</button>
            </div>
        )
	}

	render() {
		return(
			<div>
	            {Object.keys(this.props.gifts).map(this.renderLists)}
		        <button onClick={this.props.addList}>Add New List</button>
	        </div>
        )
	}

}

export default Lists;