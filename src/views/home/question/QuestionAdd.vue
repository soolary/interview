<template>
    <el-dialog :visible.sync="dialogVisible" :fullscreen="true" class="questionAdd">
        <div slot="title" class="title">新增题库测试</div>
        <div class="form">
            <el-form :model="form" label-width="100px" :rules="rules" ref="form">
                <el-form-item label="学科" porp="subject">
                    <el-select v-model="form.subject" class="select">
                        <el-option v-for="(item,index) in subjectList" :key="index" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="阶段" porp="step">
                    <el-select v-model="form.step">
                        <el-option v-for="(value,key,index) in stepObj" :key="index" :label="value" :value="+key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="企业" porp="enterprise">
                    <el-select v-model="form.enterprise">
                        <el-option v-for="(item,index) in businessList" :key="index" :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="城市">
                    <el-cascader v-model="form.city" :options="options" :props="{value:'label'}"></el-cascader>
                </el-form-item>
                <el-form-item label="题型">
                    <el-radio v-model="form.type" v-for="(value,key,index) in typeObj" :key="index" :label="+key">
                        {{value}}</el-radio>
                </el-form-item>
                <el-form-item label="难度">
                    <el-radio v-model="form.difficulty" v-for="(value,key,index) in difficultyObj" :key="index"
                        :label="+key">{{value}}</el-radio>
                </el-form-item>
                <el-form-item label="试题标题" class="editor">
                    <quillEditor v-model="form.title" :options="{placeholder:'请在这里输入'}">
                    </quillEditor>
                </el-form-item>
            </el-form>
        </div>
        <div class="footer" slot="footer">
            <el-button @click="dialogVisible=false">取消</el-button>
            <el-button type="primary">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { regionData } from "element-china-area-data";
import { quillEditor } from "vue-quill-editor";
// import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
// import "quill/dist/quill.bubble.css";
export default {
    components: {
        quillEditor
    },
    props: [
        "subjectList",
        "stepObj",
        "businessList",
        "typeObj",
        "difficultyObj",
        "mode"
    ],
    data() {
        return {
            dialogVisible: true,
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
                remark: "" //试题备注
            },
            rules: {}
        };
    }
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
    .footer {
        text-align: center;
    }
    .form {
        width: 832px;
        margin: 0 auto;
    }
    .ql-editor {
        margin-left: 0px !important;
        line-height: 1;
        height: 300px;
    }
}
</style>