import React from 'react';

import './add-item.css';

class AddItem extends React.Component {
    constructor () {
        super();
        this.state = {
            label: ''
        };
        this.onLabelChange = (ev) => {
            this.setState({
                label: ev.target.value
            });
        };
        this.onSubmit = (ev) => {
            ev.preventDefault();
            this.props.addItemFromApp(this.state.label);
            this.setState({
                label: ''
            });
        }
    }
    render () {
        return (
            <form className="add-item d-flex" 
                onSubmit={this.onSubmit}>
                <input type="text"
                    className="form-control" 
                    placeholder="task name"
                    onChange={this.onLabelChange}
                    value={this.state.label}/>
                <button className="btn btn-outline-secondary">
                    add
                </button>
            </form>
    
        );
    }

};
export default AddItem