<template>
  <div class="wrp">
    <m-header :title="title" :hasBack='false'></m-header>
    <cube-scroll ref="scroll" :listenScroll="true" class="scrollWrp" v-if='show'>
      <form v-on:submit.prevent="onSubmit">
        <ul class="formbox">
          <li :style='minHeight[0]' ref="brand">
            <div class="title">
              <h1>手机品牌</h1>
            </div>
            <ul>
              <li v-for="(item,index) in fixBrandList">
                <label :for="'brand'+item.fixbrand_id" v-text="item.brandname" @click="brand(index, item.fixbrand_id)" :class="{'active' : dataIndex[0] === index}"></label>
                <input :id="'brand'+item.fixbrand_id" type="radio" name="fixbrandid" :value="item.fixbrand_id" v-model='formData.fixbrandid'>
              </li>
            </ul>
          </li>
          <li :style='minHeight[1]' v-if="fixModelList.length" ref="model">
            <div class="title">
              <h1>手机型号</h1></div>
            <ul>
              <li v-for="(item,index) in fixModelList">
                <label :for="'model'+item.fixmodel_id" v-text="item.modelname" @click="model(index, item)" :class="{'active' : dataIndex[1] === index }"></label>
                <input :id="'model'+item.fixmodel_id" type="radio" name="fixmodelid" :value="item.fixmodel_id" v-model='formData.fixmodelid'>
              </li>
            </ul>
          </li>
          <li :style='minHeight[2]' v-if="fixOperatorsList.length" ref="operators">
            <div class="title">
              <h1>运营商</h1></div>
            <ul>
              <li v-for="(item,index) in fixOperatorsList">
                <label :for="'operators'+item.modeloperatorsid" v-text="item.operatorsname" @click="operators(index, item.modeloperatorsid)" :class="{'active' : dataIndex[2] === index }"></label>
                <input :id="'operators'+item.modeloperatorsid" type="radio" name="modeloperatorsid" :value="item.modeloperatorsid" v-model='formData.modeloperatorsid'>
              </li>
            </ul>
          </li>
          <li :style='minHeight[3]' v-if="fixColorList.length" ref="color">
            <div class="title">
              <h1>颜色</h1></div>
            <ul>
              <li v-for="(item,index) in fixColorList">
                <label :for="'color'+item.fixcolor_id" v-text="item.colorname" @click="color(index)" :class="{'active' : dataIndex[3] === index }"></label>
                <input :id="'color'+item.fixcolor_id" type="radio" name="modelcolorid" :value="item.modelcolorid" v-model='formData.modelcolorid'>
              </li>
            </ul>
          </li>
          <li :style='minHeight[4]' v-if="fixProblemList.length" ref="problem">
            <div class="title">
              <h1>选择问题类型</h1></div>
            <ul>
              <li v-for="(item,index) in fixProblemList">
                <label :for="'problem'+item.fixproblem_id" v-text="item.problemname" @click="problem(index, item)" :class="{'active' : dataIndex[4] === index }"></label>
                <input :id="'problem'+item.fixproblem_id" type="radio" name="fixproblemid" :value="item.fixproblem_id" v-model='formData.fixproblemid'>
              </li>
            </ul>
          </li>
          <li :style='minHeight[5]' v-if="fixMalfunctionList.length" ref="getfunction">
            <div class="title">
              <h1>选择故障类型</h1></div>
            <ul class="onelist">
              <li v-for="(item,index) in fixMalfunctionList">
                <label :for="item.fixmalfunction_id" v-text="item.malfunctionname" @click="getfunction(index, item.modelmalfunctionid)" :class="{'active' : dataIndex[5] === index }"></label>
                <input :id="item.fixmalfunction_id" type="radio" name="fixmalfunctionid" :value="item.fixmalfunction_id" v-model='formData.fixmalfunctionid'>
              </li>
            </ul>
          </li>
        </ul>
      </form>
    </cube-scroll>
    <cube-loading v-else :size="40" class="loading"></cube-loading>
    <router-view></router-view>
  </div>
</template>
<script>
import { sdxiu, getGps } from 'api/sdxiu'
import mHeader from 'base/header/header'
import Vue from 'vue'

