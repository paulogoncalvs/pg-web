export const stripHashes = (content = ""): string => {
  if (content === "") {
    return "";
  }

  return content.replace(
    /\/assets\/(img|js|styles|fonts)\/[\w-]*\.[\w-]{6,20}\.(js|css|svg|webp|webmanifest|woff2)/g,
    (match) => match.replace(/\.[\w-]{6,20}\./, "."),
  );
};

export const stripEmojis = (content = ""): string => {
  if (content === "") {
    return "";
  }

  return content.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
    "",
  );
};
