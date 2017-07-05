<template>
  <div class="sales-board">
      <div class="sales-board-intro">
        <h2>数据预测</h2>
        <p>A string template to be used as the markup for the Vue instance. The template will replace the mounted element. Any existing markup inside the mounted element will be ignored, unless content distribution slots are present in the template.。</p>
      </div>
      <div class="sales-board-form">
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  购买数量：
              </div>
              <div class="sales-board-line-right">
                  <v-counter></v-counter>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  媒介：
              </div>
              <div class="sales-board-line-right">
                  <v-m-choice :selections="versionList"></v-m-choice>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  有效时间：
              </div>
              <div class="sales-board-line-right">
                  一年
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  总价：
              </div>
              <div class="sales-board-line-right">
                  500 元
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">&nbsp;</div>
              <div class="sales-board-line-right">
                  <div class="button">
                    立即购买
                  </div>
              </div>
          </div>
      </div>
      <div class="sales-board-des">
        <h2>产品说明</h2>
        <p>TypeScript can’t infer all types from Vue’s API. For example, it doesn’t know that the message property returned in our data function will be added to the MyComponent instance. That means if we assigned a number or boolean value to message, linters and compilers wouldn’t be able to raise an error, complaining that it should be a string.</p>
      </div>
  </div>
</template>

<script>
import VMChoice from '../../components/base/multiplechoice'
import VCounter from '../../components/base/counter'
export default {
  components: {
    VMChoice,
    VCounter
  },
  data () {
    return {
      versionList: [
        {
          label: '手机',
          vaule: 0
        },
        {
          label: '电脑',
          vaule: 1
        },
        {
          label: 'ipad',
          vaule: 2
        },
        {
          label: '其他',
          vaule: 3
        }
      ]
    }
  }
}

</script>

