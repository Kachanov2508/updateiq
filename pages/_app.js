import NavBar from "../components/NavBar/NavBar";
import { NavbarProvider } from "../context/NavbarProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<div className="layout">
				<div className="navbar">
					<NavbarProvider>
						<NavBar />
					</NavbarProvider>
				</div>
				<div className="content">
					<Component {...pageProps} />
				</div>
			</div>
	);
}

export default MyApp;
