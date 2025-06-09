import { prisma } from "../../lib";

interface AdultHouseHoldParams {
  count: number;
  names?: string[];
}

type isGoToEventType = "1" | "0";

interface WeddingParams {
  isGoToEvent: isGoToEventType;
  phone: string;
  name: string;
  adultCount: number;
  childCount: number;
  adultHouseHold: AdultHouseHoldParams;
}

export async function respondToWeddingInvite(body: WeddingParams) {
  const validatephone = await prisma.person.findFirst({
    where: {
      phone: body.phone,
    },
  });

  if (validatephone) {
    return {
      message: "Este telefone já foi utilizado para responder ao formulário.",
      data: validatephone,
      status: 400,
    };
  }

  let person;
  try {
    person = await prisma.person.create({
      data: {
        name: body.name,
        phone: body.phone,
        isGoEvent: body.isGoToEvent === "1",
        countChildren: body.childCount,
      },
    });
  } catch (error) {
    return {
      message: `Não foi possivel criar o usuario: ${(error as Error).message}`,
      status: 500,
    };
  }

  if (body.adultHouseHold.count > 0 && body.adultHouseHold.names) {
    const allNamesCompanion = body.adultHouseHold.names.map((name: string) => ({
      name,
      personId: person.id,
    }));

    await prisma.companion.createMany({
      data: allNamesCompanion,
    });
  }

  return { message: "Obrigado por responder o formulario", status: 201 };
}
