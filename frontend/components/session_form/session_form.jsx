import React from 'react';
import { Link, hashHistory } from 'react-router';

class SessionForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			username: "",
			password: "",
			cpassword: ""
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this._setClass = this._setClass.bind(this);
	}

	componentDidUpdate(){
		this.redirectIfLoggedIn();
	}

	redirectIfLoggedIn(){
		if (this.props.loggedIn){
			hashHistory.push("/");
		}
	}

	update(field){
		return e => { this.setState({[field]: e.currentTarget.value }); };
	}

	handleSubmit(e){
		e.preventDefault();
		const user = this.state;
		this.props.processForm({user});
	}

	navLink(){
		if (this.props.formType === "login") {
			return <Link to="/signup">sign up</Link>;
		} else {
			return <Link to="/login">log in</Link>;
		}
	}

	renderErrors(){
		return(
			<ul>
				{this.props.errors.map( (error, i) => (
					<li key={`error-${i}`}>
						{error}
					</li>
				))}
			</ul>
		);
	}

	_setClass(property) {
		if (this.state[property] === '') {
			return "input input--minoru";
		} else {
			return "input input--minoru input--filled";
		}
	}

	_confirmPassword() {
		if (this.props.formType === 'signup') {
			return (
				<div className={this._setClass('cpassword')}>
					<input className="input__field input__field--yoko"
								 type="password"
								 id="cpassword"
								 value={this.state.cpassword}
								 onChange={this.update("cpassword")} />
							 <label className="input__label input__label--yoko" for="cpassword">
						<span className="input__label-content input__label-content--yoko">Confirm Password</span>
					</label>
				</div>
			);
		} else {
			return (
				<div>
				</div>
			);
		}
	}

	render() {
		return (
			<section className='session-form'>
				<h1>Job Application Management Made Easy</h1>
				<h3>because managing your job search shouldn't be a full time job</h3>
				{ this.renderErrors() }
					<form className="content bgcolor-5" onSubmit={this.handleSubmit}>
						<div className={this._setClass('username')}>
							<input className="input__field input__field--yoko"
										 type="text"
										 id="username"
										 value={this.state.username}
										 onChange={this.update("username")} />
									 <label className="input__label input__label--yoko" for="username">
								<span className="input__label-content input__label-content--yoko">Username</span>
							</label>
						</div>
						<div className={this._setClass('password')}>
							<input className="input__field input__field--yoko"
										 type="password"
										 id="password"
										 value={this.state.password}
										 onChange={this.update("password")} />
									 <label className="input__label input__label--yoko" for="password">
								<span className="input__label-content input__label-content--yoko">Password</span>
							</label>
						</div>
						{ this._confirmPassword() }
						<button className="btn btn-primary btn-lg session-submit">{ this.props.formType }</button>
						<div className="m-t-20">
							{ this.navLink() }
						</div>
					</form>
			</section>
		);
	}

}

export default SessionForm;
