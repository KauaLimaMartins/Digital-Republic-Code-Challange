import * as Yup from "yup";

export const depositMoneyValidator = Yup.object({
  body: Yup.object({
    depositValue: Yup.number()
      .required("deposit value required")
      .min(1, "Min deposit value is R$ 1,00")
      .max(2000, "Max deposit value is R$ 2.000,00"),
  }),
});

export const transferMoneyValidator = Yup.object({
  body: Yup.object({
    cpfToTransfer: Yup.string()
      .required("cpf to transfer is required")
      .trim()
      .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "invalid cpf format"),
    transferValue: Yup.number()
      .required("transfer value required")
      .min(1, "min deposit value is R$ 1,00"),
  }),
});
