(function() {
    let _state = { text: '' }

    function setState(newState) {
        _state = Object.assign({}, _state, newState);
        render();
    }

    function render() {
        const text  = _state.text
        const editor = document.getElementById("editor");
        const counter = document.getElementById("counter");

        editor.value = text;
        counter.innerHTML = "Word Count: 666";
    }

    function initialize() {
        const editor = document.getElementById("editor");
        editor.addEventListener('input', function(event) {
            const text = event.target.value;
            text = text.toUpperCase();
            setState({ text: text });
        });
    }

    document.addEventListener('DOMContentLoaded', function() {
        initialize();
    });
})();