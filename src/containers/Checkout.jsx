import React, { useContext, useMemo } from 'react';
import AppContext from '../context/AppContext';
import { Link } from 'react-router-dom';
import { HiTrash } from 'react-icons/hi';
import '../styles/components/Checkout.css';

const Checkout = () => {
    const {
        state: { cart },
        removeFromCart,
    } = useContext(AppContext);

    const handleRemove = (product) => {
        removeFromCart(product);
    };

    const handleTotal = useMemo(() => {
        const reducer = (accumulator, currentValue) =>
            accumulator + currentValue.price * currentValue.qty;
        const sum = cart.reduce(reducer, 0);
        return sum;
    }, [cart]);

    return (
        <div className="Checkout">
            <div className="Checkout-content">
                <h3>Lista de Pedidos:</h3>

                {cart.map((item) => (
                    <div key={item.id} className="Checkout-item">
                        <div className="Checkout-element">
                            <h4>{item.title}</h4>
                            <span>Cant. {item.qty}</span>
                            <span>${item.price}</span>
                            <span>Total: $ {item.price * item.qty}</span>
                        </div>
                        <button
                            type="button"
                            onClick={() => handleRemove(item)}
                        >
                            <HiTrash title="Eliminar" />
                        </button>
                    </div>
                ))}
            </div>
            <div className="Checkout-sidebar">
                <h3>Precio Total: ${handleTotal}</h3>
                <button type="button">
                    <Link to="/checkout/information">Continuar pedido</Link>
                </button>
            </div>
        </div>
    );
};

export default Checkout;
