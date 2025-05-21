import { NextResponse } from 'next/server'

export async function GET() {
    try {
        // TODO: Replace with real API call to GoCardless or other bank data source
        const dummyTransactions = [
            { id: '1', date: '15 May 2025', category: 'Groceries', description: 'Tesco', amount: -32.50 },
            { id: '2', date: '14 May 2025', category: 'Transport', description: 'TFL', amount: -2.90 },
            { id: '3', date: '14 May 2025', category: 'Eating Out', description: 'Pret', amount: -8.25 },
            { id: '4', date: '13 May 2025', category: 'Utilities', description: 'Octopus Energy', amount: -45.00 },
            { id: '5', date: '13 May 2025', category: 'Entertainment', description: 'Spotify', amount: -9.99 },
            { id: '6', date: '12 May 2025', category: 'Groceries', description: 'Sainsbury’s', amount: -25.40 },
            { id: '7', date: '11 May 2025', category: 'Transport', description: 'Uber', amount: -18.60 },
            { id: '8', date: '10 May 2025', category: 'Eating Out', description: 'Domino’s Pizza', amount: -15.75 },
            { id: '9', date: '09 May 2025', category: 'Utilities', description: 'Thames Water', amount: -23.10 },
            { id: '10', date: '08 May 2025', category: 'Entertainment', description: 'Netflix', amount: -10.99 },
        ];


        return NextResponse.json(dummyTransactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return new NextResponse('Failed to fetch transactions', { status: 500 });
    }
}