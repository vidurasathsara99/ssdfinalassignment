const Router = require('@koa/router');
const router = new Router({
    prefix:'/home'
});
//get method in home
router.get('/', async context=>{
    context.body="Got from Home Router";
    //await context.render('index');
    //router.redirect('/front/index.html');
});
//get method in home
router.get('/1', async context=>{
    context.body="Got from Home Router";
    //await context.render('index-react');
    //router.redirect('/front/index.html');
});
//post method in home
router.post('/',context=>{
    context.body="Posted from Home Router";
});
exports.DefaultRouter=router;