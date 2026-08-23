import { NextResponse } from "next/server";
import { getPortfolioData, savePortfolioData } from "@/lib/portfolio-service";

export async function GET() {
  const data = getPortfolioData();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const success = savePortfolioData(body);
    if (!success) {
      return NextResponse.json(
        { error: "Failed to save portfolio data" },
        { status: 500 }
      );
    }
    return NextResponse.json({ success: true, data: getPortfolioData() });
  } catch (error) {
    console.error("API error updating portfolio data:", error);
    return NextResponse.json(
      { error: "Invalid payload or internal server error" },
      { status: 400 }
    );
  }
}
