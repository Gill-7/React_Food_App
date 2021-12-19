import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isNotFive = value => value.trim().length !== 6;

const Checkout = props => {
	const [formInputsValidity, setFormInputsValidity] = useState({
		name: true,
		street: true,
		city: true,
		postal: true,
	});

	const nameRef = useRef();
	const streetRef = useRef();
	const postalRef = useRef();
	const cityRef = useRef();

	const confirmHandler = event => {
		event.preventDefault();

		const enteredName = nameRef.current.value;
		const enteredStreet = streetRef.current.value;
		const enteredPostal = postalRef.current.value;
		const enteredCity = cityRef.current.value;

		const enteredNameIsValid = !isEmpty(enteredName);
		const enteredStreetIsValid = !isEmpty(enteredStreet);
		const enteredCityIsValid = !isEmpty(enteredCity);
		const enteredPostalIsValid = !isNotFive(enteredPostal);

		setFormInputsValidity({
			name: enteredCityIsValid,
			street: enteredStreetIsValid,
			city: enteredCityIsValid,
			postal: enteredPostalIsValid,
		});

		const formIsValid =
			enteredNameIsValid &&
			enteredStreetIsValid &&
			enteredCityIsValid &&
			enteredPostalIsValid;

		if (!formIsValid) {
			return;
		}
	};

	const nameControlClasses = `${classes.control} ${
		formInputsValidity.name ? '' : classes.invalid
	}`;
	const streetControlClasses = `${classes.control} ${
		formInputsValidity.street ? '' : classes.invalid
	}`;
	const postalControlClasses = `${classes.control} ${
		formInputsValidity.postal ? '' : classes.invalid
	}`;
	const cityControlClasses = `${classes.control} ${
		formInputsValidity.city ? '' : classes.invalid
	}`;

	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div className={nameControlClasses}>
				<label htmlFor="name">Your Name</label>
				<input type="text" id="name" ref={nameRef} />
				{!formInputsValidity.name && <h4>Please enter a valid name</h4>}
			</div>
			<div className={streetControlClasses}>
				<label htmlFor="street">Street</label>
				<input type="text" id="street" ref={streetRef} />
				{!formInputsValidity.street && <h4>Please enter a valid street</h4>}
			</div>
			<div className={postalControlClasses}>
				<label htmlFor="postal">Postal Code</label>
				<input type="text" id="postal" ref={postalRef} />
				{!formInputsValidity.postal && (
					<h4>Please enter a valid postal code</h4>
				)}
			</div>
			<div className={cityControlClasses}>
				<label htmlFor="city">City</label>
				<input type="text" id="city" ref={cityRef} />
				{!formInputsValidity.city && <h4>Please enter a valid city</h4>}
			</div>
			<div className={classes.actions}>
				<button type="button" onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
