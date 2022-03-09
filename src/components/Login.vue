<template>
  <div class="bg">
    <div class="login_container">
      <div class="login_box">
        <!-- 头像区域 -->
        <div class="avatar_box">
          <img src="../assets/user.jpg" alt="" />
        </div>
        <!-- 登录表单区域 -->

        <el-form
          ref="loginFormRef"
          :model="loginFrom"
          :rules="loginFromRules"
          label-width="0px"
          class="login_form"
        >
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input
              v-model="loginFrom.username"
              prefix-icon="iconfont icon-user"
            ></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              v-model="loginFrom.password"
              prefix-icon="iconfont icon-suo"
              show-password
            ></el-input>
          </el-form-item>
          <!-- 按钮区域 -->
          <el-form-item class="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetLoginForm">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog
      title="注册"
      :visible.sync="registerVisible"
      width="500px"
      top="3%"
      @close="registerClosed"
    >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        class="register_form"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" show-password></el-input>
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
        <el-form-item label="联系方式" prop="tel">
          <el-input v-model="addForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="住址" prop="address">
          <el-input v-model="addForm.address"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="registerVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    // 验证邮箱规则
    let checkEmail = (rule, value, cb) => {
      const regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
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

      //登录表单数据绑定对象
      loginFrom: {
        username: "",
        password: "",
      },
      //表单验证规则对象
      loginFromRules: {
        // 用户名验证
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 0,
            max: 25,
            message: "长度在 0 到 25个字符",
            trigger: "blur",
          },
        ],
        // 密码验证
        password: [
          {
            required: true,
            message: "请输入登录密码",
            trigger: "blur",
          },
          {
            min: 4,
            max: 25,
            message: "长度在 4 到 25 个字符",
            trigger: "blur",
          },
        ],
      },

      registerVisible: false,
    };
  },
  methods: {
    resetLoginForm() {
      console.log(this.registerVisible);
      this.registerVisible = true;
    },

    login() {
      this.$refs.loginFormRef.validate(async (valid, object) => {
        if (!valid) return;
        // 登录测试
        const { data: data } = await this.$http.post(
          "login/auth",
          {
            username: this.loginFrom.username,
            password: this.loginFrom.password,
          },
          {
            header: {
              "content-type": "application/json",
            },
          }
        );
        if (data.code !== "200")
          return this.$message.error("账号或密码错误，登录失败");
        else {
          window.sessionStorage.setItem("token", data.info.token);
          window.sessionStorage.setItem("rolerank", data.info.roleIds[0]);
          this.$message.success("登录成功");
          this.$router.push("/feralcat");
        }
      });
    },
    // 监听用户框关闭事件
    registerClosed() {
      this.$refs.addFormRef.resetFields();
    },
    // 点击按钮，添加用户
    addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error("用户信息错误，注册用户失败");
        let roleID = [Number(this.addForm.roleIds)];
        delete this.addForm.roleIds;
        this.addForm.roleIds = roleID;
        console.log(this.addForm);
        // 发起添加用户的网络请求
        const { data: data } = await this.$http.post(
          "user/register",
          this.addForm
        );
        console.log(data);
        if (data.code == "200") {
          this.$message.success("注册用户成功！");
          this.registerVisible = false;
          delete this.addForm.roleIds;
          this.addForm.roleIds = "";
          return 1;
        }
        this.$message.error("注册用户失败！");
      });
    },
  },
};
</script>
// scoped代表只渲染当前组件
<style lang="less" scoped>
.bg{
    background-color: #788dafc2;
    height: 100%;
}
.login_container {
  background-color: #788dafc2;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
