<template>
  <div v-loading="loading" class="content">
    <el-form :model="crawlerForm" ref="crawlerForm" label-width="100px" class="demo-ruleForm" @submit.native.prevent = "submitForm('crawlerForm')">
      <el-form-item
        label="关键词"
        prop="keyword"
        :rules="[{ required: true, message: '关键词不能为空'},
        {pattern: /^[A-Za-z\s]{1,30}$|^[\u4e00-\u9fa5\s]{1,10}$/, message: '属性名只能为中文(不超过10个汉字)/英文(不超过30个字节)'}]">
        <el-input type="age" v-model="crawlerForm.keyword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('crawlerForm')">提交</el-button>
        <el-button @click="resetForm('crawlerForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import axios from '../plugins/axios'
  export default {
    head: {
      title: "Crawler | 网络信息抓取"
    },
    data() {
      return {
        loading: false,
        crawlerForm: {
          keyword: ''
        }
      };
    },
    methods: {
      async getCrawlerData() {
        try {
          await axios.get('/api/getCrawlerData', {params: {keyword: this.crawlerForm.keyword}}).then(({data}) => {
            console.log(data);
            this.loading = false;
          });
        } catch (e) {
          console.log('get data failed!' + e.message);
          this.loading = false;
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.getCrawlerData();
            console.log('submit success!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style>
  .content {
    width: 60%;
    margin: 20px auto  20px auto;
  }
</style>
