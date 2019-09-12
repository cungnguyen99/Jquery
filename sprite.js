window.onload=function(){
    const SPRITE_SELECTOR='.sprite';
    function init(){
        const sprites=document.querySelectorAll(SPRITE_SELECTOR);
        for (const sprite of sprites) {
            const image=getAttr(sprite,'image');

            const width=getAttr(sprite,'width',true);

            const height=getAttr(sprite,'height',true);

            const columns=getAttr(sprite,'columns',true);

            const row=getAttr(sprite,'row',true);

            const max=getAttr(sprite,'max',true);

            const loop=getAttr(sprite,'loop',true);

            const frame=getAttr(sprite,'frame',true);

            Object.assign(sprite.style,
                {
                    width: width+'px',
                    height: height+'px',
                    backgroundImage: `url(${image})`,
                    backgroundSize: `${width*columns}px ${height*row}px`,
                    backgroundPosition: '0 0'
                }
            )
            let playing=false;
            sprite.addEventListener('mouseover',function(){
                if(playing===true){
                    return
                }
                playing=true;
                play({sprite,width, height, columns, row, max,loop, frame, done:function(){playing=false}});
            })
        }
    }
    function play({sprite,width, height, columns, row, max,loop, frame, done}){
        const aSecond=1000;
        let timePerFrame=aSecond/frame;
        console.log(timePerFrame);
        const spriteInfo={
            x:0,
            y:0,
            loop:0
        };
        let i=0;
        const playTimer=setInterval(function(){
            i++;
            Object.assign(sprite.style,
                {
                    backgroundPosition:`${spriteInfo.x}px ${spriteInfo.y}px`
                })
            if(i%columns===0){//ktra xem nó có đang ở cột cuối không nếu có thì xuống hàng tiếp theo
                spriteInfo.x=0;
                spriteInfo.y-=height;//nếu ở cuối r thì trừ đi 1 khoảng cách bằng chiều cao để nó xuống hàng dưới
            }else{
                spriteInfo.x-=width;
            }
            if(i>=max){
                //nếu i>số hình ảnh thì gán lại
                i=0
                spriteInfo.x=0;
                spriteInfo.y=0;
                //sau khi ktra nếu lớn hơn max thì cho lặp lại và chỉ cho lặp lại số lần đã ghi trong loop thì dừng
                spriteInfo.loop++;
                if(spriteInfo.loop===loop){
                    clearInterval(playTimer);
                    //Nếu số vòng lặp đạt số vòng ghi trong html thì mới ktra ở dưới còn nếu k thì biến playing ở trên vẫn là true
                    if(typeof done==='function'){
                        //Nếu là 1 function thì nó sẽ gọi lại hàm đó
                        done();
                    }
                }
            }
        },timePerFrame)
    }

    function getAttr(element, attr, isNumber){
        //Nếu truyền vào hàm trên 1 tham số thứ 3 k qtr là gì nhưng do ta ss với true ở dưới nên phải truyền là true thì mới thực hiện if ở dưới chuyển nó sang dạng number
        if(isNumber===true){
            return parseInt(element.getAttribute(attr));
        }
        //còn k thì để nó dạng chuỗi
        return element.getAttribute(attr)
    }
    init();
}