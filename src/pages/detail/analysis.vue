<template>
    <div class="sales-board">
      <div class="sales-board-intro">
        <h2>流量分析</h2>
        <p>An object where keys are expressions to watch and values are the corresponding callbacks. The value can also be a string of a method name, or an Object that contains additional options. The Vue instance will call $watch() for each entry in the object at instantiation.</p>    
      </div>
      <div class="sales-board-form">
        <div class="sales-board-line">
          <div class="sales-board-line-left">
            购买数量: 
          </div>
          <div class="sales-board-line-right">
             <v-counter @on-change="onParamChange('buyNum', $event)"></v-counter> 
          </div>  
        </div>
        <div class="sales-board-line">
          <div class="sales-board-line-left">
            产品类型:  
          </div>
          <div class="sales-board-line-right">
            <v-selection :selections="productTypes" @on-change="onParamChange('buyType', $event)"></v-selection>
          </div>    
        </div>
        <div class="sales-board-line">
          <div class="sales-board-line-left">
            有效时间:
          </div>
          <div class="sales-board-line-right">
             <v-chooser
             :selections="periodList"
             @on-change="onParamChange('period', $event)"></v-chooser>
          </div>  
        </div>
        <div class="sales-board-line">
              <div class="sales-board-line-left">
                  产品版本：
              </div>
              <div class="sales-board-line-right">
                  <v-m-choice
                  :selections="versionList"
                  @on-change="onParamChange('versions', $event)"></v-m-choice>
              </div>
          </div>
        <div class="sales-board-line">
          <div class="sales-board-line-left">
             总价: 
          </div>
          <div class="sales-board-line-right">
            {{ price }}元
          </div>   
        </div>
        <div class="sales-board-line">
              <div class="sales-board-line-left">&nbsp;</div>
              <div class="sales-board-line-right">
                  <div class="button" @click="showPayDialog">
                    立即购买
                  </div>
              </div>
          </div>  
      </div>
      <div class="sales-board-des">
        <h2>产品说明</h2>
        <p>网站访问统计分析报告的基础数据源于网站流量统计信息，但其价值远高于原始数据资料。专业的网站访问统计分析报告对网络营销的价值，正如专业的财务分析报告对企业经营策略的价值。</p>

        <h3>用户行为指标</h3>
        <ul>
          <li>用户行为指标主要反映用户是如何来到网站的、在网站上停留了多长时间、访问了哪些页面等，主要的统计指标包括：</li>
          <li>用户在网站的停留时间；</li>
          <li>用户来源网站（也叫“引导网站”）；</li>
          <li>用户所使用的搜索引擎及其关键词；</li>
          <li>在不同时段的用户访问量情况等。</li>
        </ul>

        <h3>浏览网站方式</h3>
        <ul>
          <li>用户上网设备类型</li>
          <li>用户浏览器的名称和版本</li>
          <li>访问者电脑分辨率显示模式</li>
          <li>用户所使用的操作系统名称和版本</li>
          <li>用户所在地理区域分布状况等</li>
        </ul>
      </div>
      <my-dialog :is-show="isShowPayDialog" @on-close="hidePayDialog">
        <table class="buy-dialog-table">
          <tr>
            <th>购买数量</th>
            <th>产品类型</th>
            <th>有效时间</th>
            <th>产品版本</th>
            <th>总价</th>
          </tr>
          <tr>
            <td> {{buyNum}} </td>
            <td> {{buyType.label}} </td>
            <td>{{ period.label }}</td>
            <td>
              <span v-for="item in versions">{{ item.label }}</span>
            </td>
            <td>{{ price }}</td>
          </tr>
        </table>
        <h3 class="buy-dialog-title">请选择银行</h3>
        <b-cooser @on-change="onChangeBanks"></b-cooser>
        <div class="button buy-dialog-btn" @click="confirmBuy">
          确认购买
        </div>
      </my-dialog>
      <my-dialog :is-show="isShowErrDialog" @on-close="hidePayDialog">
        支付失败！
      </my-dialog>
      <check-order :is-show-check-dialog="isShowCheckOrder" @on-close-check-dialog="hidePayDialog"></check-order>
    </div>
