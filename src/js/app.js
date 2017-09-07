import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>You welcome :-)</div>;
    }
}

const props = {
    schema: {}
};

ReactDOM.render(<App {...props}/>, document.getElementById('app'));