import React, { Component } from 'react';

class User extends Component {

    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    signIn() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup( provider );
    }

    signOut() {
        this.props.firebase.auth().signOut();
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
             this.props.setUser(user);
        });
        console.log(this.props.user);
    }

    displayName() {
        if(this.props.user) {
            return this.props.user.displayName
        } else {
            return "Guest"
        }
    }

    render() {
        return(
            <div>
                <p className="lead">Username: {this.displayName()}</p>
                <button className="sign-in btn btn-success" onClick={this.signIn}>Sign In</button>
                <button className="sign-out btn btn-danger" onClick={this.signOut}>Sign Out</button>
            </div>
        )
    }
}

export default User;