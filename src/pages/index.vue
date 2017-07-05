<template>
	<div class="index-wrap">
		<div class="index-left">
			<div class="index-left-block">
				<h2>全部产品</h2>
				<template v-for="product in productList">
					<h3>{{ product.title }}</h3>
					<ul>
						<li v-for="item in product.list">
							<a :href="item.url">{{ item.name }}</a>
							<span v-if="item.hot" class="hot-tag">HOT</span>
						</li>
					</ul>
					<div v-if="!product.last" class="hr"></div>
				</template>	
<!-- 				
				<h3>应用类</h3>
				<ul>
					<li>
						
					</li>
				</ul> -->
			</div>
			<div class="index-left-block lastest-news">
				<h2>最新消息</h2>
				<ul>
					<li v-for="item in newsList">
						<a :href="item.url" class="new-item">{{ item.title }}</a>						
					</li>
				</ul>
			</div>
		</div>
		<div class="index-right">
		    <slide-show :slides="slides" :inv="invTime" @onchange="doSomethingOnSlideChange"></slide-show>
			<div class="index-board-list">
				<div class="index-board-item" v-for="(item, index) in boardList" :class="[{'line-last' : index % 2 !== 0},'index-board-' + item.id]">
					<div class="index-board-item-inner">
						<h2> {{ item.title }}</h2>
						<p> {{ item.description }}</p>
						<div class="index-board-button">
							<a href="" class="button">立即购买</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import slideShow from '../components/slideShow'
export default {
  components: {
    slideShow
  },
  created: function () {
    this.$http.get('api/getNewsList').then((res) => {
      this.newsList = res.data
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    doSomethingOnSlideChange () {
      console.log('doSomethingOnSlideChange is run')
    }
  },
  data () {
    return {
      invTime: 3000,
      slides: [
        {
          src: require('../assets/slideShow/pic1.jpg'),
          title: '主题一',
          href: 'detail/analysis'
        },
        {
          src: require('../assets/slideShow/pic2.jpg'),
          title: '主题二',
          href: 'detail/count'
        },
        {
          src: require('../assets/slideShow/pic3.jpg'),
          title: '主题三',
          href: 'detail/publish'
        },
        {
          src: require('../assets/slideShow/pic4.jpg'),
          title: '主题四',
          href: 'detail/forecast'
        }
      ],
      boardList: [
        {
          title: '开放产品',
          description: '开放产品是一款开放产品',
          id: 'one',
          saleout: false
        },
        {
          title: '品牌营销',
          description: '品牌营销帮助你的产品更快地找到定位',
          id: 'two',
          saleout: false
        },
        {
          title: '使命必达',
          description: '使命必达快速迭代永久保持最前端的技术',
          id: 'three',
          saleout: false
        },
        {
          title: '勇攀高峰',
          description: '帮你勇攀高峰，达到世界顶峰',
          id: 'four',
          saleout: false
        },
        {
          title: '使命必达',
          description: '使命必达快速迭代永久保持最前端的技术',
          id: 'three',
          saleout: false
        },
        {
          title: '勇攀高峰',
          description: '帮你勇攀高峰，达到世界顶峰',
          id: 'four',
          saleout: false
        }
      ],
      newsList: [
        // {
        //   title: '数据统计',
        //   url: 'http://starcraft.com'
        // },
        // {
        //   title: '数据预测',
        //   url: 'detail/count'
        // },
        // {
        //   title: '流量分析',
        //   url: 'http://overwatch.com',
        //   hot: true
        // },
        // {
        //   title: '广告发布',
        //   url: 'http://hearstone.com'
        // }
      ],
      productList: {
        pc: {
          title: 'PC产品',
          list: [
            {
              name: '数据统计',
              url: 'detail/count'
            },
            {
              name: '数据预测',
              url: 'detail/forecast'
            },
            {
              name: '流量分析',
              url: 'detail/analysis',
              hot: true
            },
            {
              name: '广告发布',
              url: 'detail/publish'
            }
          ]
        },
        app: {
          title: '手机应用类',
          last: true,
          list: [
            {
              name: '91助手',
              url: 'http://weixin.com'
            },
            {
              name: '产品助手',
              url: 'http://twitter.com'
            },
            {
              name: '智能地图',
              url: 'http://maps.com',
              hot: true
            },
            {
              name: '团队语音',
              url: 'http://phone.com'
            }
          ]
        }
      }
    }
  }
}
</script>

<style scoped>
	.index-wrap {
		width: 1200px;
		margin: 0 auto;
		overflow: hidden;
	}
	.index-left {
		float: left;
		width: 300px;
		text-align: left;
	}
	.index-right {
		float: left;
		width: 900px;
	}
	.index-left-block {
		margin: 15px;
		background: #fff;
		box-shadow: 0 0 1px #ddd;
	}
	.index-left-block .hr {
		margin-bottom: 20px;
	}
	.index-left-block h2 {
		background: #4fc08d;
		color: #fff;
		padding: 10px 15px;
		margin-bottom: 20px; 
	}
	.index-left-block h3 {
		padding: 0 15px 5px 15px;
		font-weight: 700;
		color: #222;
	}
	.index-left-block ul {
		padding: 10px 15px;
	}
	.index-left-block li {
		padding: 5px;
	}
	.index-board-list {
		overflow: hidden;
	}
	.index-board-item {
		float: left;
		width: 400px;
		background: #fff;
		box-shadow: 0 0 1px #ddd;
		padding: 20px;
		margin-right: 20px;
		margin-bottom: 16px;
	}
	.index-board-item-inner {
		min-height: 125px;
		padding-left: 120px;
	}
	.index-board-one .index-board-item-inner {
		background: url(../assets/images/1.jpg) no-repeat;
		background-size:100px 60px;
	}
	.index-board-two .index-board-item-inner {
		background: url(../assets/images/2.jpg) no-repeat;
		background-size:100px 60px;
	}
	.index-board-three .index-board-item-inner {
		background: url(../assets/images/3.jpg) no-repeat;
		background-size:100px 60px;
	}
	.index-board-four .index-board-item-inner {
		background: url(../assets/images/4.jpg) no-repeat;
		background-size:100px 60px;
	}
	.index-board-item h2 {
		font-size: 18px;
		font-weight: 700;
		color: #000;
		margin-bottom: 15px;
	}
	.line-last {
		margin-right: 0; 
	}
	.index-board-button {
		margin-top: 20px;
	}
	.lastest-news {
		min-height: 521px;
	}
	.hot-tag {
  		background: red;
  		color: #fff;
	}
/*	超出部分省略号替换*/
	.new-item {
  		display: inline-block;
 		width: 230px;
  		overflow: hidden;
 /* 		超出省略*/
  		text-overflow: ellipsis;
  /*		不允许换行*/
  		white-space: nowrap;
	}
</style>
