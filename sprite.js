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
                    backgroundSize: `${width*columns}px ${height*row}px`
                }
            )
        }
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