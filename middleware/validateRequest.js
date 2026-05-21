export function validateBody(requiredFields) {
  return (req, res, next) => {
    const missing = requiredFields.filter((field) => req.body[field] == null || req.body[field] === "");
    if (missing.length > 0) {
      return res.status(400).json({ error: `${missing.join(", ")} is required` });
    }
    next();
  };
}

export const validatePost = validateBody(["title"]);
export const validateJob = validateBody(["title", "company", "location"]);
