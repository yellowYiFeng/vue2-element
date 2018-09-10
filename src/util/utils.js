var setStore = (name,value)=>{
    if(!name) return;
    if(typeof value !== 'string'){
        value = JSON.stringify(value);
    }
    window.localStorage.setItem(name,value);
}
var getStore = name =>{
    if(!name) return;
    return window.localStorage.getItem(name)
}
var deleteStore = name=>{
    if(!name) return;
    window.localStorage.removeItem(name);
}
export const mixnis = {
	methods: {
		//传递过来的图片地址需要处理后才能正常使用
		getImgPath(path) {
			let suffix;
			if (!path) {
				return '//elm.cangdu.org/img/default.jpg'
			}
			if (path.indexOf('jpeg') !== -1) {
				suffix = '.jpeg'
			} else {
				suffix = '.png'
			}
			let url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix;
			return 'https://fuss10.elemecdn.com' + url
		},
	}

}
export default{
    setStore,
    getStore,
    deleteStore,
}