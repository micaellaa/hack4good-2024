"use client";
import { Providers } from "./providers";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "../components/main/NavBar";
import Footer from "../components/main/Footer";
import { AuthContextProvider, UserAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };
// Exclude NavBar from the login page

export default function RootLayout({ children }) {
	const router = useRouter();
	const [showNavBar, setShowNavBar] = useState(false);
	const pathname = usePathname();
	const noNavBarPaths = [
		"/account/login",
		"/account/signup/admin",
		"/account/signup/volunteer",
	];
	useEffect(() => {
		setShowNavBar(!noNavBarPaths.includes(pathname));
	}, [pathname]);

	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<AuthContextProvider>
						{showNavBar && <NavBar />}
						<div className="main-body">{children}</div>
						{showNavBar && <Footer />}
					</AuthContextProvider>
				</Providers>
			</body>
		</html>
	);
}
