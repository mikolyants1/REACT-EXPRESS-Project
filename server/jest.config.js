export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.tsx?$': 'esm-jest',
    },
    extensionsToTreatAsEsm: ['.ts'],
  };
  