/**
 * External dependencies
 */
import { render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';

/**
 * Internal dependencies
 */
import { BackUpSite } from '../';

test('back up site migration step', async () => {
	const props = {
		goToNext: jest.fn(),
		isStepActive: true,
		isStepComplete: false,
		stepIndex: 1,
	};
	const { getByLabelText, getByText } = render(<BackUpSite {...props} />);

	getByText(/back up your site/);
	getByText(props.stepIndex.toString());

	// Because the 'confirm' checkbox isn't checked, the 'next' button should be disabled.
	await waitFor(() => user.click(getByText('Next Step')));
	expect(props.goToNext).not.toHaveBeenCalled();

	// Now that the 'confirm' checkbox is checked, the 'next' button should work.
	await waitFor(() =>
		user.click(getByLabelText('I have backed up my site.'))
	);
	await waitFor(() => user.click(getByText('Next Step')));
	expect(props.goToNext).toHaveBeenCalled();
});
