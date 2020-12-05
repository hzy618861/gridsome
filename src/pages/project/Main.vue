<template>
  <Layout>
    <div style="min-height: 600px" v-loading="loading">
      <el-card shadow="never" style="margin-bottom: 20px">
        <el-input placeholder="请输入关键字" v-model="searchKey" clearable style="width: 300px"></el-input>
        <el-button @click="search" icon="el-icon-search" style="margin-left: 10px" circle plain></el-button>
        <el-button @click="$share()" icon="el-icon-share" type="warning" style="margin-left: 10px" plain circle></el-button>
      </el-card>

      <div v-if="projects && projects.length > 0">
        <el-card shadow="hover" v-for="(item, index) in projects" :key="'pro' + index" style="margin-bottom: 20px" v-if="!item.node.hide">
          <div slot="header">
            <el-row>
              <el-col :span="16">
                <span>
                  <a style="text-decoration: none; cursor: pointer" @click="goDetails(item.node.name)"> <i class="el-icon-service"></i>&nbsp;&nbsp; {{ item.node.name }} </a>
                </span>
              </el-col>
              <el-col :span="8">
                <div style="text-align: right">
                  <el-button @click="goGithub(item.node.url)" style="padding: 3px 0" type="text" icon="el-icon-back">前往GitHub</el-button>
                  <el-button @click="$share('/project/' + item.node.name)" style="padding: 3px 0" type="text" icon="el-icon-share"></el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div style="font-size: 0.9rem; line-height: 1.5; color: #606c71">最近更新 {{ item.node.updateTime }}</div>
          <div style="font-size: 1.1rem; line-height: 1.5; color: #303133; padding: 10px 0px 0px 0px">
            {{ item.node.description }}
          </div>
          <div style="font-size: 1.1rem; color: #303133; padding: 10px 0px 0px 0px">
            <el-row>
              <el-col :span="16" style="padding-top: 5px">
                <el-tooltip effect="dark" :content="'star ' + item.node.stargazers_count" placement="bottom">
                  <i class="el-icon-star-off" style="margin: 0px 5px 0px 0px"></i>
                </el-tooltip>
                {{ item.node.stargazers_count }}
                <el-tooltip effect="dark" :content="'watch ' + item.node.watchers_count" placement="bottom">
                  <i class="el-icon-view" style="margin: 0px 5px 0px 15px"></i>
                </el-tooltip>
                {{ item.node.watchers_count }}
                <el-tooltip effect="dark" :content="'fork ' + item.node.forks_count" placement="bottom">
                  <i class="el-icon-bell" style="margin: 0px 5px 0px 15px"></i>
                </el-tooltip>
                {{ item.node.forks_count }}
              </el-col>
              <el-col :span="8" style="text-align: right">
                <el-tag size="small" type="danger" v-if="item.node.license">{{ item.node.license }}</el-tag>
                <el-tag size="small" type="success">{{ item.node.language }}</el-tag>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <div style="text-align: center">
          <Pager :info="$page.allRepoList.pageInfo" />
        </div>
      </div>

      <el-card shadow="never" style="margin-bottom: 20px; padding: 20px 0px 20px 0px; text-align: center" v-if="!projects || projects.length == 0">
        <font style="font-size: 30px; color: #dddddd">
          <b>还没有开源项目 (╯°Д°)╯︵ ┻━┻</b>
        </font>
      </el-card>
    </div>
  </Layout>
</template>
<page-query>
query($page: Int){
  allRepoList(perPage:2, page: $page)  @paginate{
   pageInfo {
      totalPages,
      currentPage
    }
     edges{
        node{
           id,
        name,
        forks_count,
        watchers_count,
        stargazers_count,
        description,
        updated_at,
        created_at
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
      loading: false,
      searchKey: "",
      // projects: [],
      allProject: [],
      token: "",
      projects: [],
    };
  },
  components: {
    Pager,
  },
  computed: {
    project() {
      return this.$page.allRepoList.edges;
    },
  },
  watch: {
    $route: {
      handler: function (o, n) {
        this.projects = JSON.parse(JSON.stringify(this.project));
        this.allProject = JSON.parse(JSON.stringify(this.project));
      },
      immediate: true,
    },
  },
  methods: {
    search() {
      this.projects = this.allProject.filter((item) => item.node.name.indexOf(this.searchKey) != -1);
    },
    goDetails(name) {
      this.$router.push("/project/" + name);
    },
    goGithub(url) {
      window.open(url);
    },
  },
};
</script>
