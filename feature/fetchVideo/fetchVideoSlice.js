const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: fetch } = require("node-fetch");
const store = require("../../app/store");
const initialState = {
    random_loading:false,
    tags_loading: false,
    tags:[],
    randomVideo: {},
    random_error_text: null,
    tags_error_text: null,
    videos_fromTags:[]
}
// async video request
const initialFetchVideo = createAsyncThunk("fetchvideo/initialFetch", async () => {
    const response = await fetch(
        "http://localhost:9000/videos"
    );
    const posts = await response.json();

    return posts;
});
// video using tags
const FetchbyTagsPosts = createAsyncThunk("fetchvideo/fetchbyTags", async (tags) => {
    console.log(tags)
    let str = ``
    for (const tag in tags) {
      
        if (str === '') {
            str+=`tags_like=${tags[tag]}`
        }else{
            str+=`&tags_like=${tags[tag]}`
        }
    }
    console.log("str",str)
    const response = await fetch(
        `http://localhost:9000/videos?${str}`
    );
    const posts = await response.json();

    return posts;
});
const fetchVideoSlice = createSlice({
    name: 'fetchVideo',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(initialFetchVideo.pending, (state, action) => {
            state.loading = true;
            state.error_text = "";
        });
        builder.addCase(FetchbyTagsPosts.pending, (state, action) => {
            state.tags_loading = true;
            state.tags_error_text = "";
        });

        builder.addCase(initialFetchVideo.fulfilled, (state, action) => {
            state.loading = false;
            state.error_text = "";
            state.randomVideo = action.payload;
            state.tags = action.payload?.tags
        });
        builder.addCase(FetchbyTagsPosts.fulfilled, (state, action) => {
            state.tags_loading = false;
            state.tags_error_text = "";
            const video=action?.payload?.sort((a,b)=>parseFloat(b?.views)-parseFloat(a?.views))
            state.videos_fromTags = video;
        });

        builder.addCase(initialFetchVideo.rejected, (state, action) => {
            state.loading = false;
            state.error_text = action.error.message;
            state.randomVideo = {};
        });
        builder.addCase(FetchbyTagsPosts.rejected, (state, action) => {
            state.tags_loading = false;
            state.tags_error_text = action.error.message;
            state.videos_fromTags = [];
        });
    },
})
module.exports = fetchVideoSlice.reducer;
module.exports.initialFetchVideo = initialFetchVideo;
module.exports.FetchbyTagsPosts = FetchbyTagsPosts;