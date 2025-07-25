/// <reference types="next" />
/// <reference types="next/image-types/global" />

declare module 'next/server' {
  export * from 'next/dist/server/web/spec-extension/response';
  export * from 'next/dist/server/web/spec-extension/request';
  export * from 'next/dist/server/web/spec-extension/adapters/next-request';
  export * from 'next/dist/server/web/spec-extension/adapters/next-response';
  export * from 'next/dist/server/web/spec-extension/adapters/headers';
  export * from 'next/dist/server/web/spec-extension/adapters/request';
  export * from 'next/dist/server/web/spec-extension/adapters/response';
}
