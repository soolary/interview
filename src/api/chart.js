import _fetch from '@/utils/request.js'
function getChartData() {
    return _fetch({
        url: '/data/title',
        method: 'get'
    })
}
// echarts数据
function getEchartsData() {
    return _fetch({
        url: '/data/statistics',
        method: 'get'
    })
}
export { getChartData, getEchartsData }
