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
		this.loginGuest = this.loginGuest.bind(this);
		this.fillInput = this.fillInput.bind(this);
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
							 <label className="input__label input__label--yoko" htmlFor="cpassword">
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

	fillInput(input, str, n = 1) {
		setTimeout(()=>{
			if (n < str.length) { this.fillInput(input, str, n + 1); }
			this.setState({[input]: str.slice(0, n)});
		}, 200);
	}

	loginGuest(e) {
		e.preventDefault();
		this.setState({username: '', password: ''});
		hashHistory.push('/login');

		this.fillInput('username', 'guest');
		setTimeout(()=>{
			this.fillInput('password', 'password');
			setTimeout(()=>{
				const user = this.state;
				this.props.processForm({user});
			}, 1800);
		}, 1000);
	}

	render() {
		return (
			<section className='session-form'>
				<h1>Job Application Management Made Easy</h1>
				<h3>because managing your job search shouldn't be a full time job</h3>
					<form className="content bgcolor-5" onSubmit={this.handleSubmit}>
						<div className={this._setClass('username')}>
							<input className="input__field input__field--yoko"
										 type="text"
										 id="username"
										 value={this.state.username}
										 onChange={this.update("username")} />
									 <label className="input__label input__label--yoko" htmlFor="username">
								<span className="input__label-content input__label-content--yoko">Username</span>
							</label>
						</div>
						<div className={this._setClass('password')}>
							<input className="input__field input__field--yoko"
										 type="password"
										 id="password"
										 value={this.state.password}
										 onChange={this.update("password")} />
									 <label className="input__label input__label--yoko" htmlFor="password">
								<span className="input__label-content input__label-content--yoko">Password</span>
							</label>
						</div>
						{ this._confirmPassword() }
						<button className="btn btn-primary btn-lg session-submit margin-right">
							{ this.props.formType }
						</button>
						<button className="btn btn-success btn-lg session-submit"
										onClick={this.loginGuest}>
							Guest
						</button>
						<div className="m-t-20">
							{ this.navLink() }
						</div>
					</form>
			</section>
		);
	}

}

export default SessionForm;
