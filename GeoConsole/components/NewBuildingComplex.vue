<template>
  <div>
    <el-form-item label="详细地址" prop="region">
      <city-select @cityChange="cityChange"></city-select>
      <el-input v-model="ruleForm.address"></el-input>
    </el-form-item>
    <el-form-item label="保护级别" prop="protect_level">
      <el-input v-model="ruleForm.protect_level"></el-input>
    </el-form-item>
    <el-form-item label="现存情况" prop="current_situation">
      <el-input v-model="ruleForm.current_situation"></el-input>
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input type="textarea" v-model="ruleForm.description"></el-input>
    </el-form-item>
    <upload-picture @upPicture="upPicture"></upload-picture>
  </div>
</template>

<script>
  import CitySelect from '../components/CitySelect'
  import UploadPicture from '../components/UploadPicture'
  export default {
    name: 'NewBuildingComplex',
    components: {
      'city-select': CitySelect,
      'upload-picture': UploadPicture,
    },
    props: {
      ruleForm: Object,
    },
    data() {
      return {
        rules: {
        }
      };
    },
    methods: {
      cityChange(city) {
        this.ruleForm.city = city;
      },
      upPicture(fileList) {
        this.ruleForm.has_picture = fileList;
      }
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
