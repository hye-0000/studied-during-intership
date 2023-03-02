/* AF , AF_cookie, AF_date, AF_number, AF_modal, AF_stopwach*/
/*자주 사용하는 함수
onload - onload 중복 설정 가능한 onload 설정
getEleById, getValById, setValById - 약칭
fetch, ajax - 비동기 통신 관련
removeBlank - 모든 공백 제거
objToForm - object를 formData로 리턴
getBrowser - browser 리턴
isMobile - 모바일체크
*/
export const AF = {
	onload: (func) => {
		const temp = window.onload;
		if(typeof window.onload !== "function"){
			window.onload = func;
		}else {
			window.onload = () => {
				if(temp) temp();
			}
			func();
		}
	},
	getEleById(id){
		return document.getElementById(id);
	},
	getValById(id){
		return document.getElementById(id).value;
	},
	setValById(id, val){
		const ele = document.getElementById(id);
		if(ele !== null) document.getElementById(id).value = val;
	},
	setComboValByText(id, val){
		const ele = document.getElementById(id);
		if(ele !== null){
			ele.childNodes.forEach(o => {{
				if(o.textContent == val){
					o.selected = true;
				}
			}});
		}
	},
	setRadioValByName(name, val){
		const eles = document.getElementsByName(name);
		for(let ele of eles){
			if(ele.value == val) {
				ele.checked = true;
			}
		}
	},
	createElement(tag, properties){
		const ele = document.createElement(tag);
		for(let p in properties){
			if(p === "class"){
				if(properties[p].indexOf(" ") !== -1){
					const classArray = properties[p].split(" ");
					for(let classNm of classArray){
						ele.classList.add(classNm);	
					}
				}else{
					ele.classList.add(properties[p]);	
				}
			}else if(p === "txt"){
				ele.textContent = properties[p];
			}else{
				ele.setAttribute(p, properties[p]);
			}
		}
		return ele;
	},
	removeBlank(d = ""){
		return d.replace(/\n|\r|(\s*)/g, "");
	},
	objToForm(obj){
		const formData = new FormData();
		for(const [key, val] of Object.entries(obj)){
			formData.set(key, val);
		}
		return formData;
	},
	/**
	 * @param opt {object} - fetch api의 option
	 *  - custom opt 
	 *   - reponseType ["json" | "pure"]
	 */
	fetch: async (url = '', opt = {}) => {
		if(!opt.body) opt.body = {};
		const option = {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
			responseType : "json",
			body: JSON.stringify(opt.body)
		}
		const setOption = (custom, origin) => {
			for(const [key, val] of Object.entries(custom)){
				if(key !== "body"){
					if(typeof val === "object"){
						setOption(val, origin[key]);
					}else{
						origin[key] = val;
					}
				}
			}
		}
		setOption(opt, option);
		/**multipart/form-data 로 파일을 전송하는 경우
		Content-Type을 설정하면 formData의 파일이 전송되지 않는다.
		controller에서 'the request was rejected because no multipart boundary was found' 에러 발생
		그래서 Content-Type 설정을 제거하고 전송해야 한다. (https://aljjabaegi.tistory.com/641)
		 */
		if(option.headers['Content-Type'] === ''){
			delete option.headers['Content-Type'];
			option.body = opt.body;
		}
		const response = await fetch(url, option)
			.then((result) => {
				if(result.ok){
					if(option.responseType == "json"){
						return result.json();
					} else {
						return result;
					}
				}else{
					console.log(result);
					if(result.status === 404){
						alert("페이지를 찾을 수 없습니다.");
					}else if(result.status === 500){
						console.error("내부 서버 에러가 있습니다.");
					}else if(result.status === 400){
						alert("잘못된 요청입니다.");
					}else{
						alert("알 수 없는 에러가 발생했습니다.");
					}
				}
			}).catch((error) => {
				console.error(error);
			});
			return response;
	},
	getBrowser() {
		const agent = navigator.userAgent.toLowerCase();
		let browser = '';
		if(navigator.userAgent.search('Trident') !== -1 || agent.indexOf('msie') !== -1){
			browser = 'ie';
		}else if(agent.indexOf("chrome") !== -1){
			browser = 'chrome';
		}else if(agent.indexOf("safari") !== -1){
			browser = 'safari';
		}else if(agent.indexOf("firefox") !== -1){
			browser = 'firefox';
		}else if(agent.indexOf("opera") !== -1){
			browser = 'opera';
		}
		return browser;
	},
	isMobile(){
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	},
	autoLink(elemId){
		const container = document.getElementById(elemId);
		if(container !== null){
			const doc = container.innerHTML,
				  regUrl = new RegExp("(http|https|ftp|telnet|news|irc)://([-/.a-zA-Z0-9_~#%$?&=:200-377()]+)","gi"),
				  regEmail = new RegExp("([xA1-xFEa-z0-9_-]+@[xA1-xFEa-z0-9-]+\.[a-z0-9-]+)","gi");
			container.innerHTML = doc.replace(regUrl,"<a href='$1://$2' target='_blank'>$1://$2</a>")
									 .replace(regEmail,"<a href='mailto:$1'>$1</a>");
		}
	},
	downloadFile(blobData, filename){
		const blob = new Blob([blobData]);
		const downloadUrl = URL.createObjectURL(blob);
		const a = this.createElement("a", {href: downloadUrl, download: filename});
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	},
	addZero(data, digit){
		let str = "";
		let idx = 0;
		if(!digit) digit = 2;
		const numStr = data+"";
		idx = digit - numStr.length;
		for(let n = 0; n < idx; n++){
			str+="0";
		}
		str+=numStr;
		return str;
	}
}
/*쿠키 관련 함수
setCookie, getCooke, delCookie
*/
export const AF_cookie = {
	/*args: {key: "key", value: "value", expire: 30}*/
	setCookie: (args) => {
		if(!args?.key || !args?.value) {
			console.error("[쿠키추가] 매개변수가 올바르지 않습니다.");
			return false;
		}
		const cDays = (args?.expire) ? args.expire : 30;
		let cookies = `${args.key}=${encodeURIComponent(args.value)}; path=/;`;
		if(!isNaN(cDays)) cookies += ` max-age=${cDays * 24 * 60 * 60};`;
		document.cookie = cookies;
	},
	getCookie: (key) => {
		try{
			return document.cookie.split("; ").find(d => d.startsWith(key)).split("=")[1];
		}catch(e){
			return "";
		}
	},
	delCookie: (key) => {
		document.cookie = key+"=; max-age=0; path=/;";
	}
}
/*날짜 관련 함수
 */
