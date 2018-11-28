<template>
  <div>
    <el-form-item label="建筑材料" prop="has_material">
      <el-checkbox-group v-model="ruleForm.has_material">
        <el-checkbox v-for="(item, index) in ruleForm.DBmaterials" :label="item" name="has_material" :key="index"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input type="textarea" v-model="ruleForm.description"></el-input>
      </el-form-item>
      <upload-picture ></upload-picture>
  </div>
</template>

<script>
  import UploadPicture from '../components/UploadPicture'
  export default {
    name: 'NewBuildingPart',
    components: {
      'upload-picture': UploadPicture,
    },
    props: {
      ruleForm: Object,
    },
    data() {
      return {
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
