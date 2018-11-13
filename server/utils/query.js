// 公共的方法
// 首先连接mysql数据库
// 封装一个query方法，方便我们进行mysql语句的执行

import mysql from 'mysql'
import { db, dbName } from '../config'
import fs from 'fs'
import path from 'path'
import { NOTINITIALIZED } from 'dns';
let pool;


// 需要创建一个数据库，并且能将sql文件夹下的文件sql执行
const sqlContent = fs.readFileSync(path.resolve(__dirname,'..','./sql/yxr_blog.sql'),'utf-8')
// 第一次连接的时候没有指定数据库名称，这次连接的目的是为了能创建一个yxr_blog数据库
// 并将数据库文件执行，执行完毕后yxr_blog数据库就有了相应的表和数据了
const init = mysql.createConnection(db)
init.connect()

init.query('CREATE DATABASE yxr_blog',err=>{
    Object.assign(db,dbName)
    // 第二次连接数据库，这时候数据库yxr_blog已经创建成功了，这时候直接连接yxr_blog数据库
    // 然后执行sql文件夹下的yxr_blog.sql文件，对应的表和测试的数据就已经存在数据库里面了
    pool = mysql.createPool(db)
    if(err){
        // console.log(err);
        console.log('yxr_blog Database created already');
    }else{
        console.log('create yxr_blog Database');
        // 将yxr_blog.sql文件执行
        query(sqlContent).then(res=>{
            console.log('import sql is success');
        }).catch(err=>{
            console.log('import sql is error');
            console.log(err);
        })  
    }
})
init.end();
export default function query(sql,values){
    return new Promise((resolve,reject)=>{
        pool.getConnection(function(err,connection){
            if(err){
               reject(err);
            }else{
                connection.query(sql,values,(err,data)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(data);
                    }
                    connection.release()
                })
            }
        })
    })
}
