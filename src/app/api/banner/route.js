// banner.js
import { connectionSrt } from "@/lib/db";
import { Product } from "@/lib/model/product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    mongoose.connect(connectionSrt);
    const data = await Product.find();
    return NextResponse.json({ result: data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
    const payload=await request.json()
    await mongoose.connect(connectionSrt)
    let product=new Product(payload)
    const result=await product.save()
    return NextResponse.json({result,success:true}) 
    
}
