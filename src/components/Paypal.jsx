import React, { useEffect } from 'react';
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
const currency = 'USD';
const style = { layout: 'vertical' };

const ButtonWrapper = ({
    currency,
    showSpinner,
    total,
    handlePaymentSucces,
}) => {
    const amount = total;
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);

    return (
        <>
            {showSpinner && isPending && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(function (details) {
                        console.log(details.payer.name.given_name);
                        // Your code here after capture the order
                        handlePaymentSucces(details);
                    });
                }}
            />
        </>
    );
};

export default function Paypal({ totalAmount, handlePaymentSucces }) {
    return (
        <div style={{ maxWidth: '750px', minHeight: '200px' }}>
            <PayPalScriptProvider
                options={{
                    'client-id':
                        'AZwjViKWUJV1tjoDRAaKCWQgtP9Dx3nFEU3u4jH99T9jywM_Djo1GwU7WC_KezHAIu4Nez4toHa3KrzA',
                    components: 'buttons',
                    currency: 'USD',
                }}
            >
                <ButtonWrapper
                    currency={currency}
                    showSpinner={false}
                    total={totalAmount}
                    handlePaymentSucces={handlePaymentSucces}
                />
            </PayPalScriptProvider>
        </div>
    );
}
