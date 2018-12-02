<template>
  <div class="heards">
    <h1>骰子布局</h1>
    <h2>1号</h2>
    <div class="first-face all">
      <span class="item">1</span>
    </div>

    <br>
    <!--   二-->
    <h2>2号</h2>
    <div class="second-face all">
      <span class="item">1</span>
      <span class="item">2</span>
    </div>

    <br>
    <div class="second-face2 all">
      <span class="item">1</span>
      <span class="item">2</span>
    </div>

    <br>
    <div class="second-face3 all">
      <span class="item">1</span>
      <span class="item">2</span>
    </div>

    <!--    三-->
    <br>
    <h2>3号</h2>
    <div class="third-face all">
      <span class="item">1</span>
      <span class="item">2</span>
      <span class="item">3</span>
    </div>

    <!--    四-->
    <br>
    <h2>4号</h2>
    <div class="four-face all">
      <div class="column">
        <span class="item">1</span>
        <span class="item">2</span>
      </div>
      <div class="column">
        <span class="item">3</span>
        <span class="item">4</span>
      </div>
    </div>

    <!--    五-->
    <br>
    <h2>5号</h2>
    <div class="fifth-face all">
      <div class="column">
        <span class="item">1</span>
        <span class="item">2</span>
      </div>
      <div class="column">
        <span class="item">3</span>
      </div>
      <div class="column">
        <span class="item">4</span>
        <span class="item">5</span>
      </div>
    </div>

    <!--    六-->
    <br>
    <h2>6号</h2>
    <div class="six-face all">
      <div class="column">
        <span class="item">1</span>
        <span class="item">2</span>
        <span class="item">3</span>
      </div>
      <div class="column">
        <span class="item">4</span>
        <span class="item">5</span>
        <span class="item">6</span>
      </div>
    </div>

    <!--    九-->
    <br>
    <h2>九号</h2>
    <div class="nice-face all">
      <div class="column">
        <span class="item">1</span>
        <span class="item">2</span>
        <span class="item">3</span>
      </div>

      <div class="column">
        <span class="item">4</span>
        <span class="item">5</span>
        <span class="item">6</span>
      </div>

      <div class="column">
        <span class="item">7</span>
        <span class="item">8</span>
        <span class="item">9</span>
      </div>
    </div>

    <br>
    <h1>网格布局</h1>

    <br>
    <h2>平均分配</h2>
    <div class="Grid">
      <div class="Grid-cell">1</div>
      <div class="Grid-cell">2</div>
      <div class="Grid-cell">3</div>
    </div>

    <br>
    <h2>百分比布局</h2>
    <div class="Grid">
      <div class="Grid-cell u-lof4">4/8</div>
      <div class="Grid-cell">1/8</div>
      <div class="Grid-cell u-lof3">3/8</div>
    </div>

    <br>
    <h2>左边占规定长度，右边自适应</h2>
    <div class="Grid">
      <div class="a">100px</div>
      <div class="b">auto</div>
    </div>


    <h1>输入框前后添加图标或按钮</h1>
    <div style="display: flex">
      <div>
        <span>图标</span>
        <input type="text" style="flex: 1;">
        <button>按钮</button>
      </div>
    </div>

    <br>

    <h1>悬挂式布局</h1>
    <div class="Media">
      <img class="Media-figure" src="./p1.jpeg" alt="图片名称" style="width: 100px;height: 100px;">
      <p class="Media-body">文字说明</p>
    </div>

    <br>
    <h1>固定的底栏</h1>
    <div class="Site">
      <header>头部</header>
      <main class="Site-content">内容</main>
      <footer>底部</footer>
    </div>


    <br>
    <h1>流式布局</h1>
    <div class="parent">
      <div class="child"></div>
      <div class="child"></div>
      <div class="child"></div>
      <div class="child"></div>
      <div class="child"></div>
      <div class="child"></div>
    </div>



    <br>
    <h1>圣杯布局</h1>
    <div class="HolyGrail ">
      <header>头部</header>
      <div class="HolyGrail-body">
        <main class="HolyGrail-content">中间</main>
        <nav class="HolyGrail-nav">左边</nav>
        <aside class="HolyGrail-ads">右边</aside>
      </div>
      <footer>尾部</footer>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data(){
      return{

      }
    }
  }

</script>



<style>

  .all{
    display: flex;
    width: 150px;
    height: 150px;
    border: 1px solid red;
  }

  .item{
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
/*    border: 1px solid red;*/
  }


  .first-face{
    justify-content: center;  /*X轴*/
    align-items: center; /*排布横向 Y轴*/
  }

  .second-face{
    justify-content:space-between;  /*左右分布*/
    flex-direction:column;   /*排布方向 竖线*/
    align-items: center;
  }

  .second-face2 .item:nth-child(2){
    align-self: center;/*允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性*/
    align-items: flex-end;
  }


  .second-face3{
    justify-content:space-between;
  }
  .second-face3 .item:nth-child(2){
    align-self: flex-end;
  }


  .third-face .item:nth-child(2){
    align-self: center;
  }
  .third-face .item:nth-child(3){
    align-self: flex-end;
  }

  .four-face, .six-face {
    justify-content: space-between;
  }

  .four-face .column, .six-face .column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .fifth-face{
    flex-direction: column;
  }

  .fifth-face .column{
    display: flex;
    justify-content: space-between;
  }

  .fifth-face .column:nth-child(2){
    align-self: center;
  }

  .six-face{
    flex-direction: column;
    flex-wrap: wrap;
    align-content: space-between;
  }

  .nice-face{
    flex-wrap: wrap;
  }
  .nice-face .column{
    display: flex;
  }

/*------------------网格布局-----------------------*/
  .Grid {
    display: flex;
  }

  .Grid-cell {
    flex: 1;
    border: 1px solid red;
  }

  .u-lof4{
    flex: 4;
  }

  .u-lof3{
    flex: 3;
  }


  .a{
    width: 200px;
    border: 1px solid red;
  }

  .b{
    flex: 0 0 auto;
    border: 1px solid red;
  }

/*---------------悬挂式布局-------------------*/
  .Media {
    display: flex;
    align-items: flex-start;  /*属性定义项目在交叉轴上如何对齐。 Y轴*/
  }

  .Media-figure {
    margin-right: 1em;
  }

  .Media-body {
    flex: 1;
  }

  /*----------------固定的底栏----------------*/
  .Site{
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  .Site-content {
    flex: 1;
  }

  /*---------------流式布局---------------------------*/
  .parent{
    width: 200px;
    height: 150px;
    background-color: black;
    display: flex;
    flex-flow: row wrap;/*flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。*/
    align-content: flex-start;
  }

  .child {
    box-sizing: border-box;
    background-color: white;
    flex: 0 0 25%;
    height: 50px;
    border: 1px solid red;
  }

  /*------------------------圣杯布局--------------------------------*/
  .HolyGrail {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  header,
  footer {
    flex: 1;
  }

  .HolyGrail-body {
    display: flex;
    flex: 1;
  }

  .HolyGrail-content {
    flex: 1;
  }

  .HolyGrail-nav, .HolyGrail-ads {
    /* 两个边栏的宽度设为12em */
    flex: 0 0 12em;
  }

  .HolyGrail-nav {
    /* 导航放到最左边 */
    order: -1;
  }

  @media (max-width: 768px) {
    .HolyGrail-body {
      flex-direction: column;
      flex: 1;
    }
    .HolyGrail-nav,
    .HolyGrail-ads,
    .HolyGrail-content {
      flex: auto;
    }
  }
</style>
