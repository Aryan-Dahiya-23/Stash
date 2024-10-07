import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import Name from "@/lib/database/models/name.model";

export async function GET(request: Request) {   
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const customName = searchParams.get('customName');

    if (!customName) {
        return NextResponse.json({ error: "walletAddress is required" }, { status: 400 });
    }

    try {
        const wallet = await Name.findOne({ customName });

        if (!wallet) {
            return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
        }

        return NextResponse.json(wallet);
    } catch (error) {
        console.error("Error fetching wallet:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
