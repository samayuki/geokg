<template>
  <div class="content">
    <div class="input-data">
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-position="left"
               label-width="85px"
               class="demo-ruleForm">
        <el-form-item label="实体名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="实体类别" prop="type">
          <el-radio-group v-model="ruleForm.type">
            <el-radio label="建筑群" name="type"></el-radio>
            <el-radio label="建筑材料" name="type"></el-radio>
            <el-radio label="建筑类型" name="type"></el-radio>
            <el-radio label="单体建筑" name="type"></el-radio>
            <el-radio label="建筑构造" name="type"></el-radio>
          </el-radio-group>
        </el-form-item>
        <!--
            某些属性是否可以为空，待定
            以下是选定实体类别所具有的属性
        -->
        <new-building-complex :ruleForm="ruleForm" @handleOn="handleOn" v-if="ruleForm.type === '建筑群'"></new-building-complex>
        <new-building :ruleForm="ruleForm" @handleOn="handleOn" v-else-if="ruleForm.type === '单体建筑'"></new-building>
        <new-building-type :ruleForm="ruleForm" @handleOn="handleOn" v-else-if="ruleForm.type === '建筑类型'"></new-building-type>
        <new-material :ruleForm="ruleForm" @handleOn="handleOn" v-else-if="ruleForm.type === '建筑材料'"></new-material>
        <new-building-part :ruleForm="ruleForm" @handleOn="handleOn" v-else-if="ruleForm.type === '建筑构造'"></new-building-part>
        <el-form-item>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button @click="appendTreeNode" v-if="ruleForm.type === '建筑群' || ruleForm.type === '单体建筑'">新增子节点</el-button>
          <el-button @click="deleteTreeNode">删除此节点</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--建筑结构的树解析图-->
    <div class="tree-view">
      <el-tree :data="treeData"
               :props="defaultProps"
               node-key="id"
               ref="tree"
               highlight-current
               default-expand-all
               expand-on-click-node
               @node-click="handleNodeClick">
      </el-tree>
    </div>
  </div>
</template>

