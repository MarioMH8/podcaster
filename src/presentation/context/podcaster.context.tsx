import type { FC, ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

interface PodcasterState {
	isLoading: boolean;
	setLoading: (isLoading: boolean) => void;
}

interface PodcasterProviderProperties {
	children: ReactNode;
}

const PodcasterContext = createContext<PodcasterState>({} as PodcasterState);
const usePodcasterContext = (): PodcasterState => useContext(PodcasterContext);

const PodcasterProvider: FC<PodcasterProviderProperties> = ({ children }) => {
	const [isLoading, setLoading] = useState<boolean>(false);

	return (
		<PodcasterContext.Provider
			value={{
				isLoading,
				setLoading,
			}}>
			{children}
		</PodcasterContext.Provider>
	);
};

export { PodcasterProvider, usePodcasterContext };
