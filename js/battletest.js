var App = {
    Params: {
        Focused: true
    },

    Canvas: {
        width: 1200,
        height: 800
    },

    Ctx: null,

    Ticker: null,

    Time: {
        currTime: 0,
        lastTime: 0,
        deltaTime: 0,
        elapsedTotal: 0,
        focusFPS: 60,
        blurFPS: 10,
        seconds: 1000,
        minutes: 60 * this.seconds,
        hours: 60 * this.minutes,
        days: 24 * this.hours,
        timeMax: 25,
        timeMin: 3,
        RandomTime: function() {
            return Math.floor(Math.random() * (this.timeMax  - this.timeMin + 1) + this.timeMin) * this.seconds;
        },

        spawnTime: 5000,
        elapsedSinceSpawn: 0,
    },

    TileRes: 64,
    TargetRes: 64,
    TileCols: 27,
    TileRows: 20,
    TileRef: "../img/tilesheet_complete.png",
    TileSheet: false,

    Tiles: [
        {id:1, x:0, y:0, name:"grass_1"},
        {id:2, x:1, y:0, name:"grass_2"},
        {id:3, x:2, y:0, name:"grass_3"},
        {id:4, x:3, y:0, name:"grass_4"},
        {id:5, x:4, y:0, name:"dirt_1"},
        {id:6, x:5, y:0, name:"dirt_2"},
        {id:7, x:6, y:0, name:"stone_1"},
        {id:8, x:7, y:0, name:"stone_2"},
        {id:9, x:8, y:0, name:"stone_3"},
        {id:10, x:9, y:0, name:"stone_4"},
        {id:11, x:10, y:0, name:"cobblestone_1"},
        {id:12, x:11, y:0, name:"snow_1"},
        {id:13, x:12, y:0, name:"grass_1"},
        {id:14, x:13, y:0, name:"grass_2"},
        {id:15, x:14, y:0, name:"grass_3"},
        {id:16, x:15, y:0, name:"grass_4"},
        {id:17, x:16, y:0, name:"dirt_1"},
        {id:18, x:17, y:0, name:"dirt_2"},
        {id:19, x:18, y:0, name:"stone_1"},
        {id:20, x:19, y:0, name:"stone_2"},
        {id:21, x:20, y:0, name:"stone_3"},
        {id:22, x:21, y:0, name:"stone_4"},
        {id:23, x:22, y:0, name:"cobblestone_1"},
        {id:24, x:23, y:0, name:"snow_1"},
        {id:25, x:24, y:0, name:"stone_4"},
        {id:26, x:25, y:0, name:"cobblestone_1"},
        {id:27, x:26, y:0, name:"snow_1"},
        {id:28, x:0, y:1, name:"grass_1"},
        {id:29, x:1, y:1, name:"grass_2"},
        {id:30, x:2, y:1, name:"grass_3"},
        {id:31, x:3, y:1, name:"grass_4"},
        {id:32, x:4, y:1, name:"dirt_1"},
        {id:33, x:5, y:1, name:"dirt_2"},
        {id:34, x:6, y:1, name:"stone_1"},
        {id:35, x:7, y:1, name:"stone_2"},
        {id:36, x:8, y:1, name:"stone_3"},
        {id:37, x:9, y:1, name:"stone_4"},
        {id:38, x:10, y:1, name:"cobblestone_1"},
        {id:39, x:11, y:1, name:"snow_1"},
        {id:40, x:12, y:1, name:"grass_1"},
        {id:41, x:13, y:1, name:"grass_2"},
        {id:42, x:14, y:1, name:"grass_3"},
        {id:43, x:15, y:1, name:"grass_4"},
        {id:44, x:16, y:1, name:"dirt_1"},
        {id:45, x:17, y:1, name:"dirt_2"},
        {id:46, x:18, y:1, name:"stone_1"},
        {id:47, x:19, y:1, name:"stone_2"},
        {id:48, x:20, y:1, name:"stone_3"},
        {id:49, x:21, y:1, name:"stone_4"},
        {id:50, x:22, y:1, name:"cobblestone_1"},
        {id:51, x:23, y:1, name:"snow_1"},
        {id:52, x:24, y:1, name:"stone_4"},
        {id:53, x:25, y:1, name:"cobblestone_1"},
        {id:54, x:26, y:1, name:"snow_1"},
        {id:1, x:0, y:2, name:"grass_1"},
        {id:2, x:1, y:2, name:"grass_2"},
        {id:3, x:2, y:2, name:"grass_3"},
        {id:4, x:3, y:2, name:"grass_4"},
        {id:5, x:4, y:2, name:"dirt_1"},
        {id:6, x:5, y:2, name:"dirt_2"},
        {id:7, x:6, y:2, name:"stone_1"},
        {id:8, x:7, y:2, name:"stone_2"},
        {id:9, x:8, y:2, name:"stone_3"},
        {id:10, x:9, y:2, name:"stone_4"},
        {id:11, x:10, y:2, name:"cobblestone_1"},
        {id:12, x:11, y:2, name:"snow_1"},
        {id:13, x:12, y:2, name:"grass_1"},
        {id:14, x:13, y:2, name:"grass_2"},
        {id:15, x:14, y:2, name:"grass_3"},
        {id:16, x:15, y:2, name:"grass_4"},
        {id:17, x:16, y:2, name:"dirt_1"},
        {id:18, x:17, y:2, name:"dirt_2"},
        {id:19, x:18, y:2, name:"stone_1"},
        {id:20, x:19, y:2, name:"stone_2"},
        {id:21, x:20, y:2, name:"stone_3"},
        {id:22, x:21, y:2, name:"stone_4"},
        {id:23, x:22, y:2, name:"cobblestone_1"},
        {id:24, x:23, y:2, name:"snow_1"},
        {id:25, x:24, y:2, name:"stone_4"},
        {id:26, x:25, y:2, name:"cobblestone_1"},
        {id:27, x:26, y:2, name:"snow_1"},
        {id:28, x:0, y:3, name:"grass_1"},
        {id:29, x:1, y:3, name:"grass_2"},
        {id:30, x:2, y:3, name:"grass_3"},
        {id:31, x:3, y:3, name:"grass_4"},
        {id:32, x:4, y:3, name:"dirt_1"},
        {id:33, x:5, y:3, name:"dirt_2"},
        {id:34, x:6, y:3, name:"stone_1"},
        {id:35, x:7, y:3, name:"stone_2"},
        {id:36, x:8, y:3, name:"stone_3"},
        {id:37, x:9, y:3, name:"stone_4"},
        {id:38, x:10, y:3, name:"cobblestone_1"},
        {id:39, x:11, y:3, name:"snow_1"},
        {id:40, x:12, y:3, name:"grass_1"},
        {id:41, x:13, y:3, name:"grass_2"},
        {id:42, x:14, y:3, name:"grass_3"},
        {id:43, x:15, y:3, name:"grass_4"},
        {id:44, x:16, y:3, name:"dirt_1"},
        {id:45, x:17, y:3, name:"dirt_2"},
        {id:46, x:18, y:3, name:"stone_1"},
        {id:47, x:19, y:3, name:"stone_2"},
        {id:48, x:20, y:3, name:"stone_3"},
        {id:49, x:21, y:3, name:"stone_4"},
        {id:50, x:22, y:3, name:"cobblestone_1"},
        {id:51, x:23, y:3, name:"snow_1"},
        {id:52, x:24, y:3, name:"stone_4"},
        {id:53, x:25, y:3, name:"cobblestone_1"},
        {id:54, x:26, y:3, name:"snow_1"},
        {id:1, x:0, y:4, name:"grass_1"},
        {id:2, x:1, y:4, name:"grass_2"},
        {id:3, x:2, y:4, name:"grass_3"},
        {id:4, x:3, y:4, name:"grass_4"},
        {id:5, x:4, y:4, name:"dirt_1"},
        {id:6, x:5, y:4, name:"dirt_2"},
        {id:7, x:6, y:4, name:"stone_1"},
        {id:8, x:7, y:4, name:"stone_2"},
        {id:9, x:8, y:4, name:"stone_3"},
        {id:10, x:9, y:4, name:"stone_4"},
        {id:11, x:10, y:4, name:"cobblestone_1"},
        {id:12, x:11, y:4, name:"snow_1"},
        {id:13, x:12, y:4, name:"grass_1"},
        {id:14, x:13, y:4, name:"grass_2"},
        {id:15, x:14, y:4, name:"grass_3"},
        {id:16, x:15, y:4, name:"grass_4"},
        {id:17, x:16, y:4, name:"dirt_1"},
        {id:18, x:17, y:4, name:"dirt_2"},
        {id:19, x:18, y:4, name:"stone_1"},
        {id:20, x:19, y:4, name:"stone_2"},
        {id:21, x:20, y:4, name:"stone_3"},
        {id:22, x:21, y:4, name:"stone_4"},
        {id:23, x:22, y:4, name:"cobblestone_1"},
        {id:24, x:23, y:4, name:"snow_1"},
        {id:25, x:24, y:4, name:"stone_4"},
        {id:26, x:25, y:4, name:"cobblestone_1"},
        {id:27, x:26, y:4, name:"snow_1"},
        {id:28, x:0, y:5, name:"grass_1"},
        {id:29, x:1, y:5, name:"grass_2"},
        {id:30, x:2, y:5, name:"grass_3"},
        {id:31, x:3, y:5, name:"grass_4"},
        {id:32, x:4, y:5, name:"dirt_1"},
        {id:33, x:5, y:5, name:"dirt_2"},
        {id:34, x:6, y:5, name:"stone_1"},
        {id:35, x:7, y:5, name:"stone_2"},
        {id:36, x:8, y:5, name:"stone_3"},
        {id:37, x:9, y:5, name:"stone_4"},
        {id:38, x:10, y:5, name:"cobblestone_1"},
        {id:39, x:11, y:5, name:"snow_1"},
        {id:40, x:12, y:5, name:"grass_1"},
        {id:41, x:13, y:5, name:"grass_2"},
        {id:42, x:14, y:5, name:"grass_3"},
        {id:43, x:15, y:5, name:"grass_4"},
        {id:44, x:16, y:5, name:"dirt_1"},
        {id:45, x:17, y:5, name:"dirt_2"},
        {id:46, x:18, y:5, name:"stone_1"},
        {id:47, x:19, y:5, name:"stone_2"},
        {id:48, x:20, y:5, name:"stone_3"},
        {id:49, x:21, y:5, name:"stone_4"},
        {id:50, x:22, y:5, name:"cobblestone_1"},
        {id:51, x:23, y:5, name:"snow_1"},
        {id:52, x:24, y:5, name:"stone_4"},
        {id:53, x:25, y:5, name:"cobblestone_1"},
        {id:54, x:26, y:5, name:"snow_1"},
        {id:1, x:0, y:6, name:"grass_1"},
        {id:2, x:1, y:6, name:"grass_2"},
        {id:3, x:2, y:6, name:"grass_3"},
        {id:4, x:3, y:6, name:"grass_4"},
        {id:5, x:4, y:6, name:"dirt_1"},
        {id:6, x:5, y:6, name:"dirt_2"},
        {id:7, x:6, y:6, name:"stone_1"},
        {id:8, x:7, y:6, name:"stone_2"},
        {id:9, x:8, y:6, name:"stone_3"},
        {id:10, x:9, y:6, name:"stone_4"},
        {id:11, x:10, y:6, name:"cobblestone_1"},
        {id:12, x:11, y:6, name:"snow_1"},
        {id:13, x:12, y:6, name:"grass_1"},
        {id:14, x:13, y:6, name:"grass_2"},
        {id:15, x:14, y:6, name:"grass_3"},
        {id:16, x:15, y:6, name:"grass_4"},
        {id:17, x:16, y:6, name:"dirt_1"},
        {id:18, x:17, y:6, name:"dirt_2"},
        {id:19, x:18, y:6, name:"stone_1"},
        {id:20, x:19, y:6, name:"stone_2"},
        {id:21, x:20, y:6, name:"stone_3"},
        {id:22, x:21, y:6, name:"stone_4"},
        {id:23, x:22, y:6, name:"cobblestone_1"},
        {id:24, x:23, y:6, name:"snow_1"},
        {id:25, x:24, y:6, name:"stone_4"},
        {id:26, x:25, y:6, name:"cobblestone_1"},
        {id:27, x:26, y:6, name:"snow_1"},
        {id:28, x:0, y:7, name:"grass_1"},
        {id:29, x:1, y:7, name:"grass_2"},
        {id:30, x:2, y:7, name:"grass_3"},
        {id:31, x:3, y:7, name:"grass_4"},
        {id:32, x:4, y:7, name:"dirt_1"},
        {id:33, x:5, y:7, name:"dirt_2"},
        {id:34, x:6, y:7, name:"stone_1"},
        {id:35, x:7, y:7, name:"stone_2"},
        {id:36, x:8, y:7, name:"stone_3"},
        {id:37, x:9, y:7, name:"stone_4"},
        {id:38, x:10, y:7, name:"cobblestone_1"},
        {id:39, x:11, y:7, name:"snow_1"},
        {id:40, x:12, y:7, name:"grass_1"},
        {id:41, x:13, y:7, name:"grass_2"},
        {id:42, x:14, y:7, name:"grass_3"},
        {id:43, x:15, y:7, name:"grass_4"},
        {id:44, x:16, y:7, name:"dirt_1"},
        {id:45, x:17, y:7, name:"dirt_2"},
        {id:46, x:18, y:7, name:"stone_1"},
        {id:47, x:19, y:7, name:"stone_2"},
        {id:48, x:20, y:7, name:"stone_3"},
        {id:49, x:21, y:7, name:"stone_4"},
        {id:50, x:22, y:7, name:"cobblestone_1"},
        {id:51, x:23, y:7, name:"snow_1"},
        {id:52, x:24, y:7, name:"stone_4"},
        {id:53, x:25, y:7, name:"cobblestone_1"},
        {id:54, x:26, y:7, name:"snow_1"},
        {id:1, x:0, y:8, name:"grass_1"},
        {id:2, x:1, y:8, name:"grass_2"},
        {id:3, x:2, y:8, name:"grass_3"},
        {id:4, x:3, y:8, name:"grass_4"},
        {id:5, x:4, y:8, name:"dirt_1"},
        {id:6, x:5, y:8, name:"dirt_2"},
        {id:7, x:6, y:8, name:"stone_1"},
        {id:8, x:7, y:8, name:"stone_2"},
        {id:9, x:8, y:8, name:"stone_3"},
        {id:10, x:9, y:8, name:"stone_4"},
        {id:11, x:10, y:8, name:"cobblestone_1"},
        {id:12, x:11, y:8, name:"snow_1"},
        {id:13, x:12, y:8, name:"grass_1"},
        {id:14, x:13, y:8, name:"grass_2"},
        {id:15, x:14, y:8, name:"grass_3"},
        {id:16, x:15, y:8, name:"grass_4"},
        {id:17, x:16, y:8, name:"dirt_1"},
        {id:18, x:17, y:8, name:"dirt_2"},
        {id:19, x:18, y:8, name:"stone_1"},
        {id:20, x:19, y:8, name:"stone_2"},
        {id:21, x:20, y:8, name:"stone_3"},
        {id:22, x:21, y:8, name:"stone_4"},
        {id:23, x:22, y:8, name:"cobblestone_1"},
        {id:24, x:23, y:8, name:"snow_1"},
        {id:25, x:24, y:8, name:"stone_4"},
        {id:26, x:25, y:8, name:"cobblestone_1"},
        {id:27, x:26, y:8, name:"snow_1"},
        {id:28, x:0, y:9, name:"grass_1"},
        {id:29, x:1, y:9, name:"grass_2"},
        {id:30, x:2, y:9, name:"grass_3"},
        {id:31, x:3, y:9, name:"grass_4"},
        {id:32, x:4, y:9, name:"dirt_1"},
        {id:33, x:5, y:9, name:"dirt_2"},
        {id:34, x:6, y:9, name:"stone_1"},
        {id:35, x:7, y:9, name:"stone_2"},
        {id:36, x:8, y:9, name:"stone_3"},
        {id:37, x:9, y:9, name:"stone_4"},
        {id:38, x:10, y:9, name:"cobblestone_1"},
        {id:39, x:11, y:9, name:"snow_1"},
        {id:40, x:12, y:9, name:"grass_1"},
        {id:41, x:13, y:9, name:"grass_2"},
        {id:42, x:14, y:9, name:"grass_3"},
        {id:43, x:15, y:9, name:"grass_4"},
        {id:44, x:16, y:9, name:"dirt_1"},
        {id:45, x:17, y:9, name:"dirt_2"},
        {id:46, x:18, y:9, name:"stone_1"},
        {id:47, x:19, y:9, name:"stone_2"},
        {id:48, x:20, y:9, name:"stone_3"},
        {id:49, x:21, y:9, name:"stone_4"},
        {id:50, x:22, y:9, name:"cobblestone_1"},
        {id:51, x:23, y:9, name:"snow_1"},
        {id:52, x:24, y:9, name:"stone_4"},
        {id:53, x:25, y:9, name:"cobblestone_1"},
        {id:54, x:26, y:9, name:"snow_1"},
        {id:1, x:0, y:10, name:"grass_1"},
        {id:2, x:1, y:10, name:"grass_2"},
        {id:3, x:2, y:10, name:"grass_3"},
        {id:4, x:3, y:10, name:"grass_4"},
        {id:5, x:4, y:10, name:"dirt_1"},
        {id:6, x:5, y:10, name:"dirt_2"},
        {id:7, x:6, y:10, name:"stone_1"},
        {id:8, x:7, y:10, name:"stone_2"},
        {id:9, x:8, y:10, name:"stone_3"},
        {id:10, x:9, y:10, name:"stone_4"},
        {id:11, x:10, y:10, name:"cobblestone_1"},
        {id:12, x:11, y:10, name:"snow_1"},
        {id:13, x:12, y:10, name:"grass_1"},
        {id:14, x:13, y:10, name:"grass_2"},
        {id:15, x:14, y:10, name:"grass_3"},
        {id:16, x:15, y:10, name:"grass_4"},
        {id:17, x:16, y:10, name:"dirt_1"},
        {id:18, x:17, y:10, name:"dirt_2"},
        {id:19, x:18, y:10, name:"stone_1"},
        {id:20, x:19, y:10, name:"stone_2"},
        {id:21, x:20, y:10, name:"stone_3"},
        {id:22, x:21, y:10, name:"stone_4"},
        {id:23, x:22, y:10, name:"cobblestone_1"},
        {id:24, x:23, y:10, name:"snow_1"},
        {id:25, x:24, y:10, name:"stone_4"},
        {id:26, x:25, y:10, name:"cobblestone_1"},
        {id:27, x:26, y:10, name:"snow_1"},
        {id:28, x:0, y:11, name:"grass_1"},
        {id:29, x:1, y:11, name:"grass_2"},
        {id:30, x:2, y:11, name:"grass_3"},
        {id:31, x:3, y:11, name:"grass_4"},
        {id:32, x:4, y:11, name:"dirt_1"},
        {id:33, x:5, y:11, name:"dirt_2"},
        {id:34, x:6, y:11, name:"stone_1"},
        {id:35, x:7, y:11, name:"stone_2"},
        {id:36, x:8, y:11, name:"stone_3"},
        {id:37, x:9, y:11, name:"stone_4"},
        {id:38, x:10, y:11, name:"cobblestone_1"},
        {id:39, x:11, y:11, name:"snow_1"},
        {id:40, x:12, y:11, name:"grass_1"},
        {id:41, x:13, y:11, name:"grass_2"},
        {id:42, x:14, y:11, name:"grass_3"},
        {id:43, x:15, y:11, name:"grass_4"},
        {id:44, x:16, y:11, name:"dirt_1"},
        {id:45, x:17, y:11, name:"dirt_2"},
        {id:46, x:18, y:11, name:"stone_1"},
        {id:47, x:19, y:11, name:"stone_2"},
        {id:48, x:20, y:11, name:"stone_3"},
        {id:49, x:21, y:11, name:"stone_4"},
        {id:50, x:22, y:11, name:"cobblestone_1"},
        {id:51, x:23, y:11, name:"snow_1"},
        {id:52, x:24, y:11, name:"stone_4"},
        {id:53, x:25, y:11, name:"cobblestone_1"},
        {id:54, x:26, y:11, name:"snow_1"},
        {id:1, x:0, y:12, name:"grass_1"},
        {id:2, x:1, y:12, name:"grass_2"},
        {id:3, x:2, y:12, name:"grass_3"},
        {id:4, x:3, y:12, name:"grass_4"},
        {id:5, x:4, y:12, name:"dirt_1"},
        {id:6, x:5, y:12, name:"dirt_2"},
        {id:7, x:6, y:12, name:"stone_1"},
        {id:8, x:7, y:12, name:"stone_2"},
        {id:9, x:8, y:12, name:"stone_3"},
        {id:10, x:9, y:12, name:"stone_4"},
        {id:11, x:10, y:12, name:"cobblestone_1"},
        {id:12, x:11, y:12, name:"snow_1"},
        {id:13, x:12, y:12, name:"grass_1"},
        {id:14, x:13, y:12, name:"grass_2"},
        {id:15, x:14, y:12, name:"grass_3"},
        {id:16, x:15, y:12, name:"grass_4"},
        {id:17, x:16, y:12, name:"dirt_1"},
        {id:18, x:17, y:12, name:"dirt_2"},
        {id:19, x:18, y:12, name:"stone_1"},
        {id:20, x:19, y:12, name:"stone_2"},
        {id:21, x:20, y:12, name:"stone_3"},
        {id:22, x:21, y:12, name:"stone_4"},
        {id:23, x:22, y:12, name:"cobblestone_1"},
        {id:24, x:23, y:12, name:"snow_1"},
        {id:25, x:24, y:12, name:"stone_4"},
        {id:26, x:25, y:12, name:"cobblestone_1"},
        {id:27, x:26, y:12, name:"snow_1"},
        {id:28, x:0, y:13, name:"grass_1"},
        {id:29, x:1, y:13, name:"grass_2"},
        {id:30, x:2, y:13, name:"grass_3"},
        {id:31, x:3, y:13, name:"grass_4"},
        {id:32, x:4, y:13, name:"dirt_1"},
        {id:33, x:5, y:13, name:"dirt_2"},
        {id:34, x:6, y:13, name:"stone_1"},
        {id:35, x:7, y:13, name:"stone_2"},
        {id:36, x:8, y:13, name:"stone_3"},
        {id:37, x:9, y:13, name:"stone_4"},
        {id:38, x:10, y:13, name:"cobblestone_1"},
        {id:39, x:11, y:13, name:"snow_1"},
        {id:40, x:12, y:13, name:"grass_1"},
        {id:41, x:13, y:13, name:"grass_2"},
        {id:42, x:14, y:13, name:"grass_3"},
        {id:43, x:15, y:13, name:"grass_4"},
        {id:44, x:16, y:13, name:"dirt_1"},
        {id:45, x:17, y:13, name:"dirt_2"},
        {id:46, x:18, y:13, name:"stone_1"},
        {id:47, x:19, y:13, name:"stone_2"},
        {id:48, x:20, y:13, name:"stone_3"},
        {id:49, x:21, y:13, name:"stone_4"},
        {id:50, x:22, y:13, name:"cobblestone_1"},
        {id:51, x:23, y:13, name:"snow_1"},
        {id:52, x:24, y:13, name:"stone_4"},
        {id:53, x:25, y:13, name:"cobblestone_1"},
        {id:54, x:26, y:13, name:"snow_1"},
        {id:1, x:0, y:14, name:"grass_1"},
        {id:2, x:1, y:14, name:"grass_2"},
        {id:3, x:2, y:14, name:"grass_3"},
        {id:4, x:3, y:14, name:"grass_4"},
        {id:5, x:4, y:14, name:"dirt_1"},
        {id:6, x:5, y:14, name:"dirt_2"},
        {id:7, x:6, y:14, name:"stone_1"},
        {id:8, x:7, y:14, name:"stone_2"},
        {id:9, x:8, y:14, name:"stone_3"},
        {id:10, x:9, y:14, name:"stone_4"},
        {id:11, x:10, y:14, name:"cobblestone_1"},
        {id:12, x:11, y:14, name:"snow_1"},
        {id:13, x:12, y:14, name:"grass_1"},
        {id:14, x:13, y:14, name:"grass_2"},
        {id:15, x:14, y:14, name:"grass_3"},
        {id:16, x:15, y:14, name:"grass_4"},
        {id:17, x:16, y:14, name:"dirt_1"},
        {id:18, x:17, y:14, name:"dirt_2"},
        {id:19, x:18, y:14, name:"stone_1"},
        {id:20, x:19, y:14, name:"stone_2"},
        {id:21, x:20, y:14, name:"stone_3"},
        {id:22, x:21, y:14, name:"stone_4"},
        {id:23, x:22, y:14, name:"cobblestone_1"},
        {id:24, x:23, y:14, name:"snow_1"},
        {id:25, x:24, y:14, name:"stone_4"},
        {id:26, x:25, y:14, name:"cobblestone_1"},
        {id:27, x:26, y:14, name:"snow_1"},
        {id:28, x:0, y:15, name:"grass_1"},
        {id:29, x:1, y:15, name:"grass_2"},
        {id:30, x:2, y:15, name:"grass_3"},
        {id:31, x:3, y:15, name:"grass_4"},
        {id:32, x:4, y:15, name:"dirt_1"},
        {id:33, x:5, y:15, name:"dirt_2"},
        {id:34, x:6, y:15, name:"stone_1"},
        {id:35, x:7, y:15, name:"stone_2"},
        {id:36, x:8, y:15, name:"stone_3"},
        {id:37, x:9, y:15, name:"stone_4"},
        {id:38, x:10, y:15, name:"cobblestone_1"},
        {id:39, x:11, y:15, name:"snow_1"},
        {id:40, x:12, y:15, name:"grass_1"},
        {id:41, x:13, y:15, name:"grass_2"},
        {id:42, x:14, y:15, name:"grass_3"},
        {id:43, x:15, y:15, name:"grass_4"},
        {id:44, x:16, y:15, name:"dirt_1"},
        {id:45, x:17, y:15, name:"dirt_2"},
        {id:46, x:18, y:15, name:"stone_1"},
        {id:47, x:19, y:15, name:"stone_2"},
        {id:48, x:20, y:15, name:"stone_3"},
        {id:49, x:21, y:15, name:"stone_4"},
        {id:50, x:22, y:15, name:"cobblestone_1"},
        {id:51, x:23, y:15, name:"snow_1"},
        {id:52, x:24, y:15, name:"stone_4"},
        {id:53, x:25, y:15, name:"cobblestone_1"},
        {id:54, x:26, y:15, name:"snow_1"},
        {id:1, x:0, y:16, name:"grass_1"},
        {id:2, x:1, y:16, name:"grass_2"},
        {id:3, x:2, y:16, name:"grass_3"},
        {id:4, x:3, y:16, name:"grass_4"},
        {id:5, x:4, y:16, name:"dirt_1"},
        {id:6, x:5, y:16, name:"dirt_2"},
        {id:7, x:6, y:16, name:"stone_1"},
        {id:8, x:7, y:16, name:"stone_2"},
        {id:9, x:8, y:16, name:"stone_3"},
        {id:10, x:9, y:16, name:"stone_4"},
        {id:11, x:10, y:16, name:"cobblestone_1"},
        {id:12, x:11, y:16, name:"snow_1"},
        {id:13, x:12, y:16, name:"grass_1"},
        {id:14, x:13, y:16, name:"grass_2"},
        {id:15, x:14, y:16, name:"grass_3"},
        {id:16, x:15, y:16, name:"grass_4"},
        {id:17, x:16, y:16, name:"dirt_1"},
        {id:18, x:17, y:16, name:"dirt_2"},
        {id:19, x:18, y:16, name:"stone_1"},
        {id:20, x:19, y:16, name:"stone_2"},
        {id:21, x:20, y:16, name:"stone_3"},
        {id:22, x:21, y:16, name:"stone_4"},
        {id:23, x:22, y:16, name:"cobblestone_1"},
        {id:24, x:23, y:16, name:"snow_1"},
        {id:25, x:24, y:16, name:"stone_4"},
        {id:26, x:25, y:16, name:"cobblestone_1"},
        {id:27, x:26, y:16, name:"snow_1"},
        {id:28, x:0, y:17, name:"grass_1"},
        {id:29, x:1, y:17, name:"grass_2"},
        {id:30, x:2, y:17, name:"grass_3"},
        {id:31, x:3, y:17, name:"grass_4"},
        {id:32, x:4, y:17, name:"dirt_1"},
        {id:33, x:5, y:17, name:"dirt_2"},
        {id:34, x:6, y:17, name:"stone_1"},
        {id:35, x:7, y:17, name:"stone_2"},
        {id:36, x:8, y:17, name:"stone_3"},
        {id:37, x:9, y:17, name:"stone_4"},
        {id:38, x:10, y:17, name:"cobblestone_1"},
        {id:39, x:11, y:17, name:"snow_1"},
        {id:40, x:12, y:17, name:"grass_1"},
        {id:41, x:13, y:17, name:"grass_2"},
        {id:42, x:14, y:17, name:"grass_3"},
        {id:43, x:15, y:17, name:"grass_4"},
        {id:44, x:16, y:17, name:"dirt_1"},
        {id:45, x:17, y:17, name:"dirt_2"},
        {id:46, x:18, y:17, name:"stone_1"},
        {id:47, x:19, y:17, name:"stone_2"},
        {id:48, x:20, y:17, name:"stone_3"},
        {id:49, x:21, y:17, name:"stone_4"},
        {id:50, x:22, y:17, name:"cobblestone_1"},
        {id:51, x:23, y:17, name:"snow_1"},
        {id:52, x:24, y:17, name:"stone_4"},
        {id:53, x:25, y:17, name:"cobblestone_1"},
        {id:54, x:26, y:17, name:"snow_1"},
        {id:1, x:0, y:18, name:"grass_1"},
        {id:2, x:1, y:18, name:"grass_2"},
        {id:3, x:2, y:18, name:"grass_3"},
        {id:4, x:3, y:18, name:"grass_4"},
        {id:5, x:4, y:18, name:"dirt_1"},
        {id:6, x:5, y:18, name:"dirt_2"},
        {id:7, x:6, y:18, name:"stone_1"},
        {id:8, x:7, y:18, name:"stone_2"},
        {id:9, x:8, y:18, name:"stone_3"},
        {id:10, x:9, y:18, name:"stone_4"},
        {id:11, x:10, y:18, name:"cobblestone_1"},
        {id:12, x:11, y:18, name:"snow_1"},
        {id:13, x:12, y:18, name:"grass_1"},
        {id:14, x:13, y:18, name:"grass_2"},
        {id:15, x:14, y:18, name:"grass_3"},
        {id:16, x:15, y:18, name:"grass_4"},
        {id:17, x:16, y:18, name:"dirt_1"},
        {id:18, x:17, y:18, name:"dirt_2"},
        {id:19, x:18, y:18, name:"stone_1"},
        {id:20, x:19, y:18, name:"stone_2"},
        {id:21, x:20, y:18, name:"stone_3"},
        {id:22, x:21, y:18, name:"stone_4"},
        {id:23, x:22, y:18, name:"cobblestone_1"},
        {id:24, x:23, y:18, name:"snow_1"},
        {id:25, x:24, y:18, name:"stone_4"},
        {id:26, x:25, y:18, name:"cobblestone_1"},
        {id:27, x:26, y:18, name:"snow_1"},
        {id:28, x:0, y:19, name:"grass_1"},
        {id:29, x:1, y:19, name:"grass_2"},
        {id:30, x:2, y:19, name:"grass_3"},
        {id:31, x:3, y:19, name:"grass_4"},
        {id:32, x:4, y:19, name:"dirt_1"},
        {id:33, x:5, y:19, name:"dirt_2"},
        {id:34, x:6, y:19, name:"stone_1"},
        {id:35, x:7, y:19, name:"stone_2"},
        {id:36, x:8, y:19, name:"stone_3"},
        {id:37, x:9, y:19, name:"stone_4"},
        {id:38, x:10, y:19, name:"cobblestone_1"},
        {id:39, x:11, y:19, name:"snow_1"},
        {id:40, x:12, y:19, name:"grass_1"},
        {id:41, x:13, y:19, name:"grass_2"},
        {id:42, x:14, y:19, name:"grass_3"},
        {id:43, x:15, y:19, name:"grass_4"},
        {id:44, x:16, y:19, name:"dirt_1"},
        {id:45, x:17, y:19, name:"dirt_2"},
        {id:46, x:18, y:19, name:"stone_1"},
        {id:47, x:19, y:19, name:"stone_2"},
        {id:48, x:20, y:19, name:"stone_3"},
        {id:49, x:21, y:19, name:"stone_4"},
        {id:50, x:22, y:19, name:"cobblestone_1"},
        {id:51, x:23, y:19, name:"snow_1"},
        {id:52, x:24, y:19, name:"stone_4"},
        {id:53, x:25, y:19, name:"cobblestone_1"},
        {id:54, x:26, y:19, name:"snow_1"},
    ],

    Map: {
        cols: 24,
        rows: 24,
        tsize: 64,
        tiles: [
            0, 1, 2, 3, 2, 3, 1, 0, 0, 2, 0, 1,0, 1, 2, 3, 2, 3, 1, 0, 0, 2, 0, 1,
            3, 1, 2, 0, 6, 6, 6, 3, 1, 2, 0, 1,3, 1, 2, 0, 6, 6, 6, 3, 1, 2, 0, 1,
            0, 2, 3,28,28,28,28,28, 7, 8, 9,10,0, 2, 3,28,28,28,28,28, 7, 8, 9,10,
            0, 1, 2, 3, 2, 3, 1, 0, 0, 2, 0, 1,0, 1, 2, 3, 2, 3, 1, 0, 0, 2, 0, 1,
            3, 1, 2, 0, 6, 6, 6, 3, 1, 2, 0, 1,3, 1, 2, 0, 6, 6, 6, 3, 1, 2, 0, 1,
            0, 2, 3,28,28,28,28,28, 7, 8, 9,10,0, 2, 3,28,28,28,28,28, 7, 8, 9,10,
            0, 1, 2, 3, 2, 3, 1, 0, 0, 2, 0, 1,0, 1, 2, 3, 2, 3, 1, 0, 0, 2, 0, 1,
            3, 1, 2, 0, 6, 6, 6, 3, 1, 2, 0, 1,3, 1, 2, 0, 6, 6, 6, 3, 1, 2, 0, 1,
            0, 2, 3,28,28,28,28,28, 7, 8, 9,10,0, 2, 3,28,28,28,28,28, 7, 8, 9,10,
            0, 1, 2, 3, 2, 3, 1, 0, 0, 2, 0, 1,0, 1, 2, 3, 2, 3, 1, 0, 0, 2, 0, 1,
            3, 1, 2, 0, 6, 6, 6, 3, 1, 2, 0, 1,3, 1, 2, 0, 6, 6, 6, 3, 1, 2, 0, 1,
            0, 2, 3,28,28,28,28,28, 7, 8, 9,10,0, 2, 3,28,28,28,28,28, 7, 8, 9,10,
            0, 1, 2, 3, 2, 3, 1, 0, 0, 2, 0, 1,0, 1, 2, 3, 2, 3, 1, 0, 0, 2, 0, 1,
            3, 1, 2, 0, 6, 6, 6, 3, 1, 2, 0, 1,3, 1, 2, 0, 6, 6, 6, 3, 1, 2, 0, 1,
            0, 2, 3,28,28,28,28,28, 7, 8, 9,10,0, 2, 3,28,28,28,28,28, 7, 8, 9,10,
            0, 1, 2, 3, 2, 3, 1, 0, 0, 2, 0, 1,0, 1, 2, 3, 2, 3, 1, 0, 0, 2, 0, 1,
            3, 1, 2, 0, 6, 6, 6, 3, 1, 2, 0, 1,3, 1, 2, 0, 6, 6, 6, 3, 1, 2, 0, 1,
            0, 2, 3,28,28,28,28,28, 7, 8, 9,10,0, 2, 3,28,28,28,28,28, 7, 8, 9,10,
            0, 1, 2, 3, 2, 3, 1, 0, 0, 2, 0, 1,0, 1, 2, 3, 2, 3, 1, 0, 0, 2, 0, 1,
            3, 1, 2, 0, 6, 6, 6, 3, 1, 2, 0, 1,3, 1, 2, 0, 6, 6, 6, 3, 1, 2, 0, 1,
            0, 2, 3,28,28,28,28,28, 7, 8, 9,10,0, 2, 3,28,28,28,28,28, 7, 8, 9,10,
            0, 1, 2, 3, 2, 3, 1, 0, 0, 2, 0, 1,0, 1, 2, 3, 2, 3, 1, 0, 0, 2, 0, 1,
            3, 1, 2, 0, 6, 6, 6, 3, 1, 2, 0, 1,3, 1, 2, 0, 6, 6, 6, 3, 1, 2, 0, 1,
            0, 2, 3,28,28,28,28,28, 7, 8, 9,10,0, 2, 3,28,28,28,28,28, 7, 8, 9,10,
        ],
        getTile: function(col, row) {
            if (col < 0) col = 0;
            if (col >= this.cols) col = this.cols - 1;
            if (row < 0) row = 0;
            if (row >= this.rows) row = this.rows - 1;
            return this.tiles[row * this.cols + col];
        }
    },

    Camera: {
        x: 0,
        y: 0,
        width: 1200,
        height: 800,
        maxX: function() { return App.Map.cols * App.Map.tsize - App.Camera.width; },
        maxY: function() { return App.Map.rows * App.Map.tsize - App.Camera.height; },
        speed: 256,
        move: function(dirx, diry) {
            this.x += dirx * this.speed * (App.Time.deltaTime / 1000);
            this.y += diry * this.speed * (App.Time.deltaTime / 1000);
            this.x = Math.max(0, Math.min(this.x, this.maxX()));
            this.y = Math.max(0, Math.min(this.y, this.maxY()));
        },
    },

    Actors: [
        { attackTime: 1586, id: 0, name: "Actor 0", timeTillNext: 1586 },
        { attackTime: 2537, id: 1, name: "Actor 1", timeTillNext: 2537 },
        { attackTime: 3050, id: 2, name: "Actor 2", timeTillNext: 3050 },
        { attackTime: 2260, id: 3, name: "Actor 3", timeTillNext: 2260 },
        { attackTime: 3400, id: 4, name: "Actor 4", timeTillNext: 3400 },
        { attackTime: 1001, id: 5, name: "Actor 5", timeTillNext: 1001 },
        { attackTime: 2200, id: 6, name: "Actor 6", timeTillNext: 2200 },
        { attackTime: 1250, id: 7, name: "Actor 7", timeTillNext: 1250 },
        { attackTime: 1750, id: 8, name: "Actor 8", timeTillNext: 1750 },
        { attackTime: 1504, id: 9, name: "Actor 9", timeTillNext: 1504 },
        { attackTime: 2500, id: 10, name: "Actor 10", timeTillNext: 2500 },
    ],

    WaitingOnActor: false,

    ReadyActorIDs: [],

    CurrActor: -1,

    ElapsedTime: 0,

    ClearCurrActor: function() {
        App.ReadyActorIDs.splice(App.ReadyActorIDs.indexOf(App.CurrActor), 1);
        if (App.ReadyActorIDs.length == 0) {
            App.CurrActor = -1;
            App.WaitingOnActor = false;
        }
        else {
            App.CurrActor = App.ReadyActorIDs[0];
            if (App.ReadyActorIDs.length > 1) {
                for (i = 1; i < App.ReadyActorIDs.length; i++) {
                    if (App.CurrActor > App.ReadyActorIDs[i]) {
                        App.CurrActor = App.ReadyActorIDs[i];
                    }
                }
            }
        }
    },

    Init: function() {
        App.Time.currTime = Date.now();
        App.Time.lastTime = Date.now();
        App.LoadImages();
        Keyboard.listenForEvents([Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN]);
        var c = document.getElementById("battle");
        c.width = App.Canvas.width;
        c.height = App.Canvas.height;
        App.Ctx = c.getContext('2d');
        if (App.Ticker === null) {
            App.Ticker = window.setTimeout(App.Loop, App.Time.seconds / (App.Params.Focused ? App.Time.focusFPS : App.Time.blurFPS));
        }
        
        /*
        console.log(App.Camera.maxX() + ", " + App.Camera.maxY());

        output = "";
        for (i = 0; i < CODES.length; i++) {
            outputEnc = base64Encode(CODES.charAt(i));
            outputDec = base64Decode(outputEnc);
            output += "<div class='row' style='text-align:center'><div class='col-sm-4'></div><div class='col-sm-2'>" + outputEnc + "</div><div class='col-sm-2'>" + outputDec + "</div><div class='col-sm-4'></div></div>";
        }
        for (i = 0; i < CODES.length -1; i++) {
            for (j = i + 1; j < CODES.length; j++) {
                text = CODES.charAt(i) + CODES.charAt(j);
                outputEnc = base64Encode(text);
                outputDec = base64Decode(outputEnc);
                output += "<div class='row' style='text-align:center'><div class='col-sm-4'></div><div class='col-sm-2'>" + outputEnc + "</div><div class='col-sm-2'>" + outputDec + "</div><div class='col-sm-4'></div></div>";
            }
        }
        document.getElementById("base64").innerHTML = output;
        */
    },

    LoadImages: function() {
        App.TileSheet = document.getElementById("tiles");
    },

    UpdateTime: function() {
        App.Time.currTime = Date.now();
        App.Time.deltaTime = App.Time.currTime - App.Time.lastTime;
        App.Time.elapsedTotal += App.Time.deltaTime;
        App.Time.elapsedSinceSpawn += App.Time.deltaTime;
        App.Time.lastTime = App.Time.currTime;
    },

/*
    UpdateTimers: function() {
        for (i = 0; i < App.Counters.length; i++) {
            counter = App.Counters[i];
            counter.elapsedTime += App.Time.deltaTime;
            if (counter.elapsedTime >= counter.runTime) {
                counter.flashTime += App.Time.deltaTime;                
            }
            if (counter.flashTime >= App.FlashTime) {
                if (counter.func) {
                    counter.func(counter);
                }
                App.Counters.splice(i, 1);
            }
        }
    },
*/

    Logic: function() {
        var dirx = 0;
        var diry = 0;
        if (Keyboard.isDown(Keyboard.LEFT)) { dirx = -1; }
        if (Keyboard.isDown(Keyboard.RIGHT)) { dirx = 1; }
        if (Keyboard.isDown(Keyboard.UP)) { diry = -1; }
        if (Keyboard.isDown(Keyboard.DOWN)) { diry = 1; }

        App.Camera.move(dirx, diry);
        /*
        console.log(App.WaitingOnActor);
        if(!App.WaitingOnActor) {
            var minTime = Number.MAX_VALUE;
            App.ReadyActorIDs = [];

            for (var i = 0; i < App.Actors.length; i++) {
                var attackTime = parseInt(App.Actors[i].attackTime);
                console.log("Attack time: " + attackTime + ", elapsed time: " + App.ElapsedTime);

                actionTime = App.Actors[i].attackTime - (App.ElapsedTime % App.Actors[i].attackTime);
                if (actionTime == minTime) {
                    App.ReadyActorIDs.push(i);
                }
                else if (actionTime < minTime) {
                    App.ReadyActorIDs = [];
                    minTime = actionTime;
                    App.ReadyActorIDs.push(i);
                }
                console.log("Action time: " + actionTime);
            }
            console.log("Min time: " + minTime);

            App.ElapsedTime += minTime;

            for (i = 0; i < App.Actors.length; i++) {
                App.Actors[i].timeTillNext -= minTime;
                if (App.Actors[i].timeTillNext < 0) {
                    console.log("ERROR: negative timeTillNext for " + App.Actors[i].name);
                } 
                else if (App.Actors[i].timeTillNext == 0 ) {
                    if(!App.ReadyActorIDs.includes(i))
                        console.log("ERROR: " + App.Actors[i].name + " not added to readyActorIDs");
                    App.Actors[i].timeTillNext += App.Actors[i].attackTime;
                }
            }            
        }

        console.log(App.ReadyActorIDs.length + " actor" + (App.ReadyActorIDs.length == 1 ? " is" : "s are") + " ready to act.");
            if (App.ReadyActorIDs.length < 1) {
                App.WaitingOnActor = false;
            }
            else {
                App.WaitingOnActor = true;
                App.CurrActor = App.ReadyActorIDs[0];
                if (App.ReadyActorIDs.length > 1) {
                    for (i = 1; i < App.ReadyActorIDs.length; i++) {
                        if (App.CurrActor > App.ReadyActorIDs[i]) {
                            App.CurrActor = App.ReadyActorIDs[i];
                        }
                    }
                }
            }
        
        App.UpdateTimers();
        App.CullLog();
        
        if (App.Time.elapsedSinceSpawn > App.Time.spawnTime) {
            App.SpawnCounter();
            App.Time.elapsedSinceSpawn = 0;
        }
        */
    },

    Draw: function() {
        App.DrawTitle();
        
        /*  
        App.DrawActors();
        
        App.DrawCounters();
        App.DrawResources();        
        App.DrawLog();
        */         

          
        App.DrawMap(); 
    },

    DrawActors() {
        document.getElementById("elapsedTime").innerHTML = App.ElapsedTime;
        if (App.CurrActor >= 0) {
            document.getElementById("currActor").innerHTML = App.Actors[App.CurrActor].name;
            document.getElementById("actorButton").style.display = "block";
        }
        else {
            document.getElementById("currActor").innerHTML = "";
            document.getElementById("actorButton").style.display = "none";
        }
        var output = "<div class='row' style='text-align:center'><div class='col-sm-3'></div><div class='col-sm-3'>Actor Name</div><div class='col-sm-2'>AttackTime</div><div class='col-sm-2'>TimeTillNext</div><div class='col-sm-2'></div></div>";
        for (i = 0; i < App.Actors.length; i++) {
            output += "<div class='row' style='text-align:center'><div class='col-sm-3'></div><div class='col-sm-3'>" + App.Actors[i].name + "</div><div class='col-sm-2'>" + App.Actors[i].attackTime + "</div><div class='col-sm-2'>" + (i == App.CurrActor ? "Acting" : App.Actors[i].timeTillNext) + "</div><div class='col-sm-2'></div></div>";
        }
        document.getElementById("action").innerHTML = output;
    },

    DrawTitle: function() {
        document.title = (App.Params.Focused ? "Focused" : "Blurred") + ": UpdateSpeed = " + (App.Params.Focused ? App.Time.focusFPS : App.Time.blurFPS);
    },

    DrawMap: function() {
        var startCol = Math.floor(App.Camera.x / App.Map.tsize);
        var endCol = Math.min(startCol + Math.floor(App.Camera.width / App.Map.tsize)+2, App.Map.cols * App.Map.tsize);
        var startRow = Math.floor(App.Camera.y / App.Map.tsize);
        var endRow = Math.min(startRow + Math.floor(App.Camera.height / App.Map.tsize)+2, App.Map.rows * App.Map.tsize);
        var offsetX = -App.Camera.x + startCol * App.Map.tsize;
        var offsetY = -App.Camera.y + startRow * App.Map.tsize;

        for (var i = startCol; i < endCol; i++) {
            for (var j = startRow; j < endRow; j++) {
                x = (i - startCol) * App.Map.tsize + offsetX;
                y = (j - startRow) * App.Map.tsize + offsetY;
                /*
                x = i * App.Map.tsize;
                y = j * App.Map.tsize;
                */
                r = App.Map.getTile(i, j);
                App.DrawTile(r, Math.round(x), Math.round(y), 1);
            }
        }
    },

    DrawTile: function(id, posX, posY, scale) {
        x = App.Tiles[id].x * App.TileRes;
        y = App.Tiles[id].y * App.TileRes;        
        App.Ctx.drawImage(App.TileSheet, x, y, App.TileRes, App.TileRes, posX, posY, App.Map.tsize * scale, App.Map.tsize * scale);
    },

/*
    DrawCounters: function() {
        text = "";
        for (i = 0; i < App.Counters.length; i++) {            
            counter = App.Counters[i];
            text += "<tr><td>";
            text += counter.cName;
            text += "</td><td>";
            text += timeFormat(counter.runTime);
            text += "</td><td>";
            if (counter.elapsedTime <= counter.runTime) {
                width = (counter.elapsedTime / counter.runTime) * 100;
                textWidth = Math.round(width);
                text += "<div class='myProgress'><div class='myBar' style='width:" + width + "%;'></div><span class='barText'>"
                + (textWidth > 100 ? 100 : textWidth) + "%</span></div></td></tr>";
            }
            else if (counter.flashTime <= App.FlashTime) {
                heightAdd = Math.round((counter.flashTime / App.FlashTime) * App.FlashHeight);
                width = 250 + heightAdd;
                height = 25 + heightAdd;
                margin = heightAdd / 2;
                text += "<div class='myProgress flashProgress' style='height:" + height + "px; width:" 
                + width + "px; margin:-" + margin + "px -" + margin 
                + "px;'><div class='myBar flashBar' style='width:100%;background-color:rgb(" 
                + lerpColor(50, 255, Math.sqrt(App.FlashTime), Math.sqrt(counter.flashTime), false) + ","
                + lerpColor(205, 255, Math.sqrt(App.FlashTime), Math.sqrt(counter.flashTime), false) + ","
                + lerpColor(50, 255, Math.sqrt(App.FlashTime), Math.sqrt(counter.flashTime), false) + ");opacity:"
                + lerpColor(1, 0, App.FlashTime * App.FlashTime, counter.flashTime * counter.flashTime, true) + ";'></div></div></td></tr>";
            }
        }
        document.getElementById("activeMissionList").innerHTML = text;
    },

    DrawResources: function() {
        text = "";
        for (i = 0; i < App.ResourceType.length; i++) {
            text += "<tr><td>";
            text += App.ResourceType[i];
            text += "</td><td>";
            text += App.ResourceList[App.ResourceType[i]];
            text += "</td></tr>";
        }
        document.getElementById("resourceList").innerHTML = text;
    },

    DrawLog: function() {
        if (App.LogLines.length > App.LogMaxLength) {
            App.CullLog();
        }
        for (var i = 0; i < App.LogLines.length; i++) {
            App.LogLines[i].time -= App.Time.deltaTime;
            if (App.LogLines[i].time <= 0) {
                App.LogLines[i].fading = true;
            }
            if (App.LogLines[i].fading) {
                App.LogLines[i].fadeTime -= App.Time.deltaTime;
                App.LogLines[i].opacity = App.LogLines[i].fadeTime / App.LogFadeTime;                
                if (App.LogLines[i].opacity <= 0.0) {
                    App.LogLines[i].opacity = 0.0;
                    App.LogLines[i].faded = true;
                    App.LogLines[i].fading = false;
                }                
            }
            document.getElementById(App.LogLines[i].id).style.opacity = App.LogLines[i].opacity;
        }
    },

    CullLog: function() {
        if (App.LogLines.length > App.LogMaxLength) {
            while (App.LogLines.length > App.LogMaxLength) {
                $("#" + App.LogLines[0].id).remove();
                App.LogLines.splice(0, 1);
            }
        }
    },

    RefreshLogDraw: function() {
        for (var i = 0; i < App.LogLines.length; i++) {
            if (App.LogLines[i].fading) {
                App.LogLines[i].fading = false;                
            }
            if (App.LogLines[i].faded) {
                App.LogLines[i].faded = false;
            }
            App.LogLines[i].time = App.LogFadeAfterTime * App.Time.seconds;
            App.LogLines[i].fadeTime = App.LogFadeTime;
            App.LogLines[i].opacity = 1.0;     
        }
    },
*/
    Loop: function() {
        App.UpdateTime();
        App.Logic();
        App.Draw();
        App.Ticker = window.setTimeout(App.Loop, App.Time.seconds / (App.Params.Focused ? App.Time.focusFPS : App.Time.blurFPS));
    },

    ResetTimeout: function() {
        clearTimeout(App.Ticker);
        App.Loop();
    },
/*
    Counter: function(name, time, resource, func) {
        this.cName = name;
        this.runTime = time;
        this.startTime = Date.now();
        this.elapsedTime = 0;
        this.flashTime = 0;
        this.resource = resource;
        if (func === undefined) {
            this.func = null;
        } else {
            this.func = func;
        }
        var self = this;
        this.getName = function() {
            return self.cName;
        };
        this.getResources = function() {
            return self.resource;
        }     
    },

    Resource: function(name, amount) {
        this.name = name;
        this.amount = amount;  
        this.getName = function() {
            return this.name;
        }
        this.getAmount = function() {
            return this.amount;
        }
    },

    AddResources: function(counter) {
        App.ResourceList[counter.getResources().getName()] += counter.getResources().getAmount();
        App.Log("Received " + counter.getResources().getAmount() + " " + counter.getResources().getName());
    },

    SpawnCounter: function() {
        var name = "Mission " + (++App.CounterNum);
        var time = App.Time.RandomTime();
        var resAmt = Math.floor(Math.random() * (App.Resources.resourceMax - App.Resources.resourceMin + 1) + App.Resources.resourceMin) * App.Resources.resourceMult;
        var resName = App.ResourceType[Math.floor(Math.random() * App.ResourceType.length)];
        var res = new App.Resource(resName, resAmt);
        var counter = new App.Counter(name, time, res, App.AddResources);
        App.Counters.push(counter);
        App.Log("Spawned new Counter " + name + ", lasting " + timeFormat(time) + ", bringing back " + resAmt + " " + resName+ ".");
    },

    Log: function(text) {
        id = "Log" + App.LogID++;
        index = App.LogLines.push({id: id, time: App.LogFadeAfterTime * App.Time.seconds, opacity: 1.0, fadeTime: App.LogFadeTime, fading: false, faded: false}) - 1;
        para = document.createElement("P");
        para.id = id;
        line = document.createTextNode(text);
        para.appendChild(line);
        log = document.getElementById("log");      
        log.insertBefore(para, log.childNodes[0]);
    },

    ShowModal: function(type, id) {
        element = document.createElement('div');
        element.id='modal';
        element.className ="vex vex-theme-os";
        content = App.ConstructModal(type, id);
        if (App.Modals++ == 0) {
            element.innerHTML = '<div class="vex-overlay"></div>';
        }
        else {
            element.innerHTML = '';
        }
        if (App.Modals > App.Messages.length) {
            return;
        }
        element.innerHTML += '<div class="vex-content"><form class="vex-dialog-form"><div class="vex-dialog-message" onclick="App.ShowModal(2, ' + App.Modals + ');">' + content + '</div><div class="vex-dialog-input"></div><div class="vex-dialog-buttons"><button class="vex-dialog-button-primary vex-dialog-button vex-first" type="button" onclick="App.HideModal(true);">OK</button></div></form></div>';
        document.querySelector('body').appendChild(element);
        $(document.body).addClass('vex-open');
    },

    ConstructModal: function(caller, id) {
        switch(caller) {
            case App.ModalTypes.MISSION:
                return "Mission Screen";
                break;
            case App.ModalTypes.HERO_SELECT:
                return "Hero Selection Screen";
                break;
            case App.ModalTypes.MESSAGE:
                return App.Messages[id];
                break;
            default:
                return "ModalType " + caller + " not found.";                
        }
    },

    HideModal: function() {        
        $(document.body.lastChild).addClass('vex-closing');
        window.setTimeout(function() {
            document.body.removeChild(document.body.lastChild);
        }, 500);
        if(App.Modals-- == 1) {
            $(document.body).removeClass('vex-open');
        }
    },

    ShowSecondModal: function(message) {
        console.log("Second modal called");
        element = document.createElement('div');
        element.id='modal2';
        element.className ="vex vex-theme-os";
        element.innerHTML = '<div class="vex-content"><form class="vex-dialog-form"><div class="vex-dialog-message">'+ message + '</div><div class="vex-dialog-input"></div><div class="vex-dialog-buttons"><button class="vex-dialog-button-primary vex-dialog-button" type="button" onclick="App.HideModal(false);">OK</button></div></form></div>';
        document.querySelector('body').appendChild(element);
    },
    */
};



window.addEventListener('focus', function() {
    App.Params.Focused = true;
    App.ResetTimeout();
}, false);

window.addEventListener('blur', function() {
    App.Params.Focused = false;
}, false);

window.onload = App.Init();