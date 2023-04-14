import { Button } from './Button';
import { AiFillCaretRight, AiFillCaretLeft } from 'react-icons/ai';

const buttonText = 'Click me!';

describe('Button Component', () => {
	it('renders with correct props', () => {
		cy.mount(<Button variant="primary">{buttonText}</Button>);

		cy.get('button')
			.should('have.class', 'btn')
			.and('have.class', 'btn-primary')
			.and('not.have.class', 'btn-disable')
			.and('not.have.class', 'btn-loading')
			.and('have.text', buttonText);
	});

	it('can be clicked', () => {
		cy.mount(
			<Button variant="primary" onClick={cy.spy().as('onClick')}>
				{buttonText}
			</Button>
		);

		cy.get('button')
			.click()
			.then(() => {
				cy.get('@onClick').should('have.been.called');
			});
	});

	it('shows spinner when isLoading prop is true', () => {
		cy.mount(
			<Button variant="primary" isLoading>
				{buttonText}
			</Button>
		);

		cy.get('button').should('have.class', 'btn-loading').find('svg').should('have.class', 'spinner');
	});

	it('disabled button cannot be clicked', () => {
		cy.mount(
			<Button variant="primary" disabled onClick={cy.spy().as('onClick')}>
				{buttonText}
			</Button>
		);

		cy.get('button').should('be.disabled');
	});

	it('Should show left icons', () => {
		cy.mount(
			<Button variant="primary" leftIcon={<AiFillCaretRight />}>
				{buttonText}
			</Button>
		);

		cy.get('.Button-icon--left').should('exist');
	});

	it('Should show right icons', () => {
		cy.mount(
			<Button variant="primary" rightIcon={<AiFillCaretLeft />}>
				{buttonText}
			</Button>
		);

		cy.get('.Button-icon--right').should('exist');
	});

	it('renders an anchor tag', () => {
		cy.mount(
			<Button as="a" href="https://google.com" variant="link">
				{buttonText}
			</Button>
		);

		cy.get('a').should('have.class', 'btn').and('have.class', 'btn-link').and('have.attr', 'href', 'https://google.com');
	});

	it('should have rounded class when rounded prop is passed', () => {
		cy.mount(
			<Button rounded="rounded-full" variant="primary">
				Click me
			</Button>
		);

		cy.get('button').should('have.class', 'rounded-full');
	});
});
