<template>
    <div class="userlist">
        <el-card>
            <el-form :inline="true" :model="userlist" class="demo-form-inline">
                <el-form-item label="用户名称">
                    <el-input v-model="userlist.username" placeholder="用户名称"></el-input>
                </el-form-item>
                <el-form-item label="用户邮箱">
                    <el-input v-model="userlist.email" placeholder="用户邮箱"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="userlist.role_id" placeholder="请选择状态">
                        <el-option label="启用" value="1"></el-option>
                        <el-option label="禁用" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                    <el-button @click="clear">清除</el-button>
                    <el-button type="primary" @click="addUser" class="el-icon-plus">新增用户</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <!-- <el-card>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="id" label="序号" width="180">
                </el-table-column>
                <el-table-column prop="username" label="用户名">
                </el-table-column>
                <el-table-column prop="phone" label="电话">
                </el-table-column>
                <el-table-column prop="email" label="邮箱">
                </el-table-column>
                <el-table-column prop="role_id" label="角色">
                </el-table-column>
                <el-table-column prop="remark" label="备注">
                </el-table-column>
                <el-table-column prop="status" label="状态">
                </el-table-column>
                <el-table-column label="操作">
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="pagenation.currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper" :total="400">
                </el-pagination>
            </div>
        </el-card> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            userlist: {
                id: "",
                username: "",
                phone: "",
                email: "",
                avatar: "",
                role_id: "",
                remark: "",
                status: "",
                create_time: "",
                update_time: ""
            },
            pagination: {
                currentPage: 1
            },
            page: "",
            limit: ""
        };
    },
    methods: {
        search() {},
        clear() {},
        addUser() {},
        handleSizeChange() {},
        handleCurrentChange() {}
    }
};
</script>

<style>
</style>
