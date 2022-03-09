<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>个人中心</el-breadcrumb-item>
            <el-breadcrumb-item>个人信息</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 警告区域
            <el-alert
                title="注意：只允许修改基础信息相关参数！"
                type="warning"
                show-icon
                :closable="false"
            >
            </el-alert> -->
            
            <el-card class="oneself-card">
                <div slot="header" class="clearfix">
                    <span>基本信息</span>
                    <el-button style="float: right; padding: 3px 0" type="text"
                        ></el-button
                    >
                </div>
                <div
                    v-for="(value, keyname) of userInfo"
                    :key="value"
                    class="text item"
                >
                    {{ keyname + " : " + value }}
                </div>
            </el-card>
            <el-card class="oneself-card">
                <div slot="header" class="clearfix">
                    <span>当前登录角色为:<b>{{"\n"+loginrole}}</b></span>
                    <!-- <el-button style="float: right; padding: 3px 0" type="text"
                        >修改</el-button
                    > -->
                </div>
                <img :src="src" width="250px"/>
            </el-card>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "Oneself",
    data() {
        return {
            // 用户数据
            userInfo: {},
            // 级联选择器配置
            userPrime: [],
            // 级联选择器绑定数据
            selectedCateKeys: [],
            loginrole:"",
            src:""
        };
    },
    created() {
        this.getUserInfo();
    },
    methods: {
        async getUserInfo() {
            const { data: data } = await this.$http.post("login/getInfo");
            if (data.code !== "200") {
                return this.$message.error("用户信息获取失败！");
            }
            this.userInfo = {
                用户名: data.info.username,
                昵称: data.info.nickname,
            };
            console.log(data.info.roleIds[0]);
            let rolenum = data.info.roleIds[0];
            if(rolenum == 1){
                this.loginrole = "管理员"
                this.src = require("../../assets/adm.png")
            }else{
                 this.loginrole = "访客"
                 this.src = require("../../assets/cat5.jpg")
            }
            this.userPrime = data.info.permissionList
        },
    },
};
</script>

<style lang="less" scoped>
.cat_opt {
    margin: 15px 0;
}
.oneself-card {
    margin-top: 15px;
    width: 600px;
}
.prime{
    cursor: pointer;
    color: rgb(80, 153, 172);
}
.text{
    margin-top: 10px;
}
.text:first-of-type{
    margin-top: 0;
}
</style>
