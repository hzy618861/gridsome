<template>
  <Layout>
    <div>
      <el-card shadow="never" style="min-height: 400px; margin-bottom: 20px; padding: 0px 0px 20px 0px">
        <el-tabs v-model="activeTab" type="card" @tab-click="onSelect">
          <el-tab-pane :label="'粉丝 ' + baseNumInfo.followers" name="followers" style="padding: 5px">
            <div>
              <div v-if="followers.edges.length">
                <el-row style="min-height: 200px">
                  <el-col :span="8" v-for="(item, index) in followers.edges" :key="'followers' + index" style="padding: 10px">
                    <el-card shadow="hover" style="font-size: 13px; color: #606266; line-height: 20px">
                      <i class="el-icon-star-off"></i>&emsp;
                      <a @click="$router.push(`/social/${item.node.login}`)" style="text-decoration: none; cursor: pointer">{{ item.node.login }}</a>
                      <br />
                      <i class="el-icon-message"></i>&emsp;
                      <a :href="item.node.html_url" target="_blank" style="text-decoration: none; cursor: pointer">TA的主页</a>
                      <br />
                      <img :src="item.node.avatar_url" style="width: 100%; border-radius: 5px; margin-top: 5px" />
                    </el-card>
                  </el-col>
                </el-row>
                <div style="text-align: center; margin-top: 10px">
                  <Pager :info="$page.followers.pageInfo" />
                <!--  <el-pagination @current-change="onSelect" background layout="prev, pager, next" :current-page.sync="followers.query.page" :page-size="followers.query.pageSize" :total="followers.query.pageNumber * followers.query.pageSize"> </el-pagination> -->
                </div>
              </div>
              <div style="min-height: 300px; margin-bottom: 20px; padding: 20px 0px 20px 0px; text-align: center" v-else>
                <font style="font-size: 30px; color: #dddddd">
                  <b>(￢_￢) 没有一个粉丝</b>
                </font>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="'关注 ' + baseNumInfo.following" name="following" style="padding: 5px">
            <div>
              <div v-if="following.edges.length">
                <el-row style="min-height: 200px">
                  <el-col :span="8" v-for="(item, index) in following.edges" :key="'following' + index" style="padding: 10px">
                    <el-card shadow="hover" style="font-size: 13px; color: #606266; line-height: 20px">
                      <i class="el-icon-star-off"></i>&emsp;
                      <a @click="$router.push(`/social/${item.node.login}`)" style="text-decoration: none; cursor: pointer">{{ item.node.login }}</a>
                      <br />
                      <i class="el-icon-message"></i>&emsp;
                      <a :href="item.node.html_url" target="_blank" style="text-decoration: none; cursor: pointer">TA的主页</a>
                      <br />
                      <img :src="item.node.avatar_url" style="width: 100%; border-radius: 5px; margin-top: 5px" />
                    </el-card>
                  </el-col>
                </el-row>
                <div style="text-align: center; margin-top: 10px">
                  <!--    <el-pagination @current-change="onSelect" background layout="prev, pager, next" :current-page.sync="following.query.page"
                                    :page-size="following.query.pageSize" :total="following.query.pageNumber*following.query.pageSize">
                                </el-pagination>
                                -->
                  <Pager :info="$page.following.pageInfo" />
                </div>
              </div>
              <div style="min-height: 300px; margin-bottom: 20px; padding: 20px 0px 20px 0px; text-align: center" v-else>
                <font style="font-size: 30px; color: #dddddd">
                  <b>(￢_￢) 还没有关注一个人</b>
                </font>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </Layout>
</template>
<page-query>
  query($page: Int){
  followers:allSocial01(perPage: 9, page: $page)  @paginate{
     pageInfo {
      totalPages
      currentPage
    }
     edges{
      node{
        id
        avatar_url
        html_url
        login
        
      }
    }
  }
  following:allSocial02(perPage: 9, page: $page)  @paginate{
       pageInfo {
      totalPages
      currentPage
    }
     edges{
      node{
        id
        avatar_url
        html_url
        login
        
      }
    }
  }
  allBase{
     edges{
        node{
          following,
          followers
        }
      }
  }
}
</page-query>
<script>
import { Pager } from "gridsome";
import Layout from "~/layouts/Default.vue";
export default {
  data() {
    return {
      activeTab: "followers",
    //   followers: {
    //     query: {
    //       page: 1,
    //       pageSize: 9,
    //       pageNumber: 1,
    //     },
    //     loading: false,
    //     list: [],
    //   },
    //   following: {
    //     query: {
    //       page: 1,
    //       pageSize: 9,
    //       pageNumber: 1,
    //     },
    //     loading: false,
    //     list: [],
    //   },
      githubUsername: "",
      followersTotal: "",
      followingTotal: "",
    };
  },
  computed: {
      followers(){
           return this.$page.followers
      },
      following(){
           return this.$page.following
      },
      baseNumInfo(){
            return  {
                  following:this.$page.allBase.edges[0].node.following,
                  followers:this.$page.allBase.edges[0].node.followers,
            } 
      }
  },
  components: {
    Pager,
  },
  mounted() {
    this.onSelect();
  },
  methods: {
    onSelect() {
      switch (this.activeTab) {
        case "followers":
         // this.listFollowers();
          break;
        case "following":
         // this.listFollowing();
          break;
        default:
          break;
      }
    },

  },
};
</script>
