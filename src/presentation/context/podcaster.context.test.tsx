import { PodcasterProvider, usePodcasterContext } from '@presentation/context';
import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';

describe('usePodcasterContext', () => {
	it('should have initial state', () => {
		const wrapper = ({ children }: { children: ReactNode }) => <PodcasterProvider>{children}</PodcasterProvider>;
		const { result } = renderHook(() => usePodcasterContext(), { wrapper });

		expect(result.current.isLoading).toBe(false);

		act(() => {
			result.current.setLoading(true);
		});

		expect(result.current.isLoading).toBe(true);
	});
});
