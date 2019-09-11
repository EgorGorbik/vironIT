const EventEmitter = (function () {
   class EventEmitter {
       constructor() {
           this.callbackStore = {/* [eventName]: [callback1, callback2]*/};
       }

       on(eventName, callback) {
           // if (!this.callbackStore[eventName]) {
           //     this.callbackStore[eventName] = [];
           // }
           this.callbackStore[eventName] = this.callbackStore[eventName] || [];
           this.callbackStore[eventName].push(callback);
       }

       emit(eventName, ...params) {
           if (!this.callbackStore[eventName]) {
               return;
           }
           this.callbackStore[eventName].forEach(callback => {
               callback(...params);
           })
       }
   }

   return EventEmitter;
})();
