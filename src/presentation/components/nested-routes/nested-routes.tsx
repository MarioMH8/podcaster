import type { FC, ReactNode } from 'react';
import { Router, useLocation, useRouter } from 'wouter';

interface NestedRouteProps {
	base: string;
	children: ReactNode;
}

const NestedRoutes: FC<NestedRouteProps> = properties => {
	const router = useRouter();
	const [parentLocation] = useLocation();

	const nestedBase = `${router.base}${properties.base}`;

	// don't render anything outside of the scope
	if (!parentLocation.startsWith(nestedBase)) {
		return;
	}

	return (
		<Router
			base={nestedBase}
			key={nestedBase}>
			{properties.children}
		</Router>
	);
};

NestedRoutes.displayName = 'Card';

export default NestedRoutes;