export default {
  data() {
    return {
      title: '查价下单',
      show: false,
      height: '',
      minHeight: [],
      datalist: ['fixBrandList', 'fixModelList', 'fixOperatorsList', 'fixColorList', 'fixProblemList', 'fixMalfunctionList'],
      formlist: ["fixbrandid", "fixmodelid", "modeloperatorsid", "modelcolorid",
        "fixproblemid", "modelproblemid", "modelmalfunctionid", "fixmalfunctionid"
      ],
      refsList: ['brand', 'model', 'operators', 'color', 'problem', 'getfunction'],
      dataIndex: [-1, -1, -1, -1, -1, -1],
      fixBrandList: [],
      fixModelList: [],
      fixOperatorsList: [],
      fixColorList: [],
      fixProblemList: [],
      fixMalfunctionList: [],
      formData: {},
      functionid: -1,
      options: {}
    }
  },
  created() {},
  activated: function() {
    // 只对vue-router的路由生效
  },
  mounted() {
    this.$store.commit('setData', '')
    // this.setHeight(0)
    sdxiu({
      type: 'Fix',
      key: 'fixBrandList'
    }).then(res => {
      console.log(res)
      this.show = true
      this.fixBrandList = res.data
      setTimeout(() => {
        this.height = this.$refs.scroll.$el.offsetHeight
      }, 50)
    })
  },
  methods: {
    setIndex: function(num, index) {
      var that = this
      console.log(this)
      for (var i = 0; i < 5; i++) {
        if (i === num) {
          Vue.set(that.dataIndex, i, index)
        }
        if (i > num) {
          Vue.set(that.dataIndex, i, -1)
        }
      }
      console.log(that.dataIndex)
    },
    setHeight: function(num) {
      var that = this
      return new Promise((resolve, reject) => {
        var $minHeight = that.minHeight
        var $height = that.height
        for (var i = 0; i < 6; i++) {
          if (i <= num) {
            $minHeight[i] = ''
          } else {
            $minHeight[i] = 'min-height:' + $height + 'px'
          }
        }
        that.minHeight = $minHeight
        resolve()
      })
    },
    _Scorll: function(num) {
      var that = this
      var $formData = that.formData
      var $datalist = that.datalist
      var $formlist = that.formlist
      for (var i = 0; i < 6; i++) {
        if (i > num) {
          that[$datalist[i + 1]] = []
          if (num === 4) {
            $formData[$formlist[6]] = $formData[$formlist[7]] = 0
            that.functionid = -1
          } else {
            $formData[$formlist[i]] = 0
          }
        }
      }
      console.log($formData)
      that.formData = $formData
      this.$refs.scroll.refresh()
      setTimeout(() => {
        var $next = this.$refs[this.refsList[num + 1]] || this.$refs[this.refsList[num + 2]]
        this.$refs.scroll.scrollTo(0, -$next.offsetTop, 300)
      }, 40)
    },
    brand: function(index, id) {
      this.setIndex(0, index)
      sdxiu({
        type: 'Fix',
        key: 'fixModelList',
        data: { fixbrandid: id }
      }).then(res => {
        this.fixModelList = res.data
        this.setHeight(0).then(() => {
          this._Scorll(0)
        })
      })
    },
    model: function(index, item) {
      this.setIndex(1, index)
      console.log(item.hasOperators)
      var that = this
      if (item.hasOperators) {
        var $key = 'fixOperatorsList'
      } else {
        var $key = 'fixColorList'
      }
      sdxiu({
        type: 'Fix',
        key: $key,
        data: { fixmodelid: item.fixmodel_id }
      }).then(res => {
        that.fixOperatorsList = []
        that.fixColorList = []
        that[$key] = res.data
        // console.log(this)
        that.setHeight(1).then(() => {
          if ($key === 'fixOperatorsList') {
            that._Scorll(1)
          } else {
            that._Scorll(2)
            this.formData[this.formlist[2]] = 0
          }
        })
      })
    },
    operators: function(index, id) {
      this.setIndex(2, index)
      sdxiu({
        type: 'Fix',
        key: 'fixColorList',
        data: { fixmodelid: this.formData.fixmodelid }
      }).then(res => {
        this.fixColorList = res.data
        this.setHeight(2).then(() => {
          this._Scorll(2)
        })
      })
    },
    color: function(index) {
      this.setIndex(3, index)
      sdxiu({
        type: 'Fix',
        key: 'fixProblemList',
        data: { fixmodelid: this.formData.fixmodelid }
      }).then(res => {
        this.fixProblemList = res.data
        this.setHeight(3).then(() => {
          this._Scorll(3)
        })
      })
    },
    problem: function(index, item) {
      this.setIndex(4, index)
      sdxiu({
        type: 'Fix',
        key: 'fixMalfunctionList',
        data: { fixproblemid: item.fixproblem_id }
      }).then(res => {
        this.formData.modelproblemid = item.modelproblemid
        this.fixMalfunctionList = res.data
        this.setHeight(4).then(() => {
          this._Scorll(4)
        })
      })
    },
    getfunction: function(index, id) {
      this.formData.modelmalfunctionid = id
      var $dataIndex = this.dataIndex
      $dataIndex[5] = index
      this.dataIndex = $dataIndex
      this._Toast("loading", '加载中', 1000)
      this.$store.commit('setData', this.formData)
      setTimeout(() => {
        this.$router.push({ path: '/fix/toOrder' })
      }, 1000)
      // console.log(this.formData)
      // sdxiu({
      //   type: 'Fix',
      //   key: 'fixInfo',
      //   data: this.formData
      // }).then(res => {
      //   console.log(res)
      // })
    },
    onSubmit: function() {
      console.log(this.formData)
    }
  },
  components: {
    mHeader,
  }
}

</script>
<style lang="less" rel="stylesheet/less">
@import "~common/less/size.less";
.wrp {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  .scrollWrp {
    position: absolute;
    top: 80/@rem;
    bottom: 120/@rem;
    width: 100%;
    height: auto;
  }
  .formbox {
    >li {
      box-sizing: border-box;
      padding: 0.25rem;
      margin-bottom: .1rem;
      .title {
        padding: 0 0.25rem;
        background: #fff;
      }
      h1 {
        padding: 0.25rem 0.25rem;
        font-size: .3rem;
        line-height: 0.6rem;
        font-weight: 400;
        padding-bottom: .3rem;
        border-bottom: .02rem solid #d4d4d4;
        color: #4dbdc3;
      }

      ul {
        padding: 0 0.25rem;
        display: flex;
        flex-wrap: wrap;
        padding-top: .4rem;
        background: #fff;
        li {
          width: 3.15rem;
          height: 0.7rem;
          box-sizing: border-box;
          border: .02rem solid @blue;
          position: relative;
          margin-right: .2rem;
          margin-bottom: .4rem; // padding: .2rem;
          &:nth-child(2n) {
            margin-right: 0
          }
          label {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            display: flex;
            padding: 0 0.1rem;
            justify-content: center;
            align-items: center;
            font-size: 0.26rem; // word-break: break-all;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .active {
            background: @blue;
            color: #fff;
          }
        }
      }
      .onelist {
        li {
          width: 100%;
          margin-right: 0;
          &:nth-child(2n) {
            margin-right: 0
          }
        }
      }
    }
  }
}

</style>
