<template>
  <div>
      <el-form-item label="建筑类别" prop="has_type">
        <el-checkbox-group v-model="ruleForm.has_type">
          <el-checkbox v-for="(item, index) in ruleForm.DBtypes" :label="item" name="has_type" :key="index"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="外观风格" prop="exterior">
        <el-radio-group v-model="ruleForm.exterior">
          <el-radio v-for="(item, index) in ruleForm.DBexteriors" :label="item" name="exterior" :key="index"></el-radio>
        </el-radio-group>
      </el-form-item>
    <el-form-item label="结构" prop="structure">
      <el-radio-group label="按承重材料" v-model="ruleForm.structure.withMaterials">
        <el-radio v-for="(item, index) in ruleForm.DBstructure.withMaterials" :label="item" name="layer" :key="index"></el-radio>
      </el-radio-group>
      <el-radio-group label="按承重结构" v-model="ruleForm.structure.withStructure">
        <el-radio v-for="(item, index) in ruleForm.DBstructure.withStructure" :label="item" name="layer" :key="index"></el-radio>
      </el-radio-group>
    </el-form-item>
      <el-form-item label="层数" prop="layer">
        <el-radio-group v-model="ruleForm.layer">
          <el-radio v-for="(item, index) in ruleForm.DBlayers" :label="item" name="layer" :key="index"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input v-model="ruleForm.address"></el-input>
      </el-form-item>
      <el-form-item label="建造年代" prop="built_year">
        <el-input v-model="ruleForm.built_year"></el-input>
      </el-form-item>
      <el-form-item label="建造工匠" prop="built_people">
        <el-input v-model="ruleForm.built_people"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input type="textarea" v-model="ruleForm.description"></el-input>
      </el-form-item>
      <upload-picture ></upload-picture>
  </div>
</template>

<script>
  import CitySelect from '../components/CitySelect'
  import UploadPicture from '../components/UploadPicture'
  export default {
    name: 'NewBuilding',
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
          types: [
            { type: 'array', required: true, message: '请至少选择一个建筑类别', trigger: 'change' }
          ],
          materials: [
            { type: 'array', required: true, message: '请至少选择一个建筑材料', trigger: 'change' }
          ],
          description: [
            { required: true, message: '请填写实体描述', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请填写详细地址', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      cityChange(city) {
        this.ruleForm.city = city;
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
