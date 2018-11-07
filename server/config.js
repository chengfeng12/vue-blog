// 配置文件
export const db = {
    host: "localhost",
    port: '3306',
    user: 'root',
    password: '123456',
    multipleStatements: true //必须加上这一句话，不然那无法加载多条sql语句
}
export const dbName = {
    database:'yxr_blog'
}
export const base_API = 'api/'

export const secret = 'yxr_blog'