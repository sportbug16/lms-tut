const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Software Dev" },
        { name: "DSA" },
        { name: "Fitness" },
        { name: "Photography" },
        { name: "Accounting" },
        { name: "Communication" },
        { name: "Filming" },
      ],
    });
    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();