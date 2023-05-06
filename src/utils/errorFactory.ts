const errorFactory = (errorType: string, message: string, instance: string) => {
    return {
        errorType,
        message,
        instance,
    }
}

export default errorFactory
