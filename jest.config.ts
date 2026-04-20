import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  testEnvironment: 'jsdom',
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: { jsx: 'react-jsx' } }],
  },
  testMatch: [
    '**/__tests__/**/*.test.ts',
    '**/__tests__/**/*.test.tsx',
  ],
  projects: [
    {
      displayName: 'api',
      testEnvironment: 'node',
      testMatch: ['**/__tests__/api/**/*.test.ts'],
      moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
      transform: {
        '^.+\\.tsx?$': ['ts-jest', { tsconfig: { jsx: 'react-jsx' } }],
      },
    },
    {
      displayName: 'browser',
      testEnvironment: 'jsdom',
      testMatch: ['**/__tests__/components/**/*.test.tsx', '**/__tests__/utils/**/*.test.ts'],
      moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
      transform: {
        '^.+\\.tsx?$': ['ts-jest', { tsconfig: { jsx: 'react-jsx' } }],
      },
    },
  ],
}

export default createJestConfig(config)
