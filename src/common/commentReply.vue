<!--评论模块-->
<template>
  <div class="container">
    <div class="comment" v-for="(item,index) in comments" :key="index">
      <div class="info">
        <img class="avatar" :src="item.fromAvatar" width="36" height="36">
        <div class="right">
          <div class="name">{{item.fromName}}</div>
          <div class="date">{{item.date}}</div>
        </div>
      </div>
      <div class="content">{{item.content}}</div>
      <div class="control">
        <span class="like" :class="{active: item.isLike}" @click="likeClick(item)">
          <i class="iconfont icon-like"></i>
          <span class="like-num">{{item.likeNum > 0 ? item.likeNum + '人赞' : '赞'}}</span>
        </span>
        <span class="comment-reply" @click="showCommentInput(item)">
          <i class="iconfont icon-comment"></i>
          <span>回复</span>
        </span>
      </div>
      <div class="reply">
        <div class="item" v-for="(reply,index) in item.reply" :key="index">
          <div class="reply-content">
            <span class="from-name">{{reply.fromName}}</span>
            <!-- <span>:</span> -->
            <span class="to-name">@{{reply.toName}}</span>
            <span>{{reply.content}}</span>
          </div>
          <div class="reply-bottom">
            <span>{{reply.date}}</span>
            <span class="reply-text" @click="showCommentInput(item, reply)">
              <i class="iconfont icon-comment"></i>
              <span>回复</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="write-reply" @click="showCommentInput()">
      <i class="el-icon-edit"></i>
      <span class="add-comment">添加新评论</span>
    </div>
    <transition name="fade">
      <div class="input-wrapper" v-show="showInput">
        <el-input
          class="gray-bg-input"
          v-model="inputComment"
          type="textarea"
          :rows="3"
          autofocus
          placeholder="写下你的评论"
        ></el-input>
        <div class="btn-control">
          <span class="cancel" @click="cancel">取消</span>
          <el-button class="btn" type="success" round @click="commitComment">确定</el-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import dateFtt from "../../js/dateTime";
export default {
  name: "commentReply",
  props: {
    // comments: { type: Array, required: true },
    articleId: { type: String, required: true }
  },
  components: {},
  data() {
    return {
      inputComment: "",
      showInput: false,
      comments: [],
      isReply: false,  //是回复还是新评论
      toName: '', //被回复者昵称
      commentId: '' //父评论的_id,主键
    };
  },
  computed: {},
  methods: {
    // 点赞
    likeClick(item) {
      if (item.isLike === null) {
        Vue.$set(item, "isLike", true);
        item.likeNum++;
      } else {
        if (item.isLike) {
          item.likeNum--;
        } else {
          item.likeNum++;
        }
        item.isLike = !item.isLike;
      }
    },

    // 点击取消按钮
    cancel() {
      this.showInput = false;
    },

    // 提交评论
    commitComment() {
      /*comment: {
        date: String, // 评论时间
        ownerId: String, // 文章的id
        fromId: String, // 评论者id
        fromName: String, // 评论者昵称
        fromAvatar: String, // 评论者头像
        likeNum: Number, // 点赞人数
        content: String, // 评论内容
        reply: Array //回复内容
      }
      reply:{
        commentId: String, // 父评论id，即父亲的id
        fromId: String, // 评论者id
        fromName: String, // 评论者昵称
        fromAvatar: String, // 评论者头像
        toId: String, // 被评论者id
        toName: String, // 被评论者昵称
        toAvatar: String, // 被评论者头像
        content: String, // 评论内容
        date: String // 评论时间
      }*/
      if (this.isReply) {
        let commentId = this.commentId,
            fromId = '',
            fromName = this.$store.state.loginUser,
            fromAvatar = '',
            toId = '',
            toName = this.toName,
            toAvatar = '',
            content = this.inputComment,
            data = dateFtt("yyyy-MM-dd hh:mm:ss", new Date());
        let str = `@${toName} `;
        let len = str.length;
        if (content.indexOf(str)===0){
          content = content.slice(len)
        }
        // console.log(content);
        let reply = {commentId,fromId,fromName,fromAvatar,toId,toName,toAvatar,content,data};
        this.$axios.post('/api/saveReply',reply).then(res=>{
          if (res.status ===200 && !res.data.error) {
            this.$message({
              message:'回复成功!',
              type: 'success'
            })
          }
        })
      } else {
        let date = dateFtt("yyyy-MM-dd hh:mm:ss", new Date()),
            ownerId = this.articleId,
            fromId = '',
            fromName = this.$store.state.loginUser,
            fromAvatar = '',
            likeNum = '',
            content = this.inputComment,
            reply = [];
        let comment = {date,ownerId,fromId,fromName,fromAvatar,likeNum,content,reply};
        this.$axios.post('/api/saveComment',comment).then((res)=>{
          if (res.status ===200 && !res.data.error) {
            this.$message({
              message:'评论成功!',
              type: 'success'
            })
          }
        })
      }
      this.getCommentsAndReplies();
      this.showInput = false;
      this.isReply = false;
    },
    /**
     * 点击评论按钮显示输入框
     * item: 当前大评论
     * reply: 当前回复的评论
     */
    showCommentInput(item, reply) {
      if (item) this.isReply = true;
      if (item && reply) {
        this.inputComment = "@" + reply.fromName + " ";
        this.toName = reply.fromName;
        this.commentId = item._id;
      } else if (item && !reply) {
        this.inputComment = "@" + item.fromName + " ";
        this.toName = item.fromName;
        this.commentId = item._id;
      } else {
        this.inputComment = "";
      }
      this.showInput = true;
    },
    //获取评论和回复
    getCommentsAndReplies(){
      this.$axios.post('/api/getCommentAndReply',{articleId: this.articleId}).then((res)=>{
        this.comments = res.data.comments
      })
    }
  },
  created() {
    this.getCommentsAndReplies();
  }
};
</script>

