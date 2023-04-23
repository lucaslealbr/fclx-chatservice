import { prisma } from "@/app/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "../helpers";
import { JWT } from "next-auth/jwt";

const postRequest = async (request: NextRequest, token: JWT) => {
  const body = await request.json();
  const chatCreated = await prisma.chat.create({
    data: {
      user_id: token.sub!,
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

const getRequest = async (_request: NextRequest, token: JWT) => {
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
    where: {
      user_id: token.sub
    },
    orderBy: {
      created_at: 'desc'
    }
  })

  return NextResponse.json(chats)
}

export const GET = withAuth(getRequest)
export const POST = withAuth(postRequest)