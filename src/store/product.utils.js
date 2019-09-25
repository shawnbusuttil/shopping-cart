/* Extract the numerical data from the string. - Ideally data is presented in numerical format from API. */
export function parseWeighting(displayName) {
    const weight = displayName
        .substring(displayName.lastIndexOf("(") + 1, displayName.lastIndexOf(")"))
        .replace("min. ", "");

    if (!weight) {
        return 1;
    }
    if (weight.indexOf("kg") !== -1) {
        return weight.substring(0, weight.length - 2);
    }
    if (weight.indexOf("g") !== -1) {
        return weight.substring(0, weight.length - 1) / 1000;
    }
    return 0;
}

export function parseSaleText(saleText) {
    const discount = saleText.split(" ")[0];
    return discount.substring(0, discount.length - 1);
}