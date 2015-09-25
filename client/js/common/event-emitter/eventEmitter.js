class EventEmitter {
    constructor () {
        this._listeners = {};
    }

    on (eventName, callback) {
        if (!this._listeners[eventName]) {
            this._listeners[eventName] = [];
        }

        this._listeners[eventName].push(callback);

        return this;
    }

    trigger (eventName) {
        if (!this._listeners[eventName]) {
            return false;
        }

        this._listeners[eventName].forEach((listener) => {
            setTimeout(listener.bind(this), 0);
        });

        return this;
    }

    off (eventName, callback) {
        var index = -1;

        if (!this._listeners[eventName]) {
            return false;
        }

        if (callback) {
            index = this._listeners[eventName].indexOf(callback);

            if (index > -1) {
                this._listeners.splice(index, 1);
            }
            else {
                return false;
            }
        }
        else {
            delete this._listeners[eventName];
        }

        return this;
    }
}

export default EventEmitter;