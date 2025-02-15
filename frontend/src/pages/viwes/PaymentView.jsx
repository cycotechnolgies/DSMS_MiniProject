import React  from "react";
import { useParams } from "react-router-dom";
import PaymentInvoice from "../../components/PaymentInvoice";

const PaymentView = () => {
	const { id } = useParams();
	return (
		<>
		<PaymentInvoice payId={id} />
		</>
	);
};

export default PaymentView;
