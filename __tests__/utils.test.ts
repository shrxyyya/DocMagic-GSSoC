import { describe, it, expect } from '@jest/globals'
import { cn } from '../lib/utils'

describe('Utility Functions', () => {
  describe('cn function', () => {
    it('combines class names correctly', () => {
      const result = cn('class1', 'class2', 'class3')
      expect(result).toBe('class1 class2 class3')
    })

    it('handles conditional classes', () => {
      const result = cn('base-class', true && 'conditional-class', false && 'hidden-class')
      expect(result).toBe('base-class conditional-class')
    })

    it('handles undefined and null values', () => {
      const result = cn('base-class', undefined, null, 'valid-class')
      expect(result).toBe('base-class valid-class')
    })

    it('handles empty strings', () => {
      const result = cn('base-class', '', 'valid-class')
      expect(result).toBe('base-class valid-class')
    })
  })
}) 