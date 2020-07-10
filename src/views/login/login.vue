<template>
    <div class="login">
        <div class="left">
            <div class="header">
                <img class="left-logo" src="@/assets/img/login_logo.png" alt="">
                <span class="t1">黑马面面</span>
                <div class="line">|</div>
                <span class="t2">用户登录</span>
            </div>
        </div>
        <img src="@/assets/img/login_right.png" alt="">
    </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.login {
    background: linear-gradient(to right, #1494f1, #01c6fa);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around; //!!!!!!!!!!
    .left {
        width: 478px;
        height: 550px;
        background-color: #f5f5f5;
        padding: 48px;
        display: flex;
        align-items: center; //!!!!!!!!!!
    }
    .left-logo {
        width: 22px;
        height: 17px;
        margin-right: 20px;
    }
    .ti {
        font-size: 24px;
    }
}
</style>