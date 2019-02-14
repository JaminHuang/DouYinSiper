
/*时间戳转化时间字符串*/
export function getTime(timestamp) {
    let d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
    let date = (d.getFullYear()) + "-" +
        (d.getMonth() + 1) + "-" +
        (d.getDate()) + " " +
        (d.getHours()) + ":" +
        (d.getMinutes()) + ":" +
        (d.getSeconds());
    return date;
}