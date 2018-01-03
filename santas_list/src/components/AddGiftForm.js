import React from 'react';
import amazon from 'amazon-product-api';

class AddGiftForm extends React.Component {
    constructor(){
        super();
        this.addAmazonGift = this.addAmazonGift.bind(this);
    }

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
        this.addAmazonGift();
	}

    addAmazonGift(){
        const client = amazon.createClient({
          awsId: "AKIAIMKFRHPPTEIMU2YA",
          awsSecret: "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",
          awsTag: "jtp709-20"
        });
        
        client.itemLookup({
          idType: 'UPC',
          itemId: '635753490879',
          responseGroup: 'ItemAttributes,Offers,Images'
        }, function(err, results, response) {
          if (err) {
            console.log(err);
          } else {
            console.log(results);
          }
        });
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
            	<input ref={(input)=>this.desc=input} type="text" placeholder="Gift URL" />
            	<button type="submit">+ Add Item</button>
            </form>
        )
    }
}

AddGiftForm.propTypes = {
    addGift: React.PropTypes.func.isRequired
}

export default AddGiftForm;