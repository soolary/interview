<template>
    <el-dialog :visible.sync="isShow" :fullscreen="true" class="questionAdd">
        <div slot="title" class="title">{{mode=="add"?"新增题库":"编辑题库"}}</div>
        <div class="form">
            <el-form :model="form" label-width="100px" :rules="rules" ref="form">
                <el-form-item label="学科" prop="subject">
                    <el-select v-model="form.subject" class="select">
                        <el-option v-for="(item,index) in subjectList" :key="index" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="阶段" prop="step">
                    <el-select v-model="form.step">
                        <el-option v-for="(value,key,index) in stepObj" :key="index" :label="value" :value="+key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="企业" prop="enterprise">
                    <el-select v-model="form.enterprise">
                        <el-option v-for="(item,index) in businessList" :key="index" :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="城市" prop="city">
                    <el-cascader v-model="form.city" :options="options" :props="{value:'label'}"></el-cascader>
                </el-form-item>
                <el-form-item label="题型" prop="type">
                    <el-radio v-model="form.type" v-for="(value,key,index) in typeObj" :key="index" :label="+key">
                        {{value}}</el-radio>
                </el-form-item>
                <el-form-item label="难度" prop="difficulty">
                    <el-radio v-model="form.difficulty" v-for="(value,key,index) in difficultyObj" :key="index"
                        :label="+key">{{value}}</el-radio>
                </el-form-item>
                <el-form-item label="试题标题" class="editor" prop="title">
                    <quillEditor v-model="form.title" :options="{placeholder:'请在这里输入'}" @change="editorChange('title')">
                    </quillEditor>
                </el-form-item>
                <el-form-item :label="typeObj[form.type]"
                    :prop="{1:'single_select_answer',2:'multiple_select_answer',3:'short_answer'}[form.type]">
                    {{form.type}}
                    <AllSelect :form="form" @change="allSelectChange">
                    </AllSelect>
                </el-form-item>
                <hr />
                <el-form-item label="解析视频" prop="vedio">
                    <Upload type="video" v-model="form.video"></Upload>
                </el-form-item>
                <hr />
                <el-form-item label="答案解析" class="edit" prop="answer_analyze">
                    <quillEditor v-model="form.answer_analyze" :options="{placeholder:'请在这里输入'}"
                        @change="editorChange('answer_analyze')"></quillEditor>
                </el-form-item>
                <hr />
                <el-form-item label="试题备注" prop="remark">
                    <el-input type="textarea" v-model="form.remark" rows="2"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="footer" slot="footer">
            <el-button @click="isShow=false">取消</el-button>
            <el-button type="primary" @click="submit">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { regionData } from "element-china-area-data";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import AllSelect from "./AllSelect.vue";
import Upload from "./Upload.vue";
import { addQuestionData, editQuestionData } from "@/api/question.js";

export default {
    watch: {
        isShow(newVal) {
            if (newVal == false) {
                this.form = {
                    rid: "", //string	学科编号
                    name: "", //string	学科名称
                    short_name: "", //string	学科简称
                    intro: "", //string	学科简介
                    remark: "", //string	备注
                };
                // this.$refs.form.clearValidate();
            } else {
                this.$nextTick(() => {
                    this.$refs.form.clearValidate();
                });
            }
        },
    },
    components: {
        quillEditor,
        AllSelect,
        Upload,
    },
    props: [
        "subjectList",
        "stepObj",
        "businessList",
        "typeObj",
        "difficultyObj",
        "mode",
    ],
    data() {
        return {
            isShow: false,
            options: regionData,
            form: {
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
                remark: "",
                select_options: [
                    {
                        label: "A",
                        text: "狗不理",
                        image: "",
                    },
                    {
                        label: "B",
                        text: "猫不理",
                        image: "",
                    },
                    {
                        label: "C",
                        text: "麻花",
                        image: "",
                    },
                    {
                        label: "D",
                        text: "炸酱面",
                        image: "",
                    }, //试题备注
                ],
            },
            rules: {
                subject: [
                    {
                        required: true,
                        message: "请选择学科",
                        trigger: "change",
                    },
                ], //学科
                step: [
                    {
                        required: true,
                        message: "请选择阶段",
                        trigger: "change",
                    },
                ], //阶段
                enterprise: [
                    {
                        required: true,
                        message: "请选择企业",
                        trigger: "change",
                    },
                ], //企业
                city: [
                    {
                        required: true,
                        message: "请选择城市",
                        trigger: "change",
                    },
                ], //城市
                type: [
                    {
                        required: true,
                        message: "请选择题型",
                        trigger: "change",
                    },
                ], //题型
                difficulty: [
                    {
                        required: true,
                        message: "请选择难度",
                        trigger: "change",
                    },
                ], //难度
                title: [
                    {
                        required: true,
                        message: "请输入题目",
                        trigger: "change",
                    },
                ], //题目
                single_select_answer: [
                    {
                        required: true,
                        message: "请选择单选答案",
                        trigger: "change",
                    },
                ], //单选答案
                multiple_select_answer: [
                    {
                        required: true,
                        message: "请选择多选答案",
                        trigger: "change",
                    },
                ], //多选答案
                short_answer: [
                    {
                        required: true,
                        message: "请输入简答答案",
                        trigger: "change",
                    },
                ], //简答答案
                answer_analyze: [
                    {
                        required: true,
                        message: "请输入答案解析",
                        trigger: "change",
                    },
                ], //答案解析
                remark: [
                    {
                        required: true,
                        message: "请输入试题备注",
                        trigger: "change",
                    },
                ], //试题备注
            },
        };
    },
    methods: {
        submit() {
            this.$refs.form.validate((result) => {
                if (result) {
                    if (this.mode == "add") {
                        addQuestionData(this.form).then(() => {
                            this.$message.success("添加成功！");
                            //关闭弹窗
                            this.isShow = false;
                            //调用父组件刷新数据
                            this.$parent.search();
                        });
                    } else {
                        //调用编辑接口
                        window.console.log("编辑需要提交的数据:", this.form);
                        //编辑接口需要的城市是字符串
                        let _query = JSON.parse(JSON.stringify(this.form));
                        _query.city = _query.city.join(",");
                        editQuestionData(_query).then(() => {
                            this.$message.success("编辑成功！");
                            //关闭弹窗
                            this.isShow = false;
                            //调用父组件刷新数据
                            this.$parent.getData();
                        });
                    }
                }
            });
            window.console.log(this.form.short_answer);
        },
        editorChange(str) {
            this.$refs.form.validateField(str);
        },
        allSelectChange() {
            //需要验证什么
            //人为触发一下该验证
            // validateField 支持传数组的
            this.$refs.form.validateField([
                "single_select_answer",
                "multiple_select_answer",
                "short_answer",
            ]);
        },
    },
};
</script>

<style lang="less">
.questionAdd {
    .el-dialog__header {
        padding: 0;
    }
    .title {
        height: 54px;
        line-height: 54px;
        padding-left: 15px;
        font-weight: 800;
        background: linear-gradient(to right, #01c5fa, #0f9ffa);
        color: #fff;
    }
    .uploadFile {
        .el-upload {
            width: 100%;
            .avatar {
                width: 100%;
            }
        }
    }
    .footer {
        text-align: center;
    }
    .form {
        width: 832px;
        margin: 0 auto;
    }
    .ql-editor {
        margin-left: 0px !important;
        line-height: 3;
        height: 300%;
    }
}
</style>