export const convertToDecimal = (price: number | undefined): string => {
    if (typeof price !== 'number') {
        return '0.00'
    }
    return (price / 100).toFixed(2)
}
