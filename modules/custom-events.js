var KrapptUtils = {};

(function (KrapptUtils) {
    function CustomEvent() {}

    CustomEvent.prototype = {
        subscribers: [],
        publish: function( /* Object */ event) {
            for (var i in this.subscribers){
                if (this.subscribers.hasOwnProperty(i)){
                    var subscriber = this.subscribers[i];
                    if(!subscriber.accept || subscriber.accept(event)) {
                        this.onEvent(subscriber,event);
                    }
                }
            }
        },
        subscribe: function( /* Object */ subscriber) {
            this.subscribers.push(subscriber);
        },
        clearSubscribe: function() {
            this.subscribers = [];
        },
        onEvent: function(/* Object */ scope, /* Object */ event) {
            if (typeof(scope[event.event]) == "function") {
                scope[event.event](event);
            }
        }
    };

    KrapptUtils.CustomEvent = new CustomEvent();
})(KrapptUtils);