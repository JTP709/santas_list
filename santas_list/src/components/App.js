import React from 'react';
import Lists from './Lists';
import Budget from './Budget';
//import base from'../base';

class App extends React.Component {
    constructor() {
        super();
        this.addGift = this.addGift.bind(this);
        this.updateGift = this.updateGift.bind(this);
        this.removeGift = this.removeGift.bind(this);
        this.updateBudget = this.updateBudget.bind(this);
        this.updateRemaining = this.updateRemaining.bind(this);
        this.addList = this.addList.bind(this);
        // get initial state
        this.state = {
            gifts: {
                giftee1: {
                    giftee: 'Ned',
                    budget: 100,
                    remaining: null,
                    gifts: {
                        gift1: {
                            name: 'LEGO Kylo Rens TIE Silencer',
                            desc: 'LEGO item',
                            price: 19.61,
                            status: 'available'
                        },
                        gift2: {
                            name: 'Present 2',
                            desc: '',
                            price: 20.01,
                            status: 'available'
                        },
                    },
                },
                giftee2: {
                    giftee: 'Troy',
                    budget: 100,
                    remaining: null,
                    gifts: {
                        gift1: {
                            name: 'Gift Uno',
                            desc: 'LEGO item',
                            price: 17.00,
                            status: 'available'
                        },
                        gift2: {
                            name: 'Present 2',
                            desc: '',
                            price: 17.24,
                            status: 'available'
                        },
                    },
                },
            },
            budget: {
                main: 250,
                spent: null
            }
        };
    }

    updateRemaining(){
        const self = this;
        const giftees = this.state.gifts;
        let overallSpendTotal = 0;

        Object.keys(giftees).map(function (key){

            let gifteeSpendTotal = 0;

            function callback(element) {
                gifteeSpendTotal += parseFloat(self.state.gifts[this.key].gifts[element].price);
            };

            Object.keys(self.state.gifts[key].gifts).map(callback, {
                key: key
            });

            const gifts = {...self.state.gifts};
            gifts[key].remaining = gifteeSpendTotal;
            self.setState({ gifts });

            overallSpendTotal += gifteeSpendTotal;

            return false;
        });

        const budget = {...this.state.budget};
        budget.spent = overallSpendTotal;
        this.setState({ budget });
    }

    addGift(gift, giftee){
        //update our state
        const gifts = {...this.state.gifts};
        // add in our new gift
        const timestamp = Date.now();
        gifts[giftee].gifts[`gift-${timestamp}`] = gift;
        // set state
        this.setState({ gifts });
        this.updateRemaining();
    }

    addList(){
        const gifteeObj = {
            giftee: '',
            budget: 0,
            remaining: null,
            gifts: {}
        };
        //update our state
        const gifts = {...this.state.gifts};
        // add in our new gift
        const timestamp = Date.now();
        gifts[`giftee-${timestamp}`] = gifteeObj;
        // set state
        this.setState({ gifts });
    }

    updateGift(giftee, key, updatedGift) {
        let gifts = {...this.state.gifts};
        if(!key) {
            gifts[giftee] = updatedGift;
        } else {
            gifts[giftee].gifts[key] = updatedGift;
        }
        this.setState({ gifts });
    }

    removeGift(key, giftee) {
        const gifts = {...this.state.gifts};
        delete gifts[giftee].gifts[key];
        this.setState({ gifts });
        this.updateRemaining();
    }

    updateBudget(updatedBudget) {
        const budget = {...this.state.budget};
        budget.main = updatedBudget;
        this.setState({ budget });
        //this.updateRemaining();
    }

    render() {
        return(
            <div className="santas-list">

                <Budget
                    budget={this.state.budget}
                    updateBudget={this.updateBudget}
                />

                <Lists
                    addGift={this.addGift}
                    addList={this.addList}
                    loadSamples={this.loadSamples}
                    gifts={this.state.gifts}
                    updateGift={this.updateGift}
                    removeGift={this.removeGift}
                    updateRemaining={this.updateRemaining}
                    userId={this.props.params.userId}
                />
            </div>
        )
    }
}

App.propTypes = {
    params: React.PropTypes.object.isRequired
}

export default App;