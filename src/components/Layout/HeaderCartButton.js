import { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';

const HeaderCartButton = props => {
	const [highlighedBtn, setHightlighedBtn] = useState(false);
	const cartCtx = useContext(CartContext);

	const { items } = cartCtx;

	const numberCartItems = items.reduce((current, item) => {
		return current + item.amount;
	}, 0);

	const btnClasses = `${classes.button} ${highlighedBtn ? classes.bump : ''}`;

	useEffect(() => {
		if (items.length === 0) {
			return;
		}
		setHightlighedBtn(true);

		const timer = setTimeout(() => {
			setHightlighedBtn(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [items]);

	return (
		<button className={btnClasses} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{numberCartItems}</span>
		</button>
	);
};
export default HeaderCartButton;
