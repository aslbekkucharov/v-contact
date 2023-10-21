export function generateUniqueId(): string {
    const timestamp: string = new Date().getTime().toString(16) // Convert current timestamp to hexadecimal
    const randomPart: string = Math.random().toString(16).slice(2) // Generate a random hexadecimal number

    return timestamp + randomPart
}