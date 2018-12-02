<template>
    <!--<div class="copys">
      <el-row class="tac">
        <el-col :span="12">
          <h5>默认颜色</h5>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">用户管理</el-menu-item>
                <el-menu-item index="1-2">群组管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">广播</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title">日志</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">设置</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
-->
  <div class="table_show">
    <el-table
      :data="dd"
      style="width: 100%">
      <el-table-column
        label="头像"
        width="180">
        <template slot-scope="scope">
          <img src="../../../static/img/p1.jpeg" style="width: 30px;height: 30px;">
        </template>
      </el-table-column>

      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>

      <el-table-column
        label="封号">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            active-text="封号"
            active-color="rgb(148,148,148)"
            inactive-text="解封">
          </el-switch>
        </template>
      </el-table-column>


    </el-table>
  </div>


</template>

<script type="text/ecmascript-6">
  export default{
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        dd:[
          {
            "id": "1",
            "name": "用户1",
            "state": true
          },
          {
            "id": "2",
            "name": "用户2",
            "state": false
          },
          {
            "id": "3",
            "name": "用户3",
            "state": true
          },
          {
            "id": "4",
            "name": "用户4",
            "state": "true"
          },
          {
            "id": "5",
            "name": "用户5",
            "state": "false"
          },
          {
            "id": "6",
            "name": "用户6",
            "state": true
          },
        ],
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .tac{
    width 450px;
  }
  .table_show
    width 600px
</style>
