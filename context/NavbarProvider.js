import { createContext, useState } from "react";

const NavbarContext = createContext();

export function NavbarProvider(props) {
	const [openNavbar, setOpenNavbar] = useState(true);
	const [openCategory, setOpenCategory] = useState(false);

	return (
		<NavbarContext.Provider value={{ openNavbar, setOpenNavbar, openCategory, setOpenCategory }}>
			{props.children}
		</NavbarContext.Provider>
	);
}

export default NavbarContext;
