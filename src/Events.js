class Events {
  callbacks = [];
  nextId = 0;

  //emit event
  emit(eventName,value){
    this.callbacks.forEach(stored =>{
      if(stored.eventName === eventName){
        stored.callbacks(value)
      }
    })
  }


  //subcribe to something happening
  on(eventName,caller, callbacks){
    this.nextId += 1;
    this.callbacks.push({
      id: this.nextId,
      eventName,
      caller,
      callbacks,
    });
    return this.nextId;
  }


  //remove the subscription
  Off(id){
    this.callbacks = this.callbacks.filter((stored)=>stored.id !== id)
  }

  unsubscribe(caller){
    this.callbacks = this.callbacks.filter(
      (stored)=>stored.caller !== caller,
    );
  }
}

export const events = new Events();