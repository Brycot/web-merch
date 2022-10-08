import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';

import AppContext from '../context/AppContext';
import '../styles/components/Header.css';

import { HiShoppingCart } from 'react-icons/hi';

function Header() {
    const {
        state: { cart },
    } = useContext(AppContext);

    const reducer = (acumulador, currentValue) => acumulador + currentValue.qty;
    const totalQty = cart.reduce(reducer, 0);

    return (
        <div className="Header">
            <Link to="/">
                <h1 className="Header-title">PlatziConf Merch</h1>
            </Link>
            <div className="Header-checkout">
                <Link to="/checkout">
                    <HiShoppingCart title="Checkout" />
                </Link>
            </div>
            {totalQty > 0 && <div className="Header-alert">{totalQty}</div>}
        </div>
    );
}

export default Header;
