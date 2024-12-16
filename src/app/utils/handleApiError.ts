import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

export const handleApiError = (error: unknown) => {
  // Erros do Prisma
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002": // Violação de unicidade
        return NextResponse.json(
          {
            success: false,
            erro: "Já existe um registro com este valor único",
            details: error.meta,
          },
          { status: 409 }
        );
      case "P2025": // Registro não encontrado
        return NextResponse.json(
          {
            success: false,
            erro: "O registro solicitado não foi encontrado",
            details: error.meta,
          },
          { status: 404 }
        );
      default:
        return NextResponse.json(
          {
            success: false,
            erro: "Erro de conexão com o banco de dados",
            details: error.message,
          },
          { status: 500 }
        );
    }
  }

  // Erros de validação do Zod
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        success: false,
        erro: "Erro de validação dos dados",
        details: error.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      },
      { status: 400 }
    );
  }

  // Outros erros genéricos
  return NextResponse.json(
    {
      success: false,
      erro: "Erro desconhecido",
      details: error instanceof Error ? error.message : error,
    },
    { status: 500 }
  );
};
