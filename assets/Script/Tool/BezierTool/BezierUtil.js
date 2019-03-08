module.exports = {
    /**
     * @param startPos 起点
     * @param control1 控制点1
     * @param control2 控制点2
     * @param endPos 终点
     * @param percent 路径中的百分比
     *  */
    GetPosWithPercent(startPos,control1,control2,endPos,percent)
    {
        if(percent <= 0) return startPos;
        if(percent >= 1) return endPos;
        var x = Math.pow(1 - percent, 3) * startPos.x + 3.0 * Math.pow(1 - percent, 2) * percent * control1.x + 3.0 * (1 - percent) * Math.pow(percent,2) * control2.x + Math.pow(percent,3) * endPos.x;
        var y = Math.pow(1 - percent, 3) * startPos.y + 3.0 * Math.pow(1 - percent, 2) * percent * control1.y + 3.0 * (1 - percent) * Math.pow(percent,2) * control2.y + Math.pow(percent,3) * endPos.y;
        return {x:x,y:y};
    }
}