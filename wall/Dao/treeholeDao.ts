import { TreeHole } from "../utils/db/models/TreeHole";
import { TreeHoleComment } from "../utils/db/models/TreeHoleComment";
import { TreeHoleLikes } from "../utils/db/models/TreeHoleLikes";
import { resolve, any } from "bluebird";
import { User } from "../utils/db/models/User";
import { isNumber } from "util";
const sequelize = require("sequelize");
let Op = sequelize.Op;

export async function addTreeHole(openid, text): Promise<object> {
  if (isNullOrUndefined(openid)) throw new Error("openid is invalid");
  if (isNullOrUndefined(text) || text == "") throw new Error("text is invalid");

  let treeholeId: string = "",
    sex: string | number = 0,
    result: object;

  treeholeId = getTreeHoleID(openid);

  sex = await User.findOne({
    where: { openid },
    raw: true
  })
    .then(res => {
      console.log(res);
      return res.sex;
    })
    .catch(e => {
      throw new Error(e.message);
    });
  await console.log(sex, "<<<===sex is here");

  result = await TreeHole.create(
    {
      text,
      likes: 0,
      treeholeId,
      openid,
      sex
    },
    { raw: true }
  )
    .then(res => {
      return res;
    })
    .catch(e => {
      throw new Error(e.message);
    });

  return await result;
}

export async function getMyTreeHoles(openid): Promise<any> {
  if (isNullOrUndefined(openid)) throw new Error("openid is invalid");

  let result: Array<any> | void;

  result = await TreeHole.findAll({
    where: { openid },
    raw: true
  })
    .then(arr => {
      return arr;
    })
    .catch(e => {
      console.log(e);
    });

  for (let thole of result as Array<any>) {
    let treeholeId: string = await thole.treeholeId,
      comments: Array<object> = [];

    thole.comments = await TreeHoleComment.findAll({
      where: { treeholeId },
      raw: true
    })
      .then(arr => {
        arr.forEach(val => {
          let obj: object = { comment: val.comment, sex: val.sex };
          comments.push(obj);
        });
        return comments;
      })
      .catch(e => {
        console.log(e);
      });
  }

  return await result;
}

export async function getAllTreeHoles(
  openid,
  countPerPage,
  currentPage
): Promise<any> {
  if (isNullOrUndefined(openid)) throw new Error("openid is invalid");
  if (!isNumber(countPerPage)) throw new Error("countPerPage is invalid");
  if (!isNumber(currentPage)) throw new Error("countPerPage is invalid");

  let alreadyCommentTreeHoleId = []
  let alreadyLikesTreeHoleId = []
  
  let alreadyFilterdTreeHoleId

  let op1 =  TreeHoleComment.findAll({
    where: { openid },
    raw: true
  }).then(arr => {
    for(let item of arr){
      alreadyCommentTreeHoleId.push(item.treeholeId)
    }
    return ;
  })
  
  let op2 = TreeHoleLikes.findAll({
      where:{ openid },
      raw: true
    }).then(arr => {
      for(let item of arr) {
        alreadyLikesTreeHoleId.push(item.treeholeId)
      }
      return ;
    })

  await Promise.all([op1, op2])
  console.log(alreadyCommentTreeHoleId,'alreadyCommentTreeHoleId');
  console.log(alreadyLikesTreeHoleId,'alreadyLikesTreeHoleId');

  alreadyFilterdTreeHoleId = Array.from(new Set([...alreadyCommentTreeHoleId,...alreadyLikesTreeHoleId]))
  console.log(alreadyFilterdTreeHoleId, 'alreadyFilterdTreeHoleId');
  
  let result: Array<any> | void;

  result = await TreeHole.findAll({
    where: {
      openid: {
        [Op.ne]: openid
      }
    },
    limit: countPerPage, // 每页多少条
    offset: countPerPage * (currentPage - 1), // 跳过多少条
    raw: true,
  })
    .then(async res => {
      // 过滤已经评论过的树洞
      let filteredRes = []

      let i = res.length;
      while (i--) {
        if(!alreadyFilterdTreeHoleId.includes(res[i].treeholeId)){
          filteredRes.push(res[i])
        }
      }
      let j = filteredRes.length;
      while (j--) {
        await TreeHoleComment.findAll({
          where: { 
            treeholeId: filteredRes[j]["treeholeId"],
            
          },
          raw: true
        })
          .then(r => {
            let comments: Array<string> = [];

            r.forEach(val => {
              let c: any = {};
              c.comment = val.comment;
              c.sex = val.sex;
              comments.push(c);
            });

            filteredRes[j]["comments"] = comments;

            console.log(comments, "<<===comments is here");

            return comments;
          })
          .catch(e => {
            console.log(e);
          });
      }

      await console.log(filteredRes, "filteredRes is here");

      return  filteredRes;
    })
    .catch(e => {
      console.log(e);
    });
  
  if(typeof result === "object"){

    let arr = result.sort((a, b) => Math.random() > .5 ? 1 : -1)
    console.log(arr, "result is here");
    return  arr;
  }
  return [];
}

export async function addLikes(treeholeId, openid): Promise<Boolean> {
  if (isNullOrUndefined(treeholeId)) throw new Error("treeholeId is invalid");
  if (isNullOrUndefined(openid)) throw new Error("openid is invalid");

  let result : Boolean;

  let promise1 = TreeHole.findOne({
    where: { treeholeId }
  })
    .then(async res => {
      console.log(res.getDataValue("likes"), "old");
      return await res
        .update({
          likes: res.getDataValue("likes") + 1
        })
        .then(res => {
          return true;
        });
    })
    .catch(e => {console.log(e);});
  
  let promise2 = TreeHoleLikes.create({
    treeholeId,
    openid
  }).then(() => true)
  .catch(e => {console.log(e);})

  result = await Promise.all([promise1, promise2]).then(()=>true,()=>false)

  return  result;
}

export async function addTreeHoleComment(
  sex,
  comment,
  treeholeId,
  openid
): Promise<Boolean> {
  if (
    isNullOrUndefined(sex) ||
    isNullOrUndefined(comment) ||
    isNullOrUndefined(treeholeId)
  )
    throw new Error("parameter is invalid");

  let result: Boolean;

  result = await TreeHoleComment.create({
    treeholeId,
    sex,
    comment,
    openid
  })
    .then(() => true)
    .catch(e => {
      console.log(e);
      return false;
    });

  return await result;
}

export async function countMyTreeHoles(openid): Promise<Number> {
  if (isNullOrUndefined(openid)) throw new Error("openid is invalid");

  let result: Number;

  result = await TreeHole.findAll({
    where: { openid },
    raw: true
  })
    .then(res => {
      if (res.length) return res.length;
      return 0;
    })
    .catch(e => {
      return 0;
      console.log(e);
    });

  return await result;
}
export async function deleteTreeHole(treeholeId): Promise<Boolean> {
  if (isNullOrUndefined(treeholeId)) throw new Error("treeholeId is invaild");

  let result1: Boolean = false;
  let result2: Boolean = false;

  result1 = await TreeHole.destroy({
    where: { treeholeId }
  })
    .then(() => true)
    .catch(e => {
      console.log(e);
      return false;
    });

  result2 = await TreeHoleComment.destroy({
    where: { treeholeId }
  })
    .then(() => true)
    .catch(e => {
      console.log(e);
      return false;
    });

  return result1 && result2;
}
function isNullOrUndefined(value): boolean {
  if (value != null && value != undefined) return false;
  return true;
}

function getTreeHoleID(openid): string {
  //treeholeId格式  openid|[timestamp]
  return `${openid}|${new Date().getTime()}`;
}
