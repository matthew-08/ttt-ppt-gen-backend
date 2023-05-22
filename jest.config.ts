import type { Config } from 'jest'

const config: Config = {
    verbose: true,
    testPathIgnorePatterns: ['/src/__tests__/__mocks__'],
}

export default config
