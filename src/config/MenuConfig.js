const menuList = [
    {
        title:'首页',
        key:'/home'
    },
    // {
    //     title:'UI',
    //     key:'/ui',
    //     children:[
    //         {
    //             title:'按钮',
    //             key:'/ui/buttons',
    //         },
    //         {
    //             title:'弹框',
    //             key:'/ui/modals',
    //         },
    //         {
    //             title:'Loading',
    //             key:'/ui/loadings',
    //         },
    //         {
    //             title:'通知提醒',
    //             key:'/ui/notification',
    //         },
    //         {
    //             title:'全局Message',
    //             key:'/ui/messages',
    //         },
    //         {
    //             title:'Tab页签',
    //             key:'/ui/tabs',
    //         },
    //         {
    //             title:'图片画廊',
    //             key:'/ui/gallery',
    //         },
    //         {
    //             title:'轮播图',
    //             key:'/ui/carousel',
    //         }
    //     ]
    // },
    {
        title:'用户管理',
        key:'/user',
        children:[
            {
                title:'app用户',
                key:'/user/app',
            },
            {
                title:'后端用户',
                key:'/user/back',
            }
        ]
    },
    {
        title:'数据管理',
        key:'/manage',
        children:[
            {
                title:'球员信息管理',
                key:'/manage/player',
            },
            {
                title:'球队信息管理',
                key:'/manage/team',
            }
        ]
    },
    {
        title:'论坛管理',
        key:'/forum',
        // children:[
        //     {
        //         title:'基础表格',
        //         key:'/table/basic',
        //     },
        //     {
        //         title:'高级表格',
        //         key:'/table/high',
        //     }
        // ]
    },
    // {
    //     title:'富文本',
    //     key:'/rich'
    // },
    // {
    //     title:'城市管理',
    //     key:'/city'
    // },
    // {
    //     title:'订单管理',
    //     key:'/order',
    //     btnList:[
    //         {
    //             title:'订单详情',
    //             key:'detail'
    //         },
    //         {
    //             title:'结束订单',
    //             key:'finish'
    //         }
    //     ]
    // },
    // {
    //     title:'员工管理',
    //     key:'/user'
    // },
    // {
    //     title:'车辆地图',
    //     key:'/bikeMap'
    // },
    // {
    //     title:'图标',
    //     key:'/charts',
    //     children:[
    //         {
    //             title:'柱形图',
    //             key:'/charts/bar'
    //         },
    //         {
    //             title:'饼图',
    //             key:'/charts/pie'
    //         },
    //         {
    //             title:'折线图',
    //             key:'/charts/line'
    //         },
    //     ]
    // },
    // {
    //     title:'权限设置',
    //     key:'/permission'
    // },
];
export default menuList;
