// Not named as utility.d.ts because it will then not be outputted into the build dir

export type Serializable =
    | null
    | boolean
    | number
    | string
    | Serializable[]
    | { [key: string]: Serializable };
