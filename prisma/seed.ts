import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const db = new PrismaClient();
async function main() {
  const hashedPassword = await bcrypt.hash("qweqweqwe1", 12);

  const tweets = [...Array(10).keys()].map((idx) => {
    return {
      tweet: `${idx} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    };
  });
  [...Array(10).keys()].map(async (idx) => {
    await db.user.upsert({
      where: {
        email: `test${idx}@test.com`,
      },
      update: {},
      create: {
        username: `test-user-${idx}`,
        email: `test${idx}@test.com`,
        password: hashedPassword,
        tweets: {
          create: [...tweets],
        },
      },
    });
  });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
