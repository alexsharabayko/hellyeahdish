Node.prototype.q = function (selector) {
    return Array.prototype.slice.call(this.querySelectorAll(selector));
};

Node.prototype.on = function (eventName, selector, callback, isOne) {
    if (!callback) {
        callback = selector;
        selector = null;
    }

    if (selector) {
        this.addEventListener(eventName, function (event) {
            if (this.q(selector).indexOf(event) > -1) {
                callback(event);
            }
        });
    }
    else {
        this.addEventListener(eventName, callback);
    }
};

Node.prototype.one = function (eventName, selector, callback) {
    if (!callback) {
        callback = selector;
        selector = null;
    }

    if (selector) {
        this.addEventListener(eventName, function handler (event) {
            if (this.q(selector).indexOf(event) > -1) {
                callback.call(this, event);
            }

            this.removeEventListener(eventName, handler);
        });
    }
    else {
        this.addEventListener(eventName, function handler (event) {
            callback.call(this, event);

            this.removeEventListener(eventName, handler);
        });
    }
};

Node.prototype.css = function (key, value) {
    if (typeof key === 'string') {
        this.style[key] = value;
    }
    else {
        Object.keys(key).forEach(function (i) {
            this.style[i] = key[i];
        }, this);
    }
};

Node.prototype.transform = function (value) {
    this.css({
        webkitTransform: value,
        MozTransform: value,
        msTransform: value,
        OTransform: value,
        transform: value
    });
};
