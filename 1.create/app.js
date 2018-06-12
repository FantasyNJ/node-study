const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');

var fs = require("fs")
var path = require('path')

const port = 8888;

app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
    await next(); // 调用下一个middleware
});

app.use(async (ctx, next) => {
    const start = new Date().getTime(); // 当前时间
    await next(); // 调用下一个middleware
    const ms = new Date().getTime() - start; // 耗费时间
    console.log(`Time: ${ms}ms`); // 打印耗费时间
});

// 使用ctx.body解析中间件
app.use(bodyParser())
// add router middleware:
app.use(router.routes());

router.get('/', async (ctx, next) => {
    ctx.response.body = '<h1>Index</h1>';
});

router.get('/login', async (ctx, next) => {
    let html = fs.createReadStream( path.join(__dirname, './static/html/login.html') );
    ctx.type = 'html'
    ctx.response.body = html;
});

router.get('/api/login', async (ctx, next) => {
    ctx.body = 'get';
    ctx.body = ctx.request.query;
});

router.post('/api/login', async (ctx, next) => {
    ctx.body = ctx.request.body;
});






router.get('/hello', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello!</h1>`;
})

router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
})

router.get('*', async (ctx, next) => {
    ctx.response.body = '<h1>404 Not Found</h1>';
});

app.listen(port);
console.log(`listening: ${port}`);