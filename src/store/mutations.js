import{
    SAVE_GEOHASH,
    RECORD_ADDRESS
}from './mutation-types'
export default{
    //记录经纬度
    [RECORD_ADDRESS](state, {
		latitude,
		longitude
	}) {
		state.latitude = latitude;
        state.longitude = longitude;
        
	},
    [SAVE_GEOHASH](state,geohash){
        state.geohash = geohash;
    }
}