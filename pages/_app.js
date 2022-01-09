import Navbar from "../components/Navbar/Navbar";
// import { NavbarProvider } from "../context/NavbarProvider";
import { CourseProvider } from "../context/CourseProvider";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<div className="layout">
				<div className="navbar">
					{/* <NavbarProvider>
						<Navbar />
					</NavbarProvider> */}
				</div>
				<div className="content">
					<Component {...pageProps} />
				</div>
			</div>
	);
}

export default MyApp;
