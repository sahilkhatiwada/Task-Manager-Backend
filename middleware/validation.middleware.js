export const validateRequestBody =
  (validationSchema) => async (req, res, next) => {
    try {
      req.body = await validationSchema.validate(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
