export const stripHashes = (content = ''): string => {
    if (content === '') {
        return '';
    }

    return content.replace(
        /([\dA-Za-z-]*)(\.[\dA-Za-z]*)?\.([\dA-Za-z]{20})(\.(js|css|svg|jpg|jpeg|png|ico|webmanifest))/gm,
        '$1$2$4',
    );
};

export const stripEmojis = (content = ''): string => {
    if (content === '') {
        return '';
    }

    return content.replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        '',
    );
};
