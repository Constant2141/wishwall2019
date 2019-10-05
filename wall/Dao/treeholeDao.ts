import { TreeHole } from '../utils/db/models/TreeHole';
import { TreeHoleComment } from '../utils/db/models/TreeHoleComment';
import { resolve, any } from 'bluebird';
import { User } from '../utils/db/models/User';
const sequelize = require('sequelize');
let Op = sequelize.Op;

export async function addTreeHole(openid,text) {
 
  if(openid == {} || openid ==null){
    console.log('openid is null or {}');
  }else{
    if(openid && text){
        
        let treeholeId = getTreeHoleID(openid);

        let sex:any = await User.findOne({
          where: {openid}
        }).then(res=>{
          
          return res.getDataValue('sex')
        })
        .catch(e=>{
          console.log(e);
        })
        
        await console.log(sex,'<<<===sex is here');
        

        let treeholeModel =await TreeHole.create({
          text: text,
          likes: 0,
          treeholeId,
          openid:openid,
          sex
        })

    }
  }
}

export async function  getMyTreeHoles(openid) {
  let result ;

  if(openid == {} || openid ==null){
    console.log('openid is null or {}');
  }else{
    result = await TreeHole.findAll({
      where: {openid}
    }).then().catch(e=>{
      console.log(e);
    })
  }
  // await console.log(result);
  return await result
}

export async function getAllTreeHoles(openid,countPerPage,currentPage) {

  if(openid == {} || openid ==null){
    console.log('openid is null or {}');
  }else{
      let result = await TreeHole.findAll({
        where:{
          openid:{
            [Op.ne]:openid
          }
        },
        limit: countPerPage, // 每页多少条
        offset: countPerPage * (currentPage - 1), // 跳过多少条
        raw: true
      })
      .then(async res=>{

          let i = res.length;
          while(i--){
          
            await TreeHoleComment.findAll({
              where:{treeholeid:res[i]['treeholeId']},
              raw: true
            })
            .then( r =>{
              
                let comments : Array<string> = [];
    
                r.forEach(val=>{
                  comments.push(val.comment)
                })
      
                res[i]['comments'] = comments;

                console.log(comments,'<<===comments is here')

                return comments;
    
            }).catch(e=>{console.log(e);})

          }

        await console.log(res, 'res is here');
        
        return await res;
  
      }).catch(e=>{console.log(e);})
      await console.log(result, 'result is here')
      return await result
  }
  
}

export async function addLikes(treeholeId) {

  let treehole = await TreeHole.findOne({
    where: {treeholeId}
  })
  .then(async res => {
    console.log(res.getDataValue('likes'),'old');
    await res.update({
      likes: res.getDataValue('likes')+1
    })
    return await true;
  })
  .catch(e => {
    return false
    console.log(e);
  })
  return await treehole
}

export async function addTreeHoleComment(text,sex,comment,treeholeId){

  if(isNullOrUndefined(text)
    ||isNullOrUndefined(sex)
    ||isNullOrUndefined(comment)
    ||isNullOrUndefined(treeholeId))  return null;
  
  let result = await TreeHoleComment.create({
    treeholeId,
    text,
    sex,
    comment
  }).then()
  .catch(e=>{console.log(e);return null})

  return await result

}

function isNullOrUndefined(value):boolean {
  if(value != null && value != undefined) return false
  return true
}

function getTreeHoleID(openid) {
  let time = new Date().getTime()
  return `${openid}|${time}`
}