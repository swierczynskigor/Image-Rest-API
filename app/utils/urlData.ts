export const getId = (url: string) => {
  const slicedUrl = url.split("/");
  return Number(slicedUrl[slicedUrl.length - 1]);
};

export const getDataFromUrl = (url: string) => {
  const slicedUrl = url.split("/");
  return slicedUrl[slicedUrl.length - 1];
};
