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
    },
    /**
     * @param startPos 起点
     * @param endPos 终点
     *  */
    GetPosDis(startPos,endPos)
    {
        return Math.sqrt( Math.pow(startPos.x - endPos.x,2) + Math.pow(startPos.y - endPos.y,2) )
    },
    /**
     * @param startPos 起点
     * @param endPos 终点
     *  */
    GetAngleWithPos(startPos,endPos)
    {
        let v1 = cc.v2(startPos.x - endPos.x,startPos.y - endPos.y)
        let pai = Math.atan2(v1.y,v1.x)
        return (pai / Math.PI * 180) + 180
    }

}