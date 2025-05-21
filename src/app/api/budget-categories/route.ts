import { NextResponse } from 'next/server';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
    DynamoDBDocumentClient,
    ScanCommand,
    PutCommand,
} from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';

const client = new DynamoDBClient({
    region: process.env.AWS_REGION || 'eu-west-2',
});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.BUDGET_CATEGORIES_TABLE || 'BudgetCategories';

export async function GET() {
    try {
        const command = new ScanCommand({
            TableName: TABLE_NAME,
        });
        const response = await docClient.send(command);
        return NextResponse.json(response.Items || []);
    } catch (error) {
        console.error('Error updating category:', error);
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const id = uuidv4();
        const newItem = {
            id,
            name: body.name,
            budget: body.budget,
        };
        const command = new PutCommand({
            TableName: TABLE_NAME,
            Item: newItem,
        });
        await docClient.send(command);
        return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
        console.error('Error updating category:', error);
        return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
    }
}
