<template>
  <div>
      <el-form-item label="描述" prop="description">
        <el-input type="textarea" v-model="ruleForm.description"></el-input>
      </el-form-item>
    <upload-picture ></upload-picture>
  </div>
</template>

<script>
  import UploadPicture from '../components/UploadPicture'
  export default {
    name: 'NewBuildingType',
    components: {
      'upload-picture': UploadPicture,
    },
    props: {
      ruleForm: Object,
    },
    data() {
      return {
        dialogFormVisible: false,
        fileList: [],
        name: "",
        propertyForm: {
          name: ""
        },
        rules: {
          description: [
            { required: true, message: '请填写实体描述', trigger: 'blur' }
          ],
        }
      };
    },
    watch: {
      ruleForm: {
        handler:function (val, oldVal) {
          for (var key in val) {
            if (val.hasOwnProperty(key)) {
              this.$emit('handleOn', {key:key, val:val[key]})
            }
          }
        },
        deep: true,
      },
    }

  }
</script>

<style scoped>

</style>
