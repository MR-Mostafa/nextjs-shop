import { TextField } from './TextField';
import { AiFillCaretRight, AiFillCaretLeft } from 'react-icons/ai';

describe('TextField Component', () => {
	it('should render label text correctly', () => {
		cy.mount(<TextField label="First name" />);

		cy.get('.TextField-label').contains('First name');
	});

	it('should have the correct classes when passed rootClassName, inputClassName and labelClassName props', () => {
		cy.mount(<TextField label="Last name" rootClassName="my-root-class" inputClassName="my-input-class" labelClassName="my-label-class" />);

		cy.get('.TextField-wrapper').should('have.class', 'my-root-class');
		cy.get('.TextField-input').should('have.class', 'my-input-class');
		cy.get('.TextField-label').should('have.class', 'my-label-class');
	});

	it('should apply TextField-error class when hasError is true', () => {
		cy.mount(<TextField label="Email" hasError />);

		cy.get('.TextField-wrapper').should('have.class', 'TextField-error');
	});

	it('should render with defaultValue', () => {
		const defaultValue = 'Hello World!';
		cy.mount(<TextField defaultValue={defaultValue} />);
		cy.get('.TextField-input').should('have.value', defaultValue);
	});

	it('Should show left icons', () => {
		cy.mount(<TextField leftIcon={<AiFillCaretRight />} />);

		cy.get('.TextField-input--left-icon').should('exist');
	});

	it('Should show right icons', () => {
		cy.mount(<TextField rightIcon={<AiFillCaretLeft />} />);

		cy.get('.TextField-input--right-icon').should('exist');
	});

	it('should render with a password input type', () => {
		const label = 'Password';
		const defaultValue = 'mysecretpassword';
		cy.mount(<TextField label={label} defaultValue={defaultValue} type="password" />);
		cy.get('.TextField-input').should('have.attr', 'type', 'password');
	});
});
