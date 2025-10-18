import { descriptionParser } from '@presentation/utils';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('descriptionParser', () => {
	it('returns empty string when description is undefined', () => {
		const result = descriptionParser('1');
		expect(result).toBe('');
	});

	it('returns empty string when description is an empty string', () => {
		const result = descriptionParser('1', '');
		expect(result).toBe('');
	});

	it('splits description into paragraphs for each line', () => {
		const description = 'Line 1\nLine 2\nLine 3';
		const { container } = render(descriptionParser('1', description));
		const paragraphs = container.querySelectorAll('p');
		expect(paragraphs).toHaveLength(3);
		expect(paragraphs[0].textContent).toBe('Line 1');
		expect(paragraphs[1].textContent).toBe('Line 2');
		expect(paragraphs[2].textContent).toBe('Line 3');
	});

	it('handles single-line descriptions correctly', () => {
		const description = 'Single line description';
		const { container } = render(descriptionParser('1', description));
		const paragraphs = container.querySelectorAll('p');
		expect(paragraphs).toHaveLength(1);
		expect(paragraphs[0].textContent).toBe('Single line description');
	});
});
