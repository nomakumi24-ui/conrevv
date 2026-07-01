import "dotenv/config";
import { prisma } from "../lib/prisma";

async function main() {
  await prisma.product.create({
    data: {
      name: "炙り焼き牛カルビ弁当",
      store: "セブン-イレブン",
      category: "弁当",
      description: "人気の牛カルビ弁当",
      price: 648,
      active: true,
      aliases: {
        create: [
          { keyword: "カルビ弁当" },
          { keyword: "炙りカルビ弁当" },
          { keyword: "牛カルビ弁当" },
        ],
      },
    },
  });

  console.log("商品登録完了！");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });