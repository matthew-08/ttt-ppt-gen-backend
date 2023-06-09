const objectEntries = <T extends Record<any, any>>(obj: T) => {
    return Object.entries(obj) as [keyof T, string][]
}

export default objectEntries
