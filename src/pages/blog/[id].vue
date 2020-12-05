<template>
  <Layout>
  <div style="min-height: 600px" v-loading="loading">
    <el-card shadow="never" style="min-height: 400px">
      <div slot="header">
        <el-row>
          <el-col :span="12">
            <span>{{ blog.title }}</span>
          </el-col>
          <el-col :span="12">
            <div style="text-align: right">
              <el-button @click="$share()" style="padding: 3px 0" type="text" icon="el-icon-share">分享</el-button>
              <el-button @click="edit" style="padding: 3px 0" type="text" icon="el-icon-edit" v-if="token">编辑</el-button>
              <el-button style="padding: 3px 0" type="text" icon="el-icon-more-outline" @click="more">更多博客</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="font-size: 0.9rem; line-height: 1.5; color: #606c71">
        发布 {{ blog.createTime }} <br />
        更新 {{ blog.updateTime }}
      </div>
      <div style="font-size: 1.1rem; line-height: 1.5; color: #303133; border-bottom: 1px solid #e4e7ed; padding: 5px 0px 5px 0px">
        <pre style="font-family: '微软雅黑'">{{ blog.description }}</pre>
      </div>
      <div v-html="blog.content" class="markdown-body" style="padding-top: 20px"></div>
    </el-card>
  </div>
  </layout>
</template>
<script>
import axios from "axios";
import MarkdownIt from  'markdown-it'
const md = new MarkdownIt();
export default {
  data() {
    return {
      blog: {
        id: "",
        title: "",
        content: "",
        description: "",
        token:""
      },
      loading: false,
    };
  },
  computed: {},
  mounted() {
    this.loading = true;
    this.blog.id = this.$route.params.id;
    // console.log(this.$route.params.id)
    axios({
      url: process.env.GRIDSOME_API_URL + "/gists/" + this.blog.id,
      type: "get",
    })
      .then((response) => {
        let result = response.data;
        for (let key in result.files) {
          this.blog["title"] = key;
          this.blog["content"] = this.mdTohtml(result.files[key]["content"]);
          this.blog["description"] = result["description"];
          this.blog["createTime"] = this.$util.utcToLocal(result["created_at"]);
          this.blog["updateTime"] = this.$util.utcToLocal(result["updated_at"]);
          // console.log(JSON.stringify(this.blog))
          break;
        }
      })
      .then(() => (this.loading = false));
  },
  methods: {
     mdTohtml(markdown){
             return md.render(markdown)
        },
    edit() {
      if (!this.token) {
        this.$message({
          message: "请绑定有效的Token",
          type: "warning",
        });
        return;
      }
      this.$router.push("/blog/" + this.blog.id);
    },
    more() {
      this.$router.push("/blog/main");
    },
  },
};
</script>
