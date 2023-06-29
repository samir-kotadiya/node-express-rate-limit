import joi from 'joi';

export const employeeSchema = joi.object({
  id: joi.string().optional(),
  name: joi.string().required(),
  email: joi.string()
    .email({
      tlds: {
        allow: false
      }
    }).required(),
  departmentId: joi.string().required()
});