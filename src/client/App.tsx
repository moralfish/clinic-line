import * as React from 'react';
import socketIOClient from "socket.io-client";

// const port = process.env.PORT || 3000;
// const ENDPOINT = "https://clinic-line.herokuapp.com:"+port;

class App extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);
		this.state = {
			clientNumber: 0
		};
	}

	async componentDidMount() {
		try {
			const socket = socketIOClient();
			socket.on("next-turn", data => {
				this.setState({ clientNumber: data });
				speechSynthesis.speak(new SpeechSynthesisUtterance("Turn number: "+data));
			});
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		return (
			<main className="container my-5">
				<h1 className="text-primary text-center">Turn {this.state.clientNumber}!</h1>
			</main>
		);
	}
}

export interface IAppProps {}

export interface IAppState {
	clientNumber: string;
}

export default App;
