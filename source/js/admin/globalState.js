const globalState = {
    generateUniqueKey() {
        const timestamp = new Date().getTime();
        const random = Math.random().toString(36).substring(2, 10);
    
        return `${timestamp}_${random}`;
    }
};

export default globalState;