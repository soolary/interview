<template>
    <div class="userlist">
        <el-card>
            <el-form :inline="true" :model="userlist" ref="form" class="demo-form-inline">
                <el-form-item label="用户名称" prop="username">
                    <el-input v-model="userlist.username" placeholder="用户名称"></el-input>
                </el-form-item>
                <el-form-item label="用户邮箱" prop="email">
                    <el-input v-model="userlist.email" placeholder="用户邮箱"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="role_id">
                    <el-select v-model="userlist.role_id">
                        <el-option v-for="(value,key,index) in $store.state.roleObj" :key="index" placeholder="请选择状态"
                            :value="key" :label="value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                    <el-button @click="clear">清除</el-button>
                    <el-button type="primary" @click="addUser" class="el-icon-plus">新增用户</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column label="序号" width="100px">
                    <template v-slot="scope">{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}
                    </template>
                </el-table-column>
                <el-table-column prop="username" label="用户名">
                </el-table-column>
                <el-table-column prop="phone" label="电话">
                </el-table-column>
                <el-table-column prop="email" label="邮箱">
                </el-table-column>
                <el-table-column prop="role" label="角色">
                </el-table-column>
                <el-table-column prop="remark" label="备注">
                </el-table-column>
                <el-table-column prop="status" label="状态">
                    <template v-slot="scope">
                        <!-- {{ scope.row.status == 0 ? '禁用' : '启用' }} -->
                        <el-switch @click.prevent.native="setStatus(scope.row.id)" v-model="scope.row.status"
                            active-color="#13ce66" inactive-color="#ccc" :active-value="1" :inactive-value="0"
                            :validate-event="false">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template v-slot="scope">
                        <el-button type="primary" class="el-icon-edit setting" @click="edit(scope.row)"></el-button>
                        <!-- <el-button @click="setStatus(scope.row.id)">禁用</el-button> -->
                        <el-button type="danger" class="el-icon-delete setting" @click="del(scope.row.id)">
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="pagination.currentPage" :page-sizes="[1, 2,4,8]" :page-size="pagination.pageSize"
                    layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
                </el-pagination>
            </div>
        </el-card>
        <AddUser :mode="mode" ref="addUser"></AddUser>
    </div>
</template>

<script>
import AddUser from "./AddUser.vue";
import { getUserList, setUserStatus, deleteUser } from "@/api/userlist.js";
export default {
    components: {
        AddUser
    },
    data() {
        return {
            userlist: {
                username: "",
                email: "",
                role_id: ""
            },
            pagination: {
                currentPage: 1,
                pageSize: 4,
                total: 0
            },
            tableData: [],
            page: "",
            limit: "",
            mode: "add"
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            let _query = {
                page: this.pagination.currentPage,
                limit: this.pagination.pageSize,
                ...this.form
            };
            getUserList(_query).then(res => {
                // console.log(res);
                this.tableData = res.data.items;
                this.pagination.total = res.data.pagination.total;
            });
        },
        search() {
            this.pagination.currentPage = 1;
            this.getData();
        },
        clear() {
            // alert(123);
            this.$refs.form.resetFields();
            this.search();
        },
        addUser() {
            this.mode = "add";
            this.$refs.addUserList.form = {
                username: "",
                email: "",
                phone: "",
                role_id: "",
                status: "",
                remark: ""
            };
            this.$refs.addUser.isShow = true;
        },
        setStatus(id) {
            setUserStatus({ id }).then(() => {
                this.$message.success("修改状态成功");
            });
        },
        edit(row) {
            this.mode = "edit";
            this.$refs.addUser.form = JSON.parse(JSON.stringify(row));
            this.$refs.addUser.isShow = true;
        },
        del(id) {
            this.$confirm("确定删除吗崽种", "FBI warning", {
                confirmButtonText: "凎",
                cancelButtonText: "不了",
                type: "danger"
            }).then(() =>
                deleteUser({ id }).then(() => {
                    this.$message.success("删除成功");
                    this.getData();
                })
            );
        },
        handleSizeChange(size) {
            this.pagination.pageSize = size;
            this.search();
            this.getData();
        },
        handleCurrentChange(page) {
            this.pagination.currentPage = page;
            this.getData();
        }
    }
};
</script>

<style>
</style>
