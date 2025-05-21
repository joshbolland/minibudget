import { NextResponse } from 'next/server';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
    DynamoDBDocumentClient,
    UpdateCommand,
    DeleteCommand,
} from '@aws-sdk/lib-dynamodb';

import { NextRequest } from 'next/server';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.BUDGET_CATEGORIES_TABLE || 'BudgetCategories';

export async function PATCH(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
        return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
    }
    try {
        const body = await req.json();
        const command = new UpdateCommand({
            TableName: TABLE_NAME,
            Key: { id },
            UpdateExpression: 'set #name = :name, budget = :budget',
            ExpressionAttributeNames: { '#name': 'name' },
            ExpressionAttributeValues: {
                ':name': body.name,
                ':budget': body.budget,
            },
            ReturnValues: 'ALL_NEW',
        });
        const response = await docClient.send(command);
        return NextResponse.json(response.Attributes);
    } catch (error) {
        console.error('Error updating category:', error);
        return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
    }
}
export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
        return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
    }

    try {
        const command = new DeleteCommand({
            TableName: TABLE_NAME,
            Key: { id },
        });
        await docClient.send(command);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting category:', error);
        return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
    }
}
