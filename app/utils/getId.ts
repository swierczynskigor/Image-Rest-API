export const getId = (url: string) => {
  const slicedUrl = url.split("/");
  return Number(slicedUrl[slicedUrl.length - 1]);
};
