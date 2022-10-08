import React, { useContext, useMemo } from 'react';
import AppContext from '../context/AppContext';
import Paypal from '../components/Paypal';
import '../styles/components/Payment.css';
import { useNavigate } from 'react-router-dom';

const Payments = () => {
    const navigate = useNavigate();
    const {
        state: { cart, buyer },
        addNewOrder,
    } = useContext(AppContext);

    const handleTotal = useMemo(() => {
        const reducer = (accumulator, currentValue) =>
            accumulator + currentValue.price * currentValue.qty;
        const sum = cart.reduce(reducer, 0);
        return sum;
    }, [cart]);
    const handlePaymentSucces = (data) => {
        if(data.status === "COMPLETED") {
            const newOrder = {
                buyer: buyer,
                products: cart,
                payment: data
            };
            addNewOrder(newOrder);
            navigate('/checkout/success');
        }
    }
    return (
        <div className="Payment">
            <div className="Payment-content">
                <h3>Resumen del pedido:</h3>
                {cart.map((item) => (
                    <div className="Payment-item" key={item.id}>
                        <div className="Payment-element">
                            <h4>
                                {item.title} x{item.qty}
                            </h4>
                            <span>${item.price * item.qty}</span>
                        </div>
                    </div>
                ))}
                <div className="Payment-button">
                    <Paypal
                        totalAmount={handleTotal}
                        handlePaymentSucces={handlePaymentSucces}
                    />
                </div>
            </div>
            <div></div>
        </div>
    );
};

export default Payments;