</template>

<script>
import VSelection from '../../components/base/selection'
import VCounter from '../../components/base/counter'
import VChooser from '../../components/base/chooser'
import VMChoice from '../../components/base/multiplechoice'
import Dialog from '../../components/base/dialog'
import BCooser from '../../components/bankChooser'
import CheckOrder from '../../components/checkOrder'
import _ from 'lodash'
export default {
  components: {
    VSelection,
    VCounter,
    VChooser,
    MyDialog: Dialog,
    VMChoice,
    BCooser,
    CheckOrder
  },
  data () {
    return {
      buyNum: 0,
      buyType: {},
      versions: [],
      period: {},
      price: 0,
      productTypes: [
        {
          label: '入门版',
          vaule: 0
        },
        {
          label: '中级版',
          vaule: 1
        },
        {
          label: '高级版',
          vaule: 2
        },
        {
          label: '出师啦',
          vaule: 3
        }
      ],
      periodList: [
        {
          label: '半年',
          value: 0
        },
        {
          label: '一年',
          value: 1
        },
        {
          label: '三年',
          value: 2
        }
      ],
      buyTypes: [
        {
          label: '入门版',
          value: 0
        },
        {
          label: '中级版',
          value: 1
        },
        {
          label: '高级版',
          value: 2
        },
        {
          label: '出师啦',
          vaule: 3
        }
      ],
      versionList: [
        {
          label: '客户版',
          value: 0
        },
        {
          label: '代理商版',
          value: 1
        },
        {
          label: '专家版',
          value: 2
        }
      ],
      isShowPayDialog: false,
      bankId: null,
      isShowCheckOrder: false
    }
  },
  methods: {
    onParamChange (attr, val) {
      this[attr] = val
      this.getPrice()
    },
    getPrice () {
      let buyVersiobsArray = _.map(this.versions, (item) => {
        return item.value
      })
      let reqParams = {
        buyNum: this.buyNum,
        buyType: this.buyType.value,
        period: this.period.value,
        version: buyVersiobsArray.join(','),
        bankId: this.bankId
      }
      this.$http.get('/api/getPrice', reqParams).then((res) => {
        // let data = JSON.parse(res.data)
        this.price = res.data.amount
      }).catch((err) => {
        console.log(err)
      })
    },
    showPayDialog () {
      this.isShowPayDialog = true
    },
    hidePayDialog () {
      this.isShowPayDialog = false
    },
    hideErrDialog () {
      this.isShowErrDialog = false
    },
    onChangeBanks (bankObj) {
      this.bankId = bankObj.id
      // console.log(this.bankId)
    },
    confirmBuy () {
      let buyVersionsArray = _.map(this.versions, (item) => {
        return item.value
      })
      let reqParams = {
        buyNum: this.buyNum,
        buyType: this.buyType.value,
        period: this.period.value,
        version: buyVersionsArray.join(','),
        bankId: this.bankId
      }
      this.$http.get('/api/createOrder', reqParams).then((res) => {
        // let data = JSON.parse(res.data)
        this.orderId = res.data.orderId
        this.isShowCheckOrder = true
        this.isShowPayDialog = false
      }).catch(() => {
        this.isShowBuyDialog = false
        this.isShowErrDialog = true
      })
    }
  },
  mounted () {
    this.buyNum = 1
    this.buyType = this.buyTypes[0]
    this.versions = [this.versionList[0]]
    this.period = this.periodList[0]
    this.getPrice()
  }
}
</script>

<style scoped>
.buy-dialog-title {
  font-size: 16px;
  font-weight: bold;
}
.buy-dialog-btn {
  margin-top: 20px;
}
.buy-dialog-table {
  width: 100%;
  margin-bottom: 20px;
}
.buy-dialog-table td,
.buy-dialog-table th{
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 5px 0;
}
.buy-dialog-table th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
}
</style>
