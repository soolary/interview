<template>
    <el-form>
        <el-form-item class="allselect">
            <div v-if="form.type==1">
                <div class="item" v-for="(item,index) in form.select_options " :key="index">
                    <el-radio @change="selectChange" :label="item.label" v-model="form.single_select_answer">
                        {{item.label}}
                    </el-radio>
                    <el-input v-model="item.text"></el-input>
                    <div>
                        <Upload v-model="item.image"></Upload>
                    </div>
                </div>
            </div>
            <div v-else-if="form.type==2">
                <div class="item" v-for="(item,index) in form.select_options " :key="index">
                    <el-checkbox @change="selectChange" :label="item.label" v-model="form.multiple_select_answer">
                        {{item.label}}
                    </el-checkbox>
                    <el-input v-model="item.text"></el-input>
                    <div>
                        <Upload v-model="item.image"></Upload>
                    </div>
                </div>
            </div>
            <div v-else>
                <el-input type="textarea" rows="5" v-model="form.short_answer"></el-input>
            </div>
        </el-form-item>
    </el-form>
</template>

<script>
import Upload from "./Upload.vue";
export default {
    props: ["form"],
    components: {
        Upload
    },
    data() {
        return {
            // radio: 1
        };
    },
    created() {
        console.log(this.form);
    },
    methods: {
        selectChange() {
            this.$emit("change");
        }
    }
};
</script>

<style>
.item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>