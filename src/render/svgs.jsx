// Kludge? CardSvgs is defined here to keep imports/requires at the top of the file
// But if is not use until a fair but futher down in the file
const CardSvgs = require.context('./svgs', false, /\.svg$/);

function cardSvg(coreCard) {
    let type, index;
    if (coreCard.isJoker()) {
        type = "JOKER";
        index = coreCard.joker.index;
    } else {
        type = coreCard.suit.name.toUpperCase();
        index = coreCard.rank.index;
    }

    const path = `./${type}-${index + 1}.svg`;
    return CardSvgs(path);
}

export { cardSvg };