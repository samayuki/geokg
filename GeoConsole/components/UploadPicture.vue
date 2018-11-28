<template>
    <div>
      <el-form-item label="上传图片" prop="images">
        <el-upload
          class="upload-demo"
          ref="upload"
          :action=domain
          :http-request=upQiniu
          :file-list="fileList"
          list-type="picture-card"
          :before-upload="beforeUpload"
          multiple>
          <i class="el-icon-plus"></i>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
    </div>
</template>

<script>
  import axios from '../plugins/axios'
  import qs from 'qs'
    export default {
      name: "UploadPicture",
      data() {
        return {
          fileList: [],
          token: {}, // 上传到七牛云的token
          bucket: 'sysu-geokg',
          domain: 'https://upload-z2.qiniup.com/',
          //domain: 'http://upload.qiniu.com/',
          qiniuaddr: 'pipco6kmh.bkt.clouddn.com',
        }
      },
      methods: {
        // 长传到七牛云
        async upQiniu(req) {
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
              //'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
          };
          let fileType = '';
          if (req.file.type === 'image/png') {
            fileType = 'png';
          } else {
            fileType = 'jpg';
          }
          // 重命名要上传的文件
          const keyName = this.bucket + new Date() + Math.floor(Math.random() * 100) + '.' + fileType;
          // 从后端获取上传凭证token
          try {
            await axios.get('/api/getToken').then(res => {
              const formdata = new FormData();
              formdata.append('file', req.file);
              formdata.append('token', res.data.token);
              formdata.append('key', keyName);
              this.token.token = res.data.token;
              // 获取到凭证后再将文件上传到七牛云
              try {
                axios.post(this.domain, formdata, config).then(res => {
                  console.log(res);
                  alert("OKKK");
                  this.fileList.push('http://' + this.qiniuaddr + '/' + res.data.key);
                  alert('http://' + this.qiniuaddr + '/' + res.data.key);
                  console.log('http://' + this.qiniuaddr + '/' + res.data.key);
                });
              } catch (e) {
                console.log('post failed!' + e.message);
              }

            });
          } catch (e) {
            console.log('get token failed!' + e.message);
          }
        },

        beforeUpload(file) {  // 图片提交前进行验证
          const isJPG = file.type === 'image/jpeg';
          const isPNG = file.type === 'image/png';
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isJPG && !isPNG) {
            this.$message.error('上传图片只能是JPG/PNG格式！');
            return false;
          }
          if (!isLt2M) {
            this.$message.error('上传图片大小不能超过2MB！');
            return false;
          }
          return true;
        }
      },
      watch: {
        fileList: {
          handler:function (val, oldVal) {
            this.$emit('upPicture', val)
          },
          deep: true,
        }
      }
    }
</script>

<style scoped>

</style>
