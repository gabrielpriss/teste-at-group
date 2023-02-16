import React from 'react';


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            senha: "",
        };
    }

render() {
    return (
        <div>
            <h1 className='Title'>email</h1>

        </div >
    );
    }}
