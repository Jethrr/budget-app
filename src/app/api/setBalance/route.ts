import { prisma } from "@/lib/prisma"; // Assuming prisma client is set up correctly
import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { userId, initialBalance }: { userId: string; initialBalance: number } = await req.json();

//     // Check if user exists
//     const existingUser = await prisma.user.findUnique({
//       where: { id: userId },
//     });

//     // If user does not exist
//     if (!existingUser) {
//       return NextResponse.json(
//         { error: "User not found" },
//         { status: 404 }
//       );
//     }

//     // If user already has a balance set, return error
//     if (existingUser.currentBalance !== 0) {
//       return NextResponse.json(
//         { error: "Balance already set" },
//         { status: 400 }
//       );
//     }

//     // Set the initial balance for the user
//     const updatedUser = await prisma.user.update({
//       where: { id: userId },
//       data: { currentBalance: initialBalance },
//     });

//     // Return success response
//     return NextResponse.json(updatedUser, { status: 200 });
//   } catch (error) {
//     console.error("Error setting balance:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// This handles the POST request
export async function POST(req: Request) {
  try {
    const { userId, initialBalance } = await req.json();

    // Perform your logic to update balance (e.g., updating the database)
    // For example, let's assume you have some Prisma logic to update the user balance.

    // Assuming you have a Prisma model like:
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { currentBalance: initialBalance },
    });

    // Return a success response
    return NextResponse.json(
      { user: userId, message: "Balance updated successfully" },

      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating balance:", error);
    return NextResponse.json(
      { message: "Error updating balance" },
      { status: 500 }
    );
  }
}
