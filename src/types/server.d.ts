declare module '@/server/baseurl' {
  const baseurl: string
  export default baseurl
}

declare module '@/server/util' {
  export const util: any
  // yoki aniqroq:
  // export function someFunction(): void
}

declare module '@/server/module/api' {
  const api: any
  export default api
}