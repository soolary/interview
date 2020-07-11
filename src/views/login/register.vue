<template>
    <el-dialog class="register" :visible="isShow" width="600px" :show-close="false">
        <div class="register-title" slot="title">用户注册</div>
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="头像" prop="avatar">
                <el-upload class="avatar-uploader" action="http://47.106.148.205/heimamm/public/uploads" name="image"
                    :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="昵称" porp="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" porp="email">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号" porp="phone">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="密码" porp="password">
                <el-input v-model="form.password" :show-password="true"></el-input>
            </el-form-item>
            <el-form-item label="图形码" porp="code">
                <el-row>
                    <el-col :span="16">
                        <el-input v-model="form.code"></el-input>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <img class="register-code" :src="codeImg" alt="">
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="验证码" porp="rcode">
                <el-row>
                    <el-col :span="16">
                        <el-input v-model="form.rcode"></el-input>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <el-button>获取验证码</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
        <div class="register-footer" slot="footer">
            <el-button @click="isShow=false">取消</el-button>
            <el-button type="primary">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            isShow: false,
            uploadUrl: process.env.VUE_APP_URL + "/uploads",
            codeImg: process.env.VUE_APP_URL + "/captcha?type",
            imageUrl: "",
            form: {
                username: "", //	是	string	用户名
                phone: "", //	是	string	手机号
                email: "", //	是	string	邮箱
                avatar: "", //	是	string	头像地址
                password: "", //	是	string	密码
                rcode: "", //	是	string	验证码
                code: "" //图形码
            },
            rules: {
                username: [
                    { required: true, message: "填你丫的", trigger: "change" }
                ],
                phone: [
                    { required: true, message: "填你丫的", trigger: "change" }
                ],
                email: [
                    { required: true, message: "填你丫的", trigger: "change" }
                ],
                avatar: [
                    { required: true, message: "填你丫的", trigger: "change" }
                ],
                password: [
                    { required: true, message: "填你丫的", trigger: "change" }
                ],
                rcode: [
                    { required: true, message: "填你丫的", trigger: "change" }
                ],
                code: [
                    { required: true, message: "填你丫的", trigger: "change" }
                ]
            }
        };
    },
    handleAvatarSuccess(res) {
        this.imageUrl =
            "http://47.106.148.205/heimamm/public/" + res.data.file_path;
        this.form.avatar = res.data.file_path;
    },
    beforeAvatarUpload(file) {
        const isJPG = file.type === "image/jpeg" || file.type === "image/png";
        const isLt2M = file.size / 1024 / 1024 < 2;
        console.log(file);

        if (!isJPG) {
            this.$message.error("上传头像图片只能是 JPG 格式!");
        }
        if (!isLt2M) {
            this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return isJPG && isLt2M;
    },
    submit() {
        this.$refs.form.validate(result => {
            if (result) {
                this.$message({
                    message: "6666666",
                    type: "success"
                });
            } else {
                this.$message({
                    message: "菜鸡",
                    type: "error"
                });
            }
        });
    }
};
</script>

<style lang="less">
.register {
    .el-dialog__header {
        padding: 0;
    }
    .register-title {
        height: 53px;
        line-height: 53px;
        text-align: center;
        color: #fff;
        background: linear-gradient(to right, #01c5fa, #1395fa);
    }
    .register-footer {
        text-align: center;
    }
    .avatar-uploader .el-upload {
        margin: 0, auto;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409eff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .register-code {
        width: 100%;
        height: 40px;
    }
}
</style>