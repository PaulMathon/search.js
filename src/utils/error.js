class LearchError extends Error {

    constructor(error, message) {
        super(message);
        this.error = error;
        this.message = `[${error}] - ${message}`;
        this.originalMessage = message;
    }
}
