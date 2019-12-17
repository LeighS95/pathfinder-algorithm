export default function throttleWindow() {    
    setInterval(() => {
        let maxWidth = document.body.clientWidth;
        let maxHeight = document.body.clientHeight;
        return maxHeight && maxWidth;
    }, 2000);
}