import { NextResponse } from "next/server"

import { cookies } from "next/headers";

export async function POST(){
    try{
        const cookieStore = await cookies()

        cookieStore.delete("auth-token")

        return NextResponse.json({message: "Logged Out Successfully"}, {status: 200})
    }catch (error){
        console.error("Logout error", error)
        return NextResponse.json({error: "Failed To logout"}, {status: 500})
    }
}