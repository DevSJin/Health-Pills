import { client } from "./index";

export const deleteUserExercise = async (exerciseId) => {
  const data = {
    exerciseId,
    check: "N",
  };
  const result = await client
    .post("/exercise/doing", data)
    .then((response) => response);
  return result;
};
