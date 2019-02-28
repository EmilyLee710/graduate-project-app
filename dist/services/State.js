class State {
    getItem(name) {
        return this[name] || null;
    }
    setItem(name, value) {
        this[name] = value;
    }
}
export default new State();
