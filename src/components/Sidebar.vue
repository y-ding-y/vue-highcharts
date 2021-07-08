<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from './bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    // {
                    //     icon: 'el-icon-lx-text',
                    //     index: 'charts',
                    //     title: '首頁'
                    // },
                    {
                        icon: "el-icon-cherry",
                        index: "omhighchart",
                        title: "OM产出推移",
                    },
                    {
                        icon: "el-icon-lx-text",
                        index: "byline",
                        title: "各產線產出推移"
                    },
                    // {
                    //     icon: "el-icon-orange",
                    //     index: "bymonth",
                    //     title: "产出月报"
                    // },
                    {
                        icon: "el-icon-orange",
                        index: "total",
                        title: "產出匯總"
                    },
                    {
                        icon: "el-icon-apple",
                        index: "summary",
                        title: "总计"
                    },
                    {
                        icon: "el-icon-edit",
                        title: "Excel资料维护",
                        index: "routepage"
                    },
                    // {
                    //     icon: "el-icon-refrigerator",
                    //     index: "infomanage",
                    //     title: "資料維護",
                    //     subs: [
                    //         {
                    //             index: "uploadexcel",
                    //             title: "上傳excel(vue version)"
                    //         },
                    //         {
                    //             index: "excelform",
                    //             title: "上傳excel(vue version)"
                    //         },
                    //         // {
                    //         //     index: "infomanage",
                    //         //     title: "上傳excel(jquery version)"
                    //         // },

                    //     ]
                    // },
                    // {
                    //     icon:"el-icon-lx-text",
                    //     index:"searchbyday",
                    //     title:"產量查詢"
                    // }

                ]
            };
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '');
            }
        },
        created() {
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
                bus.$emit('collapse-content', msg);
            });
        }
    };
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom: 0;
        overflow-y: scroll;
    }

    .sidebar::-webkit-scrollbar {
        width: 0;
    }

    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 250px;
    }

    .sidebar>ul {
        height: 100%;
    }
</style>