<script>
  import axios from '../plugins/axios'
  import CitySelect from '../components/CitySelect'
  import NewBuilding from '../components/NewBuilding'
  import NewBuildingPart from '../components/NewBuildingPart'
  import NewMaterial from '../components/NewMaterial'
  import NewBuildingType from '../components/NewBuildingType'
  import NewBuildingComplex from '../components/NewBuildingComplex'
  const mongoose = require('mongoose');
  export default {
    head : {
      title: "New | 新数据项"
    },
    components: {
      'city-select': CitySelect,
      'new-building': NewBuilding,
      'new-building-part': NewBuildingPart,
      'new-material': NewMaterial,
      'new-building-type': NewBuildingType,
      'new-building-complex': NewBuildingComplex,
    },
    data() {
      return {
        dialogFormVisible: false,
        fileList: [],
        name: "",
        propertyForm: {
          name: ""
        },
        rootId: "",
        ruleForm: {
          id: mongoose.Types.ObjectId().toString(),
          name: '新增节点',
          //delivery: false,
          type: '',
          region: '',
          DBtypes: ["居住建筑", "公共建筑", "园林建筑", "商业建筑", "军事建筑"],
          DBmaterials: ["木材", "竹材", "石材", "水泥", "混泥土", "金属", "砖瓦", "陶瓷", "玻璃", "工程塑料", "复合材料"],
          DBexteriors: ["中式", "西式", "中西合璧"],
          DBlayers: ["单层", "双层", "三层", "多层"],
          DBstructure: {
            withMaterials: ["混泥土结构", "钢结构", "砌体结构", "木结构", "土坯", "石土"],
            withStructure: ["砖混结构", "框架结构", "框架剪力墙结构", "剪力墙结构", "简体结构", "排架结构"]
          },
          structure: {
            withMaterials: "",
            withStructure: ""
          },
          has_type: [],
          has_material: [],
          exterior: "",
          layer: "",
          description: '',
          city: [],
          address: '',
          built_year: '',
          built_people: '',
          protect_level: '',
          current_situation: '',
          has_part: [],
          has_picture: [],
        },
        initForm: {},
        treeData: [],
        defaultProps: {
          label: "name",
          children: 'has_part',
        },
        rules: {
          name: [
            { required: true, message: '请输入实体名称', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请至少选择一个实体类别', trigger: 'change' }
          ],
        }
      };
    },
    methods: {
      async getFormData() {
        try {
          await axios.get('/api/getFormData', {params: {treeData: this.treeData}}).then(({data}) => {
            console.log("return success");
            console.log(data);
          });
        } catch (e) {
          console.log('get data failed!' + e.message);
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        // this.$refs.upload.clearFiles();
        // this.$refs['citySelect'].clearCity();
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //console.log(this.$refs['citySelect'].getCity());
            //console.log(this.$refs['ruleForm']);
            this.getFormData();
            console.log('submit success!');
            //this.$refs.upload.submit();
            //this.resetForm(formName);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      removeDomain(item) {
        let index = this.ruleForm.domains.indexOf(item);
        if (index !== -1) {
          this.ruleForm.domains.splice(index, 1)
        }
      },
      addDomain(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            this.dialogFormVisible = false;
            this.ruleForm.domains.push({
              value: '',
              name: this.propertyForm.name,
              key: Date.now()
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 传递事件给子组件
      handleOn(ruleForm) {
        this.ruleForm[ruleForm.key] = ruleForm.val;
        window.localStorage.setItem("ruleForm",JSON.stringify(this.ruleForm));
      },

      // 树目录内添加节点
      appendTreeNode() {
        // 获取当前节点id
        let parentId = this.ruleForm.id;
        // 生成新节点(新ID)
        let newNode = JSON.parse(JSON.stringify(this.initForm));
        newNode.id = mongoose.Types.ObjectId().toString();
        this.$refs.tree.append(newNode, parentId);
        // 定位到新节点
        this.handleNodeClick(this.$refs.tree.getNode(newNode.id).data);
        this.$refs.tree.setCurrentKey(newNode.id);
      },
      // 移除此节点
      deleteTreeNode() {
        // 获取当前节点id
        let currentId = this.ruleForm.id;
        let currentNode = this.$refs.tree.getNode(currentId);
        if (currentId !== this.rootId) { // 定位到父节点然后删除这个子节点
          this.handleNodeClick(currentNode.parent.data);
          this.$refs.tree.setCurrentNode(currentNode.parent);
          this.$refs.tree.remove(currentId);
        } else {  // 是根节点，不可删除，只可修改
          alert("根节点不可删除！");
        }
      },
      // 点击右侧树层次结构
      handleNodeClick(data) {
        let currentNode = this.$refs.tree.getNode(data.id);
        this.ruleForm = currentNode.data;
      },
    },
    watch: {
      ruleForm: {
        handler:function (val, oldVal) {
          if (this.treeData.length > 0) {
            let currentNode = this.$refs.tree.getNode(val.id);
            currentNode.data = this.ruleForm;
          }
        },
        deep: true,
      },
    },
    mounted() {
      this.treeData.push(this.ruleForm);
      this.initForm = JSON.parse(JSON.stringify(this.ruleForm));
      this.rootId = this.ruleForm.id;
    }
  }
</script>

<style scoped>

  .content {
    width: 85%;
    margin: 10px auto  10px auto;
    text-align: left;
  }
  .input-data {
    display: inline-block;
    margin: 0 auto;
    padding: 20px 15px 20px 15px;
    border-radius: 10px;
    box-shadow: 1px 0px 3px lightgrey;
    width: 70%;
  }
  .tree-view {
    display: inline-block;
    float: right;
    top: 0;
    width: 25%;
  }
  @media screen and (max-width: 900px) {
    .content {
      width: 90%;
    }
  }
</style>