export const AF_date = (() =>{
	const dateFunc = new Function();
	/*현재 일자를 리턴 args : string, true/false*/
	dateFunc.prototype.getStrDate = function(date, format = true) {
		const daySeperator = (format) ? "-" : "",
			  year = date.getFullYear();
		let month = date.getMonth() + 1,
			day = date.getDate();
		if(month < 10) month = "0" + month;
		if(day < 10) day = "0" + day;
		return [year, month, day].join(daySeperator);
	}
	/*현재 시간을 리턴 args : string, true/false*/
	dateFunc.prototype.getStrTime = function(date, format = true) {
		const timeSeperator = (format) ? ":" : "";
		let hour = date.getHours(),
			min = date.getMinutes(),
			sec = date.getSeconds();
		if(hour < 10) hour = "0" + hour;
		if(min < 10) min = "0" + min;
		if(sec < 10) sec = "0" + sec;
		return [hour, min, sec].join(timeSeperator);
	}
	/*오늘 날짜를 리턴 args : true/false*/
	dateFunc.prototype.getToday = function(format = true) {
		const today = new Date();
		return this.getStrDate(today, format);

	}
	/*현재일자에서 +-된 일자를 리턴 args : number, true/false*/
	dateFunc.prototype.getMoveDay = function(moveDay = 0, format = true){
		if(!isNaN(moveDay)){
			const today = new Date();
			today.setDate(today.getDate() + parseInt(moveDay));
			return this.getStrDate(today, format);
		}else{
			return this.getToday(format);
		}
	}
	/*현재 시간을 리턴 args : true/false*/
	dateFunc.prototype.getTime = function(format = true) {
		const today = new Date();
		return this.getStrTime(today, format);
	}
	/*현재 날짜+시간을 리턴*/
	dateFunc.prototype.getDateTime = function(format = true) {
		const today = new Date();
		return this.getStrDate(today, format) + ((format) ? " " : "") + 
			this.getStrTime(today, format);
	}
	/*diff 함수 합칠 필요 있음*/
	/*월 차이를 리턴 args : 2022-07, 2022-09 format*/
	dateFunc.prototype.getMonthDiff = function(stDt, edDt) {
		let diffMonth;
		if(typeof stDt === 'string' && typeof edDt === 'string') {
			stDt = new Date(stDt);
			edDt = new Date(edDt);
			diffMonth = (edDt.getFullYear() - stDt.getFullYear()) * 12;
			diffMonth -= stDt.getMonth();
			diffMonth += edDt.getMonth();
			return diffMonth <= 0 ? 0 : diffMonth;
		}else {
			console.error("파라미터 타입이 올바르지 않습니다. (string, string)");
			return false;
		}
	}
	/*일 차이를 리턴 args : 2022-07-01, 2022-07-02 format*/
	dateFunc.prototype.getDayDiff = function(stDt, edDt) {
		let diffDay;
		if(typeof stDt === 'string' && typeof edDt === 'string') {
			stDt = new Date(stDt);
			edDt = new Date(edDt);
			diffDay = edDt.getTime() - stDt.getTime();
			return Math.floor(diffDay/(1000*60*60*24));
		}else {
			console.error("파라미터 타입이 올바르지 않습니다. (string, string)");
			return false;
		}
	}
	/*분 차이를 리턴 args : 2022-07-01 00:05:00, 2022-07-02 00:06:00 format*/
	dateFunc.prototype.getTimeDiff = function(stTm, edTm) {
		let diffTime;
		if(typeof stTm === 'string' && typeof edTm === 'string') {
			stTm = new Date(stTm);
			edTm = new Date(edTm);
			diffTime = edTm.getTime() - stTm.getTime();
			return Math.floor(diffTime/(1000*60));
		}else {
			console.error("파라미터 타입이 올바르지 않습니다. (string, string)");
			return false;
		}
	}
	/*초 차이를 리턴 args : 2022-07-01 00:05:00, 2022-07-02 00:06:00 format*/
	dateFunc.prototype.getSecondDiff = function(st, ed){
		let diff;
		if(typeof st === 'string' && typeof ed === 'string') {
			st = new Date(st);
			ed = new Date(ed);
			diff = ed.getTime() - st.getTime();
			console.log(diff);
			return Math.floor(diff/1000);
		}else {
			console.error("파라미터 타입이 올바르지 않습니다. (string, string)");
			return false;
		}
	}
	/**현재 달의 첫날 마지막 날을 리턴 @return {first: '2022-08-01', last: '2022-08-31'}*/
	dateFunc.prototype.getThisMonth = function(){
		const date = new Date(), 
		      firstDay = new Date(date.getFullYear(), date.getMonth(), 1),
			  lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
		return {first: this.getStrDate(firstDay), last: this.getStrDate(lastDay)};
	}
	/**현재 년도의 1월~12월을 리턴 @return {first: '2022-01', last: '2022-12'} */
	dateFunc.prototype.getThisYear = function(){
		const date = new Date(), year = date.getFullYear(), daySeperator = '-',
			  first = [year, '01'].join(daySeperator),
			  last = [year, '12'].join(daySeperator);
		return {first: first, last: last};
	}
	/**현재 년도부터 파라미터로 받은 양수만큼 증가한 년도를 리턴 @return {first: 2022, last: 2022+year} */
	dateFunc.prototype.getYearPeriod = function(beforeYear){
		const date = new Date(), year = date.getFullYear(),
			  first = year - beforeYear, last = year;
		return {first: first, last: last};
	}
	/*현재 년월에 마지막 일자를 리턴 args : string (202207)*/
	dateFunc.prototype.getLastDay = function(date) {
		if(date.length !== 6) {
			alert("파라미터 길이가 올바르지 않습니다.(년+월 6자리)");
			return false;
		}
		const dt = new Date(date.substring(0,4), date.substring(4,6), 0);
		return dt.getDate();
	}
	/*현재월의 일자들을 배열로 리턴*/
	dateFunc.prototype.getThisMonthDays = function() {
		const dt = this.getToday(false), array = [],
			  lastDay = this.getLastDay(dt.substring(0, 6));
		for(let i=1; i<lastDay + 1; i++){
			array.push(i);
		}
		return array;
	}
	dateFunc.prototype.timestampToDate = function(ts = new Date(), format = true) {
		/*OS에 따라 ts에 1000을 곱해줘야되는 경우도 있음*/
		const dt = new Date(ts);
		return this.getStrDate(dt, format) + ((format) ? " " : "") + 
			this.getStrTime(dt, format);
	}
	return new dateFunc;
})();
/*숫자관련 함수

*/
export const AF_number = {
	/*소수점 처리 후 리턴 args : r - 반올림, c - 올림, f - 버림*/
	getDecimal: (num = 0, type = 'r') => {
		if(isNaN(Number(num))){
			console.error("파라메터 타입이 올바르지 않습니다. (Number, string(r,c,f)");
			return false;
		}
		if(type === 'r') return Math.round(num); /*반올림*/
		if(type === 'c') return Math.ceil(num); /*올림*/
		if(type === 'f') return Math.floor(num); /*버림*/
	},
	/*String에서 숫자만 추출해 리턴 args : number*/
	getOnlyNumber: (num = "") => {
		if(typeof num !== 'number'){
			num = num.replace( /[^0-9]/gi, '');
		}
		return num;
	},
	/*콤마가 포함된 String형 숫자 리턴 args : number or number String*/
	getCommaNumber: (num = 0) => {
		if(isNaN(Number(num))){
			console.error("파라메터 타입이 올바르지 않습니다. (Number)");
			return false;
		}
		num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return num;
	}
}
/*모달 팝업 관련 클래스
 */
