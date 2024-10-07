import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import Name from "@/lib/database/models/name.model";

export async function POST(req: Request) {
  await connectToDatabase();

  try {
    const { name, walletAddress } = await req.json();

    const customName = name;

    if (!customName || !walletAddress) {
      return NextResponse.json(
        { error: "Both customName and walletAddress are required" },
        { status: 400 }
      );
    }

    // const existingName = await Name.findOne({ customName });
    const existingName = await Name.findOne({
      customName: { $regex: new RegExp(`^${customName}$`, "i") }
    });
    if (existingName) {
        return NextResponse.json(
          { error: "Custom name already exists. Please choose a different name." },
          { status: 409 } 
        );
      }

    const newCustomName = await Name.create({ customName, walletAddress });

    return NextResponse.json(newCustomName, { status: 201 });

  } catch (error) {
    console.error("Error creating custom name:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
