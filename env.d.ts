export {}

declare global {
    namespace NodeJS {
        interface ProcessEnv{
            URL_API: string | undefined
        }
    }
}