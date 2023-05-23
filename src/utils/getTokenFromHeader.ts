const getTokenFromHeader = (header: string) => {
    return header.replace(/^Bearer\s/, '')
}

export { getTokenFromHeader }
