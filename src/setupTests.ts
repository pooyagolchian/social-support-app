import '@testing-library/jest-dom';

// Polyfill for TextEncoder/TextDecoder
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('node:util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

// Mock import.meta.env
const importMetaEnv = {
  VITE_OPENAI_API_KEY: 'test-api-key',
};

// @ts-ignore
global.import = {
  meta: {
    env: importMetaEnv,
  },
};

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});