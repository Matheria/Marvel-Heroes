import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import ViewRandomChar from "../ViewRandomChar/ViewRandomChar";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";

class RandomChar extends Component {
	state = {
		char: {},
		loading: true,
		error: false
	};

	marvelService = new MarvelService();

	onCharLoaded = (char) => {
		this.setState({
			char,
			loading: false
		});
	};

	onCharLoading = () => {
		this.setState({
			loading: true
		});
	};

	onError = () => {
		this.setState({
			loading: false,
			error: true
		});
	};

	updateChar = () => {
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		this.onCharLoading();
		this.marvelService
			.getCharacter(id)
			.then(this.onCharLoaded)
			.catch(this.onError);
	};

	componentDidMount() {
		this.updateChar();
	}

	render() {
		const { char, loading, error } = this.state;
		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error) ? <ViewRandomChar char={char} /> : null;

		return (
			<div className="randomchar">
				{errorMessage}
				{spinner}
				{content}
				<div className="randomchar__static">
					<p className="randomchar__title">
						Random character for today!<br />
						Do you want to get to know him better?
					</p>
					<p className="randomchar__title">
						Or choose another one
					</p>
					<button className="button button__main">
						<div className="inner" onClick={this.updateChar}>Try it</div>
					</button>
					<img className="randomchar__decoration" src={mjolnir} alt="mjolnir" />
				</div>
			</div>
		);
	}
}

export default RandomChar;