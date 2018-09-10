//获取msite页面地址
export const msiteAddress = geohash => fetch('/v2/pois/' + geohash);