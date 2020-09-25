//创建全局组件--回到顶部按钮
let goTopCpn = Vue.extend({
    template: "#goTopTemp",
    data: function () {
        return {
            scrollTop: 0, //记录滚动条的垂直位置
        };
    },
    //回到顶部按钮的方法区
    methods: {
        goTop() {
            //这里的原理是用定时器每5毫秒执行一次函数，每一次滚轮px减10，直到0为止,首先判断是否存在
            let timeCouter = setInterval(function () {
                if (
                    window.pageYOffset ||
                    document.documentElement.scrollTop ||
                    document.body.scrollTop
                ) {
                    window.pageYOffset -= 10;
                    document.documentElement.scrollTop -= 10;
                    document.body.scrollTop -= 10;
                } else {
                    clearInterval(timeCouter); //scrollTop到0时就移除定时器
                }
            }, 5);
        },
        getScrollTop() {// 由于浏览器的兼容性问题,本例中通过三种方式判断偏移的位置
            this.scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
        },
    },
    //钩子函数,当加载的时候给window对象添加事件
    mounted() {
        window.addEventListener("scroll", this.getScrollTop);
    },
    //计算属性,通过计算属性确定是否显示返回按钮,本例中也可使用判断表达式的方式
    computed: {
        topDistance: function () {
            //判断滚轮位置是否大于100px，如果大于就true，否则false,本例也可以不使用该计算属性
            return (value = this.scrollTop > 100 ? true : false);
        },
    }
});
let indexCpn = Vue.extend({
    template: "#indexTemp",
});
let foodCategoryCpn = Vue.extend({
    template: "#foodCategoryTemp",
});
let bannerCpn = Vue.extend({
    template: '#bannerTemp',
});
let supermemberCpn = Vue.extend({
    template: '#supermemberTemp',
});
let recommendCpn = Vue.extend({
    template: '#recommendTemp',
});
let recommendTypeCpn = Vue.extend({
    template: '#recommendTypeTemp',
});
let recommendMerchantCpn = Vue.extend({
    template: "#recommendMerchantTemp",
});
let merchantListCpn = Vue.extend({
    template: "#merchantListTemp",
});
let merchantInfoCpn = Vue.extend({
    template: "#merchantInfoTemp",
});
let mainNavCpn = Vue.extend({
    template: "#mainNavTemp",
});
let topCpn = Vue.extend({
    template: "#topTemp",
});
let businessListCpn = Vue.extend({
    template: "#businessListTemp",
});
let chooseFoodCpn = Vue.extend({
    template: "#chooseFoodTemp",
});
let businessInfoCpn = Vue.extend({
    template: "#businessInfoTemp",
});

//登录注册界面创建组件
let dengLuCpn = Vue.extend({
    template:'#dengLu',
});
let zhuCeCpn = Vue.extend({
    template:'#zhuCe',
});
//支付，确认支付，订单界面
let zhiFuCpn = Vue.extend({
    template: '#zhiFu',
    data: function () {
        return {
            xiala: false
        }
    }
});
let queRenCpn = Vue.extend({
    template: '#queRen',
});
let dingDanCpn = Vue.extend({
    template: '#dingDan',
    data: function () {
        return {
            xiala1: false,
            xiala2: false,
            xiala3: false,
            xiala4: false,
        }
    }
});
//注册为全局组件
Vue.component("gotopcpn", goTopCpn);
Vue.component("mainnavcpn", mainNavCpn);
Vue.component("topcpn", topCpn);
Vue.component("indexcpn", indexCpn);
Vue.component("foodcategorycpn", foodCategoryCpn);
let bannercpn = Vue.component('bannercpn', bannerCpn);
let supermembercpn = Vue.component('supermembercpn', supermemberCpn);
let recommendcpn = Vue.component('recommendcpn', recommendCpn);
let recommendtypecpn = Vue.component('recommendtypecpn', recommendTypeCpn);
Vue.component("recommendmerchantcpn", recommendMerchantCpn);
Vue.component("merchantlistcpn", merchantListCpn);
Vue.component("merchantinfocpn", merchantInfoCpn);
Vue.component("businesslistcpn", businessListCpn);
Vue.component("choosefoodcpn", chooseFoodCpn);
Vue.component("businessinfocpn", businessInfoCpn);

//登录界面注册组件
let zhucecpn = Vue.component('zhucecpn',zhuCeCpn);
let denglucpn = Vue.component('denglucpn',dengLuCpn);
//注册确认支付、在线支付、订单组件
let zhifucpn = Vue.component('zhifucpn', zhiFuCpn);
let dingdancpn = Vue.component('dingdancpn', dingDanCpn);
let querencpn = Vue.component('querencpn', queRenCpn);
//配置路由
let routes = [
    {path: '/index', component: indexCpn},
    {path: '/merchantlist', component: merchantListCpn},
    {path: '/merchantInfo', component: merchantInfoCpn},
    /*{path: '/curs', component: curs,
        //配置子路由
        children: [
            {path: '/curs/advance',component: advance},
            {path: 'normal',component:  normal},
            {path: 'base',component:  base}
        ]},*/
    {path:'/denglu',component:dengLuCpn},
    {path:'/zhuce',component:zhuCeCpn},
    {path: '/zhifu', component: zhiFuCpn},
    {path: '/queren', component: queRenCpn},
    {path: '/dingdan', component: dingDanCpn},


    {path: '/', redirect: '/index'},
    {path: '*', redirect: '/index'}
];
//注册路由
let router = new VueRouter({
    routes: routes,/*此处是routes,一定要牢记*/
    linkActiveClass: 'active'/*自定义激活的链接的样式*/
});
//根组件
const vm = new Vue({
    el: "#app",
    data: {
        foodCategory: [],
        recommendMerchant: [],
        shopLists: [],
        foodLists:[]
    },
    router: router,
    //挂载钩子上添加获取数据的处理
    mounted: function () {
        this.$http.get("goods.json").then(
            function (res) {
                this.foodCategory = res.body.foodCategory;
                this.recommendMerchant = res.body.recommendMerchant;
                this.shopLists = res.body.shopLists;
                this.foodLists = res.body.foodLists;
            }
        );
    }
});

//通过返回顶部的按钮已经可以学习到vue如何实现滚动事件监听,但是编写起来还是比较麻烦的,所以搜索栏本例使用jQuery完成
$(document).ready(function () {
    //当滚动条的位置处于距顶部50像素以下时，
    $(window).scroll(function () {
        if ($(".currentLoc").length) {//如果存在location定位则使用A处理方案
            if ($(window).scrollTop() > 60) {//注意在css样式定义中,currentLoc被定义为60了
                $(".topBanner").addClass("fixed-top")
                $(".topBanner .currentLoc").css("display", "none");
            } else {
                $(".topBanner").removeClass("fixed-top");
                $(".topBanner .currentLoc").css("display", "block");
            }
        } else {//否则使用B处理方案
            $(".topBanner").addClass("fixed-top");
        }
    });
});
