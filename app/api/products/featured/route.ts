import Product from "@/models/product.model";
import dbConnect from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.aggregate([{ $sample: { size: 6 } }]);
    return NextResponse.json(products, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
