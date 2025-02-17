import { PrismaClient } from "@prisma/client";

const saveInstructions = async (name: string, instruction: string) => {
  const prisma = new PrismaClient();

  try {
    return await prisma.instruction.create({ data: { name, instruction } });
  } catch (error) {
    console.error("Error saving instructions: ", error);
    return null;
  }
};

export default defineEventHandler(async (event) => {
  const { name, instruction } = await readBody(event);
  if (!name || !instruction) {
    return;
  }
  const result = await saveInstructions(name, instruction);
  return result;
});
