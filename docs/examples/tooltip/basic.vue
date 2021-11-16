<template>
  <div class="box">
    <div class="top">
      <el-tooltip
        effect="dark"
        content="Top Left prompts info"
        placement="top-start"
      >
        <el-button class="item">top-start</el-button>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="Top Center prompts info"
        placement="top"
      >
        <el-button class="item">top</el-button>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="Top Right prompts info"
        placement="top-end"
      >
        <el-button class="item">top-end</el-button>
      </el-tooltip>
    </div>
    <div class="left">
      <el-tooltip
        effect="dark"
        content="Left Top prompts info"
        placement="left-start"
      >
        <el-button class="item">left-start</el-button>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="Left Center prompts info"
        placement="left"
      >
        <el-button class="item">left</el-button>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="Left Bottom prompts info"
        placement="left-end"
      >
        <el-button class="item">left-end</el-button>
      </el-tooltip>
    </div>

    <div class="right">
      <el-tooltip
        effect="dark"
        content="Right Top prompts info"
        placement="right-start"
      >
        <el-button class="item">right-start</el-button>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="Right Center prompts info"
        placement="right"
      >
        <el-button class="item">right</el-button>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="Right Bottom prompts info"
        placement="right-end"
      >
        <el-button class="item">right-end</el-button>
      </el-tooltip>
    </div>
    <div class="bottom">
      <el-tooltip
        effect="dark"
        content="Bottom Left prompts info"
        placement="bottom-start"
      >
        <el-button class="item">bottom-start</el-button>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="Bottom Center prompts info"
        placement="bottom"
      >
        <el-button class="item">bottom</el-button>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="Bottom Right prompts info"
        placement="bottom-end"
      >
        <el-button class="item">bottom-end</el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  width: 400px;

  .top {
    text-align: center;
  }

  .left {
    float: left;
    width: 110px;
  }

  .right {
    float: right;
    width: 110px;
  }

  .bottom {
    clear: both;
    text-align: center;
  }

  .item {
    margin: 4px;
  }

  .left .el-tooltip__popper,
  .right .el-tooltip__popper {
    padding: 8px 10px;
  }

  .el-button {
    width: 110px;
  }
}
</style>
