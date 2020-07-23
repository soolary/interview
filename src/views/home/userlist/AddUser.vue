<template>
    <el-dialog class="adduser" :visible="isShow" width="600px">
        <div class="title" slot="title">{{mode=="add"?"新增用户":"编辑用户"}}</div>
        <el-form :model="form" :rules="rules" ref="form" label-width="100px">
            <el-form-item prop="username" label="用户名">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮箱">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item prop="phone" label="手机号">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item prop="role_id" label="角色">
                <el-select width="150px" v-model="form.role_id">
                    <el-option v-for="(value ,key,index) in $store.state.roleObj" :key="index" :label="value"
                        :value="+key">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="status" label="状态">
                <el-select width="150px" v-model="form.status">
                    <el-option label="启用" value="1"></el-option>
                    <el-option label="禁用" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="remark" label="备注">
                <el-input v-model="form.remark"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="footer">
            <el-button @click="isShow=false">取消</el-button>
            <el-button type="primary" @click="submit">确定</el-button>
        </div>
    </el-dialog>

</template>

<script>
import { addUser, editUser } from "@/api/userlist.js";
export default {
    props: ["mode"],
    data() {
        return {
            isShow: false,
            form: {
                username: "", //是	string	用户名
                email: "", //	是	string	邮箱
                phone: "", //	是	string	手机号
                role_id: "", //	是	string	角色 、2 管理员、3 老师、4 学生
                status: "", //	否	string	1(启用)0(禁用)
                remark: "" //	否	string	备注
            },
            rules: {
                username: [
                    { required: "true", message: "必填", trigger: "blur" },
                    { min: 6, max: 12, message: "位数不够", trigger: "change" }
                ],
                email: [
                    { required: "true", message: "必填", trigger: "change" },
                    {
                        validator: (rules, value, callback) => {
                            let _reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                            if (_reg.test(value)) {
                                callback();
                            } else {
                                callback("请输入正确时间邮箱");
                            }
                        },
                        trigger: "blur"
                    }
                ],
                phone: [
                    { required: "true", message: "必填", trigger: "blur" },
                    {
                        validator: (rule, value, callback) => {
                            let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
                            if (_reg.test(value)) {
                                callback();
                            } else {
                                callback("请正确输入手机号！");
                            }
                        },
                        trigger: "blur"
                    }
                ],
                role_id: [
                    { required: "true", message: "必填", trigger: "change" }
                ]
            }
        };
    },
    methods: {
        submit() {
            this.$refs.form.validate(result => {
                if (result) {
                    if (this.mode == "add") {
                        addUser(this.form).then(() => {
                            this.$message("添加成功");
                            this.isShow = false;
                            this.$parent.search();
                        });
                    } else {
                        editUser(this.form).then(() => {
                            this.$message("编辑成功");
                            this.isShow = false;
                            this.$parent.search();
                        });
                    }
                }
            });
        }
    },
    watch: {
        isShow(newVal) {
            if (newVal) {
                this.$nextTick(() => {
                    this.$refs.form.clearValidate();
                });
            }
        }
    }
};
</script>

<style lang="less">
.adduser {
    .el-dialog__header {
        padding: 0;
    }
    .el-dialog__headerbtn .el-dialog__close {
        color: #fff;
    }
    .title {
        text-align: center;
        font-size: 16px;
        height: 53px;
        background: linear-gradient(to right, lightblue, #1394fa ;);
        line-height: 53px;
    }
    .footer {
        text-align: center;
    }
}
</style>