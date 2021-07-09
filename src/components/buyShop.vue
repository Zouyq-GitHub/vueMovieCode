<template>
  <div class="buyShop">
    <!-- <p>{{this.$store.state.queryBuyMovieList}}</p> -->

    <Table border ref="selection" :columns="columns4" :data="this.$store.state.queryBuyMovieList">
      <template slot-scope="{row}" slot="name">
        <span>{{row.m_movieName}}</span>
      </template>

      <template slot-scope="{row, index}" slot="m_buyCount">
        <span @click="buyNum(index,1)">+</span>
        <span>{{row.m_buyCount}}</span>
        <span @click="buyNum(index,2)">-</span>
      </template>

      <template slot-scope="{row, index}" slot="buy">
        <span @click="buyMovieFun(index)">购买</span>
      </template>
    </Table>
    <Page :current="1" :total="movieCount" :page-size="15" simple @on-change="changePage" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns4: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '电影名称',
          slot: 'name',
          align: 'center'
        },

        {
          title: '上架时间',
          align: 'center',
          key: 'm_time'
        },
        {
          title: '电影票价',
          align: 'center',
          key: 'm_price'
        },
        {
          title: '购买数量',
          align: 'center',
          slot: 'm_buyCount'
        },
        {
          title: '购买价格',
          align: 'center',
          key: 'm_buyPrice'
        },
        {
          title: '操作',
          align: 'center',
          slot: 'buy',
          key: 'buy'
        }
      ],
      queryBuyMovieList: [],
      movieCount: 0
    }
  },

  created() {
    this.getData();
  },

  methods: {
    getData() {
      //查询购买页面的分页查询 每页10个
      this.$axios.post('http://localhost:8087//queryBuyMoviePage', this.$qs.stringify({
        curr: 0
      })).then((res) => {
        // this.queryBuyMovieList = res.data
        this.$store.commit('queryMovieFun', res.data);
      })

      //查询电影总数
      this.$axios.post('http://localhost:8087//queryBuyMovieCount').then((res) => {
        this.movieCount = res.data - 15
      })
    },
    buyNum(index, co) {
      this.queryBuyMovieList = this.$store.state.queryBuyMovieList;
      if (co == 1) {
        //改变购买电影票的数量
        this.queryBuyMovieList[index].m_buyCount++;
      }
      else {
        if (this.queryBuyMovieList[index].m_buyCount <= 0) {
        } else {
          this.queryBuyMovieList[index].m_buyCount--;
        }
      }
      //最后修改所需要的价格
      this.queryBuyMovieList[index].m_buyPrice = this.queryBuyMovieList[index].m_buyCount * this.queryBuyMovieList[index].m_price;
    },
    changePage(val) {
      if (val == 1) {
        val = 0
      }
      this.$axios.post('http://localhost:8087//queryBuyMoviePage', this.$qs.stringify({
        curr: val
      })).then((res) => {
        //附上分页后的电影
        // this.queryBuyMovieList = res.data
        this.$store.commit('queryMovieFun', res.data);
      })
    },
    buyMovieFun(index) {
      //购买电影
      this.queryBuyMovieList = this.$store.state.queryBuyMovieList;
      var nodesc = false;
      if (this.queryBuyMovieList[index].m_buyCount > 0) {
        //引用成功弹窗
        this.$Notice.success({
          title: '购买成功',
          desc: nodesc ? '' : '' + this.queryBuyMovieList[index].m_movieName + '¥' + this.queryBuyMovieList[index].m_buyPrice
        });
      }
      else {
        //引用失败弹窗
        this.$Notice.error({
          title: '无法购买',
          desc: nodesc ? '' : '未选择数量'
        });
      }
    }
  }
}
</script>

<style>
@import "../../static/css/buy.css";
</style>