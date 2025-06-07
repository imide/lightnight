import { Icon } from "@iconify-icon/react";
import { Link } from "@tanstack/react-router";
import { atom, useAtom } from "jotai";
import { ModeToggle } from "./theme-toggle";

const menuOpenAtom = atom(false);

export const Navbar = () => {
	const [menuOpen, setMenuOpen] = useAtom(menuOpenAtom)
	const onClick = () => setMenuOpen(!menuOpen)

	return (
		<div className="w-full z-[10000000] mb-4 md:mb-4 sticky top-4 md:top-8 flex justify-center">
			<div className="bg-background p-4 mx-4 lg:mx-12 md:p-3 lg:px-4 rounded-xl md:w-2/3 w-full lg:w-1/2 backdrop-blur-xl md:flex md:items-center md:justify-between">
				<div className="flex items-center justify-between">
					<Link to="/" className="flex cursor-pointer items-center">
						<span className="text-[22px] cursor-pointer antialiased font-bold text-foreground">
							light
						</span>
						<span className="text-[22px] cursor-pointer antialiased font-bold text-primary">
							knight
						</span>
					</Link>
					<button
						type="button"
						className="md:hidden text-[22px] text-foreground"
						onClick={onClick}
						>
							<Icon icon="ph:list"/>
						</button>
				</div>
				<ul
					className={`${
						menuOpen ? "flex" : "hidden"
					} md:flex flex-col md:flex-row gap-4 items-center mt-4 md:mt-0`}>
						<li>
							<a
								className="text-xl hover:text-foreground text-foreground"
								href="https://github.com/imide/lightknight"
								target="_blank"
								rel="noopener noreferrer"
								>
									<Icon icon="ph:github-logo-fill" />
							</a>
						</li>
						<li>
							<ModeToggle />
						</li>
					</ul>
				</div>
			</div>
	)}
