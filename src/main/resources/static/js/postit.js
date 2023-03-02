/**
 * MDN을 적극 참고하도록!
 * https://developer.mozilla.org/ko/docs/Web/JavaScript 
 * 과제. 포스트잇 Element를 관리하기 위한 Modal class를 완성한다.
 * 1. '포스트잇 추가!' 버튼 클릭 시 body에 포스트잇 Element를 추가한다.
 *    - PostIt class의 append 메소드를 완성한다.
 *    - PostIt Element의 구조
 *      <div class="modal">
 *          <div class="modal_title">
 *              <a>X</a>
 *          </div>
 *          <textarea></textarea>
 *      </div>
 * 
 * 2. del 메소드를 완성한다.
 * 
*/

/** 전역 변수 필요 시 사용*/
/**
 * @typedef {object} GV - 전역변수
 * @property {number} GV.id - 각 postit의 id값
 * @property {number} GV.x - postit의 x좌표 값
 * @property {number} GV.y - postit의 y좌표 값
 * @property {number} GV.zIdx - postit의 zIdx 값
 * @property {number} GV.live_modal - 현재 body에 있는 modal의 갯수를 세어줌
*/
const GV = {
    id: 0,
    x: 40,
    y: 40,
    zIdx: 0,
    live_modal: 0 
};

const DATA = {
    
};

/** 
 * @description : 추가버튼 클릭 시 이벤트
*/
document.getElementById('add').addEventListener('click', () => {
    /** option으로 전달할 값에 대해 고민해보시오...*/
    const option = {
        x: GV.x,
        y: GV.y, 
        id: GV.id,
        textdata: ""
    };
    
    new PostIt(option);
});

document.getElementById('save').addEventListener('click', () => {
    fetch("./delData", {
        method: "delete"
    });
    console.log(response)
    //let data = new ArrayList();
    const param = [];
    console.log(DATA);
    for(let i in Object.keys(DATA)){
        const temp = {
            pi_id: i,
            pi_content: DATA[i],
        }
        console.log(temp);
        param.push(temp);
    }
//[{user_id: asd, pi_id: 1, pi_content: sad}, {user_id: asd, pi_id: 1, pi_content: sad}] 
        console.log(param)
        fetch("./saveData", {
            method: "Post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(param),
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log("data", data);
        });
    
    
});

/** 
 * @description : 새로 불러오기버튼 클릭 시 이벤트 
*/
document.getElementById('new_add').addEventListener('click', () => {
    
    //새로 불러오기 버튼 클릭시 모든 요소 삭제
    for(let i=GV.live_modal; i>0; i--){
        document.querySelector(".modal").remove(); 
        GV.live_modal--;
    }
    //위치 초기화
    GV.x = 40;
    GV.y = 40;
    fetch("./getData")
        .then((response)=>response.json())
        .then((data)=>{
            //console.log(data);
            for(let i in data){
                const option1 = {
                    x: GV.x,
                    y: GV.y,
                    id: GV.id,
                    textdata: data[i].pi_content
                };
                new PostIt(option1);
            }
        })
    });

/**
 * @typedef {class} PostIt - PostIt element를 생성하는 클래스
*/
class PostIt {
    constructor(option) {
        this.x = option.x;
        this.y = option.y;
        this.id = option.id;
        this.textdata = option.textdata;
        const modal = null;
        const post = this.append();
    }

