import { z } from "zod";

export const topupSchema = z.object({
  amount: z.coerce
    .number({ message: "Tolong masukan angka saja" })
    .gte(10000, { message: "Minimal jumlah top up adalah Rp 10.000" })
    .lte(1000000, { message: "Maksimal jumlah top up adalah Rp 1.000.000" }),
});

export type TopupSchema = z.infer<typeof topupSchema>;
