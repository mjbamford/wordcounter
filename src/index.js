(function() {
    const targetWordCount = 10;
    const IDLE = 'IDLE';
    const SUCCESS = 'SUCCESS';
    const FAILURE = 'FAILURE';
    const WAITING = 'WAITING';

    let _state = { text: '', saveStatus: IDLE }

    function setState(newState) {
        _state = Object.assign({}, _state, newState);
        render();
    }

    function countWords(text) {
        let matches;
        return (text && (matches = text.match(/\w+/g))) ? matches.length : 0
    }

    function makeFakeRequest(text, success, failure) {
        setTimeout(function() {
            if (Math.random() > 0.5) {
                success();
            } else {
                failure();
            }
        }, 1500);
    }

    function render() {
        const { text, saveStatus } = _state;

        const editor = document.getElementById("editor");
        const counter = document.getElementById("counter");
        const progressBar = document.getElementById("progress");
        const alertBox = document.getElementById("alertBox");

        const wordCount = countWords(text);
        const progressValue = wordCount / targetWordCount;

        let message = '';
        if (saveStatus === FAILURE) {
            message = 'Failed :('
        } else if (saveStatus === SUCCESS) {
            message = 'Success!';
        } else if (saveStatus === WAITING) {
            message = 'Saving...'
        }

        editor.value = text;
        counter.innerHTML = `Word Count: ${wordCount}`;
        progressBar.value = progressValue;
        alertBox.textContent = message;
    }

    function initialize() {
        const editor = document.getElementById("editor");
        const saveBtn = document.getElementById('saveButton')
        editor.addEventListener('input', function(event) {
            let text = event.target.value;
            text = text.toUpperCase();
            setState({ text: text });
        });

        saveBtn.addEventListener('click', function(event) {
            event.preventDefault();
            setState({ saveStatus: WAITING });
            makeFakeRequest(_state.text,
                () => setState({ saveStatus: SUCCESS }),
                () => setState({ saveStatus: FAILURE })
            );
        });
    }

    document.addEventListener('DOMContentLoaded', function() {
        initialize();
    });
})();