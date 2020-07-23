<template>
    <div class="chart">
        <el-card>
            <ul class="top">
                <li>
                    <div class="circle">{{info.increment_users}}</div>
                    <p>今日新增用户</p>
                </li>
                <li>
                    <div class="circle">{{info.total_users}}</div>
                    <p>总用户量</p>
                </li>
                <li>
                    <div class="circle">{{info.increment_questions}}</div>
                    <p>新增试题</p>
                </li>
                <li>
                    <div class="circle">{{info.total_questions}}</div>
                    <p>总试题量</p>
                </li>
                <li>
                    <div class="circle">{{info.total_done_questions}}</div>
                    <p>总刷题量</p>
                </li>
                <li>
                    <div class="circle">{{info.personal_questions}}</div>
                    <p>人均刷题量</p>
                </li>
            </ul>
        </el-card>
        <el-card>
            <div class="echarts" ref="echarts" id="echarts">

            </div>

        </el-card>
    </div>
</template>

<script>
import echarts from "echarts";
import { getChartData, getEchartsData } from "@/api/chart.js";
export default {
    data() {
        return {
            info: "",
            myCharts: "",
            list: [],
            nameArr: [],
        };
    },
    created() {
        getChartData().then((res) => {
            this.info = res.data;
        });
        getEchartsData().then((res) => {
            this.list = res.data;
            console.log("chart", res);
            this.nameArr = res.data.map((item) => {
                return item.name;
            });
            this.chartInt();
        });
    },
    methods: {
        chartInt() {
            this.myCharts = echarts.init(this.$refs.echarts);
            let option = {
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)",
                },
                legend: {
                    orient: "vertical",
                    right: 10,
                    data: this.nameArr,
                },
                series: [
                    {
                        name: "访问来源",
                        type: "pie",
                        radius: ["50%", "70%"],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: "center",
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: "30",
                                fontWeight: "bold",
                            },
                        },
                        labelLine: {
                            show: false,
                        },
                        data: this.list,
                    },
                ],
            };
            this.myCharts.setOption(option);
        },
    },
};
</script>

<style lang="less">
.chart {
    .top {
        display: flex;
        justify-content: space-around;
        align-items: center;
        .circle {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            text-align: center;
            line-height: 100px;
            border: 2px solid #3ea3fb;
        }
        p {
            text-align: center;
        }
    }
    .echarts {
        width: 100%;
        height: 500px;
    }
}
</style>   