export class AF_modal {
	constructor(option){
		let width = 200, height = 200;
		this.id = option.id;
		this.bgLayer = null;
		this.modalPopup = document.getElementById(option.id);
		if(option?.width && typeof option.width === 'number') width = option.width;
		if(option?.height && typeof option.height === 'number') height = option.height;
		this.modalPopup.style.position = 'absolute';
		this.modalPopup.style.display = 'none';
		this.modalPopup.style.zIndex = 10000;
		this.modalPopup.style.width = `${width}px`;
		this.modalPopup.style.height = `${height}px`;
		this.modalPopup.style.left = `calc(50% - ${width / 2}px)`;
		this.modalPopup.style.top = `calc(50% - ${height / 2}px)`;
		if(option.background) this.createBgLayer();
		if(option.drag) this.setDragable();
		return {
			open: this.open.bind(this),
			close: this.close.bind(this)
		}
	}
	createBgLayer(){
		const bg = document.createElement('div');
		bg.id = `${this.id}BgLayer`;
		bg.style.display = 'none';
		bg.style.position = 'fixed';
		bg.style.top = 0;
		bg.style.ldft = 0;
		bg.style.width = '100%';
		bg.style.height = '100%';
		bg.style.backgroundColor = '#000';
		bg.style.opacity = 0.5;
		bg.style.filter = 'alpha(opacity=50)';
		bg.style.zIndex = 999;
		document.body.style.overflow = 'hidden';
		document.body.appendChild(bg);
		this.bgLayer = bg;
	}
	setDragable(){
		const header = document.getElementById(`${this.id}_header`);
		const ele = document.getElementById(this.id);
		let pos1, pos2, pos3, pos4;
		const closeDragElement = () => {
			document.onmouseup = null;
			document.onmousemove = null;
		}
		const elementDrag = (e) => {
			e = e || window.event;
			e.preventDefault();
			pos1 = pos3 - e.clientX;
			pos2 = pos4 - e.clientY;
			pos3 = e.clientX;
			pos4 = e.clientY;
			const posTop = ele.offsetTop - pos2;
			const posLeft = ele.offsetLeft - pos1;
			if(posTop > 0 && (screen.availHeight) - (posTop + ele.offsetHeight) > 0){
				ele.style.top = posTop + 'px';
			}
			if(posLeft > 0 && (screen.availWidth) - (posLeft + ele.offsetWidth) > 0){
				ele.style.left = posLeft + 'px';
			}
		}
		const dragMouseDown = (e) => {
			e = e || window.event;
			e.preventDefault();
			pos3 = e.clientX;
			pos4 = e.clientY;
			document.onmouseup = closeDragElement;
			document.onmousemove = elementDrag;
		}
		if(header !== null){
			header.style.cursor = 'pointer';
			header.onmousedown = dragMouseDown;
		}else{
			ele.onmousedown = dragMouseDown;
		}
	}
	open(){
		if(this.modalPopup.style.display === 'none'){
			if(this.bgLayer !== null){
				document.body.style.overflow = 'hidden';
				this.bgLayer.style.display = 'block';
			}
			this.modalPopup.style.display = 'block';
		}
	}
	close(){
		if(this.modalPopup.style.display !== 'none') {
			if(this.bgLayer !== null){
				document.body.style.overflow = 'auto';
				this.bgLayer.style.display = 'none';
			}
			this.modalPopup.style.display = 'none';
		}
	}
	// ocModalPopup(){
	// 	if(this.modalPopup.style.display === 'none'){
	// 		if(this.bgLayer !== null){
	// 			document.body.style.overflow = 'hidden';
	// 			this.bgLayer.style.display = 'block';
	// 		}
	// 		this.modalPopup.style.display = 'block';
	// 	}else {
	// 		if(this.bgLayer !== null){
	// 			document.body.style.overflow = 'auto';
	// 			this.bgLayer.style.display = 'none';
	// 		}
	// 		this.modalPopup.style.display = 'none';
	// 	}
	// }
}
/*스탑워치 관련 클래스 1초씩 증가
	args: 스탑워치를 추가할 부모의 id
*/
export class AF_stopwach {
	constructor(parentId){
		this.stopwatch = document.getElementById(parentId);
		if(this.stopwatch == null){
			const msg = "스탑워치를 추가할 수 없습니다. 파라미터를 확인하세요.";
			return {
				start: () => {console.error(msg);},
				pause: () => {console.error(msg);},
				reset: () => { {console.error(msg);}}
			};
		}
		this.append();
		this.timer = null;
		this.hour = 0;
		this.min = 0;
		this.sec = 0;
		return {
			start: this.start.bind(this),
			pause: this.pause.bind(this),
			reset: this.reset.bind(this)
		}
	}
	append(){
		let html = '<ul class="timeClock">';
		html += '<li id="aj_hour">00</li>';
		html += '<li class="point">:</li>';
		html += '<li id="aj_min">00</li>';
		html += '<li class="point">:</li>';
		html += '<li id="aj_sec">00</li>';
		this.stopwatch.innerHTML = html;
	}
	run(){
		this.sec++;
		if(this.sec >= 60){
			this.sec = 0;
			this.min++;
			if(this.min >= 60){
				this.min = 0;
				this.hour++;
			}
		}
		const sw = this;
		['sec', 'min', 'hour'].forEach((t) => {
			document.getElementById(`aj_${t}`).textContent = 
				(sw[t] !== 0) ? ((sw[t] > 9) ? sw[t] : '0' + sw[t]) : '00';
		});
	}
	start(){
		this.timer = setInterval(this.run.bind(this), 1000);
	}
	pause(){
		clearTimeout(this.timer);
	}
	reset(){
		this.pause();
		const sw = this;
		['sec', 'min', 'hour'].forEach((t) => {
			document.getElementById(`aj_${t}`).textContent = '00';
			sw[t] = 0;
		});
	}
}