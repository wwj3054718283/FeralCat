<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>救助机构管理</el-breadcrumb-item>
            <el-breadcrumb-item>机构管理</el-breadcrumb-item>
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
                        >添加机构</el-button
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
            <!-- 列表区域 -->
            <el-table
                :data="teachlist"
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
                <el-table-column label="名字" prop="organizationName">
                </el-table-column>
                <el-table-column label="电话" prop="organizationTel"> </el-table-column>
                <el-table-column label="地址" prop="organizationAddress"> </el-table-column>
                <el-table-column label="描述" prop="organizationDescription"> </el-table-column>
                <el-table-column label="操作" width="180px"  >
                    <template v-slot:default="slotProps">
                        <!-- 查看 -->
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="查看"
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
                            content="更改"
                            placement="top"
                            :enterable="false"
                        v-if="rolerank">
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
                            content="删除"
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
                title="添加救助机构信息"
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
                    <el-form-item label="机构名字" >
                        <el-input v-model="addForm.organizationName"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" >
                        <el-input v-model="addForm.organizationTel"></el-input>
                    </el-form-item>
                     <el-form-item label="机构地址" >
                        <el-input v-model="addForm.organizationAddress"></el-input>
                    </el-form-item>
                    <el-form-item label="详情描述" >
                        <el-input type="textarea" v-model="addForm.organizationDescription"></el-input>
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
                title="查看救助机构"
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
                    <el-form-item label="机构名字">
                        <el-input
                            v-model="showForm.organizationName"
                            disabled
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话">
                        <el-input type="textarea" v-model="showForm.organizationTel" disabled></el-input>
                    </el-form-item>
                      <el-form-item label="机构地址">
                        <el-input type="textarea" v-model="showForm.organizationAddress" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="详情描述">
                        <el-input type="textarea" v-model="showForm.organizationDescription" disabled></el-input>
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
                title="更改救助机构信息"
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
                    <el-form-item label="机构名字">
                        <el-input
                            v-model="editForm.organizationName"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话">
                        <el-input type="textarea" v-model="editForm.organizationTel" ></el-input>
                    </el-form-item>
                      <el-form-item label="机构地址">
                        <el-input type="textarea" v-model="editForm.organizationAddress" ></el-input>
                    </el-form-item>
                    <el-form-item label="详情描述">
                        <el-input type="textarea" v-model="editForm.organizationDescription" ></el-input>
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
            teachlist: [],
            total: 0,
            // 控制添加用户框的显示和隐藏
            addDialogVisible: false,
            // 添加用户的表单数据
            addForm: {
                teachTitle: '',
                teachContent: ''
            },
            // 添加表单验证规则对象
            addFormRules: {
                teachTitle: [
                    {
                        required: true,
                        message: "请输入标题",
                        trigger: "blur",
                    }
                ],
                teachContent: [
                    {
                        required: true,
                        message: "请输入内容",
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
                teachTitle: [
                    {
                        required: true,
                        message: "请输入标题",
                        trigger: "blur",
                    }
                ],
                teachContent: [
                    {
                        required: true,
                        message: "请输入内容",
                        trigger: "blur",
                    },
                ],
            },
            // 控制修改对话框的显示与隐藏
            editDialogVisible: false,
            // 查询到的用户信息列表
            editForm: {},
            // 修改表单验证规则对象
            editFormRules: {
                teachTitle: [
                    {
                        required: true,
                        message: "请输入标题",
                        trigger: "blur",
                    }
                ],
                teachContent: [
                    {
                        required: true,
                        message: "请输入内容",
                        trigger: "blur",
                    },
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
        this.getTeachList();
    },
    methods: {
        async getTeachList() {
            let rank = window.sessionStorage.getItem("rolerank");
            if (rank == 1) {
                this.rolerank = true;
            }
            const { data: data } = await this.$http.get("organization/list", {
                params: {
                    pageNum: this.queryInfo.pagenum,
                    pageRow: this.queryInfo.pagesize,
                },
            });
            console.log(data);
            if (data.code == "200") {
                this.teachlist = data.info.list;
                this.total = data.info.totalCount;
                return 1;
            } else {
                return this.$message.error("信息获取失败！");
            }
        },
        async seekUserList() {
            console.log(this.seekvalue);
            const { data: data } = await this.$http.get("organization/listByOrganizationName", {
                params: {
                    organizationName: this.seekvalue,
                    pageNum: "1",
                    pageRow:"10",
                },
            });
            if (data.code == "200") {
                this.teachlist = data.info.list;
                this.total = data.info.totalCount;
                return 1;
            } else {
                return this.$message.error("信息获取失败！");
            }
        },
        closeUserList() {
             this.getTeachList()
        },
        //监听pagesize改变事件
        handleSizeChange(newSize) {
            this.queryInfo.pagesize = newSize;
            this.getTeachList();
        },
        //监听页码值改变
        handleCurrentChange(newPage) {
            this.queryInfo.pagenum = newPage;
            this.getTeachList();
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
                    return this.$message.error("添加失败!");
                let roleID = [Number(this.addForm.roleIds)];
                delete this.addForm.roleIds;
                this.addForm.roleIds = roleID;
                console.log(this.addForm);
                // 发起添加用户的网络请求
                const { data: data } = await this.$http.post(
                    "organization/addOrganization",
                    this.addForm
                );
                console.log(data);
                if (data.code == "200") {
                    this.$message.success("添加救助机构信息成功！");
                    this.addDialogVisible = false;
                    this.getTeachList();
                    delete this.addForm.roleIds;
                    this.addForm.roleIds = "";
                    return 1;
                }
                this.$message.error("添加救助机构信息失败！");
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
                    return this.$message.error("修改失败!");
                // 发起修改用户信息请求
                let req = {
                    organizationName: this.editForm.organizationName,
                    organizationTel: this.editForm.organizationTel,
                    organizationAddress: this.editForm.organizationAddress,
                    organizationDescription: this.editForm.organizationDescription,
                    organizationId: this.editForm.organizationId,
                    deleteStatus: "1",
                };
                const { data: data } = await this.$http.post(
                    "organization/updateOrganization",
                    req
                );
                // console.log(data);
                this.editDialogVisible = false;
                this.getTeachList();
                this.$message.success("修改信息成功！");
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
                dataarr.push(item.organizationId);
                return item.organizationId;
            });
            this.deletecheckedUsers = dataarr;
        },
        // 批量删除用户
        async deleteUser() {
            console.log(this.deletecheckedUsers);
            const { data: data } = await this.$http.post(
                "organization/batchDeleteOrganization",
                {
                    organizationId: this.deletecheckedUsers,
                    deleteStatus: "2",
                }
            );
            console.log(data);
            this.getTeachList();
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
                "是否删除?",
                "删除",
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
            const { data: res } = await this.$http.delete(`teach/${id}`);
            if (res.meta.status !== 200) {
                return this.$message.error("删除失败！");
            }
            this.$message.success("删除成功");
            this.getTeachList();
        },
        // 单机删除
        async setRole(item) {
            console.log(item);
            this.$confirm("是否删除该救助机构信息, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(async () => {
                    const { data: data } = await this.$http.post(
                        "organization/updateOrganization",
                        {
                            organizationName: item.organizationName,
                            organizationTel: item.organizationTel,
                            organizationAddress: item.organizationAddress,
                            organizationDescription: item.organizationDescription,
                            organizationId: item.organizationId,
                            deleteStatus: "2",
                        }
                    );
                    console.log(data);
                    if (data.code == "200") {
                        this.getTeachList();
                        return 1;
                    }
                    this.$message.error("获取救助机构信息失败！");
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
