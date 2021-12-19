import React, { useState, useContext } from 'react';
import CartContext from '../../store/cart-context';
import classes from './Cart.module.css';
import Modal from '../UI/Card/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = props => {
	const [checkoutForm, setCheckoutForm] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);
	const cartCtx = useContext(CartContext);
	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;

	const cartItemRemoveHandler = id => {
		cartCtx.removeItem(id);
	};

	const cartItemAddHandler = item => {
		cartCtx.addItem({ ...item, amount: 1 });
	};

	const submitOrderHandler = async userData => {
		setIsSubmitting(true);
		await fetch('https://httpsreact-default-rtdb.firebaseio.com/orders.json', {
			method: 'POST',
			body: JSON.stringify({
				user: userData,
				orderItems: cartCtx.items,
			}),
		});
		setIsSubmitting(false);
		setDidSubmit(true);
		cartCtx.clearCart();
	};

	const cartItems = (
		<ul className={classes['cart-items']}>
			{cartCtx.items.map(item => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
					onAdd={cartItemAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	const showCheckoutForm = () => {
		setCheckoutForm(true);
	};

	const showButton = (
		<div className={classes.actions}>
			<button onClick={props.onHideCart} className={classes['button--alt']}>
				Close
			</button>
			{hasItems && (
				<button className={classes.button} onClick={showCheckoutForm}>
					Order
				</button>
			)}
		</div>
	);

	const cartModalContent = (
		<React.Fragment>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{checkoutForm && (
				<Checkout onCancel={props.onHideCart} onConfirm={submitOrderHandler} />
			)}
			{!checkoutForm && showButton}
		</React.Fragment>
	);

	const isSubmittingModalContent = <h3>Sending order data...</h3>;

	const didSubmitModalContent = (
		<React.Fragment>
			<h3>Successfully sent the order!</h3>
			<div className={classes.actions}>
				<button className={classes.button} onClick={props.onHideCart}>
					Close
				</button>
			</div>
		</React.Fragment>
	);

	return (
		<Modal onHide={props.onHideCart}>
			{!isSubmitting && !didSubmit && cartModalContent}
			{isSubmitting && isSubmittingModalContent}
			{!isSubmitting && didSubmit && didSubmitModalContent}
		</Modal>
	);
};

export default Cart;
