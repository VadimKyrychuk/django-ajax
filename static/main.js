const taskForm = document.forms[0]
const todoContainer = document.getElementById('task-row')

function getCookie(name) {
    if (!document.cookie) {
        return null;
    }
    const xsrfCookies = document.cookie.split(';')
        .map(c => c.trim())
        .filter(c => c.startsWith(name + '='));
    if (xsrfCookies.length === 0) {
        return null;
    }
    return decodeURIComponent(xsrfCookies[0].split('=')[1]);
}

taskForm.addEventListener('submit', function (e) {
    e.preventDefault()
    const task_name = e.target.elements[1].value
    console.log(task_name)
    const completed = e.target.elements[2].checked
    const qw = e.target.elements[0].value
    console.log(qw)
    const csrfToken = getCookie('csrftoken');
    const data = new FormData()
    data.append('task_name', task_name);
    data.append('completed', completed);
    fetch('/', {
        method: 'post',
        headers: {
            'X-CSRFToken': csrfToken,
            'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'same-origin',
        body: data
    })
        .then(response => response.json())
        .then(data => {
            const task = data.data
            todoContainer.innerHTML = `
              <div class="col-md-3">
            <div class="card" style="border:1px solid black">
            <form class = 'del-info'>

                    <input type="hidden" value="{{i.id}}">
                    <button> Удалить </button>
                </form>
                ${task.task_name}
                <div class="form-check">
                        <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                                ${task.completed ? 'checked' : ''}>
                        <label class="form-check-label" for="flexCheckDefault">Completed:</label>
                    </div>
            </div>
        </div>
            ` + todoContainer.innerHTML
        })
        .catch(console.log)
        .finally(function () {
            console.log('request was finished')
        })
})

todoContainer.addEventListener('submit', function (t){
    t.preventDefault()
    const id_el = t.target.elements[0].value
    console.log(id_el)
    const csrfToken = getCookie('csrftoken');
    let dataDel = new FormData()
    dataDel.append('id',id_el)
    fetch('/', {
        method: 'post',
        headers: {
            'X-CSRFToken': csrfToken,
            'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'same-origin',
        body: dataDel
    })
        .then(response => response.json())
        .then(data => {
            const todo = document.getElementsByClassName('del-info')
            for (let i in todo){
            if (i[0][0].value == dataDel['id']){
                todo.
                break
            }
            }
        })
        .catch(console.log)
        .finally(function () {
            console.log('request was finished')
        })
})


