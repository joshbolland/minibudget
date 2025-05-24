import { QueryClient } from '@tanstack/react-query';

export function createQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                retry: process.env.NODE_ENV === 'test' ? false : 3, // disable retry in tests
            },
        },
    });
}