export const getProducts = async () => {
  const response = await fetch(process.env.API_URL, {
    method: "GET",
    headers: {
      "x-api-key": process.env.API_KEY,
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const getProduct = async (id) => {
  const response = await fetch(`${process.env.API_URL}/${id}`, {
    method: "GET",
    headers: {
      "x-api-key": process.env.API_KEY,
      "Content-Type": "application/json",
    },
  });

  return response;
};
