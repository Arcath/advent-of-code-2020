import {parsePosition} from './puzzle'

describe('Day 5', () => {
  it('should parse positions', () => {
    [
      ['BFFFBBFRRR', 70, 7, 567] as const,
      ['FFFBBBFRRR', 14, 7, 119] as const,
      ['BBFFBBFRLL', 102, 4, 820] as const
    ].forEach(([code, row, col, sid]) => {
      const result = parsePosition(code)
      
      expect(result.row).toBe(row)
      expect(result.column).toBe(col)
      expect(result.seatId).toBe(sid)
    })
  })
})