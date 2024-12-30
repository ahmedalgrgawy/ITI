export const getFirst15Words = (text) => {

    const text15 = text.split(" ").slice(0, 10).join(" ") + (text.split(" ").length > 10 ? "    ......" : "")

    return text15;
}