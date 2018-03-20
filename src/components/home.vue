<template>
  <div class="home">
    <table class="table table-striped table-hover text-center">
      <thead class="thead-dark">
        <td>dayTime</td>
        <td>注册人数</td>
        <td>登录人数</td>
        <td>资质认证</td>
        <td>绑卡</td>
        <td>单位信息</td>
        <td>家庭信息</td>
        <td>联系人信息</td>
        <td>视频录制</td>
        <td>发起申请</td>
        <td>开户人数</td>
        <td>提现人数</td>
        <td>提现总金额</td>
      </thead>
      <tbody>
        <tr v-for="report in reportInfo">
          <td>{{report.dayTime}}</td>
          <td>{{report.registerNum}}</td>
          <td>{{report.loginNum}}</td>
          <td>{{report.idNum}}</td>
          <td>{{report.debitNum}}</td>
          <td>{{report.unitNum}}</td>
          <td>{{report.homeNum}}</td>
          <td>{{report.contactNum}}</td>
          <td>{{report.videoNum}}</td>
          <td>{{report.applyNum}}</td>
          <td>{{report.loanacctNum}}</td>
          <td>{{report.cashNum}}</td>
          <td>{{report.cashAmt}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      reportInfo: []
    }
  },
  created() {
    let call = 'Report.report'
    let timestamp = new Date().getTime()
    let sign = this.getSign(call, timestamp)
    let paramString = JSON.stringify({
      ua: 'KHW_H5_SIGN',
      call: call,
      args: {
        account: window.sessionStorage.account,
        token: window.sessionStorage.token
      },
      sign: sign,
      timestamp: timestamp
    })
    this.axios.post('http://xfjr.ledaikuan.cn:9292/khw/r/i', paramString).then(res => {
      let data = res.data
      if (data.returnCode === '000000') {
        // var tmp
        // data.response.forEach((item, key, arr) => {
        //   var timestamp = new Date(item.dayTime).getTime()
        //   tmp = arr.sort(function(a, b) {
        //     return a - b
        //   })
        // })
        // console.log(tmp)

        this.reportInfo = data.response
        // console.log(this.reportInfo)
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
td{
  border-right: 1px solid #ccc;
}
</style>
