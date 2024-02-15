const globalState = {
    /**
    * Generates a unique key based on timestamp and random string.
    * @returns {string} - The generated unique key.
    */
    generateUniqueKey(): string {
        const timestamp = new Date().getTime();
        const random = Math.random().toString(36).substring(2, 10);

        return `${timestamp}_${random}`;
    }
};

export default globalState;