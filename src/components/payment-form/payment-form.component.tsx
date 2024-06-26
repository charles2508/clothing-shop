import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { PaymentButton } from "./payment-form.styles";
import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { PaymentFormContainer, FormContainer } from "./payment-form.styles";
import { RootState } from "../../store/store";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [ isProcessingPayment, setIsProcessingPayment ] = useState(false);
    const amount = useSelector((state: RootState) => selectCartTotal(state));
    const currentUser = useSelector((state: RootState) => selectCurrentUser(state));

    const paymentHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        setIsProcessingPayment(true);
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: amount * 100})
        }).then((res) => {
            console.log(res);
            return res.json();
        });
        console.log(response);
        
        const clientSecret = response.paymentIntent.client_secret;

        const cardDetails = elements.getElement(CardElement);
        if (cardDetails === null) return; 
        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardDetails,
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'Guest'
                }
            }
        });

        setIsProcessingPayment(false);
        if (paymentResult.error) {
            alert(paymentResult.error);
        } else {
            if (paymentResult.paymentIntent.status === 'succeeded') {
                alert('Payment successful');
            }
        }
    }

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement/>
                <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    )
}

export default PaymentForm;