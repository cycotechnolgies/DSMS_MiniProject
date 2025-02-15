import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	PDFDownloadLink,
	Document,
	Page,
	Text,
	View,
	StyleSheet,
	Image,
} from "@react-pdf/renderer";
import logo from "../images/logo.png"; // Ensure the correct path to the logo

const PaymentInvoice = ({ payId }) => {
	const [payment, setPayment] = useState(null);
	const [slip, setSlip] = useState("N/A");

	// Fetch payment data when component mounts or payId changes
	useEffect(() => {
		axios
			.get(`http://localhost:4000/api/pay/get-pay/${payId}`)
			.then((response) => setPayment(response.data))
			.catch((error) => console.error("Error fetching payment data:", error));
	}, [payId]);

	// Update slip state when payment data is received
	useEffect(() => {
		if (payment?.slip) {
			setSlip(
				payment.slip.trim() ? `http://localhost:4000${payment.slip}` : "N/A",
			);
		}
	}, [payment]);

	if (!payment) {
		return <p>Loading payment details...</p>;
	}

	// PDF styles
	const styles = StyleSheet.create({
		page: {
			flexDirection: "column",
			padding: 30,
			fontSize: 12,
			backgroundColor: "#f8f8f8",
		},
		header: {
			textAlign: "center",
			marginBottom: 30,
		},
		companyLogo: {
			width: 120,
			height: "auto",
		},
		title: {
			fontSize: 24,
			fontWeight: "bold",
			marginTop: 10,
		},
		section: {
			marginBottom: 10,
			marginVertical: 10,
		},
		text: {
			marginBottom: 5,
			fontSize: 12,
		},
		label: {
			fontWeight: "bold",
			fontSize: 12,
			marginBottom: 10,
		},
		footer: {
			textAlign: "center",
			marginTop: 20,
			fontSize: 10,
			color: "gray",
		},
	});

	// PDF Document Component
	const MyDocument = () => (
		<Document>
			<Page style={styles.page}>
				<View style={styles.header}>
					<Image
						src={logo}
						style={styles.companyLogo}
					/>
					<Text style={styles.title}>Invoice</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.label}>Payment ID: {payment.payId}</Text>

					<Text style={styles.label}>User ID: {payment.userId}</Text>

					<Text style={styles.label}>Branch: {payment.branch}</Text>

					<Text style={styles.label}>Amount: {payment.amount} LKR</Text>

					<Text style={styles.label}>Reason: {payment.reason}</Text>

					<Text style={styles.label}>Status: {payment.status}</Text>

					<Text style={styles.label}>
						Description: {payment.description || "N/A"}
					</Text>

					<Text style={styles.label}>
						Created At: {new Date(payment.createdAt).toLocaleDateString()}
					</Text>
				</View>

				<View style={styles.footer}>
					<Text>Thank you for your business!</Text>
					<Text>Generated by DSMS Online</Text>
				</View>
			</Page>
		</Document>
	);

	return (
		<div className='p-6'>
			<h1 className='text-2xl font-bold mb-4'>Invoice Details</h1>

			<div className='p-4 border border-gray-300 rounded-lg shadow-lg'>
				<div className='flex md:flex-row flex-col justify-between items-center mb-6'>
					<img
						src={logo}
						alt='Company Logo'
						className='w-32 h-auto'
					/>
					<div className='text-center md:text-right'>
						<h2 className='text-xl font-bold'>Invoice</h2>
						<p className='text-sm text-gray-500'>
							Issued Date: {new Date(payment.createdAt).toLocaleDateString()}
						</p>
					</div>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 md:gap-4 mb-6'>
					<div className='space-y-2'>
						<p>
							<strong>Payment ID:</strong> {payment.payId}
						</p>
						<p>
							<strong>User ID:</strong> {payment.userId}
						</p>
						<p>
							<strong>Branch:</strong> {payment.branch}
						</p>
					</div>
					<div className='mt-2 md:mt-0 space-y-2'>
						<p>
							<strong>Amount:</strong> {payment.amount} LKR
						</p>
						<p>
							<strong>Reason:</strong> {payment.reason}
						</p>
						<p>
							<strong>Status:</strong> {payment.status}
						</p>
					</div>
				</div>

				<div className='mb-6 space-y-2'>
					<p>
						<strong>Description:</strong> {payment.description || "N/A"}
					</p>
					<div>
						<strong>Slip:</strong>
						{payment.slip ? (
							<a
								href={slip}
								target='_blank'
								rel='noopener noreferrer'>
								<img
									src={slip}
									alt='Payment Slip'
									className='w-48 h-auto border rounded-md cursor-pointer hover:opacity-80'
								/>
							</a>
						) : (
							<p>N/A</p>
						)}
					</div>
				</div>

				<div className='mt-10 text-center text-sm text-gray-500'>
					<p>Thank you for your Payment!</p>
					<p>Generated by DSMS</p>
				</div>
			</div>

			{/* Button for PDF Download */}
			<div className='mt-6'>
				<PDFDownloadLink
					document={<MyDocument />}
					fileName={`invoice-${payment.payId}.pdf`}>
					{({ loading }) => (
						<button
							className='bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700'
							disabled={loading}>
							{loading ? "Preparing PDF..." : "Download as PDF"}
						</button>
					)}
				</PDFDownloadLink>
			</div>
		</div>
	);
};

export default PaymentInvoice;
