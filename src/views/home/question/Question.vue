<template>
    <div class="question">
        <el-card>
            <el-form :model="form" label-width="80px" ref="form">
                <el-row>
                    <el-col :span="5">
                        <el-form-item label="学科" prop="subject">
                            <el-select v-model="form.subject">
                                <el-option :label="form.subject" :value="value.name"
                                    v-for="(value,key,index) in subjectList" :key="index">
                                    {{value.name}}
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="阶段" prop="step">
                            <el-select v-model="form.step">
                                <el-option :label="form.step" :value="value" v-for="(value,key,index) in stepObj"
                                    :key="index">
                                    {{value}}</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="企业" prop="enterprise">
                            <el-select v-model="form.enterprise">
                                <el-option :label="form.enterprise" :value="value.name"
                                    v-for="(value,key,index) in businessList" :key="index">
                                    {{value.name}}</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="题型" prop="type">
                            <el-select v-model="form.type">
                                <el-option :label="form.type" :value="value" v-for="(value,key,index) in typeObj"
                                    :key="index">
                                    {{value}}</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col :span="5">
                        <el-form-item label="难度" prop="difficulty">
                            <el-select v-model="form.difficulty">
                                <el-option :label="form.difficulty" :value="value" v-for="(value,key,index) in stepObj"
                                    :key="index">
                                    {{value}}</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="作者" prop="username">
                            <el-input v-model="form.username"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="状态" prop="status">
                            <el-select v-model="form.status" placeholder="请选择状态">
                                <el-option :value="1" label="禁用"></el-option>
                                <el-option :value="1" label="启用"></el-option>

                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="日期" prop="create_date">
                            <el-date-picker v-model="form.create_date" type="date" placeholder="请选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="标题" prop="title">
                            <el-input v-model="form.title"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label-width="10px">
                            <el-button type="primary" @click="search">搜索</el-button>
                            <el-button @click="reset">清除</el-button>
                            <el-button type="primary" @click="add" class="el-icon-plus">新增试题</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
        <el-card class="content">
            <el-table :data=tableData :border="true">
                <el-table-column label="序号">
                    <template v-slot="scope">
                        {{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}
                    </template>
                </el-table-column>
                <el-table-column label="题目">
                    <template v-slot="scope">
                        <div v-html="scope.row.title"></div>
                    </template>
                </el-table-column>
                <el-table-column label="学科·阶段">
                    <template v-slot="scope">
                        <div v-html="scope.row.subject_name"></div>
                    </template>
                </el-table-column>
                <el-table-column label="题型">
                    <template v-slot="scope">{{typeObj[scope.row.type]}}
                    </template>
                </el-table-column>
                <el-table-column label="企业" prop="enterprise_name">
                </el-table-column>
                <el-table-column label="创建者" prop="username" width="150px">
                </el-table-column>
                <el-table-column label="状态">
                    <template v-slot="scope">
                        <!-- {{ scope.row.status == 0 ? '禁用' : '启用' }} -->
                        <el-switch @change="setStatus(scope.row.id)" v-model="scope.row.status" active-color="#13ce66"
                            inactive-color="#ccc" :active-value="1" :inactive-value="0" :validate-event="false">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="访问量" prop="reads" width="90px">
                </el-table-column>
                <el-table-column label="操作" width="200px">
                    <template v-slot="scope">
                        <el-button type="primary" class="el-icon-edit setting" @click="edit(scope.row)"></el-button>
                        <!-- <el-button @click="setStatus(scope.row.id)">禁用</el-button> -->
                        <el-button type="danger" class="el-icon-delete setting" @click="del(scope.row.id)">
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagenation">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="pagination.currentPage" :page-sizes="[1,2,4,8]" :page-size="pagination.pageSize"
                    layout="total, sizes, prev, pager, next, jumper" :total="pagination.total"></el-pagination>
            </div>
        </el-card>
        <!-- <Question-add></Question-add> -->
        <QuestionAdd ref="addQuestion" :subjectList="subjectList" :stepObj="stepObj" :businessList="businessList"
            :typeObj="typeObj" :difficultyObj="difficultyObj" :mode="mode"></QuestionAdd>
    </div>
</template>

<script>
import QuestionAdd from "./QuestionAdd.vue";
import { getSubjectList } from "@/api/subject.js";
import { getBusinessList } from "@/api/business.js";
import {
    getQuestionData,
    setQuestionStatus,
    delQuestionData
} from "@/api/question.js";
export default {
    components: {
        QuestionAdd
    },
    data() {
        return {
            form: {
                subject: "", //否	int	学科id
                step: "", //否	string	题目阶段:1(初级),2(中级),3(高级)
                enterprise: "", //否	int	企业id
                type: "", //否	int	题目类型:1(单选),2(多选),3(简答)
                difficulty: "", //否	int	题目难度: 1(简单),2(一般),3(困难)
                username: "", //否	string	作者
                status: "", //否	int	状态:0(禁用),1(启用)
                create_date: "", //否	string	创建日期
                title: "", //否	string	标题名称
                page: "", //否	string	页码 默认为1
                limit: "" //否	string	页尺寸 默认为10
            },
            pagination: {
                currentPage: 1,
                pageSize: 5,
                total: 1
            },
            mode: "add",
            stepObj: { 1: "初级", 2: "中级", 3: "高级" }, //阶段
            typeObj: { 1: "单选", 2: "多选", 3: "简答" }, //类型
            difficultyObj: { 1: "简单", 2: "一般", 3: "困难" },
            subjectList: [],
            businessList: [],
            tableData: []
        };
    },
    created() {
        getSubjectList({ limit: 1000 }).then(res => {
            this.subjectList = res.data.items;
        });
        getBusinessList({ limit: 1000 }).then(res => {
            this.businessList = res.data.items;
            // console.log(res.data.items);
        });
        this.getData();
    },
    methods: {
        getData() {
            let _query = {
                page: this.pagination.currentPage,
                limit: this.pagination.pageSize,
                ...this.form
            };
            getQuestionData(_query).then(res => {
                window.console.log("题库列表数据:", res);
                this.tableData = res.data.items;
                this.tableData.forEach(item => {
                    item.city = item.city.split(",");
                    item.multiple_select_answer = item.multiple_select_answer.split(
                        ","
                    );
                });
                this.pagination.total = res.data.pagination.total;
            });
        },
        search() {
            this.getData();
        },
        reset() {
            this.$refs.form.resetFields();
            this.search();
        },
        setStatus(id) {
            setQuestionStatus({ id }).then(() => {
                this.$message.success("设置状态成功");
                this.getData();
            });
        },
        add() {
            // 1:修改mode为add
            this.mode = "add";
            // 2:传递默认数据过去到form
            this.$refs.addQuestion.form = {
                subject: "", //学科
                step: "", //阶段
                enterprise: "", //企业
                city: [], //城市
                title: "", //标题
                type: 1, //题型
                difficulty: 1, //难度
                single_select_answer: "", //单选答案
                multiple_select_answer: [], //多选答案
                short_answer: "", //简答答案
                video: "", //解析视频地址
                answer_analyze: "", //答案解析
                remark: "", //试题备注
                select_options: [
                    {
                        label: "A",
                        text: "狗不理",
                        image: ""
                    },
                    {
                        label: "B",
                        text: "猫不理",
                        image: ""
                    },
                    {
                        label: "C",
                        text: "麻花",
                        image: ""
                    },
                    {
                        label: "D",
                        text: "炸酱面",
                        image: ""
                    }
                ], //试题备注
                rules: []
            };
            // 3:打开弹框
            this.$refs.addQuestion.isShow = true;
        },
        edit(row) {
            this.mode = "edit";
            this.$refs.addQuestion.form = JSON.parse(JSON.stringify(row));
            this.$refs.addQuestion.isShow = true;
        },
        del(id) {
            this.$confirm("您确认删除此信息吗", "warning", {
                confirmButtonText: "确定删除",
                cancelButtonText: "取消删除",
                type: "warning"
            }).then(() => {
                delQuestionData({ id })
                    .then(() => {
                        this.$message.success("删除成功");
                        this.getData();
                    })
                    .catch(() => {});
            });
        },
        handleSizeChange(size) {
            this.pagination.pageSize = size;
            this.search();
        },
        //页码改变
        handleCurrentChange(page) {
            this.pagination.currentPage = page;
            this.getData();
        }
    }
};
</script>

<style lang="less">
</style>