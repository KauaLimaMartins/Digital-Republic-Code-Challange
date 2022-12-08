import * as Yup from "yup";

export const authValidator = Yup.object({
  body: Yup.object({
    full_name: Yup.string().required("full name is required"),
    cpf: Yup.string()
      .required("cpf is required")
      .trim()
      .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "invalid cpf format"),
  }),
});
