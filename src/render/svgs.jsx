// Kludge? CardSvgs is defined here to keep imports/requires at the top of the file
// But if is not use until a fair but futher down in the file
const CardSvgs = require.context('./svgs', false, /\.svg$/);
const cardBackSvg = CardSvgs('./BACK.svg')

function cardSvg(coreCard) {
    let fileName;
    if (coreCard.isJoker()) {
        fileName = "JOKER-1";
    } else {
        const suit = coreCard.suitName().toUpperCase();
        const index= coreCard.rankIndex() + 1;
        fileName = `${suit}-${index}`;
    }

    return CardSvgs(`./${fileName}.svg`);
}

export { cardSvg, cardBackSvg };