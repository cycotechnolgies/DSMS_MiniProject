import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {jwtDecode} from "jwt-decode"; // Import jwt-decode
import { useMediaQuery } from "react-responsive";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../images/logo.png";
import {
	CircleGauge,
	User,
	UserRoundCog,
	CircleDollarSign,
	ClipboardPlus,
	CalendarCheck2,
	BookOpenCheck,
	TicketX,
	MessageCircleQuestion,
} from "lucide-react";

const Sidebar = ({ open, setOpen }) => {
	let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
	const sidebarRef = useRef();
	const { pathname } = useLocation();
	const [userRole, setUserRole] = useState(""); // Store user role

	useEffect(() => {
		if (isTabletMid) {
			setOpen(false);
		} else {
			setOpen(true);
		}
	}, [isTabletMid, setOpen]);

	useEffect(() => {
		isTabletMid && setOpen(false);
	}, [pathname, isTabletMid, setOpen]);

	// Decode JWT and extract user role
	useEffect(() => {
		const token = localStorage.getItem("token"); // Get JWT token from local storage
		if (token) {
			try {
				const decodedToken = jwtDecode(token); 
				console.log(decodedToken);
				setUserRole(decodedToken.userType);
			} catch (error) {
				console.error("Invalid token:", error);
			}
		}
	}, []);

	console.log(userRole);

	const Nav_animation = isTabletMid
		? {
				open: { x: 0, width: "16rem", transition: { damping: 40 } },
				closed: { x: -250, width: 0, transition: { damping: 40, delay: 0.15 } },
		  }
		: {
				open: { width: "16rem", transition: { damping: 40 } },
				closed: { width: "4rem", transition: { damping: 40 } },
		  };

	return (
		<div>
			{/* Overlay for small screens */}
			<div
				onClick={() => setOpen(false)}
				className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
					open ? "block" : "hidden"
				}`}></div>

			{/* Sidebar */}
			<motion.div
				ref={sidebarRef}
				variants={Nav_animation}
				initial={{ x: isTabletMid ? -250 : 0 }}
				animate={open ? "open" : "closed"}
				className='bg-white text-gray shadow-xl z-[999] max-w-[16rem] w-[16rem] overflow-hidden md:relative fixed h-screen'>
				{/* Sidebar Header */}
				<div className='flex items-center gap-2.5 font-medium border-b py-3 border-slate-300 mx-3'>
					<img
						src={Logo}
						width={45}
						alt='Logo'
					/>
					<span className='text-xl whitespace-pre font-bold'>DSMS</span>
				</div>

				{/* Navigation Links */}
				<div className='flex flex-col h-full ml-4'>
					<ul className='whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1 font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100 space-y-4 md:h-[68%] h-[70%]'>
						{userRole === "staff" ? (
							<li>
								<NavLink
									to={"/dashboard"}
									className='flex gap-2'>
									<CircleGauge
										size={23}
										className='min-w-max'
									/>
									Dashboard
								</NavLink>
							</li>
						) : null}
						{userRole === "Student" ? (
							<li>
								<NavLink
									to={"/student-dashboard"}
									className='flex gap-2'>
									<CircleGauge
										size={23}
										className='min-w-max'
									/>
									Dashboard
								</NavLink>
							</li>
						) : null}
						{userRole === "admin" || userRole === "staff" ? (
							<li>
								<NavLink
									to={"/students"}
									className='flex gap-2'>
									<User
										size={23}
										className='min-w-max'
									/>
									Students
								</NavLink>
							</li>
						) : null}

						{/* Staff tab - Only accessible by Staff or Admin */}
						{userRole === "admin" || userRole === "staff" ? (
							<li>
								<NavLink
									to={"/staff"}
									className='flex gap-2'>
									<UserRoundCog
										size={23}
										className='min-w-max'
									/>
									Staff
								</NavLink>
							</li>
						) : null}
						{userRole === "Student" || userRole === "staff" ? (
							<li>
								<NavLink
									to={"/payments"}
									className='flex gap-2'>
									<CircleDollarSign
										size={23}
										className='min-w-max'
									/>
									Payments
								</NavLink>
							</li>
						) : null}

						{userRole === "Student" || userRole === "staff" ? (
							<li>
								<NavLink
									to={"/medicals"}
									className='flex gap-2'>
									<ClipboardPlus
										size={23}
										className='min-w-max'
									/>
									Medicals
								</NavLink>
							</li>
						) : null}
						{userRole === "admin" || userRole === "staff" ? (
							<li>
								<NavLink
									to={"/renew"}
									className='flex gap-2'>
									<TicketX
										size={23}
										className='min-w-max'
									/>
									Renewal
								</NavLink>
							</li>
						) : null}

						<li>
							<NavLink
								to={"/class"}
								className='flex gap-2'>
								<CalendarCheck2
									size={23}
									className='min-w-max'
								/>
								Training
							</NavLink>
						</li>

						{userRole === "Student" || userRole === "staff" ? (
							<li>
								<NavLink
									to={"/exams"}
									className='flex gap-2'>
									<BookOpenCheck
										size={23}
										className='min-w-max'
									/>
									Exams
								</NavLink>
							</li>
						) : null}

						{/* Quiz tab - Only accessible by Students */}
						{userRole === "Student" ? (
							<li>
								<NavLink
									to={"/quiz"}
									className='flex gap-2'>
									<MessageCircleQuestion
										size={23}
										className='min-w-max'
									/>
									Quiz
								</NavLink>
							</li>
						) : null}
					</ul>
				</div>
			</motion.div>
		</div>
	);
};

export default Sidebar;
