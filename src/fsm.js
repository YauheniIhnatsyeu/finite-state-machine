class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     * 
     */
    constructor(config) {
        if (config === undefined) throw Error('Error');
        this.config = config;
        this.state = config.initial;
        this.history = [];
        this.redoBuf = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() { return this.state; }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (!this.config.states[state]) throw Error('Error');
        this.history.push(this.state);
        this.redoBuf = [];
        this.state = state;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) { //'study'
        if (this.config.states[this.state].transitions[event]) {
            this.history.push(this.state);
            this.redoBuf = [];
            this.state = this.config.states[this.state].transitions[event];

        } else { throw Error('Error'); }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() { this.state = this.config.initial; }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var arr = [];
        if (event === undefined) {
            for (let temp in this.config.states) {
                arr.push(temp);
            }
            return arr;
        }
        Object.keys(this.config.states).forEach(elem => {
            if (this.config.states[elem].transitions[event])
                arr.push(elem);
        });
        return arr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.history.length === 0) {
            return false;
        }
        this.redoBuf.push(this.state);
        this.state = this.history.pop();

        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.redoBuf.length === 0) {
            return false;
        }
        this.history.push(this.state);
        this.state = this.redoBuf.pop();

        return true;

    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [];
        this.redoBuf = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/