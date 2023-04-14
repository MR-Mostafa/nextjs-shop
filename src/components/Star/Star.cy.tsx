import { Star } from './Star';

describe('Star Component', () => {
	it('should render rate text correctly', () => {
		cy.mount(<Star rate={3} />);

		cy.get('.Star-rate').contains('3');
	});

	it('should have the correct classes when passed rootClassName, rateClassName and iconClassName props', () => {
		cy.mount(<Star rate={2} rootClassName="my-root-class" rateClassName="my-rate-class" iconClassName="my-icon-class" />);

		cy.get('.Star-wrapper').should('have.class', 'my-root-class');
		cy.get('.Star-rate').should('have.class', 'my-rate-class');
		cy.get('.Star-icon').should('have.class', 'my-icon-class');
	});
});
