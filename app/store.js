const configureStore = require("@reduxjs/toolkit").configureStore;
const fetchVideoReducer = require("../feature/fetchVideo/fetchVideoSlice");
const { createLogger } = require("redux-logger");

const logger = createLogger();

// configure store
const store = configureStore({
    reducer: {
       video:fetchVideoReducer
    },
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares().concat(logger),
});

module.exports = store;