<style scoped lang="scss">
@import "styles/variables.scss";
.container {
  padding: 0 10px;
  box-sizing: border-box;
  .comment {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-top: 1px solid $border-fourth;
    .info {
      display: flex;
      align-items: center;
      .avatar {
        border-radius: 50%;
      }
      .right {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        .name {
          font-size: 16px;
          color: $text-main;
          margin-bottom: 5px;
          font-weight: 500;
        }
        .date {
          font-size: 12px;
          color: $text-minor;
        }
      }
    }
    .content {
      font-size: 16px;
      color: $text-main;
      line-height: 20px;
      padding: 10px 0;
    }
    .control {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: $text-minor;
      .like {
        display: flex;
        align-items: center;
        margin-right: 20px;
        cursor: pointer;
        &.active,
        &:hover {
          color: $color-main;
        }
        .iconfont {
          font-size: 14px;
          margin-right: 5px;
        }
      }
      .comment-reply {
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover {
          color: $text-333;
        }
        .iconfont {
          font-size: 16px;
          margin-right: 5px;
        }
      }
    }
    .reply {
      margin: 10px 40px;
      border-left: 2px solid $border-first;
      .item {
        margin: 0 10px;
        padding: 10px 0;
        border-bottom: 1px dashed $border-third;
        .reply-content {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: $text-main;
          .from-name {
            color: $color-main;
          }
          .to-name {
            color: $color-main;
            margin-left: 5px;
            margin-right: 5px;
          }
        }
        .reply-bottom {
          display: flex;
          align-items: center;
          margin-top: 6px;
          font-size: 12px;
          color: $text-minor;
          .reply-text {
            display: flex;
            align-items: center;
            margin-left: 10px;
            cursor: pointer;
            &:hover {
              color: $text-333;
            }
            .icon-comment {
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
  .write-reply {
    display: flex;
    border-top: 1px solid #fff;
    align-items: center;
    font-size: 14px;
    color: $text-minor;
    padding: 10px;
    cursor: pointer;
    &:hover {
      color: $text-main;
    }
    .el-icon-edit {
      margin-right: 5px;
    }
  }
  .fade-enter-active,
  fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .input-wrapper {
    padding: 10px;
    .gray-bg-input,
    .el-input__inner {
      /*background-color: #67C23A;*/
    }
    .btn-control {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-top: 10px;
      .cancel {
        font-size: 16px;
        color: $text-normal;
        margin-right: 20px;
        cursor: pointer;
        &:hover {
          color: $text-333;
        }
      }
      .confirm {
        font-size: 16px;
      }
    }
  }
}
</style>
