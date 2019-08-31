import formatMoney from '../lib/formatMoney';

describe('formats money as expected', () => {
    it('tests cents', () => {
        expect(formatMoney(50)).toEqual('$0.50')
        expect(formatMoney(5)).toEqual('$0.05')
        expect(formatMoney(5030)).toEqual('$50.30')
    })

    it('tests currency format', () => {
        expect(formatMoney(50000000)).toEqual('$500,000')
        expect(formatMoney(1231212312321323)).toEqual('$12,312,123,123,213.23')
        expect(formatMoney('asdf')).toBe("NaN")
    })
});