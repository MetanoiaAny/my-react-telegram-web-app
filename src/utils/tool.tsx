/**
 * 截断给定的地址字符串。
 * @param {string} address - 需要截断的地址。
 * @returns {string} - 截断后的地址。
 */
export const truncateAddress = (address: string): string => {
    // 取前6个字符，加上中间的'...'，再取最后4个字符。
    return `${address.slice(0, 6)}...${address.slice(address.length - 4)}`;
};