"use client";

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { hydrateAuth } from '@/store/slices/authSlice';
import { hydrateTheme } from '@/store/slices/themeSlice';

function StoreHydrator({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        store.dispatch(hydrateAuth());
        store.dispatch(hydrateTheme());
    }, []);

    return <>{children}</>;
}

export function ReduxProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <StoreHydrator>
                {children}
            </StoreHydrator>
        </Provider>
    );
}