    /**
     * @description : document body에 PostIt Element를 추가하는 메소드
    */
    append(){
        /** 1. document bodybn 에 PostIt Element를 추가한다.
         * PostIt Element 구조는 상단 참고
         * 요소 생성 : document.createElement
         * 자식 요소 추가 : appendChild
         * ex) body에 추가 : document.body.appendChild(div);
         * 
         * 2. PostIt Element Title에 a태그 클릭 시 
         * PostIt class의 delPostIt 메소드를 호출하여 해당 PostIt을 document.body에서 삭제한다.
         * 
         * 2. body에 이미 PostIt Element가 있다면 
         *   가장 최근에 생성한 요소에서 top + 10, left +10 의 위치에 추가한다.
         * 
         * 3. setDraggable 메소드가 정상적으로 동작하도록 Element를 잘 생성하시오 ㅋ
        */   
        function ce(obj){
            const postIt = document.createElement(obj.tag);
            for(let i in obj.attr){
                postIt.setAttribute(i, obj.attr[i]);
            }
            return postIt;
        }
        this.modal = ce({
            tag: 'div',           
            attr: {
                id: this.id,
                class: 'modal'
            }
        });
        const title = ce({
            tag: 'div',           
            attr: {
                id: `${this.id}_title`,
                class: 'modal_title'
            }
        });
        const a = ce({
            tag: 'a',           
            attr: {
                id: this.id,
                class: '' 
            }
        });
        const text = ce({
            tag: 'textarea',           
            attr: {
                id: this.id,
                class: 'modal textarea' 
            }
        });

        if(this.textdata == ""){
            DATA[this.id] = "";
        }
        else{
            DATA[this.id] = this.textdata;
        }
        
        let left, top;
        left = this.x + 10;
        top = this.y + 10;

        document.body.appendChild(this.modal);

        this.modal.style.top = top + "px";
        this.modal.style.left = left + "px";
  
        a.innerHTML = "X";
        title.appendChild(a);

        a.onclick = () => {
            this.delPostIt();
        };

        this.modal.append(title, text);
        text.onkeyup = function(){
            let id = this.id;
            DATA[id] = text.value;
        }
        GV.id++;
        GV.live_modal++;        
        GV.x += 10;
        GV.y += 10;

        this.modal.querySelector(".modal textarea").value += this.textdata;
        this.setDraggable();


    }

    /**
     * @description : X를 누르면 PostIt Element를 삭제하는 메소드
    */
    delPostIt(){
        /**
         * 요소의 삭제 : removeChild
        */
        const e = document.getElementById(this.id);
        e.parentNode.removeChild(e);
        GV.live_modal--;
        delete DATA[this.id];
    }
    
    /**
     * @description : PostIt Element를 드래그할 수 있게하는 메소드
    */
    setDraggable(){
        const header = document.getElementById(`${this.id}_title`);
		const ele = document.getElementById(this.id);
		let pos1, pos2, pos3, pos4;
		const closeDragElement = (e) => { //드래그 끝났을 때
            if(e.target.tagName === 'DIV'){
                e.preventDefault(); //a 태그 처럼 클릭 이벤트 외에 별도의 브라우저 행동을 막기 위해 사용된다
                e.stopPropagation(); //부모태그로의 이벤트 전파를 중지하라
                document.onmouseup = null; //마우스 버튼을 클릭한걸 땔때
                document.onmousemove = null; //마우스 이동
            }
		}
        /**
         * 이전에 위치했던 좌표에서 현재 마우스를 움직인 좌표를 뺌으로 차이 값을 구해주고 top과 left속성으로 이동시켜줌 
        */
		const elementDrag = (e) => {
			e = e || window.event; //e가 존재 하면 e로 존재하지 않으면 window.event로 e가 초기화되지않으면 window.event입니다 그렇지 않으면 원래의 e로 ||의 단락 행위를 이용하여 e를 초기화
			e.preventDefault();
            //이전 좌표와 현재 좌표 차이값
			pos1 = pos3 - e.clientX;
			pos2 = pos4 - e.clientY;
            //현재 좌표가 이전 좌표로 바뀜
			pos3 = e.clientX; //현재 마우스가 지정한 탭에 있는 좌표위치를 가져옴
			pos4 = e.clientY;
			const posTop = ele.offsetTop - pos2; //offsetTop은 부모 요소안의 자식 요소의 상대위치
			const posLeft = ele.offsetLeft - pos1; //offsetLeft는 좌측을 기준으로 ele엘리먼트 요소가 위치한 거리
			if(posTop > 0 && (screen.availHeight) - (posTop + ele.offsetHeight) > 0){
				ele.style.top = posTop + 'px';
			}
			if(posLeft > 0 && (screen.availWidth) - (posLeft + ele.offsetWidth) > 0){
				ele.style.left = posLeft + 'px';
			}
		}
        
		const dragMouseDown = (e) => {
            this.modal.style.zIndex = GV.zIdx++; //메모 겹쳐있으면 뒤에거 클릭하면 앞으로 나오기 
			e = e || window.event;
			e.preventDefault();
			pos3 = e.clientX;
			pos4 = e.clientY;
			document.onmouseup = closeDragElement;
			document.onmousemove = elementDrag; //마우스가 움직이면 함수를 호출
		}
		if(header !== null){
			header.style.cursor = 'pointer';
			header.addEventListener('mousedown', dragMouseDown);
		}else{
			ele.onmousedown = dragMouseDown;
		}
    }
}

/**
 * [오늘의 정보]
 * FileReader() 사용
*/