import { prisma } from "@/app/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const chatCreated = await prisma.chat.create({
    data: {
      messages: {
        create: {
          content: body.message
        }
      }
    },
    select: {
      id: true,
      messages: true
    }
  })

  return NextResponse.json(chatCreated)
}

export async function GET(request: NextRequest) {
  const chats = await prisma.chat.findMany({
    select: {
      id: true,
      messages: {
        orderBy: {
          created_at: "asc"
        },
        take: 1
      }
    },
    orderBy: {
      created_at: 'desc'
    }
  })

  return NextResponse.json(chats)
}