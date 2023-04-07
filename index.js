const store = require("./app/store");
const { initialFetchVideo, FetchbyTagsPosts} = require("./feature/fetchVideo/fetchVideoSlice");




// subscribe to state changes
store.subscribe(() => {
   
});

// disptach actions
console.log("store.getState().tags", store.getState().tags)
const run = async () => {
    await store.dispatch(initialFetchVideo());
    await store.dispatch(FetchbyTagsPosts(store.getState().video?.tags));
}

run();
// store.dispatch(FetchbyTagsPosts(store.getState()))