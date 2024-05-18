export const formatCurrency = (value) => {
    return Number(value).toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
    })
}