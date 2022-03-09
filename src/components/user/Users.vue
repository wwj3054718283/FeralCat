<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <!-- 搜索与添加区域 -->
            <el-row :gutter="20">
                <el-col :span="7"
                    ><el-input
                        placeholder="请输入内容"
                        v-model="seekvalue"
                        clearable
                        @clear="closeUserList"
                    >
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                            @click="seekUserList"
                        ></el-button> </el-input
                ></el-col>
                <el-col :span="4" v-if="rolerank">
                    <el-button type="primary" @click="addDialogVisible = true"
                        >添加用户</el-button
                    >
                </el-col>
                <el-col :span="4" v-if="rolerank">
                    <el-button
                        type="primary"
                        @click="deleteDialogVisible = true"
                        >批量删除</el-button
                    >
                </el-col>
            </el-row>
            <el-row :gutter="20" v-if="deleteDialogVisible" class="deletecla">
                <el-col :span="4">
                    <el-button type="danger" @click="deleteUser"
                        >确认删除</el-button
                    >
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="redeleteUser"
                        >取消</el-button
                    >
                </el-col>
            </el-row>
            <!-- 用户列表区域 -->
            <el-table
                :data="userlist"
                border
                stripe
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="index"> </el-table-column>
                <el-table-column
                    label="删除"
                    type="selection"
                    v-if="deleteDialogVisible"
                    :selectable="handleCheckedUser"
                >
                </el-table-column>
                <el-table-column label="昵称" prop="nickname">
                </el-table-column>
                <el-table-column label="性别" prop="sex"> </el-table-column>
                <el-table-column label="电话" prop="tel"> </el-table-column>
                <el-table-column label="住址" prop="address"> </el-table-column>
                <el-table-column label="操作" width="180px" >
                    <template v-slot:default="slotProps">
                        <!-- 查看 -->
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="查看角色"
                            placement="top"
                            :enterable="false"
                        >
                            <el-button
                                type="primary"
                                icon="el-icon-user"
                                size="mini"
                                @click="showEditDialog(slotProps.row)"
                            ></el-button>
                        </el-tooltip>
                        <!--更改 -->
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="更改角色"
                            placement="top"
                            :enterable="false"
                        v-if="rolerank" >
                            <el-button
                                type="danger"
                                icon="el-icon-edit"
                                size="mini"
                                @click="editEditDialog(slotProps.row)"
                            ></el-button>
                        </el-tooltip>
                        <!-- 删除 -->
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="删除角色"
                            placement="top"
                            :enterable="false"
                        v-if="rolerank">
                            <el-button
                                type="waring"
                                icon="el-icon-setting"
                                size="mini"
                                @click="setRole(slotProps.row)"
                            ></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页区域 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[2, 5, 10]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            >
            </el-pagination>

            <!-- 添加用户对话框 -->
            <el-dialog
                title="添加用户"
                :visible.sync="addDialogVisible"
                width="50%"
                @close="addDialogClosed"
            >
                <!-- 内容主体区域 -->
                <el-form
                    :model="addForm"
                    :rules="addFormRules"
                    ref="addFormRef"
                    label-width="70px"
                >
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="addForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input
                            v-model="addForm.password"
                            show-password
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="昵称" prop="nickname">
                        <el-input v-model="addForm.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-input class="input-role" v-model="addForm.sex">
                            <el-select
                                v-model="addForm.sex"
                                slot="prepend"
                                placeholder="请选择"
                            >
                                <el-option label="男性" value="男"></el-option>
                                <el-option label="女性" value="女"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="年龄" prop="age">
                        <el-input v-model="addForm.age"></el-input>
                    </el-form-item>
                    <el-form-item label="联系" prop="tel">
                        <el-input v-model="addForm.tel"></el-input>
                    </el-form-item>
                    <el-form-item label="住址" prop="address">
                        <el-input v-model="addForm.address"></el-input>
                    </el-form-item>
                    <el-form-item label="角色" prop="roleIds">
                        <el-input class="input-role" v-model="addForm.roleIds">
                            <el-select
                                v-model="addForm.roleIds"
                                slot="prepend"
                                placeholder="请选择"
                            >
                                <el-option label="管理员" value="1"></el-option>
                                <el-option label="访客" value="2"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>
                </el-form>
                <!-- 底部区域 -->
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addDialogVisible = false"
                        >取 消</el-button
                    >
                    <el-button type="primary" @click="addUser">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 修改用户对话框 -->
            <el-dialog
                title="查看用户"
                :visible.sync="showDialogVisible"
                width="50%"
                @close="showDialogClosed"
            >
                <el-form
                    :model="showForm"
                    :rules="showFormRules"
                    ref="editFormRef"
                    label-width="70px"
                >
                    <el-form-item label="用户名">
                        <el-input
                            v-model="showForm.username"
                            disabled
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="昵称" prop="nickname">
                        <el-input
                            v-model="showForm.nickname"
                            disabled
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input v-model="showForm.tel" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-input v-model="showForm.sex" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="年龄">
                        <el-input v-model="showForm.age" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="住址">
                        <el-input
                            v-model="showForm.address"
                            disabled
                        ></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="showDialogVisible = false"
                        >取 消</el-button
                    >
                    <el-button type="primary" @click="showDialogVisible = false"
                        >确 定</el-button
                    >
                </span>
            </el-dialog>

            <!-- 修改用户对话框 -->
            <el-dialog
                title="更改用户"
                :visible.sync="editDialogVisible"
                width="50%"
                @close="editDialogClosed"
            >
                <el-form
                    :model="editForm"
                    :rules="editFormRules"
                    ref="editFormRef"
                    label-width="70px"
                >
                    <el-form-item label="用户id">
                        <el-input v-model="editForm.userId" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="密码" prop="password">
                        <el-input
                            v-model="editForm.password"
                            show-password
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="昵称">
                        <el-input v-model="editForm.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="角色" prop="roleIds">
                        <el-input class="input-role" v-model="editForm.roleIds">
                            <el-select
                                v-model="editForm.roleIds"
                                slot="prepend"
                                placeholder="访客"
                            >
                                <el-option label="管理员" value="1"></el-option>
                                <el-option label="访客" value="2"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editDialogVisible = false"
                        >取 消</el-button
                    >
                    <el-button type="primary" @click="editUserInfo"
                        >确 定</el-button
                    >
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        // 验证邮箱规则
        let checkEmail = (rule, value, cb) => {
            const regEmail =
                /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if (regEmail.test(value)) {
                // 合法邮箱
                return cb();
            }
            cb(new Error("邮箱格式错误"));
        };
        // 验证电话号码规则
        let checkMobile = (rule, value, cb) => {
            const regMobile = /^1[3456789]\d{9}$/;
            if (regMobile.test(value)) {
                // 合法手机号
                return cb();
            }
            cb(new Error("手机号格式错误"));
        };
        return {
            // 权限级别
            rolerank: false,
            // 获取用户列表参数对象
            queryInfo: {
                pagenum: 1,
                //当前每页显示数据条数
                pagesize: 5,
            },
            seekvalue: "",
            userlist: [],
            total: 0,
            // 控制添加用户框的显示和隐藏
            addDialogVisible: false,
            // 添加用户的表单数据
            addForm: {
                username: "",
                password: "",
                nickname: "",
                sex: "",
                age: "",
                tel: "",
                address: "",
                roleIds: "",
            },
            // 添加表单验证规则对象
            addFormRules: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur",
                    },
                    {
                        min: 0,
                        max: 10,
                        message: "长度在 3 到 10 个字符",
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur",
                    },
                    {
                        min: 6,
                        max: 15,
                        message: "长度在 6 到 15 个字符",
                        trigger: "blur",
                    },
                ],
                email: [
                    {
                        required: true,
                        message: "请输入邮箱",
                        trigger: "blur",
                    },
                    { validator: checkEmail, trigger: "blur" },
                ],
                tel: [
                    {
                        required: true,
                        message: "请输入联系方式",
                        trigger: "blur",
                    },
                    {
                        min: 7,
                        max: 11,
                        message: "长度在 7 到 11 个字符",
                        trigger: "blur",
                    },
                ],
            },
            // 控制批量删除选择框得显示与隐藏
            deleteDialogVisible: false,
            deletecheckedUsers: [],
            // 控制查询对话框的显示与隐藏
            showDialogVisible: false,
            // 查询到的用户信息列表
            showForm: {},
            // 查询表单验证规则对象
            showFormRules: {
                email: [
                    {
                        required: true,
                        message: "请输入邮箱",
                        trigger: "blur",
                    },
                    { validator: checkEmail, trigger: "blur" },
                ],
                mobile: [
                    {
                        required: true,
                        message: "请输入手机",
                        trigger: "blur",
                    },
                    { validator: checkMobile, trigger: "blur" },
                ],
            },
            // 控制修改对话框的显示与隐藏
            editDialogVisible: false,
            // 查询到的用户信息列表
            editForm: {},
            // 修改表单验证规则对象
            editFormRules: {
                email: [
                    {
                        required: true,
                        message: "请输入邮箱",
                        trigger: "blur",
                    },
                    { validator: checkEmail, trigger: "blur" },
                ],
                mobile: [
                    {
                        required: true,
                        message: "请输入手机",
                        trigger: "blur",
                    },
                    { validator: checkMobile, trigger: "blur" },
                ],
            },
            // 需要被分配角色信息
            userinfo: {},
            // 所有角色数据列表
            rolesList: [],
            // 已选中角色id值
            selectedRoleId: "",
            // 已选中删除角色ID
            deldatas: [],
        };
    },
    created() {
        this.getUserList();
    },
    methods: {
        async getUserList() {
            let rank = window.sessionStorage.getItem("rolerank");
            if (rank == 1) {
                this.rolerank = true;
            }
            const { data: data } = await this.$http.get("user/list", {
                params: {
                    pageNum: this.queryInfo.pagenum,
                    pageRow: this.queryInfo.pagesize,
                },
            });
            console.log(data);
            if (data.code == "200") {
                this.userlist = data.info.list;
                this.total = data.info.totalCount;
                return 1;
            } else {
                return this.$message.error("用户信息获取失败！");
            }
        },
        async seekUserList() {
            console.log(this.seekvalue);
            const { data: data } = await this.$http.get("user/listByName", {
                params: {
                    nickname: this.seekvalue,
                    pageNum: "1",
                    pageRow:"10",
                },
            });
            if (data.code == "200") {
                this.userlist = data.info.list;
                this.total = data.info.totalCount;
                return 1;
            } else {
                return this.$message.error("用户信息获取失败！");
            }
        },
        closeUserList() {
             this.getUserList()
        },
        //监听pagesize改变事件
        handleSizeChange(newSize) {
            this.queryInfo.pagesize = newSize;
            this.getUserList();
        },
        //监听页码值改变
        handleCurrentChange(newPage) {
            this.queryInfo.pagenum = newPage;
            this.getUserList();
        },
        //监听switch开关状态
        async userStateChanged(userinfo) {
            console.log(userinfo);
            // const { data: res } = await this.$http.put(
            //     `users/${userinfo.id}/state/${userinfo.mg_state}`
            // );
            // if (res.meta.status !== 200) {
            //     userinfo.mg_state = !userinfo.mg_state;
            //     return this.$message.error("更新用户状态失败");
            // }
            // this.$message.success("更新用户状态成功");
        },
        // 监听用户框关闭事件
        addDialogClosed() {
            this.$refs.addFormRef.resetFields();
        },
        // 点击按钮，添加用户
        addUser() {
            this.$refs.addFormRef.validate(async (valid) => {
                // console.log(valid);
                // console.log(this.$refs.addFormRef.model);

                if (!valid)
                    return this.$message.error("用户信息错误，添加用户失败");
                let roleID = [Number(this.addForm.roleIds)];
                delete this.addForm.roleIds;
                this.addForm.roleIds = roleID;
                console.log(this.addForm);
                // 发起添加用户的网络请求
                const { data: data } = await this.$http.post(
                    "user/addUser",
                    this.addForm
                );
                console.log(data);
                if (data.code == "200") {
                    this.$message.success("添加用户成功！");
                    this.addDialogVisible = false;
                    this.getUserList();
                    delete this.addForm.roleIds;
                    this.addForm.roleIds = "";
                    return 1;
                }
                this.$message.error("添加用户失败！");
            });
        },
        //展示查看用户对话框
        showEditDialog(data) {
            console.log(data);
            this.showForm = data;
            this.showDialogVisible = true;
        },
        // 监听查看用户对话框的关闭事件
        showDialogClosed() {
            this.$refs.editFormRef.resetFields();
        },
        //展示查看用户对话框
        editEditDialog(data) {
            console.log(data);
            this.editForm = data;
            this.editDialogVisible = true;
        },
        // 监听修改用户对话框的关闭事件
        editDialogClosed() {
            this.$refs.editFormRef.resetFields();
        },
        // 修改用户信息并提交
        editUserInfo() {
            this.$refs.editFormRef.validate(async (valid) => {
                if (!valid)
                    return this.$message.error("用户信息错误，修改用户失败");
                // 发起修改用户信息请求
                let req = {
                    userId: this.editForm.userId,
                    nickname: this.editForm.nickname,
                    password: this.editForm.password,
                    roleIds: [
                        Number(this.editForm.roleIds)
                            ? Number(this.editForm.roleIds)
                            : Number("2"),
                    ],
                    deleteStatus: "1",
                };
                const { data: data } = await this.$http.post(
                    "user/updateUser",
                    req
                );
                // console.log(data);
                this.editDialogVisible = false;
                this.getUserList();
                this.$message.success("修改用户信息成功！");
                // console.log(res);
            });
        },
        // 批量删除用户多选框
        handleCheckedUser(row, index) {
            return true;
        },
        handleSelectionChange(selection) {
            let dataarr = [];
            selection.filter((item) => {
                dataarr.push(item.userId);
                return item.userId;
            });
            this.deletecheckedUsers = dataarr;
        },
        // 批量删除用户
        async deleteUser() {
            console.log(this.deletecheckedUsers);
            const { data: data } = await this.$http.post(
                "user/batchDeleteUser",
                {
                    userId: this.deletecheckedUsers,
                    deleteStatus: "2",
                }
            );
            console.log(data);
            this.getUserList();
            this.deleteDialogVisible = false;
        },
        // 重置删除用户表
        redeleteUser() {
            this.deletecheckedUsers = [];
            this.deleteDialogVisible = false;
        },
        //根据id删除对应用户信息
        async removeUserById(id) {
            const confirmResult = await this.$confirm(
                "是否删除该用户?",
                "删除用户",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }
            ).catch((err) => err);
            // 确定结果confirm 取消结果cancel
            if (confirmResult !== "confirm") {
                return this.$message.info("已取消删除");
            }
            const { data: res } = await this.$http.delete(`users/${id}`);
            if (res.meta.status !== 200) {
                return this.$message.error("删除用户失败！");
            }
            this.$message.success("用户已删除");
            this.getUserList();
        },
        // 单机删除
        async setRole(item) {
            console.log(item);
            this.$confirm("是否删除该用户, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(async () => {
                    const { data: data } = await this.$http.post(
                        "user/updateUser",
                        {
                            userId: item.userId,
                            nickname: item.nickname,
                            roleIds: [item.roles.roleId],
                            deleteStatus: "2",
                        }
                    );
                    console.log(data);
                    if (data.code == "200") {
                        this.getUserList();
                        return 1;
                    }
                    this.$message.error("无法对初始管理员账号进行操作！");
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
    },
};
</script>

<style lang='less' scoped>
.el-card {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}
.el-select {
    width: 200px;
}
.deletecla {
    margin: 15px 0;
}
</style>
