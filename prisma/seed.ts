import { hashPassword } from "@/lib/auth/password";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const didem = await prisma.user.upsert({
    where: { email: "didem@prisma.io" },
    update: {},
    create: {
      email: "didem@prisma.io",
      name: "Didem",
      password: await hashPassword("mysoul")
    }
  });

  const reflection = await prisma.reflection.create({
    data: {
      title: "Untitled Reflection",
      initialContent: "",
      content: "",
      userId: didem.id
    }
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
